<template>
  <router-link
    class="styleless-a"
    :to="`/post/${id}`"
    :key="id"
  >
    <card :class="$style.post" clickable>
      <rating :id="id"></rating>
      <div :class="$style.content">
        <div :class="$style.creator">
          Posztolta
          {{ post.creator.familyName }} {{ post.creator.givenName }} {{ post.creator.middleName }}
          {{ formatRelativeTime(post.lifetimeSeconds) }}
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
</template>

<script>
import Card from './Card.vue';
import Rating from './Rating.vue';
import formatRelativeTime from '../utils/format-relative-time';

export default {
  props: {
    id: Number,
  },
  computed: {
    post() {
      return this.$store.getters['posts/getById'](this.id);
    },
  },
  methods: {
    formatRelativeTime,
  },
  components: {
    Card,
    Rating,
  },
};
</script>

<style module>
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
