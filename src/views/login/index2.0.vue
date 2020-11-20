<!--  -->
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current }" v-for="item in menuTab" :key="item.id" @click="tabs(item)">
          {{ item.txt }}
        </li>
      </ul>
      <el-form :model="ruleForm" size="small"  status-icon :rules="rules" ref="ruleForm"  class="lgoin-form">
        <el-form-item  prop="email" class="item-form">
            <label>邮箱</label>
            <el-input  v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input type="" v-model="ruleForm.password" minlength="8" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
            <label>重复密码</label>
            <el-input type="" v-model="ruleForm.passwords" minlength="8" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="10">
                <el-col :span="16">
                    <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="6"> 
                    <el-button class="ml1" type="success" size="mini">获取验证码</el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button class="mt19 block" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {stripscript,LxStr,validateEmail} from '@/utils/validator.js'
export default {
  data() {
      var code = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
          let reg = /^[0-9a-zA-Z]*$/g
        if (!value) {
          return callback(new Error('验证码不能为空'));
        } else {
            if (reg.test(value)) {
                callback()
            } else {
                return callback(new Error('请输入正确的验证码'));
            }
        }
      };
      var email = (rule,value,callback) =>{
          if (!value) {
              return callback(new Error('请输入邮箱'));
          } else {
            console.log(!validateEmail(value))
              if(!validateEmail(value)) {
                 return callback(new Error('请输入正确的邮箱！')); 
              } else {
                  callback()
              }
          }
      }
      var pwds = (rule,value,callback) => {
        let reg =/^(?!\D+$)(?![^a-zA-Z]+$)(\w)\S{6,20}$/
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords
        if (!value) {
              return  callback(new Error('请再次密码'));
          } else if(value !== this.ruleForm.password){
              return  callback(new Error('两次密码不正确'));
          } else {
            callback()
          }
      }
      var pass = (rule,value,callback) =>{
          // let Sreg = /(\w)*(\w)\2{2}(\w)*/g
          let reg =/^(?!\D+$)(?![^a-zA-Z]+$)(\w)\S{6,20}$/
          // `~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？
          // let reg =/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[`~!@#$%^&*()_+<>?:"{},.\/;'[\]])[a-zA-Z\d`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{8,}$/
          console.log(stripscript(value) )
          this.ruleForm.password = stripscript(value)
          value = this.ruleForm.password
          if (!value) {
              return  callback(new Error('请输入密码'));
          } else if(!reg.test(value)){
              return  callback(new Error('请输入有效密码'));
              //  if(reg.test(value)) {
              //    if (Sreg.test(value)) {
              //      console.log(123123)
              //    } else {
              //      callback()
              //    }
                  
              // } else {
              //      return callback(new Error('请输入正确的密码！'));
              // } 
          } else {
            callback()
          }
      }
     
    return {
      menuTab: [
        {
          txt: "登录",
          type:'login',
          current: true,
        },
        {
          txt: "注册",
          type:'register',
          current: false,
        },
      ],
      ruleForm: {
        email: "",
        password: "",
        passwords:"",
        code: "",
      },
      model:'login', 
      rules:{
          email:[
              { required: true, validator:email, trigger: 'blur' },
          ],
          password:[
              { required: true, validator:pass, trigger: 'blur' },
          ],
          code:[
              { required: true, validator: code, trigger: 'blur' },
          ],
          passwords:[
            {required:true,validator:pwds, trigger:'blur'}
          ]

      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    tabs(data) {
      this.menuTab.forEach((ele) => {
        ele.current = false;
      });
      this.model = data.type
      data.current = true;
      console.log(data);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
};
</script>
<style lang='scss' scoped>

</style> 