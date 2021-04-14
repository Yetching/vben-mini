import { createStore, createLogger } from 'vuex';
import app from './modules/app.js';
import locale from './modules/locale';

const debug = process.env.NODE_ENV != 'production';

const store = createStore({
  modules: {
    app,
    locale,
  },

  strict: debug,
  plugins: debug ? [createLogger()] : [],
  // state() {
  //   return {
  //     count: 0,
  //   };
  // },
  // mutations: {
  //   increment(state) {
  //     state.count++;
  //   },
  // },
});

// console.log('store:', store.state.count);

// store.commit('increment');

// console.log('store after increment:', store.state.count);

export default store;
