<template>
    <transition name="fade">
        <div class="register-form">
            <div class="form-container">
                <h2 class="form-title">Registro de pacientes</h2>
                <form @submit.prevent="register">
                    <div id="carouselExample" class="carousel slide">
                        <!-- Barra de progreso -->
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar"
                                 :style="{ width: progressWidth + '%' }"
                                 aria-valuemin="0" aria-valuemax="100">
                                Paso {{ currentStep }} de {{ totalSteps }}
                            </div>
                        </div>

                        <div class="carousel-inner">
                            <!-- Paso 1 -->
                            <div class="carousel-item" :class="{ active: currentStep === 1 }">
                                <div class="row">
                                    <!-- Primera columna -->
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="full_name" class="form-label">Nombre completo</label>
                                            <input type="text" id="full_name" v-model="patient_form.full_name"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="date_of_birth" class="form-label">Fecha de Nacimiento</label>
                                            <input type="date" id="date_of_birth" v-model="patient_form.date_of_birth"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="gender" class="form-label">Género</label>
                                            <select id="gender" v-model="patient_form.gender" class="form-select"
                                                    required>
                                                <option value="">Seleccione un género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Segunda columna -->
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="phone" class="form-label">Teléfono principal</label>
                                            <input type="number" id="phone" v-model="patient_form.phone"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="emergency_contact" class="form-label">Contacto de
                                                Emergencia</label>
                                            <input type="text" id="emergency_contact"
                                                   v-model="patient_form.emergency_contact"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="emergency_phone" class="form-label">Teléfono de
                                                Emergencia</label>
                                            <input type="number" id="emergency_phone"
                                                   v-model="patient_form.emergency_phone"
                                                   class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 2 -->
                            <div class="carousel-item" :class="{ active: currentStep === 2 }">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="address1" class="form-label">Dirección Principal</label>
                                            <input type="text" id="address1" v-model="patient_form.address1"
                                                   class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="address2" class="form-label">Dirección Secundaria</label>
                                            <input type="text" id="address2" v-model="patient_form.address2"
                                                   class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 3 -->
                            <div class="carousel-item" :class="{ active: currentStep === 3 }">
                                <div class="text-center mb-4">
                                    <div class="profile-photo-container">
                                        <div class="profile-photo">
                                            <span v-if="!patient_form.photo" class="material-icons photo-placeholder">
                                                add_a_photo
                                            </span>
                                            <img v-else :src="patient_form.photo" alt="Foto de perfil">
                                        </div>
                                        <input type="file" id="photo" @change="handlePhotoUpload" accept="image/*"
                                               class="d-none">
                                        <label for="photo" class="btn btn-sm btn-primary mt-2">Subir foto</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 4 -->
                            <div class="carousel-item" :class="{ active: currentStep === 4 }">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="email" class="form-label">Correo Electrónico</label>
                                            <input type="email" id="email" v-model="patient_form.email"
                                                   class="form-control" required>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Contraseña</label>
                                            <input type="password" id="password" v-model="patient_form.password"
                                                   class="form-control" required>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="confirm_password" class="form-label">Confirmar Contraseña</label>
                                            <input type="password" id="confirm_password" v-model="patient_form.confirm_password"
                                                   class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 5 -->
                            <div class="carousel-item" :class="{ active: currentStep === 5 }">
                                <div class="text-center">
                                    <textarea class="form-control" rows="6" readonly>
TÉRMINOS Y CONDICIONES DE USO

1. Aceptación de Términos
Al registrarse en nuestro sistema, usted acepta estos términos y condiciones en su totalidad.

2. Privacidad de Datos
- Sus datos personales serán tratados con estricta confidencialidad.
- La información médica será accesible solo por personal autorizado.
- No compartiremos su información con terceros sin su consentimiento.

3. Responsabilidades del Paciente
- Proporcionar información veraz y actualizada.
- Mantener sus datos de contacto actualizados.
- Cumplir con las citas programadas o cancelar con anticipación.

4. Uso del Servicio
- El acceso a la plataforma es personal e intransferible.
- Debe mantener seguras sus credenciales de acceso.
- No está permitido el uso fraudulento del sistema.

5. Comunicaciones
Acepta recibir notificaciones relacionadas con sus citas y tratamientos médicos.
                                    </textarea>
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" id="terms"
                                               v-model="patient_form.accept_terms" required>
                                        <label class="form-check-label" for="terms">Acepto los términos</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botones de navegación -->
                        <div class="carousel-navigation d-flex justify-content-center gap-3 mt-4">
                            <button type="button" class="btn btn-secondary" @click="$emit('close')">
                                Cancelar
                            </button>
                            <button class="btn btn-primary" type="button"
                                    @click="prevStep" v-show="currentStep > 1">
                                Anterior
                            </button>
                            <button class="btn btn-primary" type="button"
                                    @click="nextStep" v-show="currentStep < totalSteps">
                                Siguiente
                            </button>
                            <button type="submit" class="btn btn-success"
                                    v-show="currentStep === totalSteps"
                                    :disabled="!patient_form.accept_terms">
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,
            totalSteps: 5,
            patient_form: {
                photo: '',
                full_name: '',
                phone: '',
                email: '',
                date_of_birth: '',
                gender: '',
                address1: '',
                address2: '',
                emergency_contact: '',
                emergency_phone: '',
                accept_terms: false
            }
        };
    },
    computed: {
        progressWidth() {
            return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        }
    },
    methods: {
        register() {
            alert("Registro enviado");
        },
        handlePhotoUpload(event) {
            const reader = new FileReader();
            reader.onload = () => {
                this.patient_form.photo = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        },
        nextStep() {
            if (this.currentStep < this.totalSteps) this.currentStep++;
        },
        prevStep() {
            if (this.currentStep > 1) this.currentStep--;
        }
    }
};
</script>


<style scoped>
.profile-photo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f8f9fa;
    cursor: pointer;
}

.photo-placeholder {
    font-size: 48px;
    color: #adb5bd;
}

.profile-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.register-form {
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
    padding: 40px;
    border-radius: 15px;
    width: 95%;
    max-width: 1200px;
}

.form-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 0 20px;
}

.carousel-inner {
    margin: 0 auto;
    max-width: 900px;
}

.carousel-navigation {
    margin: 2rem auto;
    max-width: 900px;
}

.progress {
    height: 20px;
    border-radius: 10px;
    margin: 0 auto 2rem;
    max-width: 900px;
}
</style>
