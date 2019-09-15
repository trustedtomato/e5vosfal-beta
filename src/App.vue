<template>
  <div id="app">
    <header class="main-header">
      <h2><router-link to="/">E5vosfal</router-link></h2>
      <div>
        <input type="search" placeholder="Search" aria-label="Search">
      </div>
      <router-link to="/account">Account</router-link>
      <a href="/signout">Sign out</a>
    </header>
    <router-view/>
  </div>
</template>

<style>
:root {
  --main-hue: 180;
  --accent-hue: 0;
  --color-dark: hsl(var(--main-hue), 100%, 15%);
  --color-text-light: hsl(var(--main-hue), 100%, 95%);
}

html, body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
}

a {
  color: inherit;
}

.main-header {
  display: flex;
  align-items: baseline;
  padding: 24px;
  background-color: var(--color-dark);
  color: var(--color-text-light);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

input {
  border-radius: 4px;
  border: 0;
  padding: 8px;
}

.main-header h2 {
  margin-top: 0;
  margin-bottom: 0;
}

.main-header > * {
  margin-right: 16px;
}

.main-header a {
  text-decoration: none;
}
</style>
