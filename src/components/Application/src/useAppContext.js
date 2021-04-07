import { createContext, useContext } from '/@/hooks/core/useContext.js';

const key = Symbol();

const createAppProviderContext = function (context) {
  return createContext(context, key);
};

// const useAppProviderContext = function () {
//   return useContext(key);
// };

export { createAppProviderContext };
