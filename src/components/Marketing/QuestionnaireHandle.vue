<template>
  <div class="wrapper">
    <div class="questHandle">
        <header>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="form-title">{{titText}}</div>
                <el-form-item class="inputWidth" label="问卷名称" prop="name"
                :rules="[{ required: true, message: '请输入问卷名称', trigger: 'blur' }]">
                    <el-input v-model="ruleForm.name"></el-input>
                    <span class="el-input-msg">(不能超过20个字)</span>
                </el-form-item>
            </el-form>
        </header>
        <div class="main">
            <app-answer v-for="(item,index) in ruleFormChild" :key="index" :index="index" :ruleForm="item" @index="deleteFrom" @setAnswer="setAnswer"></app-answer>
            <el-button icon="el-icon-circle-plus-outline" @click="addAnswer">继续添加</el-button>
        </div>
    </div>
    <div style="text-align: center;">
        <el-button @click="submitForm">{{submitText}}</el-button>
        <el-button @click="$router.back(-1)">关闭</el-button>
    </div>
  </div>
</template>

<script>
import Answer from './QuestionnaireAnswer'
import {formatDate} from '../../tools/tools.js'
export default {
  components:{
      'app-answer': Answer
  },
  data(){
    return {
        titText: '新增问卷',
        submitText: '立即创建',
        index: -1,
        ruleForm: {
            name: '问卷1'
        },
        ruleFormChild: [
            {
                name: '',
                type: '',
                answerList: []
            }
        ],
    }
  },
  created() {
    this.index = this.$route.query.index;
    if(this.index >= 0) {
       let data = this.$store.state.questData[this.index];
       this.ruleFormChild = [];
       this.ruleForm.name = data.name;
       this.ruleFormChild = data.questList;
       this.titText = '修改问卷';
       this.submitText = '立即修改'
    }
  },
  methods: {
    submitForm() {
       this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                let length = this.ruleFormChild.length;
                for(let i = 0; i < length; i++) {
                    if(this.ruleFormChild[i].name === '') {
                        this.$message.error('请填写问题'+ (i+1) +'的名称！！！');
                        return false;
                    }else if(this.ruleFormChild[i].type === ''){
                        this.$message.error('请选择问题'+ (i+1) +'的答案方式！！！');
                        return false;
                    }else {
                        let list = this.ruleFormChild[i].answerList;
                        if(this.ruleFormChild[i].type != '3' && list.length < 2){
                            this.$message.error('请为问题'+ (i+1) +'添加两个选项以上！！！');
                            return false;
                        }
                    }
                }
                this.ruleForm.value = length;
                this.ruleForm.date = formatDate(new Date(), 'yyyy-mm-dd');
                this.ruleForm.questList = this.ruleFormChild;
                let data ={
                    class: 'questData',
                    data: this.ruleForm
                };
                if(this.index >= 0) {
                    data.type = 'handle';
                }else {
                    data.type = 'add'
                }
                this.$store.commit('setData', data)
                this.$router.push('/questionnaire')
            }else {
                this.$message.error('请填写问卷名称！！！');
            }
       })
    },
    addAnswer() {
        this.ruleFormChild.push({
            name: '',
            type: '',
            answerList: [],
        })
    },
    deleteFrom(index) {
        if(this.ruleFormChild.length === 1){
            this.$message.error('请至少保留一条问卷内容');
        }else {
            this.ruleFormChild.splice(index, 1);
        }
        
    },
    setAnswer(data) {
        let list = this.ruleFormChild[data.index].answerList ? this.ruleFormChild[data.index].answerList : [];
        switch (data.type) {
            case 'add':
                list.push(data.data);
                break;
            case 'handle':
                list.splice(data.number, 1, data.data)
                break;
            case 'detele':
                list.splice(data.number, 1);
                break;
            default:
                console.log('此函数还未被定义！')
                break;
        }
    }
  },
}
</script>

<style scoped lang="scss">
.wrapper{
    height: calc(100% - 140px);
    .questHandle{
        height: 100%;
    }
    .main{
        height: calc(100% - 114px);
        overflow: auto;
    }
    .form-title{
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        margin-bottom: 10px;
        background: #b3b3b3b3;
    }
    .inputWidth{
        width:310px;
        .el-input-msg{
            position: absolute;
            top: 0;
            right: -126px;
            color: #ccc;
        }
    }
}
</style>