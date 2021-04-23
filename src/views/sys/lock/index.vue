<template>
  LockPage
  <LockPage v-if="getIsLock" />
</template>

<script>
import { computed, defineComponent } from "vue";
import store from "/@/store";
import LockPage from "./LockPage.vue";

export default defineComponent({
  name: "Lock",
  components: { LockPage },
  setup() {
    const getIsLock = computed(
      () => store.getters["lock/getLockInfo"]?.isLock ?? false
    );

    return {
      getIsLock,
    };
  },
});
</script>

<style lang="less" scoped>
</style>