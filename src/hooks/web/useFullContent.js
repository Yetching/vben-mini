import store from '/@/store';

import { useRouter } from 'vue-router';
import { computed, unref } from 'vue';

//全屏展示内容
export const useFullContent = () => {
  const router = useRouter();
  const { currentRoute } = router;

  //是否全屏显示内容而隐藏菜单
  const getFullContent = computed(() => {
    const route = unref(currentRoute);
    const query = route.query;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }

    return store.getters['app/getProjectConfig']?.fullContent;
  });

  return { getFullContent };
};
