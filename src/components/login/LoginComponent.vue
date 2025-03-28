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
import swal from 'sweetalert2';
const API_URL = 'http://localhost:8000/api';

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
                    if(!responseData.status){
                        if(responseData.errors){
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
                    }

                    swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: responseData.message,
                    }).then(() => {
                        localStorage.setItem('token', responseData.data.access_token);
                        this.$emit('close');
                    })
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
