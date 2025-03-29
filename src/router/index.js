import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/components/home/HomeComponent.vue";
import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";
import {validateAuth} from "@/utils/auth";

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
        component: DashboardLayout,
        meta: {
            requiresAuth: true
        },
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

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = await validateAuth();
        if (!isAuthenticated) {
            next({name: 'Home'});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;