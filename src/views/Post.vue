<template>
  <main>
    <div v-if="post">
      <h1>{{post.summary}}</h1>
      <div>
        {{post.details}}
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

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
};
</script>

<style>

</style>
