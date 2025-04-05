<template>
    <div class="register-form">
        <div class="form-container">
            <h2 class="form-title text-decoration-underline">Verifica tu cuenta</h2>
            <form @submit.prevent="register">
                <div class="row">
                    <div class="col-md-6">
                        <div class="text-center mb-4">
                            <div class="profile-photo-container">
                                <div class="profile-photo">
                                    <span v-if="!patient_form.profile_photo_path"
                                          class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                                    <img class="w-50" v-else :src="patient_form.profile_photo_path"
                                         alt="Foto de perfil">
                                </div>
                                <input type="file" id="photo" @change="handlePhotoUpload" accept="image/*"
                                       class="d-none">
                                <label for="photo" class="btn btn-sm btn-primary mt-2">Subir foto</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">home</span>
                            <div class="input-group">
                                <input type="text" id="home_address" name="home_address"
                                       v-model="patient_form.home_address"
                                       class="form-control ms-3" required readonly
                                       placeholder="Dirección de residencia">
                                <button type="button" class="btn btn-primary"
                                        @click="openLocationPicker('home_address')">
                                    <span class="material-icons">location_on</span>
                                </button>
                            </div>
                        </div>
                        <small class="text-muted" v-if="patient_form.home_latitude && patient_form.home_longitude">
                            Lat: {{ patient_form.home_latitude }}, Lng: {{ patient_form.home_longitude }}
                        </small>
                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">location_city</span>
                            <input type="text" id="home_address_reference" v-model="patient_form.home_address_reference"
                                   class="form-control ms-3" required placeholder="Dirección de referencia">
                        </div>
                        <LocationPickerComponent v-if="showLocationPicker"
                                                 @location-selected="handleLocationSelected"
                                                 @close="showLocationPicker = false"/>

                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">fingerprint</span>
                            <input type="text" id="dui" v-model="patient_form.dui"
                                   class="form-control ms-3" required placeholder="Documento de identidad (DUI)">
                        </div>

                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">contact_emergency</span>
                            <input type="text" id="dui" v-model="patient_form.emergency_contact_name"
                                   class="form-control ms-3" required placeholder="Contacto de emergencia">
                        </div>

                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">emergency</span>
                            <input type="text" id="dui" v-model="patient_form.emergency_contact_phone"
                                   class="form-control ms-3" required placeholder="Teléfono de contacto de emergencia">
                        </div>
                    </div>
                </div>

                <!--Botones-->
                <div class="navigation-footer">
                    <div class="navigation-buttons">
                        <button title="Cancelar" type="button" class="btn btn-secondary" @click="handleClose">
                            <span class="material-icons">close</span>
                        </button>
                        <button title="Registrar" type="submit" class="btn btn-success ms-3"
                                :disabled="patient_form.home_address_reference === ''"
                                @click="verifyAccount">
                            <span class="material-icons">verified</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import LocationPickerComponent from "@/components/locationpicker/LocationPickerComponent.vue";
import imageCompression from 'browser-image-compression';
import swal from "sweetalert2";

export default {
    name: 'VerifyAccountComponent',
    components: {
        LocationPickerComponent
    },
    data() {
        return {
            showLocationPicker: false,
            patient_form: {
                home_address: '',
                home_latitude: null,
                home_longitude: null,
                home_address_reference: '',
                dui: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
                profile_photo_path: null,
            },
            photoFile: null,
            errors: {},
        }
    },
    mounted() {
        this.checkIfIsVerified();
    },
    methods: {
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
        },
        handleClose() {
            this.$router.push({name: 'Home'});
        },
        async handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validar tipo de archivo
            if (!file.type.match('image.*')) {
                console.error("Por favor selecciona solo imágenes");
                return;
            }

            try {
                // Mostrar indicador de carga
                this.isLoading = true;

                // Opciones para la compresión
                const options = {
                    maxSizeMB: 1,              // Tamaño máximo en MB
                    maxWidthOrHeight: 800,     // Dimensión máxima
                    useWebWorker: true         // Usar Web Worker para no bloquear UI
                };

                // Comprimir la imagen
                const compressedFile = await imageCompression(file, options);

                // Generar vista previa
                const reader = new FileReader();
                reader.onload = () => {
                    this.patient_form.profile_photo_path = reader.result;
                    this.isLoading = false;
                };
                reader.readAsDataURL(compressedFile);

                // Guarda el archivo comprimido para usarlo al enviar
                this.photoFile = compressedFile;
            } catch (error) {
                console.error("Error al procesar la imagen:", error);
                this.isLoading = false;
            }
        },
        async verifyAccount() {
            try {
                const formData = new FormData();

                // Agregar los datos del formulario
                formData.append('home_address', this.patient_form.home_address);
                formData.append('home_latitude', this.patient_form.home_latitude);
                formData.append('home_longitude', this.patient_form.home_longitude);
                formData.append('home_address_reference', this.patient_form.home_address_reference);
                formData.append('dui', this.patient_form.dui);
                formData.append('emergency_contact_name', this.patient_form.emergency_contact_name);
                formData.append('emergency_contact_phone', this.patient_form.emergency_contact_phone);

                // Agregar el archivo directamente si existe
                if (this.photoFile) {
                    formData.append('profile_photo_path', this.photoFile);
                }

                // Realizar la petición con fetch
                await fetch(`${process.env.VUE_APP_API_URL}/user-verification`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.status) {
                            if (data.error) {
                                this.errors = data.error;
                                const errorMessage = Object.values(this.errors).flat().join('\n');
                                swal.fire({
                                    icon: 'error',
                                    title: '¡Error!',
                                    text: errorMessage
                                });
                                return;
                            }
                        }
                        swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: data.message
                        }).then(() => {
                            this.$router.push({name: 'Home'});
                        });
                    })
                    .catch(error => {
                        console.error("Error al verificar la cuenta: " + error.message);
                    });
            } catch (error) {
                console.error("Error al verificar la cuenta: " + error.message);
            }
        },
        async checkIfIsVerified(){
            await fetch(`${process.env.VUE_APP_API_URL}/is-verified`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if(data.status) {
                        swal.fire({
                            icon: 'info',
                            title: '¡Atención!',
                            text: data.message
                        }).then(() => {
                            this.$router.push({name: 'UserProfile'});
                        })
                    }
                })
                .catch(error => {
                    console.error("Error al verificar la cuenta: " + error.message);
                });
        }
    }
}
</script>

<style scoped>

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

</style>