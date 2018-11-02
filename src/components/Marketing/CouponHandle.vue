<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item label="优惠券面值" prop="name">
            <el-input v-model="ruleForm.value"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
            <el-col :span="11">
            <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
            <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{index >= 0 ? '立即修改' : '立即创建'}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {formatDate, isType} from '../../tools/tools.js'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          value: '',
          date1: '',
          date2: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入优惠券面值', trigger: 'blur' },
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
        index: -1,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let couponData = {
              name: this.ruleForm.name,
              value: this.ruleForm.value,
              date1: formatDate(this.ruleForm.date1,'yyyy-mm-dd'),
              date2: formatDate(this.ruleForm.date2,'hh:ii') 
            }
            let couponDatas = {
              class: 'couponData',
              data: couponData,
              index: this.index,
            }
            if(this.index >= 0)  {
              couponDatas.type = 'handle';
            }else {
              couponDatas.type = 'add';
            }
            this.$store.commit('setData', couponDatas)
            this.$router.push('/coupon')
          } else {
            this.$message('请填写相应字段！！！');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
        if(this.$route.query.index >= 0) {
            this.index = this.$route.query.index
            let data = this.$store.state.couponData[this.index]
            this.ruleForm = {
                name: data.name,
                value: data.value,
                date1: new Date(data.date1+' '+data.date2),
                date2: new Date(data.date1+' '+data.date2),
            }
        }
    },
  }
</script>