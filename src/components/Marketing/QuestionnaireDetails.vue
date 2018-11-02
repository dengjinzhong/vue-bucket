<template>
  <div class="quest-details">
    <div class="basicMes">
      <h3 class="title">基本信息</h3>
      <p class="text">问卷名称：{{detailsObj.name}}</p>
    </div>
    <div class="problem">
      <h3 class="title">题目</h3>
      <ul class="problem-list">
          <li v-for="(item,index) in detailsObj.questList" :key="index" class="text">
              <h4>{{index+1}}. <span class="texts">{{tagTextList[item.type]}}</span>{{item.name}}</h4>
              <ul class="answer">
                  <li v-for="(items,number) in item.answerList" :key="number" class="text">{{String.fromCharCode(number + 65)}}.&nbsp;&nbsp;{{items}}</li>
              </ul>
          </li>
      </ul>
    </div>
   </div>

</template>

<script>
export default {
  data(){
    return {
      index: null,
      detailsObj: {},
      tagTextList: {'1': '单选题', '2': '多选题','3': '问答题'}
    }
  },
  created(){
    this.index = this.$route.query.index;
    this.detailsObj = this.$store.state.questData[this.index]
  },
}
</script>

<style scoped lang="scss">
.quest-details{
  .title{
      height: 32px;
      line-height: 32px;
      padding-left: 20px;
      margin: 10px 0;
      background: #b3b3b3b3;
  }
  .text{
      padding: 10px 20px;
      line-height: 16px;
  }
  .texts{
      display: inline-block;
      padding: 0 5px;
      margin-right: 5px;
      color: #ccc;
      border:1px solid #ccc;
      border-radius: 5px;
  }
  .answer{
      margin: 10px 20px;
  }
}
</style>