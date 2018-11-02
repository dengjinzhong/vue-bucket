<template>
  <div class="wrapper">
      <header>
          <el-button size="small"
          icon="el-icon-circle-plus-outline" 
          @click="$router.push('/questionnaire/handle')">
          新增
          </el-button>
      </header>
      <el-table :data="questData">
        <el-table-column label="问卷名称">
          <template slot-scope="scope">
            <el-button type="text" @click="cellClick(scope.$index)">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="题目总数"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
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
    questData() {
      return this.$store.state.questData
    }
  },
  methods:{
    handleClick(row) {
      this.$router.push({path: '/questionnaire/handle', query: {index: row}});
    },
    deleteClick(row) {
      this.$store.commit('setData', {
        type: 'delete',
        class: 'questData',
        index: row
      })
    },
    cellClick(row) {
      this.$router.push({path: '/questionnaire/details', query: {index: row}});
    }
  },
}
</script>