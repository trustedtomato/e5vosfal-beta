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
  --color-light: hsl(var(--main-hue), 100%, 98%);
  --color-accent-light: hsl(var(--accent-hue), 100%, 15%);
}

body, h1, h2, h3, h4, h5, h6 {
  font-size-adjust: 0.5;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--body-font);
  line-height: 1.25;
}


@media (min-width: 43.75em) {
  body {
    line-height: 1.375;
  }
}

html, body, #app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 16px;
  box-sizing: border-box;
}

a {
  color: inherit;
}

button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.styleless-a {
  text-decoration: none;
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
