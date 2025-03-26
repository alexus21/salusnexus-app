<template>
    <transition name="fade">
        <div class="login-form">
            <div class="form-container">
                <h2 class="form-title">Iniciar Sesión</h2>

                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input type="email" id="email" v-model="form.email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" id="password" v-model="form.password" class="form-control" required>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                        <button type="button" class="btn btn-secondary" @click="cancelLogin">Cancelar</button>
                    </div>

                    <div class="text-center mt-3">
                        <a href="#" @click="forgotPassword" class="text-muted">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'LoginComponent',
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            console.log("Datos de inicio de sesión:", this.form);
            alert("Inicio de sesión realizado");
        },
        forgotPassword() {
            alert("Redirigir a la página de recuperación de contraseña.");
        },
        cancelLogin() {
            // Redirige a la página principal o cierra el formulario
            console.log("Login cancelado");
            this.$emit('close'); // Si quieres cerrar el formulario desde el componente padre
        }
    }
};
</script>

<style scoped>
.login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.form-container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    min-width: 400px;
}

.form-title {
    text-align: center;
    margin-bottom: 20px;
}

a {
    text-decoration: none;
    font-size: 0.9rem;
}

a:hover {
    text-decoration: underline;
}

.d-flex {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.text-center {
    text-align: center;
}

.mt-3 {
    margin-top: 1rem;
}
</style>
