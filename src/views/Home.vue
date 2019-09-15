<template>
  <main>
    <article>
      <div class="summary">
        <router-link to="/post/12">Have an apple!</router-link>
      </div>
    </article>
    <article>
      <div class="summary">
        <router-link to="/post/32">Put down your shoes.</router-link>
      </div>
    </article>
    <article>
      <div class="summary">
        <router-link to="/post/543">Hello, it's me.</router-link>
      </div>
    </article>
  </main>
</template>

<script>
export default {
  name: 'home',
};
</script>
