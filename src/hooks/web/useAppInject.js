import { useAppProviderContext } from '/@/components/Application/src/useAppContext';
import { computed, unref } from 'vue';

export function useAppInject() {
  const values = useAppProviderContext();
  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}
