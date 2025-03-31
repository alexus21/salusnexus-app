import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/components/home/HomeComponent.vue";
import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";
import UserProfileComponent from "@/components/userprofile/UserProfileComponent.vue";
import PatientSusbcriptionPlansComponent
    from "@/components/subscriptionplan/patients/PatientSusbcriptionPlansComponent.vue";
import LoginPage from "@/components/login/LoginPage.vue";

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
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {
            hideHeader: true
        }
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
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfileComponent,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/plans/patients',
        name: 'PatientsSubscriptionPlans',
        component: PatientSusbcriptionPlansComponent
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