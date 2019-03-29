<template>
  <div id="app">
    <transition :name="transitionName">
       <keep-alive>
　　　　     <router-view/>
       </keep-alive>
　　</transition>
    <Footer/>
    <Loading/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Footer from './components/footer';
import Loading from './components/loading';
import storage from '@/utils/storage';

export default {
  name: 'app',
  components: {
    Footer,
    Loading
  },
  watch: {
    '$route'(to, from) {
      const lastpath = storage.get("lastpath") || "";
      this.transitionName = lastpath === to.fullPath ? 'slide-right' : 'slide-left'
    }
  },
  data () {
    return {
      transitionName: 'slide-left'
    }
  }
}
</script>
<style>
  body {
    background-color: #f8f8f8;
  }
  #app{
    height: 100%;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
      will-change: transform;
      transition: all .3s;
      position: absolute;
      width:100%;
      left:0;
  }
  .slide-right-enter {
      transform: translateX(-100%);
  }
  .slide-right-leave-active {
      transform: translateX(100%);
  }
  .slide-left-enter {
      transform: translateX(100%);
  }
  .slide-left-leave-active {
      transform: translateX(-100%);
  }
</style>
