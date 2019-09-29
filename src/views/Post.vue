<template>
  <main :class="$style.main">
    <card v-if="post" :class="$style.post">
      <rating :id="id"></rating>
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
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import Card from '../components/Card.vue';
import Rating from '../components/Rating.vue';

export default {
  name: 'post',
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    post() {
      return this.$store.getters['posts/getById'](this.id);
    },
  },
  methods: {
    ...mapActions({
      fetchPost: 'posts/fetchPost',
    }),
  },
  created() {
    this.fetchPost(this.id);
  },
  components: {
    Card,
    Rating,
  },
};
</script>

<style module>
  .main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .post {
    margin-bottom: 16px;
    display: flex;
    width: 38em;
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
