<template>
  <button @click="login">
    <slot></slot>
  </button>
</template>

<script>
import fetchApi from '../utils/fetch-api';

let gapiScript;
let gapiAuth2Promise;

export default {
  name: 'LoginButton',
  data: () => ({
    gapiInit: {
      client_id: '996998636664-d4plfg6cv7tn2eitd8jc03sh79rbdnp8.apps.googleusercontent.com',
      hosted_domain: 'e5vos.hu',
    },
    gapiCodeEndpoint: '/api/login',
    gapiOnloadName: 'setupGoogleLogin',
  }),
  mounted() {
    // If the google platform script is not loaded yet, load it:
    // populate gapiScript (script element) and gapiAuth2Promise (promise).
    if (!gapiScript) {
      gapiScript = document.createElement('script');
      gapiScript.id = this.gapiScriptId;
      gapiScript.src = `https://apis.google.com/js/client:platform.js?onload=${this.gapiOnloadName}`;
      gapiAuth2Promise = new Promise((resolve) => {
        window[this.gapiOnloadName] = () => {
          // eslint-disable-next-line no-undef
          gapi.load('auth2', () => {
            // eslint-disable-next-line no-undef
            resolve(gapi.auth2);
          });
        };
      });
      document.head.appendChild(gapiScript);
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-async-in-computed-properties
    async gapiAuth2() {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      const auth2 = await gapiAuth2Promise;
      return auth2.init(this.gapiInit);
    },
  },
  methods: {
    async login() {
      const gapiAuth2 = await this.gapiAuth2;
      const { code } = await gapiAuth2.grantOfflineAccess();
      if (!code) {
        console.error('Got no code!');
        return;
      }
      try {
        const { jwt, hasuraJwt } = await fetchApi(this.gapiCodeEndpoint, { code });
        this.$store.dispatch('currentUser/login', {
          jwt,
          hasuraJwt,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
