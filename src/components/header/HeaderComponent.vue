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

                    <!-- Botón con Material Icon -->
                    <button class="btn btn-outline-light border border-black border-1 text-black"
                            id="btnRegister"
                            @click="handleRegisterClick">
                        <span class="material-icons">person_add</span> Registrarme
                    </button>

                    <!-- Botón con Material Icon -->
                    <button class="btn btn-primary text-center"
                            id="btnLogin"
                            @click="handleLoginClick">
                        <span class="material-icons">login</span> Iniciar sesión
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

#btnRegister {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 50px;
}

#btnLogin {
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