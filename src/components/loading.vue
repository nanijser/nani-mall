<template>
  <div class="loading-mask" v-if="$store.state.loading.isLoading === true">
    <van-loading color="black" />
  </div>
</template>
<script>
  import { Loading } from 'vant';

  export default {
    name: 'loading',
    components: {
      [Loading.name]: Loading
    }
  }
</script>
<style lang="less">
  .loading-mask{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    position: fixed;
    .van-loading{
      position: absolute;
      bottom: 60px;
      left: 50%;
      -webkit-transform:translateX(-50%);
    }
  }
</style>
