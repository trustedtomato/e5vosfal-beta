<template>
  <main>
    <article v-for="_post in post" :key="_post.id">
      <div class="summary">
        <router-link :to="`/post/${_post.id}`">
          {{ _post.summary }}
        </router-link>
      </div>
    </article>
  </main>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'home',
  apollo: {
    post: gql`query {
      post {
        id,
        summary
      }
    }`,
  },
};
</script>
