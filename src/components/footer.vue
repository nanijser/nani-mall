<template>
  <div class="footer-container">
    <van-row>
      <van-col class="footer-tab" :class="{ 'active' : $route.fullPath =='/'}" span="8"><router-link :to="{path: '/' }">首页</router-link></van-col>
      <van-col class="footer-tab" :class="{ 'active' : $route.fullPath.indexOf('/goods') > -1 }" span="8"><router-link :to="{path: '/goods/list' }">课程</router-link></van-col>
      <van-col class="footer-tab" :class="{ 'active' : $route.fullPath.indexOf('/account') > -1}" span="8"><router-link :to="{path: '/account/my' }">我的</router-link></van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="less">
  .footer-container{
    position: fixed;
    width: 100%;
    height: 45px;
    left: 0;
    bottom: 0;
    font-size: 14px;
    background-color: #fff;
    z-index: 11;
    .footer-tab{
      height: 45px;
      text-align: center;
      border-bottom: 2px solid #fff;
      a{
        width: 100%; height: 100%;line-height: 43px; display: block;
      }
      a,a:hover{
        color: #333;
      }
    }
    .active{
      border-bottom: 2px solid #f44;
      a,a:hover{
        color: #f44;
      }
    }
  }
</style>
