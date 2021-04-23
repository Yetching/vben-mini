<template>
  <div>锁屏界面</div>
  <a-button
    :loading="loading"
    type="primary"
    @click="unLock"
  >解锁</a-button>
</template>

<script>
import { defineComponent, ref } from "vue";
import store from "/@/store";

export default defineComponent({
  name: "LockPage",
  setup() {
    const loading = ref(false);
    async function unLock() {
      try {
        loading.value = true;
        store.commit("lock/resetLockInfo");
      } finally {
        loading.value = false;
      }
    }
    return {
      unLock,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
</style>