<template>
  <div class="index-container">
    index
    <xm-label>
      <van-button type="primary" size="small">购买大苏打撒旦</van-button>
    </xm-label>
    <select @change="onChange" v-model="value">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <select sss="ascendingsa"></select>
    <xm-button @click="onclick">btn</xm-button>
  </div>
</template>

<script>
  import xiaomatest from "xiaomatest";
  export default{
    name: 'index', // 定义这个组件的名称
    data() {
      return {
        label: "label",
        value: '1'
      };
    },
    methods: {
      onChange(){
        console.log(this.value)
      },
      onclick(){
        // console.log("onclick...");
        xiaomatest();
      }
    }
  }
</script>

<style>
  .index-container{

  }
</style>
