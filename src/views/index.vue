<template>
  <div id="test">hello worlld</div>
  <a-pagination
    :default-current="1"
    :total="50"
    show-size-changer
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Pagination } from "ant-design-vue";

export default defineComponent({
  setup() {},
  components: {
    [Pagination.name]: Pagination,
  },
});
</script>

<style lang="less" scoped>
</style>