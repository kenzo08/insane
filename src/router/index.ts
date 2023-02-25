import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import('@/pages/ContactsPage.vue'),
    },
    {
        path: '/contact/:id',
        name: 'ContactPage',
        component: () => import('@/pages/ContactPage.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/pages/404Page.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: ({hash}, _, savedPosition) =>
        savedPosition || hash
            ? {selector: hash, behavior: 'smooth'}
            : {left: 0, top: 0, behavior: 'smooth'},
});

export default router
