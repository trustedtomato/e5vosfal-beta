<template>
  <div id="app">
    <the-header></the-header>
    <router-view/>
  </div>
</template>

<style>
:root {
  --main-hue: 180;
  --accent-hue: 0;
  --body-font: "Source Sans Pro";
  --display-font: "Oswald";
  --color-dark: hsl(var(--main-hue), 100%, 15%);
  --color-light: hsl(var(--main-hue), 100%, 95%);
  --color-accent-light: hsl(var(--accent-hue), 100%, 15%);
}

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--body-font);
}

main {
  margin: 16px;
}

a {
  color: inherit;
}
</style>

<script>
import { mapGetters } from 'vuex';
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'app',
  computed: {
    ...mapGetters('currentUser', {
      user: 'data',
    }),
  },
  components: {
    TheHeader,
  },
};
</script>
