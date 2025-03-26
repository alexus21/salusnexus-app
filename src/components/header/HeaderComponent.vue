<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Acerca</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contacto</a>
                        </li>
                    </ul>

                    <!-- Botón con Material Icon -->
                    <button class="btn btn-light text-center" id="btnRegister" @click="handleLoginClick"
                            style="display: flex; flex-wrap: nowrap; justify-content: center; text-align: center">
                        <span class="material-icons">login</span> Inciar sesión
                    </button>

                    <!-- Botón con Material Icon -->
                    <button class="btn btn-light text-center ms-3" id="btnRegister" @click="handleRegisterClick"
                            style="display: flex; flex-wrap: nowrap; justify-content: center; text-align: center">
                        <span class="material-icons">person_add</span> Registrarme
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    methods: {
        handleRegisterClick() {
            this.$emit('open-register-component');
        },
        handleLoginClick() {
            this.$emit('open-login-component');
        }
    },
    data() {
        return {
            showRegisterComponent: false,
            showLoginComponent: false,
            show: false,
        }
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

</style>