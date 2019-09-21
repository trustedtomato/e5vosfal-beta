import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import currentUser from './current-user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['currentUser'],
});

export default new Vuex.Store({
  modules: {
    currentUser,
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
