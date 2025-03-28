<template>
    <HeaderComponent @open-register-component="showRegisterModal" @open-login-component="showLoginModal"></HeaderComponent>
    <RegisterComponent v-if="showRegisterComponent" @close="showRegisterComponent = false"></RegisterComponent>
    <LoginComponent v-if="showLoginComponent" @close="showLoginComponent = false"></LoginComponent>
<!--    <HomeComponent v-if="false"></HomeComponent>-->
<!--    <DashboardLayout></DashboardLayout>-->
    <router-view></router-view>
</template>

<script>

import HeaderComponent from "@/components/header/HeaderComponent.vue";
import RegisterPatientsComponent from "@/components/register/RegisterPatientsComponent.vue";
import LoginComponent from "@/components/login/LoginComponent.vue";
// import HomeComponent from "@/components/home/HomeComponent.vue";
// import DashboardLayout from "@/components/main/healthcareProfessionals/DashboardLayout.vue";

export default {
    name: 'App',
    components: {
        // DashboardLayout,
        // HomeComponent,
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
</style>
