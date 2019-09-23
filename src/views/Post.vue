<template>
  <main>
    <div v-if="!$apollo.loading">
      <h1>{{post[0].summary}}</h1>
      <div>
        {{post[0].details}}
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'post',
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
  },
  apollo: {
    post: {
      query: gql`query GetPost($id: Int!) {
        post(where: {id: {_eq: $id}}) {
          summary,
          details
        }
      }`,
      variables() {
        return {
          id: this.id,
        };
      },
    },
  },
};
</script>

<style>

</style>
