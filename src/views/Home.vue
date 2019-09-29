<template>
  <main>
    <div :class="$style['main-content']">
      <div :class="$style.posts" v-show="posts">
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
import { mapState, mapActions } from 'vuex';
import ShortPost from '../components/ShortPost.vue';
import Card from '../components/Card.vue';

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
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
    }),
  },
  created() {
    this.$store.dispatch('posts/fetchPosts');
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
