<template>
  <button :class="$style.button">
    <slot></slot>
  </button>
</template>

<style module>
  .button {
    background: none;
    border: 0;
    padding: 0;
  }
</style>
