<template>
  <a-drawer
    @close="onClose"
    v-bind="getBindValues"
  >
    <template #title>
      自定义默认title
    </template>
    <div class="container">
      basicDrawer主体内容
      <slot></slot>
    </div>

  </a-drawer>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  toRaw,
  unref,
} from "vue";
import { basicProps } from "./props";
import { useI18n } from "/@/hooks/web/useI18n";
import { deepMerge } from "/@/utils";

// import { ScrollContainer } from "/@/components/Container";
export default defineComponent({
  inheritAttrs: false,
  props: basicProps,
  emits: ["visible-change", "ok", "close", "register"],
  setup(props, { emit }) {
    const visibleRef = ref(false);
    const propsRef = ref(null);

    const instance = getCurrentInstance();

    const { t } = useI18n();

    instance && emit("register", setDrawerProps);

    const getMergeProps = computed(() => {
      return deepMerge(toRaw(props), unref(propsRef));
    });

    const getPorps = computed(() => {
      const opt = {
        ...unref(getMergeProps),
        visible: unref(visibleRef),
      };
      return opt;
    });
    const getBindValues = computed(() => {
      return {
        ...unref(getPorps),
      };
    });

    async function onClose(e) {
      const { closeFunc } = unref(getPorps);
      emit("close", e);
      console.log(closeFunc);
      if (closeFunc) {
        const res = await closeFunc();
        visibleRef.value = !res;
        return;
      }
      visibleRef.value = false;
    }

    function setDrawerProps(props) {
      propsRef.value = deepMerge(unref(propsRef) || {}, props);

      if (Reflect.has(props, "visible")) {
        visibleRef.value = !!props.visible;
      }
    }

    return {
      onClose,
      t,
      getMergeProps,
      getPorps,
      getBindValues,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
}
</style>