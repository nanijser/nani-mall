<template>
  <div class="xm-form-item" ref="formitems" :class="[{
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required
    }]">
    <div>
      <slot></slot>
      <transition name="van-fade">
        <div
          v-if="validateState === 'error' && showMessage && form.showMessage"
          class="xm-form-item__error"
          :style="msgStyle"
          :class="{
            'el-form-item__error--inline': typeof inlineMessage === 'boolean'
              ? inlineMessage
              : (xmForm && xmForm.inlineMessage || false)
          }"
        >
          {{validateMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import emitter from '@/mixins/emitter';
  import { noop, getPropByPath } from '@/utils/util';

  export default {
    name: 'XMFormItem',
    componentName: 'XMFormItem',
    mixins: [emitter],
    provide() {
      return {
        xmFormItem: this
      };
    },

    inject: ['xmForm'],

    props: {
      label: String,
      labelWidth: String,
      msgleft: String,
      prop: String,
      required: {
        type: Boolean,
        default: undefined
      },
      rules: [Object, Array],
      error: String,
      validateStatus: String,
      for: String,
      inlineMessage: {
        type: [String, Boolean],
        default: ''
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      size: String
    },
    watch: {
      error: {
        immediate: true,
        handler(value) {
          this.validateMessage = value;
          this.validateState = value ? 'error' : '';
        }
      },
      validateStatus(value) {
        this.validateState = value;
      }
    },
    computed: {
      msgStyle() {
        return {
          'paddingLeft': this.msgleft ? this.msgleft+"px" : '105px'
        };
      },
      labelFor() {
        return this.for || this.prop;
      },
      form() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'XMForm') {
          if (parentName === 'XMFormItem') {
            this.isNested = true;
          }
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      fieldValue: {
        cache: false,
        get() {
          const model = this.form.model;
          if (!model || !this.prop) { return; }

          let path = this.prop;
          if (path.indexOf(':') !== -1) {
            path = path.replace(/:/, '.');
          }

          return getPropByPath(model, path, true).v;
        }
      },
      isRequired() {
        let rules = this.getRules();
        let isRequired = false;

        if (rules && rules.length) {
          rules.every(rule => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
        return isRequired;
      },
      _formSize() {
        return this.xmForm.size;
      },
      xmFormItemSize() {
        return this.size || this._formSize;
      },
      sizeClass() {
        return this.xmFormItemSize || (this.$ELEMENT || {}).size;
      }
    },
    data() {
      return {
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {},
        isNested: false
      };
    },
    methods: {
      validate(trigger, callback = noop) {
        this.validateDisabled = false;
        const rules = this.getFilteredRule(trigger);
        if ((!rules || rules.length === 0) && this.required === undefined) {
          callback();
          return true;
        }

        this.validateState = 'validating';

        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this.fieldValue;

        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage, invalidFields);
          this.xmForm && this.xmForm.$emit('validate', this.prop, !errors);
        });
      },
      clearValidate() {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false;
      },
      resetField() {
        this.validateState = '';
        this.validateMessage = '';

        let model = this.form.model;
        let value = this.fieldValue;
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        let prop = getPropByPath(model, path, true);

        this.validateDisabled = true;
        if (Array.isArray(value)) {
          prop.o[prop.k] = [].concat(this.initialValue);
        } else {
          prop.o[prop.k] = this.initialValue;
        }

        // this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue);
      },
      getRules() {
        let formRules = this.form.rules;
        const selfRules = this.rules;
        const requiredRule = this.required !== undefined ? { required: !!this.required } : [];

        const prop = getPropByPath(formRules, this.prop || '');
        formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];

        return [].concat(selfRules || formRules || []).concat(requiredRule);
      },
      getFilteredRule(trigger) {
        const rules = this.getRules();

        return rules.filter(rule => {
          if (!rule.trigger || trigger === '') return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        }).map(rule => Object.assign({}, rule));
      },
      onFieldBlur() {
        this.validate('blur');
      },
      onFieldChange() {
        if (this.validateDisabled) {
          this.validateDisabled = false;
          return;
        }

        this.validate('change');
      }
    },
    mounted() {
      let itemInput = this.$refs.formitems.getElementsByTagName("input")[0], that = this;
      if(itemInput){
        itemInput.onblur = function(e){
          that.onFieldBlur();
        }
      }

      if (this.prop) {
        this.dispatch('XMForm', 'xm.form.addField', [this]);

        let initialValue = this.fieldValue;
        if (Array.isArray(initialValue)) {
          initialValue = [].concat(initialValue);
        }
        Object.defineProperty(this, 'initialValue', {
          value: initialValue
        });

        let rules = this.getRules();
        if (rules.length || this.required !== undefined) {
          this.$on('xm.form.blur', this.onFieldBlur);
          this.$on('xm.form.change', this.onFieldChange);
        }
      }
    },
    beforeDestroy() {
      this.dispatch('XMForm', 'xm.form.removeField', [this]);
    }
  };
</script>
<style>
  .xm-form-item{
    position: relative;
  }
  .xm-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding: 4px 0;
    text-align: left;
  }
  .is-error{
    .van-field__control{
      color: #f56c6c;
    }
  }
</style>
