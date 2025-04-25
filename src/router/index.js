import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/components/home/HomeComponent.vue";
import LoginHome from "@/components/dashboard/LoginHome.vue";
// import DashboardHome from "@/components/main/healthcareProfessionals/DashboardHome.vue";
import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";
import ReviewsView from '@/components/main/healthcareProfessionals/ReviewsView.vue';
import PatientsView from '@/components/main/healthcareProfessionals/PatientsView.vue';
import DoctorProfileComponent from "@/components/userprofile/DoctorProfileComponent.vue";
import SubscriptionPlansComponent
    from "@/components/subscriptionplan/SubscriptionPlansComponent.vue";
import LoginPage from "@/components/login/LoginPage.vue";
import RegisterPage from "@/components/register/RegisterPage.vue";
import AddPaymentMethodComponent from "@/components/paymentmethod/AddPaymentMethodComponent.vue";
import ScheduleView from '@/components/main/healthcareProfessionals/ScheduleView.vue';
import AgendaView from '@/components/main/healthcareProfessionals/AgendaView.vue';

import {validateAuth} from "@/utils/auth";
import VerifyProfessionalAccountComponent from "@/components/verifyaccount/VerifyProfessionalAccountComponent.vue";
import ClinicaPreview from "@/components/userprofile/ClinicaPreview.vue";
import EditClinicView from "@/components/clinic/EditClinicView.vue";

const routes = [
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
        path: '/agregar-pago',
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
        path: '/reseñas',
        name: 'Reviews',
        component: ReviewsView,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
    },
    {
        path: '/perfil',
        name: 'UserProfile',
        // component: UserProfileComponent,
        component: DoctorProfileComponent,
        meta: {
            requiresAuth: true,
            // hideHeader: true
        },
    },
    {
        path: '/profesional/verificar',
        name: 'VerifyProfessionalAccount',
        component: VerifyProfessionalAccountComponent,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/pacientes',
        name: 'Patients',
        component: PatientsView,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
    },
    {
        path: '/previa-clinica',
        name: 'PreviewClinic',
        component: ClinicaPreview,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/edit-clinic',
        name: 'EditClinic',
        component: EditClinicView,
        meta: {
          requiresAuth: true // Si necesitas autenticación
        }
      },
    {
        path: '/horario',
        name: 'Schedule',
        component: ScheduleView,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
    },
    {
        path: '/agenda',
        name: 'Agenda',
        component: AgendaView,
        meta: {
            requiresAuth: true,
            hideHeader: true
        }
    },
    {
        path: '/planes/profesionales',
        name: 'ProfessionalSubscriptionPlans',
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