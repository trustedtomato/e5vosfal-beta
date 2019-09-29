import jwt from 'jsonwebtoken';

const state = {
  jwt: null,
  hasuraJwt: null,
};

const getters = {
  data(_state) {
    if (_state.jwt) {
      return jwt.decode(_state.jwt);
    }
    return undefined;
  },
};

const actions = {
  login({ commit }, { jwt: token, hasuraJwt }) {
    if (token) {
      commit('setJwt', token);
    }
    if (hasuraJwt) {
      commit('setHasuraJwt', hasuraJwt);
    }
  },
  logout({ commit }) {
    commit('logout');
  },
};

const mutations = {
  setJwt(_state, token) {
    // eslint-disable-next-line no-param-reassign
    _state.jwt = token;
  },
  setHasuraJwt(_state, hasuraJwt) {
    // eslint-disable-next-line no-param-reassign
    _state.hasuraJwt = hasuraJwt;
  },
  logout(_state) {
    // eslint-disable-next-line no-param-reassign
    delete _state.jwt;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
