import jwt from 'jsonwebtoken';

const state = {
  jwt: null,
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
  setJwt({ commit }, token) {
    commit('setJwt', token);
  },
};

const mutations = {
  setJwt(_state, token) {
    // eslint-disable-next-line no-param-reassign
    _state.jwt = token;
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
