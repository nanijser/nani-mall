<template>
  <div class="gblist-container">
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="item in data">
          <span @click="onItem(item)">{{item}}</span>
        </li>
      </ul>
      <div class="loading-wrapper"></div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    data() {
      return {
        data: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      onItem(item) {
        alert('ssad'+item);
      },
      requestData() {
        return new Promise(function(resolve){
          let data =[], i= 0;
          while (i < 40) {
            data.push(i)
            i ++;
          }
          resolve({data: data});
        });
      },
      loadData() {
        this.requestData().then((res) => {
          this.data = res.data.concat(this.data)

          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {
                click: true
              })
              this.scroll.on('touchEnd', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                  console.log(".....下拉刷新", pos.y)
                }
                if (this.scroll.y <= (this.scroll.maxScrollY - 50)) {
                  console.log(".....上拉加载", this.scroll.y, this.scroll.maxScrollY, pos.y)
                }
              })
            } else {
              this.scroll.refresh()
            }
          })
        })
      }
    }
  }
</script>
<style lang="less">
  .gblist-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    .wrapper{
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      .content{
        background-color: #fff;
      }
    }
  }
</style>
