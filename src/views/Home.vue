<template>
  <main>
    <div :class="$style['main-content']">
      <div :class="$style.posts" v-show="posts" ref="posts" v-scroll="fetchPosts">
        <short-post v-for="post in posts" v-bind="post" :key="post.id"></short-post>
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
import { mapState } from 'vuex';
import ShortPost from '../components/ShortPost.vue';
import Card from '../components/Card.vue';

let isFetching = false;

export default {
  name: 'home',
  components: {
    ShortPost,
    Card,
  },
  computed: {
    ...mapState({
      posts(state) {
        return state.posts;
      },
    }),
  },
  methods: {
    async fetchPosts() {
      if (isFetching) return;

      const neededPosts = Math.ceil((
        window.innerHeight
        - this.$refs.posts.getBoundingClientRect().bottom
        + 360
      ) / 120);
      const extraPosts = 4;

      if (neededPosts <= 0) {
        return;
      }

      isFetching = true;
      const fetchedPosts = await this.$store.dispatch('posts/fetchPosts', { limit: neededPosts + extraPosts });

      // this means that we got to the end of posts
      if (fetchedPosts < neededPosts) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        isFetching = false;
        this.fetchPosts();
      } else {
        isFetching = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
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
    width: 34em;
  }

  .suggestions {
    margin-left: 1em;
    display: none;
    width: 300px;
  }
</style>
