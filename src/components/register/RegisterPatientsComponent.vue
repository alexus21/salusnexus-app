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
                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons me-2">person</span>
                                            <input type="text" id="first_name" v-model="patient_form.first_name"
                                                   class="form-control" required placeholder="Nombre">
                                        </div>

                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">badge</span>
                                            <input type="text" id="last_name" v-model="patient_form.last_name"
                                                   class="form-control" required placeholder="Apellidos">
                                        </div>

                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">cake</span>
                                            <input
                                                    id="date_of_birth"
                                                    type="date"
                                                    v-model="patient_form.date_of_birth"
                                                    class="form-control"
                                                    readonly
                                                    placeholder="Fecha de Nacimiento"
                                                    @click="showDatePicker"
                                            />
                                        </div>
                                        <DatePicker
                                            class="form-control d-none"
                                            id="datePicker"
                                            expanded
                                            title-position="right"
                                            v-model="patient_form.date_of_birth"
                                            mode="date"
                                            :max-date="maxDate"
                                            :min-date="minDate"
                                            :value="new Date()"
                                            transition="fade"
                                            locale="es-SV"
                                            timezone="UTC"
                                            @dayclick="handleDayClick"
                                        />

                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">wc</span>
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
                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">phone</span>
                                            <input type="number" id="phone" v-model="patient_form.phone"
                                                   class="form-control" required placeholder="Teléfono" maxlength="20">
                                        </div>

                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">contact_emergency</span>
                                            <input type="text" id="emergency_contact_name"
                                                   v-model="patient_form.emergency_contact_name"
                                                   class="form-control" required placeholder="Contacto de Emergencia">
                                        </div>

                                        <div class="mb-3 d-flex align-items-center">
                                            <span class="material-icons">phone_in_talk</span>
                                            <input type="number" id="emergency_contact_phone"
                                                   v-model="patient_form.emergency_contact_phone"
                                                   class="form-control" required placeholder="Teléfono de Emergencia" maxlength="20">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 2 -->
                            <div class="carousel-item" :class="{ active: currentStep === 2 }">
                                <div class="text-center">
                                    <textarea class="form-control" rows="6" style="height: 50vh;" readonly>
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
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3 d-flex align-items-center">
                                        <span class="material-icons">email</span>
                                        <input type="email" id="email" v-model="patient_form.email"
                                               class="form-control" required placeholder="Correo electrónico">
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="mb-3 d-flex align-items-center">
                                        <span class="material-icons">lock</span>
                                        <input type="password" id="password" v-model="patient_form.password"
                                               class="form-control" required placeholder="Contraseña">
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="mb-3 d-flex align-items-center">
                                        <span class="material-icons">lock_open</span>
                                        <input type="password" id="confirm_password"
                                               v-model="patient_form.confirm_password"
                                               class="form-control" required placeholder="Repita su contraseña">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botones de navegación -->
                        <div class="navigation-footer">
                            <div class="navigation-buttons">
                                <button title="Cancelar"
                                        type="button"
                                        class="btn btn-secondary"
                                        @click="handleClose">
                                    <span class="material-icons">close</span>
                                </button>
                                <button title="Anterior" class="btn btn-primary" type="button"
                                        @click="prevStep" v-show="currentStep > 1">
                                    <span class="material-icons">arrow_back</span>
                                </button>
                                <button title="Siguiente"
                                        class="btn btn-primary"
                                        type="button"
                                        @click="nextStep"
                                        v-show="currentStep < totalSteps"
                                        :disabled="isNextStepDisabled">
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
// import { Calendar } from 'v-calendar';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


const API_URL = process.env.VUE_APP_API_URL;

export default {
    components: {
        // Calendar,
        DatePicker,
    },
    data() {
        return {
            currentStep: 1,
            totalSteps: 3,
            showLocationPicker: false,
            activeAddressField: null,
            patient_form: {
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                date_of_birth: new Date().toISOString().split('T')[0],
                gender: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
                password: '',
                confirm_password: '',
                accept_terms: false,
                user_rol: 'paciente'
            },
            errors: {},
            date: new Date(),
            minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
            maxDate: new Date(),
        };
    },
    computed: {
        progressWidth() {
            return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        },
        isNextStepDisabled() {
            switch (this.currentStep) {
                case 1:
                    return this.validateFirstStep();
                case 2:
                    return !this.patient_form.accept_terms;
                case 3:
                    return !this.patient_form.email ||
                        !this.patient_form.password ||
                        this.patient_form.password !== this.patient_form.confirm_password;
                default:
                    return false;
            }
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

                    localStorage.clear();

                    swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'El paciente ha sido registrado correctamente'
                    }).then(() => {
                        // Acceder al access_token dentro del objeto data
                        localStorage.setItem("token", responseData.data.access_token);
                        window.location.href = '/';
                    });
                })
                .catch(error => {
                    console.error(error);
                });
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
        loadSavedData() {
            // Load form data
            Object.keys(this.patient_form).forEach(key => {
                const savedValue = localStorage.getItem(key);
                if (savedValue) {
                    if (savedValue === 'true' || savedValue === 'false') {
                        this.patient_form[key] = savedValue === 'true';
                    } else {
                        this.patient_form[key] = savedValue;
                    }
                }
            });

            // Load and set current step
            const savedStep = localStorage.getItem('currentStep');

            if (savedStep) {
                this.currentStep = parseInt(savedStep, 10);

                this.$nextTick(() => {
                    this.currentStep = parseInt(savedStep, 10);
                });
            }
        },
        clearSavedData() {
            // Clear all form data
            Object.keys(this.patient_form).forEach(key => {
                localStorage.removeItem(key);
            });

            // Clear current step
            localStorage.removeItem('currentStep');
        },
        handleClose() {
            this.clearSavedData();
            this.$emit('close');
        },
        handleDayClick(day) {
            const selectedDate = day.date.toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];

            if (selectedDate <= today) {
                this.patient_form.date_of_birth = selectedDate;
                console.log(this.patient_form.date_of_birth);
            } else {
                console.log('Selected date is in the future and not allowed.');
            }

            this.hideDatePicker();
        },
        showDatePicker() {
            const datePicker = document.getElementById('datePicker');
            datePicker.classList.remove('d-none');
        },
        hideDatePicker() {
            const datePicker = document.getElementById('datePicker');
            datePicker.classList.add('d-none');
        }
    },
    mounted() {
        // Load saved data when component mounts
        this.loadSavedData();
        this.patient_form.date_of_birth = new Date().toISOString().split('T')[0];

        this.beforeUnloadHandler = () => {
            // Save all form data
            Object.entries(this.patient_form).forEach(([key, value]) => {
                if (value) {
                    localStorage.setItem(key, typeof value === 'boolean' ? value.toString() : value);
                }
            });

            // Save current step
            localStorage.setItem('currentStep', this.currentStep.toString());
        };
        window.addEventListener('beforeunload', this.beforeUnloadHandler);
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.beforeUnloadHandler);
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
    z-index: 9999;
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

input[type=text], input[type=password], input[type=email], input[type=date],input[type=number], select {
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #434ed1;
    border-radius: 0;
    padding: 10px;
}
</style>
