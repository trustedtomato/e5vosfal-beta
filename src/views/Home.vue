<template>
  <main>
    <div :class="$style['main-content']">
      <div :class="$style.posts" v-show="post">
        <router-link
          class="styleless-a"
          :to="`/post/${_post.id}`"
          v-for="_post in post"
          :key="_post.id"
        >
          <card :class="$style.post" clickable>
            <div :class="$style.rating">
              <invisible-button :class="$style.upvote" @click.prevent.native>
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <rect x="6" y="8" width="4" height="8" />
                  <polygon points="0 10, 16 10, 8 0" />
                </svg>
              </invisible-button>
              66.5k
              <invisible-button :class="$style.downvote" @click.prevent.native>
                <svg style="transform: rotateX(180deg)" viewBox="0 0 16 16" width="16" height="16">
                  <rect x="6" y="8" width="4" height="8" />
                  <polygon points="0 10, 16 10, 8 0" />
                </svg>
              </invisible-button>
            </div>
            <div :class="$style.content">
              <h1 :class="$style.summary">
                {{ _post.summary }}
              </h1>
              <div :class="$style.details">
                {{ _post.details }}
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
import InvisibleButton from '../components/InvisibleButton.vue';

export default {
  name: 'home',
  components: {
    Card,
    InvisibleButton,
  },
  apollo: {
    post: gql`query {
      post {
        id,
        summary,
        details
      }
    }`,
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
    margin-right: 16px;
  }

  .post {
    margin-bottom: 16px;
    display: flex;
  }

  .suggestions {
    display: none;
    width: 300px;
  }

  .post > *:not(:last-child) {
    margin-right: 16px;
  }

  .rating {
    display: flex;
    align-items: stretch;
    text-align:center;
    flex-direction: column;
    min-width: 40px;
  }

  .upvote,
  .downvote {
    padding: 4px;
  }

  .upvote:hover,
  .downvote:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .upvote:hover {
    fill: red;
  }

  .downvote:hover {
    fill: blue;
  }

  h1 {
    margin: 0;
    font-family: var(--display-font);
    font-weight: 400;
  }

  h1 a {
    text-decoration: none;
  }
</style>
