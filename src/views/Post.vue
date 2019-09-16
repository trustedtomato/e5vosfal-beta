<template>
  <main>
    <h1>Title of {{ $route.params.id }}</h1>
    <div>
      Description of {{ $route.params.id }}.
    </div>
  </main>
</template>

<script>
export default {
  name: 'post',
};
</script>

<style>

</style>
