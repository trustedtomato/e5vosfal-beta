<template>
  <div class="dropdown" @click="toggleOpened">
    <div class="dropdown__header">
      <slot></slot>
    </div>
    <div class="dropdown__drop" v-show="opened">
      <slot name="drop"></slot>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown__header {
  cursor: pointer;
  width: 100%;
  user-select: none;
}

.dropdown__drop {
  position: absolute;
  width: 100%;
}
</style>

<script>
export default {
  name: 'BaseDropdown',
  data: () => ({
    opened: false,
  }),
  methods: {
    toggleOpened(e) {
      e.preventDefault();
      this.opened = !this.opened;
      if (this.opened) {
        const onclick = () => {
          this.opened = false;
          document.removeEventListener('click', onclick);
        };
        setTimeout(() => {
          document.addEventListener('click', onclick);
        });
      }
    },
  },
};
</script>
