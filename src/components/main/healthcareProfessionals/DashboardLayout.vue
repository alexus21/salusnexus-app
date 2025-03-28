<template>
    <div class="dashboard-layout">

        <AppSidebar
            :active-item="currentView"
            @navigate="handleNavigation"
            @logout-request="emitLogout"
        />

        <DashboardHome />

    </div>
</template>

<script>
import AppSidebar from '@/components/main/healthcareProfessionals/Sidebar.vue';
import DashboardHome from '@/components/main/healthcareProfessionals/DashboardHome.vue';

export default {
    name: 'DashboardLayout',
    components: {
        AppSidebar,
        DashboardHome,
    },
    data() {
        return {
            currentView: 'Inicio'
        }
    },
    methods: {
        handleNavigation(viewName) {
            this.currentView = viewName;
            console.log("Layout recibió navegación a:", viewName);
        },
        emitLogout() {
            console.log("Solicitud de Logout recibida en Layout");
        }
    }
};
</script>

<style>
.dashboard-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
</style>