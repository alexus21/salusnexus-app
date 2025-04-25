<template>
    <div class="password-reset-container">
        <div class="password-reset-card">
            <div class="card-header">
                <div class="header-icon">
                    <i class="fas fa-lock-open"></i>
                </div>
                <h1>Restablecer Contraseña</h1>
                <p class="subtitle">Crea una nueva contraseña para acceder a tu cuenta</p>
            </div>

            <div v-if="!resetSuccess" class="form-container">
                <div class="progress-indicator">
                    <div class="progress-step completed">
                        <div class="step-circle"><i class="fas fa-envelope"></i></div>
                        <span class="step-text">Correo enviado</span>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step active">
                        <div class="step-circle"><i class="fas fa-lock"></i></div>
                        <span class="step-text">Nueva contraseña</span>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step">
                        <div class="step-circle"><i class="fas fa-check"></i></div>
                        <span class="step-text">Completado</span>
                    </div>
                </div>

                <form @submit.prevent="resetPassword">
                    <div class="form-group" :class="{ 'has-error': errors.password }">
                        <label for="password">Nueva contraseña</label>
                        <div class="password-input-container">
                            <input 
                                :type="showPassword ? 'text' : 'password'" 
                                id="password" 
                                v-model="password" 
                                class="form-control"
                                placeholder="Ingresa tu nueva contraseña"
                            />
                            <button 
                                type="button" 
                                class="password-toggle" 
                                @click="showPassword = !showPassword"
                            >
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                        <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
                        
                        <div class="password-strength-meter" v-if="password">
                            <div class="password-strength-label">
                                Seguridad: <span :class="strengthClass">{{ strengthText }}</span>
                            </div>
                            <div class="strength-bars">
                                <div class="strength-bar" :class="{ active: passwordStrength >= 1 }"></div>
                                <div class="strength-bar" :class="{ active: passwordStrength >= 2 }"></div>
                                <div class="strength-bar" :class="{ active: passwordStrength >= 3 }"></div>
                                <div class="strength-bar" :class="{ active: passwordStrength >= 4 }"></div>
                            </div>
                            <ul class="password-requirements">
                                <li :class="{ valid: password.length >= 8 }">
                                    <i :class="password.length >= 8 ? 'fas fa-check' : 'fas fa-times'"></i>
                                    Al menos 8 caracteres
                                </li>
                                <li :class="{ valid: /[A-Z]/.test(password) }">
                                    <i :class="/[A-Z]/.test(password) ? 'fas fa-check' : 'fas fa-times'"></i>
                                    Al menos una mayúscula
                                </li>
                                <li :class="{ valid: /[0-9]/.test(password) }">
                                    <i :class="/[0-9]/.test(password) ? 'fas fa-check' : 'fas fa-times'"></i>
                                    Al menos un número
                                </li>
                                <li :class="{ valid: /[^A-Za-z0-9]/.test(password) }">
                                    <i :class="/[^A-Za-z0-9]/.test(password) ? 'fas fa-check' : 'fas fa-times'"></i>
                                    Al menos un caracter especial
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="form-group" :class="{ 'has-error': errors.passwordConfirmation }">
                        <label for="password-confirmation">Confirma tu contraseña</label>
                        <div class="password-input-container">
                            <input 
                                :type="showConfirmPassword ? 'text' : 'password'" 
                                id="password-confirmation" 
                                v-model="passwordConfirmation" 
                                class="form-control"
                                placeholder="Vuelve a ingresar tu nueva contraseña"
                            />
                            <button 
                                type="button" 
                                class="password-toggle" 
                                @click="showConfirmPassword = !showConfirmPassword"
                            >
                                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                        <div class="error-message" v-if="errors.passwordConfirmation">{{ errors.passwordConfirmation }}</div>
                    </div>

                    <div class="form-group" v-if="apiError">
                        <div class="api-error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            {{ apiError }}
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="goToLogin">Cancelar</button>
                        <button type="submit" class="submit-btn" :disabled="isSubmitting">
                            <span v-if="!isSubmitting">Restablecer Contraseña</span>
                            <span v-else class="loading-spinner">
                                <i class="fas fa-spinner fa-spin"></i> Procesando...
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <div v-else class="success-container">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>¡Contraseña restablecida con éxito!</h2>
                <p>Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.</p>
                <button class="login-btn" @click="goToLogin">Iniciar Sesión</button>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'PasswordResetView',
    props: {
        token: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            password: '',
            passwordConfirmation: '',
            showPassword: false,
            showConfirmPassword: false,
            isSubmitting: false,
            resetSuccess: false,
            apiError: '',
            errors: {
                password: '',
                passwordConfirmation: ''
            }
        };
    },
    computed: {
        passwordStrength() {
            let strength = 0;
            
            // Longitud mínima
            if (this.password.length >= 8) strength++;
            
            // Contiene mayúsculas y minúsculas
            if (/[A-Z]/.test(this.password) && /[a-z]/.test(this.password)) strength++;
            
            // Contiene números
            if (/[0-9]/.test(this.password)) strength++;
            
            // Contiene caracteres especiales
            if (/[^A-Za-z0-9]/.test(this.password)) strength++;
            
            return strength;
        },
        strengthText() {
            const texts = ['Débil', 'Regular', 'Buena', 'Fuerte'];
            return texts[Math.min(this.passwordStrength, 3)];
        },
        strengthClass() {
            const classes = ['strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
            return classes[Math.min(this.passwordStrength, 3)];
        }
    },
    methods: {
        validateForm() {
            let isValid = true;
            this.errors.password = '';
            this.errors.passwordConfirmation = '';
            
            if (!this.password) {
                this.errors.password = 'La contraseña es obligatoria';
                isValid = false;
            } else if (this.password.length < 8) {
                this.errors.password = 'La contraseña debe tener al menos 8 caracteres';
                isValid = false;
            }
            
            if (!this.passwordConfirmation) {
                this.errors.passwordConfirmation = 'Debes confirmar tu contraseña';
                isValid = false;
            } else if (this.password !== this.passwordConfirmation) {
                this.errors.passwordConfirmation = 'Las contraseñas no coinciden';
                isValid = false;
            }
            
            return isValid;
        },
        
        async resetPassword() {
            if (!this.validateForm()) return;
            
            this.isSubmitting = true;
            this.apiError = '';
            
            try {
                const API_URL = process.env.VUE_APP_API_URL || 'https://api.example.com';
                const response = await fetch(`${API_URL}/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: this.token,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.passwordConfirmation
                    })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Error al restablecer la contraseña');
                }
                
                this.resetSuccess = true;
                
            } catch (error) {
                console.error('Error al restablecer la contraseña:', error);
                this.apiError = error.message || 'Ha ocurrido un error al restablecer tu contraseña. Por favor, inténtalo de nuevo.';
                
                Swal.fire({
                    title: 'Error',
                    text: this.apiError,
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
                
            } finally {
                this.isSubmitting = false;
            }
        },
        
        goToLogin() {
            this.$router.push({ name: 'Login' });
        }
    }
};
</script>

<style scoped>
.password-reset-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f4f8ff 0%, #eaf2fb 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 15px;
}

.password-reset-card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 550px;
    overflow: hidden;
}

.card-header {
    background-color: #3B82F6;
    color: white;
    padding: 30px;
    text-align: center;
    position: relative;
}

.header-icon {
    background-color: rgba(255, 255, 255, 0.2);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.header-icon i {
    font-size: 32px;
}

.card-header h1 {
    margin: 0 0 10px;
    font-size: 28px;
    font-weight: 700;
}

.card-header .subtitle {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
}

.form-container {
    padding: 30px;
}

.progress-indicator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
    flex: 1;
}

.step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6B7280;
    margin-bottom: 8px;
    transition: all 0.3s ease;
}

.progress-step.completed .step-circle {
    background-color: #10B981;
    color: white;
}

.progress-step.active .step-circle {
    background-color: #3B82F6;
    color: white;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.step-text {
    font-size: 12px;
    color: #6B7280;
    max-width: 80px;
}

.progress-step.completed .step-text,
.progress-step.active .step-text {
    color: #1F2937;
    font-weight: 500;
}

.progress-line {
    flex-grow: 1;
    height: 3px;
    background-color: #E5E7EB;
    position: relative;
    z-index: 0;
}

.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #4B5563;
}

.form-control {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    background-color: #F9FAFB;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    background-color: white;
}

.password-input-container {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.password-toggle:hover {
    color: #1F2937;
}

.password-strength-meter {
    margin-top: 15px;
    padding: 12px;
    background-color: #F3F4F6;
    border-radius: 8px;
}

.password-strength-label {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #4B5563;
}

.strength-weak { color: #EF4444; }
.strength-fair { color: #F59E0B; }
.strength-good { color: #10B981; }
.strength-strong { color: #047857; }

.strength-bars {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
}

.strength-bar {
    height: 6px;
    flex: 1;
    background-color: #E5E7EB;
    border-radius: 3px;
}

.strength-bar.active:nth-child(1) { background-color: #EF4444; }
.strength-bar.active:nth-child(2) { background-color: #F59E0B; }
.strength-bar.active:nth-child(3) { background-color: #10B981; }
.strength-bar.active:nth-child(4) { background-color: #047857; }

.password-requirements {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #6B7280;
}

.password-requirements li {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}

.password-requirements li i {
    margin-right: 8px;
    width: 16px;
}

.password-requirements li.valid {
    color: #10B981;
}

.password-requirements li:not(.valid) i {
    color: #EF4444;
}

.form-group.has-error .form-control {
    border-color: #EF4444;
    background-color: #FEF2F2;
}

.error-message {
    color: #EF4444;
    font-size: 14px;
    margin-top: 6px;
}

.api-error-message {
    background-color: #FEF2F2;
    color: #B91C1C;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.api-error-message i {
    margin-right: 8px;
    font-size: 16px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.cancel-btn {
    padding: 12px 20px;
    background-color: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    color: #4B5563;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancel-btn:hover {
    background-color: #F3F4F6;
    border-color: #D1D5DB;
}

.submit-btn {
    padding: 12px 24px;
    background-color: #3B82F6;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 200px;
}

.submit-btn:hover:not(:disabled) {
    background-color: #2563EB;
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.loading-spinner i {
    margin-right: 8px;
}

.success-container {
    padding: 40px 30px;
    text-align: center;
}

.success-icon {
    font-size: 70px;
    color: #10B981;
    margin-bottom: 20px;
}

.success-container h2 {
    font-size: 24px;
    color: #1F2937;
    margin-bottom: 16px;
}

.success-container p {
    color: #6B7280;
    margin-bottom: 30px;
    line-height: 1.5;
}

.login-btn {
    padding: 12px 30px;
    background-color: #3B82F6;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 16px;
}

.login-btn:hover {
    background-color: #2563EB;
}

@media (max-width: 576px) {
    .password-reset-container {
        padding: 0;
    }
    
    .password-reset-card {
        border-radius: 0;
        max-width: 100%;
        min-height: 100vh;
    }
    
    .card-header {
        padding: 25px 20px;
    }
    
    .form-container {
        padding: 20px;
    }
    
    .form-actions {
        flex-direction: column;
        gap: 12px;
    }
    
    .cancel-btn, .submit-btn, .login-btn {
        width: 100%;
    }
    
    .progress-indicator {
        display: none;
    }
}
</style> 