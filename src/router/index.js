import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'; 
const login = () => import('@/views/login/index');
const register = () => import('@/views/register/index');
const home = () => import('@/views/home');
const editArticle = () => import('@/views/editArticle');

Vue.use(Router);

const router = new Router({
    routes: [
          {   
              path: '/',
              redirect: '/login',
          },
          {
              path: '/login',
              name: 'login',
              component: login
          },
          {
              path: '/register',
              name: 'register',
              component: register
          },
          {
              path: '/home',
              name: 'home',
              component: home
          },
          {
            path: '/editArticle',
            name: 'editArticle',
            component: editArticle
        }
      ]
  })

router.beforeEach((to, from, next) => {
    const isLogin = store.state.isLogin;
    if (isLogin && to.name === 'login') {
        next(false);
    } else {
        next();
    }
}) 

export default router
