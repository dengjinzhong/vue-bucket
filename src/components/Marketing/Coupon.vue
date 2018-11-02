<template>
  <div class="wrapper">
      <header>
        <el-button icon="el-icon-circle-plus-outline" @click="$router.push('/coupon/handle')">新增</el-button>
      </header>
      <el-table
        :data="couponData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="优惠券名称">
        </el-table-column>
        <el-table-column
          prop="value"
          label="优惠券面值">
        </el-table-column>
        <el-table-column
          prop="date"
          label="开始时间">
          <template slot-scope="scope">
            {{scope.row.date1}} {{scope.row.date2}}
          </template>  
        </el-table-column>
         <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index)" type="text" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  computed:{
    couponData() {
       return this.$store.state.couponData
    }
  },
  methods:{
    handleClick(row) {
      this.$router.push({path: '/coupon/handle', query: {index: row}});
    },
    deleteClick(row) {
        this.$store.commit('setData', {
            type: 'delete',
            class: 'couponData',
            index: row
        })
    }
  },
}
</script>