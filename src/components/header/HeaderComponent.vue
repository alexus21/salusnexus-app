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
                        
                        <!-- Botones para móviles (visible solo en pantallas < lg) -->
                        <li class="nav-item d-lg-none" v-if="!isLogged">
                            <a class="nav-link auth-link" href="#" @click.prevent="handleRegisterClick">
                                <span class="material-icons">person_add</span> Registrarme
                            </a>
                        </li>
                        <li class="nav-item d-lg-none" v-if="!isLogged">
                            <a class="nav-link auth-link" href="#" @click.prevent="handleLoginClick">
                                <span class="material-icons">login</span> Iniciar sesión
                            </a>
                        </li>
                        <li class="nav-item d-lg-none" v-if="isLogged">
                            <a class="nav-link auth-link" href="#" @click.prevent="handleProfileClick">
                                <span class="material-icons">person</span> Mi perfil
                            </a>
                        </li>
                        <li class="nav-item d-lg-none" v-if="isLogged">
                            <a class="nav-link auth-link" href="#" @click.prevent="handleLogout">
                                <span class="material-icons">logout</span> Cerrar sesión
                            </a>
                        </li>
                    </ul>

                    <!-- Botones para escritorio (visible solo en pantallas >= lg) -->
                    <div class="d-none d-lg-flex auth-btn-container">
                        <button class="btn btn-outline-light border border-black border-1 text-black auth-btn"
                                id="btnRegister"
                                @click="handleRegisterClick"
                                v-if="!isLogged">
                            <span class="material-icons">person_add</span> Registrarme
                        </button>

                        <button class="btn btn-primary text-center auth-btn"
                                id="btnLogin"
                                @click="handleLoginClick"
                                v-if="!isLogged">
                            <span class="material-icons">login</span> Iniciar sesión
                        </button>

                        <button class="btn btn-outline-light border border-black border-1 text-black auth-btn"
                                id="btnProfile"
                                @click="handleProfileClick"
                                v-if="isLogged">
                            <span class="material-icons">person</span> Mi perfil
                        </button>

                        <button class="btn btn-primary text-center auth-btn"
                                id="btnLogout"
                                @click="handleLogout"
                                v-if="isLogged">
                            <span class="material-icons">logout</span> Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import swal from "sweetalert2";
import {validateAuth} from "@/utils/auth";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'HeaderComponent',
    methods: {
        handleRegisterClick() {
            this.$emit('open-register-component');
        },
        handleLoginClick() {
            this.$router.push('/login');
        },
        handleProfileClick() {
            window.location.href = "/userprofile";
        },
        handleLogout() {
            swal.fire({
                title: "¿Estás seguro?",
                text: "¿Quieres cerrar sesión?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#434ed1",
                cancelButtonColor: "#d1434e",
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

/* Contenedor de botones de autenticación para escritorio */
.auth-btn-container {
    display: flex;
    gap: 15px;
}

/* Estilos para los botones (manteniendo IDs originales para compatibilidad) */
#btnRegister, #btnProfile, #btnLogin, #btnLogout, .auth-btn {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.5rem 1.25rem;
    width: auto; /* Ancho automático basado en contenido */
    min-width: 150px; /* Ancho mínimo */
    height: auto; /* Altura automática basada en contenido */
    border-radius: 0.375rem; /* Esquinas más redondeadas */
    transition: all 0.2s ease-in-out;
}

/* Mantener el margen izquierdo original para los botones de login/logout */
#btnLogin, #btnLogout {
    margin-left: 15px;
}

/* Efectos hover para los botones */
.auth-btn:hover, #btnRegister:hover, #btnProfile:hover, #btnLogin:hover, #btnLogout:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para los links de autenticación en el menú móvil */
.auth-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    margin-top: 0.25rem;
    transition: background-color 0.2s;
}

.auth-link:hover, .auth-link:focus {
    background-color: #f8f9fa;
    color: #0d6efd;
}

/* Media queries para ajustes específicos por tamaño de pantalla */
@media (max-width: 991px) {
    .navbar-collapse {
        margin-top: 1rem; /* Espacio entre el botón toggler y el menú */
    }
}
</style>