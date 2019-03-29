<template>
  <div class="gblist-container">
    <scroller class="gbscroller" :on-infinite="infinite">
      <div class="gblist">
        <!-- <div style="height: 45px;"></div> -->
        <router-link v-for="item in list" :key="item" :to="{path: '/goods/detail/' + item }">
          <van-cell>
            {{item}},sss
          </van-cell>
        </router-link>
      </div>
      <!-- <div style="height: 45px;"></div> -->
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'gblist',
  components: {

  },
  data() {
    return {
      list: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
    };
  },
  mounted(){

  },
  updated(){

  },
  methods: {
    infinite(done) {

      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + 1);
      }
      const total = this.list.length;

      setTimeout(function(){
        if(total < 50 ){
          done();
        }else{
          done(true);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
  .gblist-container{
    height: 100%;
    overflow: hidden;
  }
  .gbscroller>div:after{
     content: "";
     width: 100%;
     height: 48px;
     display: block;
  }
</style>
