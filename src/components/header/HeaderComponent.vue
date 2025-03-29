<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <!-- Logo o marca -->
                <a class="navbar-brand" href="#">Mi App</a>

                <!-- Botón para colapsar en pantallas pequeñas -->
                <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Menú de navegación -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Acerca</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contacto</a>
                        </li>
                    </ul>

                    <button class="btn btn-outline-light border border-black border-1 text-black"
                            id="btnRegister"
                            @click="handleRegisterClick"
                            v-if="!isLogged">
                        <span class="material-icons">person_add</span> Registrarme
                    </button>


                    <button class="btn btn-primary text-center"
                            id="btnLogin"
                            @click="handleLoginClick"
                            v-if="!isLogged">
                        <span class="material-icons">login</span> Iniciar sesión
                    </button>

                    <button class="btn btn-outline-light border border-black border-1 text-black"
                            id="btnProfile"
                            v-if="isLogged">
                        <span class="material-icons">person</span> Mi perfil
                    </button>

                    <button class="btn btn-primary text-center"
                            id="btnLogout"
                            @click="handleLogout"
                            v-if="isLogged">
                        <span class="material-icons">logout</span> Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import swal from "sweetalert2";
import {validateAuth} from "@/utils/auth";

const API_URL = "http://localhost:8000/api";

export default {
    name: 'HeaderComponent',
    methods: {
        handleRegisterClick() {
            this.$emit('open-register-component');
        },
        handleLoginClick() {
            this.$emit('open-login-component');
        },
        handleProfileClick() {
            this.$emit('open-profile-component');
        },
        handleLogout() {
            swal.fire({
                title: "¿Estás seguro?",
                text: "¿Quieres cerrar sesión?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(API_URL + "/logout", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.status) {
                                localStorage.removeItem("token");
                                this.isLogged = false;
                                window.location.reload();
                            } else {
                                swal.fire({
                                    icon: "error",
                                    title: "¡Error!",
                                    text: responseData.message,
                                });
                            }
                        });
                }
            })
        },
    },
    data() {
        return {
            showRegisterComponent: false,
            showLoginComponent: false,
            show: false,
            isLogged: false,
        }
    },
    async mounted() {
        this.isLogged = await validateAuth();
    }
};
</script>

<style scoped>
.navbar {
    padding: 1rem;
}

.material-icons {
    vertical-align: middle;
    margin-right: 5px;
}

#btnRegister, #btnProfile {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 50px;
}

#btnLogin, #btnLogout {
    margin-left: 15px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 50px;
}

</style>