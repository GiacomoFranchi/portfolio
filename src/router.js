
import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import Skills from './pages/Skills.vue';
import Projects from './pages/Projects.vue';
import DeviceMotion from "./pages/DeviceMotion.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/skills',
            name: 'skills',
            component: Skills
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects
        },
        {
            path: '/fliphone',
            name: 'fliphone',
            component: DeviceMotion
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
});
export{router};