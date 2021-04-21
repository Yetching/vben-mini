import { computed } from 'vue';

import store from '/@/store';

export function useTransitionSetting() {
  const getEnableTransition = computed(
    () => store.getters['app/getProjectConfig'].transitionSetting?.enable
  );

  const getOpenNProgress = computed(
    () => store.getters['app/getProjectConfig'].transitionSetting?.openNProgress
  );

  const getOpenPageLoading = computed(() => {
    return !!store.getters['app/getProjectConfig'].transitionSetting
      ?.openPageLoading;
  });

  const getBasicTransition = computed(
    () =>
      store.getters['app/getProjectConfig'].transitionSetting?.basicTransition
  );

  function setTransitionSetting(transitionSetting) {
    store.commit('app/commitProjectConfigState', { transitionSetting });
  }

  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
