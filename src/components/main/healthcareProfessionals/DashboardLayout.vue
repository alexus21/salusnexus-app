<template>
    <div class="dashboard-layout">
        <!-- Overlay para móvil -->
        <div v-if="isSidebarOpen && isMobile" class="sidebar-overlay" @click="toggleSidebar"></div>

        <AppSidebar
            :active-item="currentView"
            :is-open="isSidebarOpen"
            @navigate="handleNavigation"
            @logout-request="emitLogout"
            @close-sidebar="closeSidebar" />

        <!-- Contenido Principal -->
        <div class="main-container">
             <!-- Botón Hamburger (siempre renderizado, visibilidad controlada por CSS) -->
            <button class="hamburger-button" @click="toggleSidebar">
                <i class="fas fa-bars"></i>
            </button>

            <component :is="mainComponent" />
        </div>
    </div>
</template>

<script>
import AppSidebar from '@/components/main/healthcareProfessionals/Sidebar.vue';
import DashboardHome from '@/components/main/healthcareProfessionals/DashboardHome.vue';
import ReviewsView from '@/components/main/healthcareProfessionals/ReviewsView.vue';
import PatientsView from '@/components/main/healthcareProfessionals/PatientsView.vue';
import ScheduleView from '@/components/main/healthcareProfessionals/ScheduleView.vue';
import AgendaView from '@/components/main/healthcareProfessionals/AgendaView.vue';
import SubscriptionView from '@/components/main/healthcareProfessionals/SubscriptionView.vue';
import Swal from 'sweetalert2';

export default {
    name: 'DashboardLayout',
    components: {
        AppSidebar,
        DashboardHome,
        ReviewsView,
        PatientsView,
        ScheduleView,
        AgendaView,
        SubscriptionView
    },
    data() {
        return {
            currentView: 'Inicio',
            isSidebarOpen: false, // Estado inicial cerrado en móvil
            isMobile: false, // Para detectar si es vista móvil
        }
    },
    computed: {
        mainComponent() {
            if (this.currentView === 'Resenas') {
                // Show ReviewsView component instead of Sweet Alert
                return 'ReviewsView';
            }
            if (this.currentView === 'Pacientes') {
                return 'PatientsView';
            }
            if (this.currentView === 'Horario'){
                return 'ScheduleView';
            }
            if (this.currentView === 'Agenda'){
                return 'AgendaView';
            }
            if (this.currentView === 'Suscripcion'){
                return 'SubscriptionView';
            }
            return 'ScheduleView';
        }
    },
    methods: {
        handleNavigation(viewName) {
            this.currentView = viewName;
            console.log("Layout recibió navegación a:", viewName);
            // No cerramos aquí, se cierra desde el propio Sidebar
        },
        emitLogout() {
            console.log("Solicitud de Logout recibida en Layout");
            // Aquí puedes emitir un evento hacia arriba o manejar el logout
            // this.$emit('logout');
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        closeSidebar() {
            if (this.isMobile) {
                this.isSidebarOpen = false;
            }
        },
        /* eslint-disable */ 
        showUnavailableFeature(featureName) {
            Swal.fire({
                title: 'Próximamente',
                text: 'Esta funcionalidad estará disponible en futuras actualizaciones. Estamos trabajando para mejorar su experiencia.',
                icon: 'info',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#3085d6',
            });
        },
        checkScreenSize() {
            const mobileBreakpoint = 768;
            this.isMobile = window.innerWidth < mobileBreakpoint;
            // Aseguramos que el sidebar esté cerrado si pasamos a móvil
            // y abierto si pasamos a escritorio.
            if (this.isMobile) {
                // Si estamos en móvil y el sidebar estaba 'abierto' (porque venimos de escritorio),
                // lo cerramos explícitamente.
                // No hacemos nada si ya estaba cerrado.
                 if (this.isSidebarOpen && window.innerWidth >= mobileBreakpoint) {
                      // Esto previene cerrarlo si ya estaba abierto en móvil
                 } else if (!this.isSidebarOpen && window.innerWidth < mobileBreakpoint) {
                     // Mantener cerrado si ya estaba cerrado en móvil
                 } else {
                     this.isSidebarOpen = false; // Estado por defecto en móvil
                 }
            } else {
                // En escritorio, el sidebar siempre está visible lógicamente (posición estática)
                // pero el estado isSidebarOpen no aplica visualmente igual.
                // Lo mantenemos como 'true' para consistencia lógica si es necesario,
                // aunque visualmente lo controla el CSS.
                 this.isSidebarOpen = true; // O false si no se necesita estado en desktop
            }
        }
    },
    mounted() {
        this.checkScreenSize(); // Comprobar tamaño inicial
        window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkScreenSize);
    }
};
</script>

<style>
.dashboard-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative; /* Para el posicionamiento absoluto del botón y overlay */
}

.main-container {
    flex-grow: 1;
    height: 100vh;
    overflow-y: auto;
    position: relative;
    width: calc(100% - 210px); /* Adjust for the sidebar width */
    margin-left: auto;
    background-color: #f8fafc;
}

.hamburger-button {
    display: none; /* Oculto por defecto */
    position: absolute;
    top: 15px;
    left: 15px; /* Posición fija en la esquina superior izquierda */
    z-index: 1100; /* Encima del sidebar cuando está abierto */
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1.2em;
}

.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: none; /* Oculto por defecto */
}

/* --- Media Queries --- */

/* Estilos para pantallas pequeñas (móviles) */
@media (max-width: 767px) {
    .hamburger-button {
        display: block; /* Mostrar botón en móvil */
        /* Ya no se necesita ajustar 'left' aquí */
    }

    /* Ocultar el botón hamburguesa si el sidebar está abierto en móvil */
    .dashboard-layout:has(.sidebar.is-open) .hamburger-button {
        display: none;
    }

    /* Mostrar overlay solo si el sidebar está abierto Y estamos en móvil */
    .dashboard-layout:has(.sidebar.is-open) .sidebar-overlay {
        display: block;
    }

    .main-container {
        padding-top: 60px; /* Espacio para el botón hamburger fijo */
        width: 100%; /* Full width on mobile */
    }
}

/* Estilos para pantallas más grandes (tablets/escritorio) */
@media (min-width: 768px) {
    /* El botón permanece oculto por su estilo por defecto */

     .main-container {
       padding-top: 0; /* Quitar padding superior en pantallas grandes */
    }
}
</style>