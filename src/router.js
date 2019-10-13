import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import metadata from './store/metadata';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/post/:id',
      name: 'post',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Post.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "account" */ './views/Settings.vue'),
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import(/* webpackChunkName: "account" */ './views/Submit.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = metadata.state.name;
  next();
});

export default router;
