import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/components/home/HomeComponent.vue";
import LoginHome from "@/components/dashboard/LoginHome.vue";
import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";
import UserProfileComponent from "@/components/userprofile/UserProfileComponent.vue";
import SubscriptionPlansComponent
    from "@/components/subscriptionplan/SubscriptionPlansComponent.vue";
import LoginPage from "@/components/login/LoginPage.vue";
import RegisterPage from "@/components/register/RegisterPage.vue";
import AddPaymentMethodComponent from "@/components/paymentmethod/AddPaymentMethodComponent.vue";

import {validateAuth} from "@/utils/auth";
import VerifyPatientAccountComponent from "@/components/verifyaccount/VerifyPatientAccountComponent.vue";

const routes = [
    // Rutas para componentes de prueba


    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
        beforeEnter: async (to, from, next) => {
            const isAuthenticated = await validateAuth();
            if (isAuthenticated) {
                next({ name: 'loginHome' });
            } else {
                next();
            }
        }
    },
    {
        path: '/login-home',
        name: 'loginHome',
        component: LoginHome,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
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
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: {
            hideHeader: true
        }
    },
    {
        path: '/add-payment-method',
        name: 'AddPaymentMethod',
        component: AddPaymentMethodComponent,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardLayout,
        meta: {
            requiresAuth: true,
            hideHeader: true
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
        path: '/userprofile/verification',
        name: 'Verification',
        component: VerifyPatientAccountComponent,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/plans/patients',
        name: 'PatientsSubscriptionPlans',
        component: SubscriptionPlansComponent,
        meta: {
            hideHeader: true
        }
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
    } else if (to.path === '/login' || to.path === '/register') {
        const isAuthenticated = await validateAuth();
        if (isAuthenticated) {
            next({name: 'loginHome'});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;