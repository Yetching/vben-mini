<template>
  <Layout>
    <LayoutSideBar v-if="false" />
    <Layout>
      <LayoutMultipleHeader />
      <LayoutContent />
    </Layout>
  </Layout>
</template>

<script>
import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";

import LayoutMultipleHeader from "./header/MultipleHeader.vue";
import LayoutSideBar from "./sider/index.vue";
import LayoutContent from "./content/index.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    LayoutMultipleHeader,
    LayoutContent,
    LayoutSideBar,
    Layout,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
</style>