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
                                            <label for="first_name" class="form-label">Nombre</label>
                                            <input type="text" id="first_name" v-model="patient_form.first_name"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="last_name" class="form-label">Apellido</label>
                                            <input type="text" id="last_name" v-model="patient_form.last_name"
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
                                            <label for="emergency_contact_name" class="form-label">Contacto de
                                                Emergencia</label>
                                            <input type="text" id="emergency_contact_name"
                                                   v-model="patient_form.emergency_contact_name"
                                                   class="form-control" required>
                                        </div>

                                        <div class="mb-3">
                                            <label for="emergency_contact_phone" class="form-label">Teléfono de
                                                Emergencia</label>
                                            <input type="number" id="emergency_contact_phone"
                                                   v-model="patient_form.emergency_contact_phone"
                                                   class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 2 -->
                            <div class="carousel-item" :class="{ active: currentStep === 2 }">
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
                                    <div class="form-check mt-3 d-flex justify-content-start">
                                        <input class="form-check-input" type="checkbox" id="terms"
                                               v-model="patient_form.accept_terms" required>
                                        <label class="form-check-label ms-2" for="terms">Acepto los términos</label>
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
                                        <label for="confirm_password" class="form-label">Confirmar
                                            Contraseña</label>
                                        <input type="password" id="confirm_password"
                                               v-model="patient_form.confirm_password"
                                               class="form-control" required>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Paso 5 -->
                        <div class="carousel-item" :class="{ active: currentStep === 5 }">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="home_address_1" class="form-label">Dirección Principal</label>
                                        <div class="input-group">
                                            <input type="text" id="home_address_1" v-model="patient_form.home_address_1"
                                                   class="form-control" required readonly>
                                            <button type="button" class="btn btn-primary"
                                                    @click="openLocationPicker('home_address_1')">
                                                <span class="material-icons">location_on</span>
                                            </button>
                                        </div>
                                        <small class="text-muted"
                                               v-if="patient_form.home_latitude && patient_form.home_longitude">
                                            Lat: {{ patient_form.home_latitude }}, Lng: {{
                                                patient_form.home_longitude
                                            }}
                                        </small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="home_address_reference" class="form-label">Dirección Secundaria
                                            (referencia)</label>
                                        <input type="text" id="home_address_reference"
                                               v-model="patient_form.home_address_reference"
                                               class="form-control" required>
                                    </div>
                                </div>
                            </div>

                            <LocationPickerComponent v-if="showLocationPicker"
                                                     @location-selected="handleLocationSelected"
                                                     @close="showLocationPicker = false"/>
                        </div>

                        <!-- Botones de navegación -->
                        <div class="navigation-footer">
                            <div class="navigation-buttons">
                                <button title="Cancelar" type="button" class="btn btn-secondary"
                                        @click="$emit('close')">
                                    <span class="material-icons">close</span>
                                </button>
                                <button title="Anterior" class="btn btn-primary" type="button"
                                        @click="prevStep" v-show="currentStep > 1">
                                    <span class="material-icons">arrow_back</span>
                                </button>
                                <button title="Siguiente" class="btn btn-primary" type="button"
                                        @click="nextStep" v-show="currentStep < totalSteps"
                                        :disabled="validateFirstStep() || (currentStep === 2 && !patient_form.accept_terms)
                                        || (currentStep === 4 && patient_form.email === '' || patient_form.password !== patient_form.confirm_password) ||
                                            (currentStep === 5 && !patient_form.home_address_1)">
                                    <span class="material-icons">arrow_forward</span>
                                </button>
                                <button title="Registrar" type="submit" class="btn btn-success"
                                        v-show="currentStep === totalSteps"
                                        :disabled="!patient_form.accept_terms || patient_form.password !== patient_form.confirm_password">
                                    <span class="material-icons">assignment_turned_in</span>
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
import swal from "sweetalert2";
import LocationPickerComponent from "@/components/locationpicker/LocationPickerComponent.vue";

const API_URL = 'http://localhost:8000/api';

export default {
    components: {
        LocationPickerComponent
    },
    data() {
        return {
            currentStep: 1,
            totalSteps: 5,
            showLocationPicker: false,
            activeAddressField: null,
            patient_form: {
                photo: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                date_of_birth: '',
                gender: '',
                home_address_1: '',
                home_latitude: '',
                home_longitude: '',
                home_address_reference: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
                password: '',
                confirm_password: '',
                accept_terms: false,
                user_rol: 'paciente'
            },
            errors: {}
        };
    },
    computed: {
        progressWidth() {
            return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        }
    },
    methods: {
        register() {
            fetch(API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.patient_form)
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    if (!responseData.status) {
                        if (responseData.errors) {
                            this.errors = responseData.errors;
                            const errorMessage = Object.values(responseData.errors).join('\n');
                            swal.fire({
                                icon: 'error',
                                title: '¡Error!',
                                text: errorMessage
                            });
                            return;
                        }

                        swal.fire({
                            icon: 'error',
                            title: '¡Error!',
                            text: 'Ocurrió un error al registrar el paciente'
                        });
                        return;
                    }

                    swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'El paciente ha sido registrado correctamente'
                    }).then(() => {
                        // Acceder al access_token dentro del objeto data
                        localStorage.setItem("token", responseData.data.access_token);
                        this.$emit('close');
                    });
                })
                .catch(error => {
                    console.error(error);
                });
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
        },
        validateFirstStep() {
            const requiredFields = [
                'first_name',
                'last_name',
                'date_of_birth',
                'gender',
                'phone',
                'emergency_contact_name',
                'emergency_contact_phone',
            ];

            return !requiredFields.every(field => {
                const value = this.patient_form[field];
                return value && value !== '' && value !== 'Seleccione un género';
            });
        },
        openLocationPicker(field) {
            this.activeAddressField = field;
            this.showLocationPicker = true;
        },

        handleLocationSelected(location) {
            const field = this.activeAddressField;
            this.patient_form[field] = location.address;
            this.patient_form.home_latitude = location.lat;
            this.patient_form.home_longitude = location.lng;
            this.showLocationPicker = false;
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

.navigation-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    max-width: 900px;
    margin: 0 auto;
}

.form-container {
    background: white;
    padding: 40px 40px 100px; /* Added padding bottom for fixed footer */
    border-radius: 15px;
    width: 95%;
    max-width: 1200px;
    overflow-y: auto;
    max-height: 90vh;
}

/* Remove old navigation styles */
.carousel-navigation {
    display: none;
}

.progress {
    height: 20px;
    border-radius: 10px;
    margin: 0 auto 2rem;
    max-width: 900px;
}
</style>
