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
            <el-input type="password" v-model="ruleForm.password" minlength="8" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
            <label>重复密码</label>
            <el-input type="password" v-model="ruleForm.passwords" minlength="8" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="10">
                <el-col :span="16">
                    <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="6"> 
                    <el-button style="width:102px" class="ml1" type="success" size="mini" @click="getSms" :disabled="codeButtonStatus">{{codeButtonText}}</el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button class="mt19 block" type="primary" :disabled="loginButStatus" @click="submitForm('ruleForm')">{{model == 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive,ref} from '@vue/composition-api';
import {stripscript,validateEmail,} from '@/utils/validator.js';
import {GetSm,Register,Login} from '@/api/login.js';
import sha1 from 'js-sha1';
export default {
  setup(props,{root,refs}) {
    var code = (rule, value, callback) => {
        // ruleForm.code = stripscript(value)
        value =ruleForm.code
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
      };
      var pwds = (rule,value,callback) => {
        // let reg =/^(?!\D+$)(?![^a-zA-Z]+$)(\w)\S{6,20}$/
        ruleForm.passwords = stripscript(value)
        value = ruleForm.passwords
        if (!value) {
              return  callback(new Error('请再次密码'));
          } else if(value !== ruleForm.password){
              return  callback(new Error('两次密码不正确'));
          } else {
            callback()
          }
      };
      var pass = (rule,value,callback) =>{
            let reg =/^(?!\D+$)(?![^a-zA-Z]+$)(\w)\S{6,20}$/
            console.log(stripscript(value) )
            ruleForm.password = stripscript(value)
          value = ruleForm.password
          if (!value) {
              return  callback(new Error('请输入密码'));
          } else if(!reg.test(value)){
              return  callback(new Error('请输入有效密码'));
          } else {
            callback()
          }
      };
    /***
     * 申明数据
    */
    const menuTab = reactive([ 
        { txt: "登录", type:'login', current: true, },
        {txt: "注册",type:'register',current: false,  },
    ]);
    // 模块值
    const  model = ref('login');
    // 验证码
    const codeButtonText = ref('获取验证码');
    // 验证按钮状态
    const codeButtonStatus = ref(false);
    // 表单数据
    const ruleForm = reactive({
        email: "",
        password: "",
        passwords:"",
        code: "",
    });
    // 登录按钮状态
    const loginButStatus = ref(true);
    // 倒计时
    const timer = ref(null);
    // 校验数据
    const rules = reactive ({
        email:[
        { required: true, validator:email, trigger: 'blur' },],
        password:[
            { required: true, validator:pass, trigger: 'blur' },
        ],
        code:[
            { required: true, validator: code, trigger: 'blur' },
        ],
        passwords:[
            {required:true,validator:pwds, trigger:'blur'}
        ]

      });

    /***
     * 生命周期
     * **/

    onMounted(()=>{

    });
    /**
     * tan切换
     * */ 
    const tabs = (data=>{
        menuTab.forEach((ele) => {
            ele.current = false;
        });
        model.value = data.type
        data.current = true ;
        refs.ruleForm.resetFields();
    });
    // 获取验证码
    const getSms = (()=>{
      let data = {
        username: ruleForm.email,
        module:model.value
      }
      if (!ruleForm.email) {
        root.$message.error('邮箱不能为空！！')
        return
      } else if (!validateEmail(ruleForm.email)) {
        root.$message.error('请输入正确的邮箱!')
         return
      }
      codeButtonStatus.value = true
      codeButtonText.value = '发送中'
      GetSm(data).then((res)=>{
        root.$message.success(res.message)
        loginButStatus.value = false
        countDown(60)
      }).catch(error=>{
        console.log(error)
      })
    });
     /***
      * 提交
     */
    const submitForm = (formName => {
        refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              username:ruleForm.email,
              // password: sha1(ruleForm.password ),
              password:ruleForm.password,
              code:ruleForm.code,
              module: model.value
            }
            // 登录 && 注册
             model.value == 'login' ? login(data) :Register(data)             
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    });
    /**
     * 登录
     * */ 
    const login =((data)=>{
      root.$store.dispatch('app/login',data).then((res)=>{
        if (res.resCode === 0 ){
           root.$router.push({path:'/console'})
           root.$message.success(res.message)
         }
        console.log(res)
      })
      //  Login(data).then((res)=>{
      //    if (res.resCode === 0 ){
      //      root.$router.push({path:'/console'})
      //    }
      //    
      //  })
    });
    /**
     * 注册
     * */ 
    const register =((data)=>{
      Register(data).then((res)=>{
        root.$message.success(res.message)
        tabs(menuTab[0])
        clearCountDown()
      }).catch({

      })
    });
    /**
     * 倒计时
    */
    const countDown = ((number)=>{
      let time = number
      if (timer.value) clearInterval(timer.value)
      timer.value = setInterval(()=>{
        time-- 
        if (time === 0) {
          clearInterval(timer.value)
          codeButtonStatus.value = false
          codeButtonText.value = '在次发送'
        } else {
          codeButtonText.value = `倒计时${time}秒`
        }
        
      },1000)
    });
    /**
     * 清除倒计时
     * */ 
    const clearCountDown = (()=>{
        codeButtonStatus.value = false
        codeButtonText.value = '获取验证码'
        clearInterval(timer.value)
    });
    return {
        menuTab,
        model,
        tabs,
        submitForm,
        ruleForm,
        reactive,
        rules,
        getSms,
        loginButStatus,
        codeButtonText,
        codeButtonStatus,
    }
  },
};
</script>

<style lang="scss" scoped>
</style>