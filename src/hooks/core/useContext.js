import {
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
} from 'vue';

const createContext = function (context, key, options) {
  const { readonly = true, createProvider = false, native = false } = options;
  const state = reactive(context);
  const providerData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : providerData);
  console.log(state);
  return {
    state,
  };
};

const useContext = function () {};

export { createContext, useContext };
