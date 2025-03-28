import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/components/home/HomeComponent.vue";
import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardLayout
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;