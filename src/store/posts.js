import gql from 'graphql-tag';
import * as R from 'ramda';
import apolloClient from '../apollo-client';
import router from '../router';

const normalizePost = ({
  id,
  summary,
  details,
  creator: {
    given_name: givenName,
    middle_name: middleName,
    family_name: familyName,
  },
  lifetime_seconds: {
    value: lifetimeSeconds,
  },
  votes: [
    {
      is_upvote: isUpvoted,
    } = {},
  ] = [],
  score: {
    value: score,
  },
}) => ({
  id,
  summary,
  details,
  isUpvoted,
  score,
  creator: {
    givenName,
    middleName,
    familyName,
  },
  lifetimeSeconds: Math.floor(lifetimeSeconds),
});

const state = [];

const getters = {
  getById: posts => id => posts.find(R.propEq('id', id)),
};

const actions = {
  async fetchPosts({ commit }) {
    const { data } = await apolloClient.query({
      query: gql`query {
        post(order_by: {hot_score: {value: desc}}) {
          id
          summary
          details
          votes {
            is_upvote
          }
          score {
            value
          }
          creator {
            given_name
            family_name
            middle_name
          }
          lifetime_seconds {
            value
          }
        }
      }`,
    });
    data.post.forEach((post) => {
      commit('addPost', post);
    });
  },
  async fetchPost({ commit }, id) {
    const { data } = await apolloClient.query({
      query: gql`query GetPost($id: Int!) {
        post(where: {id: {_eq: $id}}) {
          id
          summary
          details
          votes {
            is_upvote
          },
          score {
            value
          }
          creator {
            given_name
            family_name
            middle_name
          }
          lifetime_seconds {
            value
          }
        }
      }`,
      variables: {
        id,
      },
    });
    commit('addPost', data.post[0]);
  },
  async vote({ commit, state: posts }, { id, isUpvote }) {
    const { score, isUpvoted } = posts.find(R.propEq('id', id));
    let newScore = score;

    // If the post already has the requested upvote state, return.
    if (isUpvote === isUpvoted) return;

    // Neutralize current state
    if (isUpvoted === true) {
      newScore -= 1;
    } else if (isUpvoted === false) {
      newScore += 1;
    }

    // Set new state
    if (isUpvote === true) {
      newScore += 1;
    } else if (isUpvote === false) {
      newScore -= 1;
    }

    commit('setVote', {
      id,
      score: newScore,
      isUpvoted: isUpvote,
    });

    if (typeof isUpvote === 'boolean') {
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation Vote($id: Int!, $isUpvote: Boolean!) {
            insert_post_vote(
              objects: {
                is_upvote: $isUpvote,
                post_id: $id
              },
              on_conflict: {
                constraint: post_vote_voter_id_post_id_key,
                update_columns: is_upvote
              }
            ) {
              returning {
                post {
                  score {
                    value
                  }
                }
              }
            }
          }
        `,
        variables: {
          id,
          isUpvote,
        },
      });

      const resultScore = data.insert_post_vote.returning[0].post.score.value;
      if (typeof resultScore === 'number') {
        commit('setVote', {
          id,
          score: resultScore,
          isUpvoted: isUpvote,
        });
      }
    } else {
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation DeleteVote($id: Int!) {
            delete_post_vote(
              where: {
                post_id: {
                  _eq: $id
                }
              }
            ) {
              returning {
                post {
                  score {
                    value
                  }
                }
              }
            }
          }
        `,
        variables: {
          id,
        },
      });

      const resultScore = data.delete_post_vote.returning[0].post.score.value;
      commit('setVote', {
        id,
        score: resultScore,
        isUpvoted: isUpvote,
      });
    }
  },
  async submitPost(_, { summary, details }) {
    const { data } = await apolloClient.mutate({
      mutation: gql`
          mutation SubmitPost($summary: String!, $details: String) {
            insert_post(objects: {summary: $summary, details: $details}) {
              returning {
                id
              }
            }
          }
      `,
      variables: {
        summary,
        details,
      },
    });
    const { id } = data.insert_post.returning[0];
    console.log(id);
    router.push(`/post/${id}`);
  },
};

const mutations = {
  addPost(posts, post) {
    const existingPostIndex = posts.findIndex(R.eqProps('id', post));

    if (existingPostIndex === -1) {
      posts.push(normalizePost(post));
      return;
    }

    const newPost = R.mergeDeepRight(
      posts[existingPostIndex],
      normalizePost(post),
    );
    posts.splice(existingPostIndex, 1, newPost);
  },
  setVote(posts, { id, score, isUpvoted }) {
    const postIndex = posts.findIndex(R.propEq('id', id));
    const newPost = {
      ...posts[postIndex],
      score,
      isUpvoted,
    };

    posts.splice(postIndex, 1, newPost);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
