<template>
  <div
    v-if="getShowSearch"
    class="p-1"
    @click="changeModal"
  >
    <Tooltip :title="t('common.searchText')">
      <SearchOutlined />
    </Tooltip>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { Tooltip } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";

import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useI18n } from "/@/hooks/web/useI18n";

export default defineComponent({
  name: "AppSearch",
  components: { Tooltip, SearchOutlined },
  setup() {
    const showModal = ref(false);

    const { getShowSearch } = useHeaderSetting();
    const { t } = useI18n();

    function changeModal(show) {
      console.log("点击搜素");
      showModal.value = show;
    }

    return {
      t,
      showModal,
      getShowSearch,
      changeModal,
    };
  },
});
</script>

<style lang="less" scoped>
</style>