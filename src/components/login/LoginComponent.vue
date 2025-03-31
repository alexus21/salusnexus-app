<template>
    <transition name="fade">
        <div class="login-form">
            <div class="form-container">
                <h2 class="form-title">Iniciar Sesión</h2>

                <form @submit.prevent="login">
                    <div class="row">
                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">email</span>
                            <input type="email" id="email" v-model="form.email" class="form-control"
                                   placeholder="Ingresa tu correo electrónico" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">lock</span>
                            <input type="password" id="password" v-model="form.password"
                                   class="form-control" placeholder="Ingresa tu contraseña" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <a href="#" @click="forgotPassword" class="text-muted">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div class="row mt-3 d-flex align-items-center justify-content-end">
                        <div class="col-auto">
                            <div class="d-flex gap-2 justify-content-center align-items-center">
                                <button type="submit"
                                        title="Iniciar Sesión"
                                        class="btn btn-primary d-flex align-items-center justify-content-center">
                                    <span class="material-icons">login</span>
                                </button>
                                <button type="button"
                                        title="Cancelar"
                                        class="btn btn-secondary d-flex align-items-center justify-content-center"
                                        @click="cancelLogin">
                                    <span class="material-icons">cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
import swal from 'sweetalert2';

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'LoginComponent',
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errors: {}
        };
    },
    methods: {
        login() {
            fetch(API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.form)
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    if (!responseData.status) {
                        if (responseData.errors) {
                            this.errors = responseData.errors;
                            const errorMessages = Object.values(responseData.errors).join('\n');
                            swal.fire({
                                icon: 'error',
                                title: '¡Error!',
                                text: errorMessages,
                            });
                            return;
                        }

                        swal.fire({
                            icon: 'error',
                            title: '¡Error!',
                            text: responseData.message,
                        });
                        return;
                    }

                    // Guardamos los datos de respuesta
                    const token = responseData.data.access_token;
                    const message = responseData.message;

                    // Cerramos el modal de login primero
                    this.$emit('close');

                    // Luego mostramos la alerta de éxito
                    setTimeout(() => {
                        swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: message,
                        }).then(() => {
                            localStorage.setItem('token', token);
                            window.location.href = '/';
                        });
                    }, 100);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        forgotPassword() {
            alert("Redirigir a la página de recuperación de contraseña.");
        },
        cancelLogin() {
            this.$emit('close');
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
    z-index: 9999;
}

.form-container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
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

input[type=text], input[type=password], input[type=email], input[type=date], input[type=number], select {
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #434ed1;
    border-radius: 0;
    padding: 10px;
}
</style>
