<template>
  <button :class="$style.button">
    <slot></slot>
  </button>
</template>

<style module>
  .button {
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
  }
</style>
