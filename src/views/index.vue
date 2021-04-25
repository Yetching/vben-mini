<template>
  <div id="test">hello worlld</div>
  <a-button @click="changeState">改变state，查看非计算属性的变化</a-button>
  <a-button @click="commit">methods注册方法改变state</a-button>
  <h1>{{loadingState}}</h1>
  <h1>{{computedState}}</h1>
  <h1>{{getState}}</h1>
  <a-pagination
    :default-current="1"
    :total="50"
    show-size-changer
  />
</template>

<script>
import { computed, defineComponent } from "vue";
import { Pagination, Button } from "ant-design-vue";
import { useStore, mapMutations } from "vuex";

export default defineComponent({
  setup() {
    function curry(array) {
      return array.reduce((newArray, children) => {
        return newArray.concat(children);
      }, []);
    }
    const store = useStore();
    const loadingState = store.state.app.pageLoadingState; //要跟随变化必须使用computed计算属性
    function changeState() {
      store.commit("app/commitPageLoadingState", true);
    }
    const computedState = computed(() => store.state.app.pageLoadingState);
    const getState = store.getters["app/getPageLoading"]; //单纯的getter也是没有响应的
    return {
      loadingState,
      computedState,
      changeState,
      getState,
    };
  },
  methods: {
    ...mapMutations({
      commitPage: "app/commitPageLoadingState",
    }),
    commit() {
      this.commitPage(false);
    },
  },
  components: {
    [Pagination.name]: Pagination,
    [Button.name]: Button,
  },
});
</script>

<style lang="less" scoped>
</style>