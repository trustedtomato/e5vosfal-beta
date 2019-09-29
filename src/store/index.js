import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import currentUser from './current-user';
import posts from './posts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['currentUser'],
});

export default new Vuex.Store({
  modules: {
    currentUser,
    posts,
  },
  plugins: [vuexLocal.plugin],
  strict: debug,
});
