<template>
  <header :class="$style.header">
    <h2><router-link to="/">
      <span>
        {{ title }}
      </span>
    </router-link></h2>
    <div :class="$style.search">
      <input :class="$style.search__input" type="search" placeholder="Search" aria-label="Search">
    </div>
    <router-link :class="$style['new-post-button']" to="/submit">
      <post-logo />
    </router-link>
    <base-dropdown v-if="user">
      <div :class="$style.account">
        <img alt="avatar" :src="user.avatarUrl">
        <div :class="$style.account__info">
          <div :class="$style.account__name">
            {{ user.familyName }} {{ user.middleName }} {{ user.givenName }}
          </div>
          <div :class="$style.account__karma">1 karma</div>
        </div>
        <div :class="$style['account__toggle-container']">
          <svg :class="$style['account__toggle']" viewBox="0 0 20 20">
            <path
              d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <template v-slot:drop>
        <nav :class="$style['account-actions']">
          <router-link to="/settings">
            Settings
          </router-link>
          <div>Logout</div>
        </nav>
      </template>
    </base-dropdown>
    <div v-else>
      <login-button>Login</login-button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import LoginButton from './LoginButton.vue';
import BaseDropdown from './BaseDropdown.vue';
import InvisibleButton from './InvisibleButton.vue';
import PostLogo from '../assets/post.svg';

export default {
  name: 'the-header',
  computed: {
    ...mapGetters('currentUser', {
      user: 'data',
    }),
    ...mapState('metadata', {
      title: 'name',
    }),
  },
  components: {
    LoginButton,
    BaseDropdown,
    InvisibleButton,
    PostLogo,
  },
};
</script>

<style module>
  .header {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: var(--color-dark);
    color: var(--color-light);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    z-index: 1;
    position: relative;
  }

  .header > * {
    margin-right: 16px;
  }

  .header > *:last-child {
    margin-right: 0;
  }

  input {
    border-radius: 4px;
    border: 0;
    background-color: var(--color-light);
    padding: 8px;
    font-family: inherit;
  }

  .new-post-button {
    color: white;
    width: 32px;
    display: flex;
    padding: 8px;
    box-sizing: border-box;
  }

  .new-post-button:focus, .new-post-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .search {
    flex-grow: 1;
  }

  .search__input {
    width: 100%;
  }

  .account {
    display: flex;
    font-size: 14px;
  }

  .account__info {
    margin-left: 8px;
  }

  .account__name {
    font-weight: 600;
  }

  .account__toggle-container {
    display: flex;
    margin: auto;
    margin-left: 8px;
  }

  .account__toggle {
    width: 20px;
    height: 20px;
  }

  .account img {
    border-radius: 3px;
    max-height: 36px;
    max-width: 36px;
  }

  .account-actions {
    background: white;
    color: black;
    margin: 0;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .account-actions > * {
    display: block;
    padding: 8px;
  }

  .account-actions > *:hover {
    background: var(--color-accent-dark);
    color: white;
  }

  .header h2 {
    font-size: 1.5em;
    font-family: var(--display-font);
    margin-top: 0;
    font-weight: 400;
    margin-bottom: 0;
  }

  .header a {
    text-decoration: none;
  }
</style>
