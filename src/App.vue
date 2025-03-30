<template>
    <HeaderComponent @open-register-component="showRegisterModal" @open-login-component="showLoginModal"></HeaderComponent>
    <RegisterComponent v-if="showRegisterComponent" @close="showRegisterComponent = false"></RegisterComponent>
    <LoginComponent v-if="showLoginComponent" @close="showLoginComponent = false"></LoginComponent>
    <router-view></router-view>
</template>

<script>

import HeaderComponent from "@/components/header/HeaderComponent.vue";
import RegisterPatientsComponent from "@/components/register/RegisterPatientsComponent.vue";
import LoginComponent from "@/components/login/LoginComponent.vue";

export default {
    name: 'App',
    components: {
        HeaderComponent,
        RegisterComponent: RegisterPatientsComponent,
        LoginComponent
    },
    data(){
        return {
            showRegisterComponent: false,
            showLoginComponent: false
        }
    },
    methods: {
        showRegisterModal() {
            this.showRegisterComponent = true;
        },
        showLoginModal() {
            this.showLoginComponent = true;
        },
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

/* Estilos globales para modales */
.modal-backdrop {
    z-index: 1040 !important;
}

.modal {
    z-index: 1050 !important;
}

/* Asegurar que las imágenes principales tengan un z-index bajo */
.home-image, img.home-image {
    z-index: 1 !important;
}
</style>
