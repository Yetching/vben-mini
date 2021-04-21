import { ref, computed, unref } from 'vue';

import { createPageContext } from '/@/hooks/component/usePageContext';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';

export const headerHeightRef = ref(0);

export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight);
  const pageHeight = ref(window.innerHeight);
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) || 0;
  });

  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight;
    },
    100,
    { immediate: true }
  );

  async function setPageHeight(height) {
    pageHeight.value = height;
  }

  //provide一个对象
  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  });
}
