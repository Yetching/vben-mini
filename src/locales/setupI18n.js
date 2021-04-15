import { createI18n } from 'vue-i18n';

import { localeSetting } from '/@/settings/localeSetting';
import store from '/@/store';

const { fallback, availableLocales } = localeSetting;

export let i18n;

async function createI18nOptions() {
  const locale = store.getters['locale/getLocale'];
  console.log(locale);
  const defaultLocal = await import(`./lang/${locale}.js`);
  console.log(defaultLocal);
  const message = defaultLocal.default?.message ?? {};

  return {
    legacy: false,

    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, //同步继承全局locale
    silentTranslationWarn: true, //true是关闭警告
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupI18n(app) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  console.log(i18n);
  app.use(i18n);
}
