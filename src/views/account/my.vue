<template>
  <div class="my-container">
    <div class="avatar"><img :src="userinfo.avatar"/></div>
    <div class="nickname">{{userinfo.nickname}}</div>
    <van-cell-group class="item-list">
      <van-cell is-link icon="points" title="我的积分" />
      <van-cell is-link icon="pending-payment" title="我的优惠券" />
    </van-cell-group>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'my',
  data(){
    return {
      name: "555"
    }
  },
  components: {},
  computed: {
    userinfo () {
      let userinfo = this.$store.state.user.userinfo;
      return userinfo ? userinfo : {};
    }
  }

};
</script>

<style lang="less">
  .my-container{
    .avatar{
      width: 2rem;
      height: 2rem;
      margin: 50px auto 10px;
      img{
        width: 100%;
      }
    }
    .nickname{
      text-align: center;
      margin-bottom: 20px;
      transition :transform 1s;
    }
  }
</style>
