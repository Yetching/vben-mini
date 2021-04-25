import {
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
} from 'vue';

//提供者的封装
export function createContext(context, key = Symbol(), options = {}) {
  const { readonly = true, createProvider = false, native = false } = options;
  const state = reactive(context);
  const providerData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : providerData);
  return {
    state,
  };
}

//注入的封装
export function useContext(key = Symbol(), defaultValue) {
  return inject(key, defaultValue || {});
}
