<template>
  <main :class="$style.main">
    <form :class="$style['submit-post']" @submit.prevent="submit">
      <h1>Create a post</h1>
      <card :class="$style['card']">
        <input :class="$style.summary" type="text" placeholder="Title" v-model="summary">
        <textarea placeholder="Details" :class="$style.details" v-model="details"></textarea>
        <div :class="$style.actions">
          <button type="submit">Submit</button>
        </div>
      </card>
    </form>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import Card from '../components/Card.vue';

export default {
  name: 'post',
  data() {
    return {
      summary: '',
      details: '',
    };
  },
  components: {
    Card,
  },
  methods: {
    ...mapActions({
      submitPost: 'posts/submitPost',
    }),
    submit() {
      this.submitPost({
        summary: this.summary,
        details: this.details,
      });
    },
  },
};
</script>

<style module>
  .main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .submit-post {
    width: 34em;
  }

  .actions {
    display: flex;
    justify-content: end;
  }

  .actions button {
    border: 0;
    border-radius: 3px;
    padding: 0.5em;
    font: inherit;
    color: var(--color-light);
    background-color: hsl(var(--accent-hue), 30%, 40%);
  }

  .card {
    display: flex;
    flex-direction: column;
  }

  .card > *:not(:last-child) {
    margin-bottom: 1em;
  }

  .summary, .details {
    border: 1px solid hsl(var(--main-hue), 10%, 80%);
    border-radius: 3px;
    background: var(--color-light);
    padding: 0.5em;
    font: inherit;
  }

  .summary:focus, .details:focus {
    border: 1px solid hsl(var(--main-hue), 10%, 40%);
  }

  .details {
    resize: vertical;
    height: 10em;
  }

  h1 {
    margin: 0;
    font-size: 1.375em;
    font-weight: 600;
    line-height: 1.13636364;
    margin-bottom: 0.5em;
  }
</style>
