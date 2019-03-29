<template>
  <div class="login-container">
    <XMForm class=""
             :model='data'
             :rules="rules"
             ref='data'>
      <XMFormItem prop='username'>
        <van-field
            placeholder="请输入账号"
            label="账号"
            v-model="data.username"
            @click-icon="data.username = ''"
            icon="clear"
        ></van-field>
      </XMFormItem>
      <XMFormItem prop='password'>
        <van-field
            type="password"
            placeholder="请输入密码"
            label="密码"
            v-model="data.password"
            @click-icon="data.password = ''"
            icon="clear"
        ></van-field>
      </XMFormItem>
      <XMFormItem prop='city'>
        <SelectField :options="cityOptions" :change="cityChange" label="城市" v-model="data.city"></SelectField>
      </XMFormItem>
    </XMForm>
    <div>
      <van-button
          block
          type="default"
          @click="singinHandler('data')">
        立即登陆
      </van-button>
    </div>
  </div>
</template>

<script>
import {XMForm, XMFormItem,SelectField} from '../components/form';
import {signin} from '@/api/auth';
import auth from '@/utils/auth';
import { Toast } from 'vant';

export default {
  components: {
    XMForm,
    XMFormItem,
    SelectField
  },
  data() {
    return {
      isShowSexPicker: false,
      // cityOptions: [
      //   { key: '0', value: '杭州' },
      //   { key: '1', value: '宁波' },
      //   { key: '2', value: '温州' }
      // ],
      cityOptions: [ '请选择', '杭州', '宁波', '温州' ],
      data: {
        username: '',
        mobile: '',
        city: '请选择'
      },
      rules: {
        city: [{
          validator: (rule, value, callback) => {
            if (value === '' || value === '请选择') {
              callback(new Error('请输入城市'))
            } else {
              callback();
            }
          }
        }],
        username: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入账号'))
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }],
        password: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入密码');
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
    }
  },
  created() {
  },
  methods: {
    cityChange(value){
      // console.log(value)
    },
    singinHandler(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.$store.dispatch('show_loading');
          signin({
            username: this.data.username,
            password: this.data.password
          }, res => {
            if (res.uid) {
              this.errorTextFlag = false
              auth.setToken(res.token);
              let _user = {
                uid: res.uid,
                nickname: res.nickname,
                avatar: res.img || '//xmyj.oss-cn-shanghai.aliyuncs.com/Uploads/xmsj/front/img/b-icon.png'
              };
              // auth.setUser(_user);
              this.$store.dispatch('updateUserinfo', _user);
              auth.setVip({
                vip: res.is_vip
              })
              let redirect = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/account/my';
              window.location.href = '/#' + redirect;
              Toast({
                type: 'success',
                message: '登录成功',
                duration: 800
              });
            }
            this.$store.dispatch('hide_loading');
          }, err => {
            Toast({ type:'fail', message: err.message, duration: 800});
            this.$refs[ref].clearValidate();
            this.$store.dispatch('hide_loading');
          })
        }
      })
    }
  }
};
</script>

<style lang="less">
  .login-container{
    .van-cell__title .van-icon {
      font-size: 18px;
    }
  }
</style>
