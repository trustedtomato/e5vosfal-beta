<template>
  <button @click="login">
    <slot></slot>
  </button>
</template>

<script>
const existingScript = document.getElementById('google-platform-script');
if (!existingScript) {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client:platform.js?onload=setupGoogleLogin';
  window.setupGoogleLogin = () => {
    gapi.load('auth2', () => {
      window.googleAuth2 = gapi.auth2.init({
        client_id: '', // TODO
        hosted_domain: 'e5vos.hu',
      })
    });
  };
  document.head.appendChild(script);
}

export default {
  methods: {
    async login() {
      const { code } = googleAuth2.grantOfflineAccess();
      if (code) {
        // TODO
      }
    }
  }
}
</script>

<style>

</style>