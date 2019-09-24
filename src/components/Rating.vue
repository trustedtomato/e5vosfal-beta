<template>
  <div :class="$style.rating">
    <invisible-button :class="{
      [$style.upvote]: true,
      [$style.triggered]: upvoted === true
    }" @click.prevent.native>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <rect x="6" y="8" width="4" height="8" />
        <polygon points="0 10, 16 10, 8 0" />
      </svg>
    </invisible-button>
    {{ score }}
    <invisible-button :class="{
      [$style.downvote]: true,
      [$style.triggered]: upvoted === false
    }" @click.prevent.native>
      <svg style="transform: rotateX(180deg)" viewBox="0 0 16 16" width="16" height="16">
        <rect x="6" y="8" width="4" height="8" />
        <polygon points="0 10, 16 10, 8 0" />
      </svg>
    </invisible-button>
  </div>
</template>

<script>
import InvisibleButton from './InvisibleButton.vue';

export default {
  props: {
    score: {
      required: true,
      type: Number,
    },
    upvoted: Boolean,
  },
  components: {
    InvisibleButton,
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
