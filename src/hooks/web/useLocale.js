import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export function useLocale(bol) {
  console.log(bol);
  if (bol) {
    return zhCN;
  } else {
    return enUS;
  }
}
