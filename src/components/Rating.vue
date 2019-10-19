<template>
  <div :class="$style.rating">
    <invisible-button :class="{
      [$style.upvote]: true,
      [$style.triggered]: post.isUpvoted === true
    }" @click.prevent.native="upvoteClick">
      <up-arrow />
    </invisible-button>
    {{ post.score }}
    <invisible-button :class="{
      [$style.downvote]: true,
      [$style.triggered]: post.isUpvoted === false
    }" @click.prevent.native="downvoteClick">
      <up-arrow style="transform: rotateX(180deg)" />
    </invisible-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InvisibleButton from './InvisibleButton.vue';
import UpArrow from '../assets/uparrow.svg';

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
    ...mapActions({
      vote: 'posts/vote',
    }),
    upvoteClick() {
      const vote = this.post.isUpvoted === true ? undefined : true;
      this.vote({
        id: this.id,
        isUpvote: vote,
      });
    },
    downvoteClick() {
      const vote = this.post.isUpvoted === false ? undefined : false;
      this.vote({
        id: this.id,
        isUpvote: vote,
      });
    },
  },
  components: {
    InvisibleButton,
    UpArrow,
  },
};
</script>

<style module>
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

  .upvote:hover, .upvote.triggered {
    fill: red;
  }

  .downvote:hover, .downvote.triggered {
    fill: blue;
  }
</style>
