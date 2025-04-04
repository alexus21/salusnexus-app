<template>
    <div class="login-page">
        <!-- Elementos decorativos de fondo -->
        <div class="decorative-element decorative-element-1"></div>
        <div class="decorative-element decorative-element-2"></div>
        <div class="decorative-element decorative-element-3"></div>
        
        <div class="login-container">
            <div class="left-panel">
                <span class="badge bg-primary-soft mb-3">Plataforma Médica</span>
                <h1 class="welcome-text">Acceso Profesional</h1>
                <div class="features-container">
                    <div class="login-feature-item">
                        <i class="fas fa-laptop-medical feature-icon"></i>
                        <span>Ingrese a su espacio de gestión clínica</span>
                    </div>
                    <div class="login-feature-item">
                        <i class="fas fa-shield-alt feature-icon"></i>
                        <span>Acceso seguro y confidencial</span>
                    </div>
                    <div class="login-feature-item">
                        <i class="fas fa-sync feature-icon"></i>
                        <span>Información en tiempo real</span>
                    </div>
                </div>
                
                <!-- Ilustración médica -->
                <div class="medical-illustration">
                    <svg width="180" height="180" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <!-- Icono de persona estilo Material Design -->
                        <path d="M256 256c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0 48c-64 0-192 32-192 96v32h384v-32c0-64-128-96-192-96z" fill="white" opacity="0.7"/>
                    </svg>
                </div>
                
                <p class="new-account-text">¿Aún no tiene una cuenta?</p>
                <router-link to="/register" class="register-btn">Crear cuenta</router-link>
            </div>
            <div class="right-panel">
                <h2 class="login-title">Iniciar Sesión</h2>
                
                <form @submit.prevent="login">
                    <div class="input-group">
                        <input type="email" id="email" v-model="form.email" class="form-control"
                               placeholder="Usuario o Correo Electrónico" required>
                        <span class="input-icon">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                    
                    <div class="input-group">
                        <input type="password" id="password" v-model="form.password"
                               class="form-control" placeholder="Contraseña" required>
                        <span class="input-icon">
                            <i class="fas fa-lock"></i>
                        </span>
                    </div>
                    
                    <div class="forgot-password">
                        <a href="#" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" class="login-btn">
                        <i class="fas fa-sign-in-alt me-2"></i>Acceder al sistema
                    </button>
                </form>
                
                <!-- Iconos médicos decorativos -->
                <div class="medical-icons">
                    <div class="icon-item"><i class="fas fa-heartbeat"></i></div>
                    <div class="icon-item"><i class="fas fa-stethoscope"></i></div>
                    <div class="icon-item"><i class="fas fa-user-md"></i></div>
                    <div class="icon-item"><i class="fas fa-pills"></i></div>
                    <div class="icon-item"><i class="fas fa-hospital"></i></div>
                </div>
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
    background: linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 50%, #F8FBFF 100%);
    position: relative;
    overflow: hidden;
}

/* Elementos decorativos de fondo - similares al HomeComponent */
.decorative-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.2;
    background: linear-gradient(45deg, #0d6efd, #36b9cc);
    z-index: 0;
}

.decorative-element-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
}

.decorative-element-2 {
    width: 100px;
    height: 100px;
    bottom: 50px;
    left: 15%;
}

.decorative-element-3 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    right: 10%;
}

.login-container {
    display: flex;
    width: 900px;
    min-height: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1;
    background-color: white;
}

.left-panel {
    width: 40%;
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.2) 0%, rgba(10, 88, 202, 0.3) 100%);
    color: #1a2b48;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

/* Blobs similares a los del HomeComponent para el panel izquierdo */
.left-panel::before {
    content: '';
    position: absolute;
    top: 45%;
    left: 50%;
    width: 550px;
    height: 550px;
    background: linear-gradient(135deg, rgba(173, 216, 255, 0.65) 0%, rgba(13, 110, 253, 0.2) 100%);
    transform: translate(-50%, -50%);
    border-radius: 70% 60% 65% 55%;
    z-index: -1;
    animation: pulseBlob 8s infinite alternate;
}

.left-panel::after {
    content: '';
    position: absolute;
    top: 55%;
    left: 45%;
    width: 450px;
    height: 450px;
    background: linear-gradient(135deg, rgba(208, 235, 255, 0.6) 0%, rgba(54, 185, 204, 0.15) 100%);
    transform: translate(-50%, -50%);
    border-radius: 55% 65% 70% 45%;
    z-index: -1;
    animation: pulseBlob 8s infinite alternate;
    animation-delay: 2s;
}

