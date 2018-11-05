<template>
  <div class="wrapper" style="height: 100%;">
      <div v-for="index in 3" :key="index" ref="echarts" class="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import pie from 'echarts/lib/chart/pie';
import '../../tools/china.js' // 引入中国地图数据
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    optioneBar(index) {
      let myChart = echarts.init(this.$refs.echarts[index]);
      // 指定图表的配置项和数据
      let tooltip = {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}: {c}"
      };
      let xAxis = [
          {
              type : 'category',
              data :  ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
              axisTick: { alignWithLabel: true},
              axisLine: { lineStyle :{color : '#d6d7d8'}},
              axisLabel: {color: '#999'},
          }
      ];
      let yAxis = [
          {
              type : 'value',
              axisLabel: {color: '#999'},
              axisLine: { lineStyle :{color : '#d6d7d8'}},
              splitLine: {lineStyle: {color: '#f3f5f7'}}
          }
      ];
      let series = [
          {
              type: 'bar',
              barWidth: '15',
              itemStyle: {color: '#3ea3db'},
              data: [5, 20, 36, 10, 10, 20]
          }
      ];
      myChart.clear();
      myChart.setOption({
          tooltip: tooltip,
          xAxis: xAxis,
          yAxis: yAxis,
          series: series
      });
    },
    optionPic(index, color) {
      let myChart = echarts.init(this.$refs.echarts[index]);
      let data = [
          {value:235, name:'视频广告'},
          {value:274, name:'联盟广告'},
          {value:310, name:'邮件营销'},
          {value:335, name:'直接访问'},
          {value:400, name:'搜索引擎'}
      ];
      let obj = {};
      data.forEach((item) => {
          obj[item.name] = item.value;
          if(item.value === 0) {
              item.label = {show: false};
              item.labelLine = {show: false, emphasis: {show: false,}};
          }
          if(item.name === '未知') {
              item.itemStyle = {color: '#e4e4e4'}
          }
      });
      let legend = {
          orient: 'vertical',
          top: 20,
          left: 'left',
          icon: 'circle',
          textStyle: {
              fontSize: 14,
              color: '#808080',
          },
          data: data,
          formatter: function (name) {
              return  name + ": " + obj[name];
          }
      };
      let tooltip= {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
      };
      let series=[
          {
              type:'pie',
              center : ['62%', '50%'],
              radius: ['40%', '55%'],
              label: {
                  normal: {
                      formatter: '{b|{b}} {c|{c}}',
                      rich: {
                      }
                  }
              },
              data: data,
              color: color ? color : ['#3ea3d8','#6de0e1', '#feda66', '#fb96a6', '#dd92de','#d2a877',  '#90c379', '#f99566','#f7d49e', '#e1563a', '#e4e4e4'],
          }
      ];
      myChart.clear();
      myChart.setOption({
          legend: legend,
          tooltip: tooltip,
          series: series
      });
    },
    optionMap(index) {
      let myChart = echarts.init(this.$refs.echarts[index]);
      let Adddredata = [
                  {name: '北京市',value: 1000000},
                  {name: '天津市',value: 300000},
                  {name: '上海市',value: 1000000},
                  {name: '重庆市',value: 400000},
                  {name: '河北省',value: 300000},
                  {name: '河南省',value: 300000},
                  {name: '云南省',value: 100000},
                  {name: '辽宁省',value: 250000},
                  {name: '黑龙江省',value: 250000},
                  {name: '湖南省',value: 350000},
                  {name: '安徽省',value: 350000},
                  {name: '山东省',value: 300000},
                  {name: '新疆维吾尔自治区',value: 80000},
                  {name: '江苏省',value: 300000},
                  {name: '浙江省',value: 400000},
                  {name: '江西省',value: 1000000},
                  {name: '湖北省',value: 300000},
                  {name: '广西壮族自治区',value: 50000},
                  {name: '甘肃省',value: 70000},
                  {name: '山西省',value: 120000},
                  {name: '内蒙古自治区',value: 30000},
                  {name: '陕西省',value: 200000},
                  {name: '吉林省',value: 250000},
                  {name: '福建省',value: 300000},
                  {name: '贵州省',value: 150000},
                  {name: '广东省',value: 1000000},
                  {name: '青海省',value: 90000},
                  {name: '西藏自治区',value: 20000},
                  {name: '四川省',value: 300000},
                  {name: '宁夏回族自治区',value: 30000},
                  {name: '海南省',value: 100000},
                  {name: '台湾省',value: 20000},
                  {name: '香港特别行政区',value: 10000},
                  {name: '澳门特别行政区',value: 5000},
                  {name: '南海诸岛',value: 12},
      ];
      let max = 1;
      Adddredata.forEach((item) => {
          if(item.value > max) {
              max = item.value;
          }
      });
      let visualMap = {
          min: 0,
          max: max,
          left : '20',
          top: 'bottom',
          text:['高','低'],           // 文本，默认为数值文本
          calculable : true,
          color: ['orangered', 'yellow', 'lightskyblue'],
          itemWidth: 15,
          itemHeight: 90
      };
      let geo = { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
              normal: {
                  show: false, // 是否显示对应地名
              },
          },
          zoom: 1,
          itemStyle: {
              normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      };
      let series = [
          {
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
          },
          {
              type: 'map',
              geoIndex: 0,
              data: Adddredata,
          }
      ];
      let tooltip = {
          formatter: "{b}: {c}"
      }; // 鼠标移到图里面的浮动提示框
      myChart.clear();
      myChart.setOption({
          tooltip: tooltip,
          visualMap: visualMap,
          geo: geo,
          series: series
      })
    }
  },
  created(){},
  mounted(){
    this.optioneBar(0);
    this.optionPic(1);
    this.optionMap(2);
  }
}
</script>

<style lang="scss">
.echarts{
  width: 50%;
  height: 400px;
  display: inline-block; 
}
.echarts:nth-child(even){
  border-right: 1px solid #f0f0f0;
}
</style>