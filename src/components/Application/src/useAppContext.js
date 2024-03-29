import { createContext, useContext } from '/@/hooks/core/useContext.js';

const key = Symbol();

export function createAppProviderContext(context) {
  console.log(context);
  return createContext(context, key);
}

export function useAppProviderContext() {
  return useContext(key);
}
