<template>
    <HeaderComponent @open-register-component="showRegisterModal"></HeaderComponent>
    <RegisterComponent v-if="showRegisterComponent" @close="showRegisterComponent = false"></RegisterComponent>
</template>

<script>

import HeaderComponent from "@/components/header/HeaderComponent.vue";
import RegisterComponent from "@/components/register/RegisterComponent.vue";

export default {
    name: 'App',
    components: {
        HeaderComponent,
        RegisterComponent
    },
    data(){
        return {
            showRegisterComponent: false
        }
    },
    methods: {
        showRegisterModal() {
            this.showRegisterComponent = true;
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
    margin-top: 60px;
}
</style>
