<template>
  <main>
    <div :class="$style['main-content']">
      <div :class="$style.posts" v-show="posts">
        <router-link
          class="styleless-a"
          :to="`/post/${post.id}`"
          v-for="post in posts"
          :key="post.id"
        >
          <card :class="$style.post" clickable>
            <rating :score="post.voteSum" :upvoted="post.isUpvoted"></rating>
            <div :class="$style.content">
              <div :class="$style.creator">
                Posztolta Halasi Tamás 6 perce
              </div>
              <h1 :class="$style.summary">
                {{ post.summary }}
              </h1>
              <div :class="$style.details">
                {{ post.details }}
              </div>
            </div>
          </card>
        </router-link>
      </div>
      <div :class="$style.suggestions">
        <card :class="$style.about">
          E5vösfal
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/terms-of-usage">Terms of usage</router-link></li>
            <li><router-link to="/privacy-policy">Privacy policy</router-link></li>
          </ul>
        </card>
      </div>
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag';
import Card from '../components/Card.vue';
import Rating from '../components/Rating.vue';

export default {
  name: 'home',
  components: {
    Card,
    Rating,
  },
  data() {
    return {
      posts: null,
    };
  },
  apollo: {
    posts: {
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
      update: ({ post }) => post.map(({
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
      })),
    },
  },
};
</script>

<style module>
  main {
    background-color: hsl(var(--main-hue), 10%, 80%);
  }

  .main-content {
    display: flex;
    justify-content: center;
  }

  .posts {
    max-width: 34em;
  }

  .post {
    margin-bottom: 16px;
    display: flex;
  }

  .suggestions {
    margin-left: 1em;
    display: none;
    width: 300px;
  }

  .post > *:not(:last-child) {
    margin-right: 16px;
  }

  h1 {
    margin: 0;
    font-size: 1.375em;
    font-weight: 600;
    line-height: 1.13636364;
    margin-bottom: 0.5em;
  }

  .creator {
    margin-bottom: 8px;
    font-size: 0.75em;
    color: hsl(var(--main-hue), 10%, 40%);
  }
</style>
