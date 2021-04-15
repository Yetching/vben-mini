import { watch, unref } from 'vue';
import { useI18n } from './useI18n';
import { useTitle as usePageTitle } from '@vueuse/core'; //vueuse是一个vue实用工具集合库
import { useGlobSetting } from '/@/hooks/setting';
import { useRouter } from 'vue-router';

import { REDIRECT_NAME } from '/@/router/constant';

export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  console.log(currentRoute);
  const pageTitle = usePageTitle();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);
      if (route.name === REDIRECT_NAME) {
        return;
      }
      // 未使用t：routes.dashboard.workbench
      //使用t对应语言：en workbench   zh 工作台
      const tTitle = t(route?.meta?.title);
      console.log(tTitle);
      pageTitle.value = tTitle ? `${tTitle} - ${title}` : `${title}`;
    },
    { immediate: true }
  );
}
