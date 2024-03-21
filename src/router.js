
import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import AboutMe from './pages/AboutMe.vue';
import Projects from './pages/Projects.vue';
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
            path: '/aboutme',
            name: 'aboutme',
            component: AboutMe
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
});
export{router};