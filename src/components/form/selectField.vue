<template>
  <div class="van-cell van-hairline van-field">
    <div class="van-cell__title">
      <span>{{label}}</span>
    </div>
    <div class="van-cell__value">
      <div class="van-field__body">
        <select class="van-field__control" :value="currentValue" @change="selectChange">
          <option v-for="(option, index) in options" :vlaue="isObject(option, 'key')" >{{ isObject(option, 'value')}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import {isObj} from '@/utils/util';
import emitter from '@/mixins/emitter';

export default {
  name: "select-field",
  mixins: [emitter],
  props: {
    value: String,
    options:  {
      type: Array,
      default: () => []
    },
    label: String,
    change: Function
  },
  computed:{
    currentValue:function () {
      return this.value
    }
  },
  data() {
    return {
      selected: this.value,
    }
  },
  methods: {
    isObject: function(option, key){
      return isObj(option) ? option[key] : option;
    },
    isSelectd: function(option, key){
      var val = isObj(option) ? option[key] : option;
      if(val === this.value){
        return "selected"
      }else{
        return ""
      }
    },
    selectChange: function(event){
      var value = event.target.value;
      this.$emit('input', value);
      this.change || this.change(value);
      this.dispatch('XMFormItem', 'xm.form.blur', [value]);
    }
  }
};
</script>

<style lang="less">
  .van-cell__value{
    select{
      outline: none;
    }
  }
</style>
