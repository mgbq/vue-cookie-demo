import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
   // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
