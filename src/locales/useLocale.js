import moment from 'moment';

import { i18n } from './setupI18n';
import store from '/@/store';
import { unref, computed } from 'vue';
// import { mapGetters } from 'vuex';

const loadLocalePool = [];

// const mapGet = {
//   ...mapGetters('locale', {
//     show: 'getShowPicker',
//     loca: 'getLocale',
//   }),
// };

// console.log(mapGet);   //mapGetters、Mutations等都是vue的语法糖，只能用于.vue文件

function setI18nLanguage(locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  store.commit('locale/setLocaleInfo', { locale });
  document.querySelector('html')?.setAttribute('lang', locale);
}

export function useLocale() {
  const getLocale = computed(() => store.getters['locale/getLocale']);
  const getShowLocalePicker = computed(
    () => store.getters['locale/getShowPicker']
  );

  const getAntdLocale = computed(() => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale;
  });

  // console.log(getLocale, getShowLocalePicker, getAntdLocale);

  async function changeLocale(locale) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) return locale;

    if (loadLocalePool.includes(locale)) {
      //似乎根本不会触发
      setI18nLanguage(locale);
      return locale;
    }

    const langModule = (await import(`./lang/${locale}.js`)).default;

    if (!langModule) return;

    const { message, momentLocale, momentLocaleName } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    moment.updateLocale(momentLocaleName, momentLocale);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  };
}
