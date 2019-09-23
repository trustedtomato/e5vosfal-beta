<template>
  <div class="card" :class="{ clickable: typeof clickable === 'string' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    clickable: String,
  },
};
</script>

<style>
  .card {
    background-color: var(--color-light);
    padding: 16px;
    border: 1px solid hsl(var(--main-hue), 10%, 70%);
    border-radius: 3px;
  }
  .clickable:hover {
    border: 1px solid hsl(var(--main-hue), 10%, 20%);
  }
</style>
