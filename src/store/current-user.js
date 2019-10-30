import jwt from 'jsonwebtoken';
import gql from 'graphql-tag';
import apolloClient from '../apollo-client';

const state = {
  jwt: null,
  hasuraJwt: null,
  data: {
    score: null,
  },
};

const getters = {
  jwtData(_state) {
    if (_state.jwt) {
      return jwt.decode(_state.jwt);
    }
    return undefined;
  },
};

let scoreSubscription = null;

const actions = {
  subscribeToScore({ commit, getters: { jwtData } }) {
    if (scoreSubscription) return scoreSubscription;
    if (!jwtData) return null;
    scoreSubscription = apolloClient.subscribe({
      query: gql`
        subscription MySubscription($email: String!) {
          user(where: {email: {_eq: $email}}) {
            score {
              value
            }
          }
        }
      `,
      variables: {
        email: jwtData.email,
      },
    }).subscribe(({ data: { user: [{ score: { value: score } }] } }) => {
      commit('setScore', score);
    });
    return {
      async unsubscribe() {
        const subscription = scoreSubscription;
        scoreSubscription = null;
        await subscription.unsubscribe();
      },
    };
  },
  login({ commit }, { jwt: token, hasuraJwt }) {
    if (token) {
      commit('setJwt', token);
    }
    if (hasuraJwt) {
      commit('setHasuraJwt', hasuraJwt);
    }
    window.location.reload();
  },
  logout({ commit }) {
    commit('logout');
  },
};

const mutations = {
  setScore(_state, score) {
    // eslint-disable-next-line no-param-reassign
    _state.data.score = score;
  },
  setJwt(_state, token) {
    // eslint-disable-next-line no-param-reassign
    _state.jwt = token;
  },
  setHasuraJwt(_state, hasuraJwt) {
    // eslint-disable-next-line no-param-reassign
    _state.hasuraJwt = hasuraJwt;
  },
  logout(_state) {
    console.log('logout');
    // eslint-disable-next-line no-param-reassign
    _state.jwt = null;
    // eslint-disable-next-line no-param-reassign
    _state.hasuraJwt = null;
    // eslint-disable-next-line no-param-reassign
    _state.data.score = null;
    window.location.reload();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