/* Estilo de badge similar al HomeComponent */
.bg-primary-soft {
    background-color: rgba(13, 110, 253, 0.15);
    color: #0d6efd;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    display: inline-block;
    position: relative;
    z-index: 2;
}

.welcome-text {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    position: relative;
    z-index: 2;
    color: #0a2d5e;
}

.features-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 25px;
    position: relative;
    z-index: 2;
    animation: fadeInUp 1s;
}

.login-feature-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: transparent;
    padding: 0.5rem 0;
    border-radius: 0;
    transition: all 0.3s ease;
    text-align: left;
    border-left: 3px solid rgba(255, 255, 255, 0.5);
    padding-left: 0.8rem;
}

.login-feature-item:hover {
    transform: none;
    box-shadow: none;
}

.login-feature-item .feature-icon {
    color: white;
    font-size: 1rem;
    min-width: 20px;
    text-align: center;
    opacity: 0.8;
}

.login-feature-item span {
    color: white;
    font-weight: 400;
    font-size: 0.95rem;
    opacity: 0.9;
}

.account-text {
    margin-bottom: 20px;
    position: relative;
    z-index: 2;
    color: #0a2d5e;
}

.new-account-text {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
    color: #0a2d5e;
    font-size: 0.95rem;
}

.register-btn {
    display: inline-block;
    background-color: #0d6efd;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    width: fit-content;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.15);
}

.register-btn:hover {
    background-color: #0b5ed7;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(13, 110, 253, 0.2);
}

.right-panel {
    width: 60%;
    padding: 40px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

/* Patrón de fondo para el panel derecho */
.right-panel::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230d6efd' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 1;
    z-index: 0;
}

.login-title {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
    color: #1a2b48;
    font-weight: 600;
    position: relative;
    z-index: 1;
}

.input-group {
    position: relative;
    margin-bottom: 20px;
    z-index: 1;
}

.form-control {
    width: 100%;
    padding: 15px 15px 15px 50px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 16px;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9);
}

.form-control:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
    background-color: white;
}

.input-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #0d6efd;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forgot-password {
    text-align: right;
    margin-bottom: 30px;
    z-index: 1;
    position: relative;
}

.forgot-password a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
}

.forgot-password a:hover {
    color: #0d6efd;
    text-decoration: underline;
}

.login-btn {
    width: 100%;
    padding: 15px;
    background-color: #0d6efd !important;
    color: white !important;
    border: none !important;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.15);
}

.login-btn:hover {
    background-color: #0b5ed7 !important;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(13, 110, 253, 0.2);
}

.login-btn i {
    margin-right: 8px;
}

/* Iconos médicos decorativos en el panel derecho */
.medical-icons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
    opacity: 0.15;
    position: relative;
    z-index: 1;
}

.icon-item {
    font-size: 1.5rem;
    color: #0d6efd;
}

.scroll-indicator {
    position: relative;
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgba(13, 110, 253, 0.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.scroll-down {
    color: #0d6efd;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulseBlob {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        transform: translate(-50%, -50%) scale(1.05);
    }
}

/* Ilustración médica en el panel izquierdo */
.medical-illustration {
    margin: 1.5rem 0;
    position: relative;
    z-index: 2;
}

.medical-illustration svg path {
    fill: white;
    opacity: 0.7;
}

@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
        width: 90%;
        max-width: 400px;
        height: auto;
        border-radius: 20px;
    }
    
    .left-panel, .right-panel {
        width: 100%;
    }
    
    .left-panel {
        border-radius: 20px 20px 0 0;
        padding: 30px;
        text-align: center;
        align-items: center;
    }
    
    .right-panel {
        padding: 30px;
        border-radius: 0 0 20px 20px;
    }
    
    .input-group {
        margin-bottom: 15px;
    }
    
    .form-control {
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
    
    .medical-icons {
        margin-top: 1.5rem;
    }
    
    .medical-illustration {
        margin: 1rem 0;
    }
    
    .medical-illustration svg {
        width: 120px;
        height: 120px;
    }
    
    .features-container {
        gap: 0.6rem;
        margin-bottom: 20px;
    }
    
    .login-feature-item {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
    }
}
</style> 