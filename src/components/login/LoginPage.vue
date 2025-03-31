<template>
    <div class="login-page">
        <div class="login-container">
            <div class="left-panel">
                <h1 class="welcome-text">¡Hola, Bienvenido!</h1>
                <p class="account-text">¿No tienes una cuenta?</p>
                <router-link to="/register" class="register-btn">Regístrate</router-link>
            </div>
            <div class="right-panel">
                <h2 class="login-title">Iniciar Sesión</h2>
                
                <form @submit.prevent="login">
                    <div class="input-group">
                        <input type="email" id="email" v-model="form.email" class="form-control"
                               placeholder="Usuario o Correo Electrónico" required>
                        <span class="input-icon">
                            <span class="material-icons">person</span>
                        </span>
                    </div>
                    
                    <div class="input-group">
                        <input type="password" id="password" v-model="form.password"
                               class="form-control" placeholder="Contraseña" required>
                        <span class="input-icon">
                            <span class="material-icons">lock</span>
                        </span>
                    </div>
                    
                    <div class="forgot-password">
                        <a href="#" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" class="login-btn">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'LoginPage',
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

                    swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: message,
                    }).then(() => {
                        localStorage.setItem('token', token);
                        this.$router.push('/');
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        forgotPassword() {
            this.$router.push('/home');
        }
    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.login-container {
    display: flex;
    width: 900px;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.left-panel {
    width: 40%;
    background-color: #4285f4;
    color: white;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.welcome-text {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
}

.account-text {
    margin-bottom: 20px;
}

.register-btn {
    display: inline-block;
    background-color: transparent;
    color: white;
    padding: 10px 25px;
    border: 2px solid white;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    width: fit-content;
    margin: 0 auto;
}

.register-btn:hover {
    background-color: white;
    color: #4285f4;
}

.right-panel {
    width: 60%;
    padding: 40px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-title {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
}

.input-group {
    position: relative;
    margin-bottom: 20px;
}

.form-control {
    width: 100%;
    padding: 15px 15px 15px 50px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.form-control:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-icon .material-icons {
    font-size: 20px;
}

.forgot-password {
    text-align: right;
    margin-bottom: 30px;
}

.forgot-password a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password a:hover {
    color: #4285f4;
    text-decoration: underline;
}

.login-btn {
    width: 100%;
    padding: 15px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-btn:hover {
    background-color: #3367d6;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
        width: 90%;
        max-width: 400px;
        height: auto;
        border-radius: 30px;
    }
    
    .left-panel, .right-panel {
        width: 100%;
    }
    
    .left-panel {
        border-radius: 30px 30px 0 0;
        padding: 40px 30px;
        text-align: center;
        align-items: center;
    }
    
    .right-panel {
        padding: 30px;
        border-radius: 0 0 30px 30px;
    }
    
    .input-group {
        margin-bottom: 15px;
    }
    
    .form-control {
        background-color: #f5f5f5;
        border: none;
        font-size: 14px;
    }
    
    .login-title {
        font-size: 20px;
        margin-bottom: 20px;
    }
    
    .forgot-password {
        margin-bottom: 20px;
    }
    
    .login-btn {
        margin-top: 10px;
    }
    
    .welcome-text {
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    .account-text {
        margin-bottom: 15px;
    }
    
    .register-btn {
        margin: 0 auto;
    }
    
    .input-icon .material-icons {
        font-size: 18px;
    }
}
</style> 