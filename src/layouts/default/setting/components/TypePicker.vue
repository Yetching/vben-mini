<template>
  <div :class="prefixCls">
    <template
      v-for="item in menuTypeList || []"
      :key="item.title"
    >
      <a-tooltip
        :title="item.title"
        placement="bottom"
      >
        <div
          @click="handler(item)"
          :class="[`${prefixCls}-item`,`${prefixCls}-item--${item.type}`,
          {
            [`${prefixCls}-item---active`]: def === item.type
          }]"
        >
          <div class="mix-siderbar"></div>
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { useDesign } from "/@/hooks/web/useDesign";

export default defineComponent({
  name: "MenuTypePicker",
  props: {
    menuTypeList: {
      type: Array,
      default: () => [],
    },
    handler: {
      type: Function,
      default: () => {},
    },
    def: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { prefixCls } = useDesign("setting-menu-type-picker");

    console.log(prefixCls);

    return {
      prefixCls,
    };
  },
});
</script>

<style lang="less" scoped>
//~似乎是让浏览器去计算 而不是编译css时做到的
@prefix-cls: ~"@{namespace}-setting-menu-type-picker";

.@{prefix-cls} {
  display: flex;
  width: 500px;
  height: @header-height;
  // position: fixed;
  background-color: aqua;
  &-item {
    position: relative;
    width: 56px;
    height: 48px;
    margin-left: 16px;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>