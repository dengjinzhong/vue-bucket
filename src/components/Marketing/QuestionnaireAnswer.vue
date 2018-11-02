<template>
      <el-form :model="ruleForm" ref="ruleFormChild" label-width="100px" class="demo-ruleFrom">
          <div class="form-add">
              <div class="answer-title">题目{{index + 1}}</div>
              <el-form-item label="问题名称" style="width:310px" prop="name"
              :rules="[{ required: true, message: '请输入题目名称', trigger: 'blur' }]" >
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item class="from-inline" label="答案方式">
                <el-select v-model="ruleForm.type" placeholder="请选择答案方式">
                    <el-option label="单选" value="1"></el-option>
                    <el-option label="多选" value="2"></el-option>
                    <el-option label="问答" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="问题选项" v-show="ruleForm.type != 3" class="option-answer">
                <div v-for="(tag,index) in dynamicTags" :key="index"  class="answer-tag">
                        {{ String.fromCharCode(index + 65)}}:&nbsp;
                        <el-input
                                class="input-new-tag"
                                v-if="tag.boole"
                                v-model="tag.tagValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleTagInputConfirm(index,$event)"
                                @blur="isflag && handleTagInputConfirm(index,$event)"
                        >
                        </el-input>
                        <span v-else @click="showTagInput(index)">
                            <el-tag closable :disable-transitions="false" @close="handleClose(index)">{{tag.tagValue}}</el-tag>
                        </span>
                </div>
                <el-input 
                    v-show="inputVisible" 
                    v-model="inputValue" 
                    ref="saveInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    class="input-new-tag"></el-input>
                <el-button 
                    v-show="!inputVisible"
                    @click="showInput" 
                    icon="el-icon-circle-plus-outline" 
                    class="button-news-tag">新增选项</el-button>
              </el-form-item>
              <el-button class="detal-button" type="primary" size="small" icon="el-icon-delete" @click="deleteAnswer">删除</el-button>
          </div>
      </el-form> 
</template>

<script>
import {isType} from '../../tools/tools.js'
export default {
    props: {
        ruleForm: Object,
        index: Number
    },
    data() {
        return {
            inputVisible: false,
            inputValue: '',
            dynamicTags: [],
            isflag: true,
        }
    },
    created() {
        if(isType(this.ruleForm.answerList, 'Array')){
            this.ruleForm.answerList.forEach((item) => {
                this.dynamicTags.push({
                    tagValue: item,
                    boole: false
                })
            })
        } 
    },
    methods:{
        deleteAnswer() {
            this.$emit("index", this.index)
        },
        showTagInput(index) {
            this.dynamicTags[index].boole = true;
            this.isflag = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput[0].$refs.input.focus();
            });
        },
        handleClose(index) {
            this.dynamicTags.splice(index, 1);
            this.$emit("setAnswer", {
                type: 'detele',
                index: this.index,
                number: index
            });
        },
        handleTagInputConfirm(index,event) {
            if(event.type === 'keyup') {
                this.isflag = false;
            }
            this.dynamicTags[index].boole = false;
            if(this.dynamicTags[index].tagValue === '') {
                this.handleClose(index);
            }else {
                this.$emit("setAnswer", {
                    type: 'handle',
                    index: this.index,
                    number: index,
                    data: this.dynamicTags[index].tagValue
                });
            }
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            if(this.inputValue != '') {
                this.dynamicTags.push({
                    tagValue: this.inputValue,
                    boole: false
                });
                this.$emit("setAnswer", {
                    type: 'add',
                    index: this.index,
                    data: this.inputValue
                });
            }
            this.inputVisible = false;
            this.inputValue = '';
        }, 
    },
}
</script>

<style lang="scss">
    .form-add{
        position: relative;
        .detal-button{
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }
    .answer-title{
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        margin-bottom: 10px;
        background: #b3b3b3b3;
    }
    .option-answer{
        .answer-tag{
            display: inline-block;
            padding: 0 20px;
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-news-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
</style>