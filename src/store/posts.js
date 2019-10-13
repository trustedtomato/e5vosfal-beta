import gql from 'graphql-tag';
import * as R from 'ramda';
import apolloClient from '../apollo-client';
import router from '../router';

const normalizePost = ({
  id,
  summary,
  details,
  votes: [
    {
      is_upvote: isUpvoted,
    } = {},
  ] = [],
  vote_sum: voteSum,
}) => ({
  id,
  summary,
  details,
  isUpvoted,
  voteSum: (voteSum && voteSum.sum) || 0,
});

const state = [];

const getters = {
  getById: posts => id => posts.find(R.propEq('id', id)),
};

const actions = {
  async fetchPosts({ commit }) {
    const { data } = await apolloClient.query({
      query: gql`query {
        post {
          id,
          summary,
          details,
          votes {
            is_upvote
          },
          vote_sum {
            sum
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
          id,
          summary,
          details,
          votes {
            is_upvote
          },
          vote_sum {
            sum
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
    const { voteSum, isUpvoted } = posts.find(R.propEq('id', id));
    let newVoteSum = voteSum;

    // If the post already has the requested upvote state, return.
    if (isUpvote === isUpvoted) return;

    // Neutralize current state
    if (isUpvoted === true) {
      newVoteSum -= 1;
    } else if (isUpvoted === false) {
      newVoteSum += 1;
    }

    // Set new state
    if (isUpvote === true) {
      newVoteSum += 1;
    } else if (isUpvote === false) {
      newVoteSum -= 1;
    }

    commit('setVote', {
      id,
      voteSum: newVoteSum,
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
                  vote_sum {
                    sum
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

      const newSum = data.insert_post_vote.returning[0].post.vote_sum.sum;
      if (newSum) {
        commit('setVote', {
          id,
          voteSum: newSum,
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
                  vote_sum {
                    sum
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

      const newSum = data.delete_post_vote.returning[0].post.vote_sum;
      const newSumValue = (newSum && newSum.sum) || 0;
      commit('setVote', {
        id,
        voteSum: newSumValue,
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
  setVote(posts, { id, voteSum, isUpvoted }) {
    const postIndex = posts.findIndex(R.propEq('id', id));
    const newPost = {
      ...posts[postIndex],
      voteSum,
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
