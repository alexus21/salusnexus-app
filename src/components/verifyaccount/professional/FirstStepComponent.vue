<template>
    <div class="row">
        <h3 class="form-title text-decoration-underline">Datos personales</h3>
        <div class="col-md-6">
            <div class="text-center mb-4">
                <div class="profile-photo-container">
                    <div class="profile-photo">
                        <div v-if="isLoading" class="spinner-container">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                            <p class="mt-2">Procesando imagen...</p>
                        </div>
                        <span v-if="!firstStepForm.profile_photo_path"
                              class="material-icons photo-placeholder">
                            add_a_photo
                        </span>
                        <img v-else :src="firstStepForm.profile_photo_path"
                             alt="Foto de perfil">
                    </div>
                    <input type="file" id="profile_photo_path" @change="handlePhotoUpload" accept="image/*"
                           class="d-none">
                    <label for="profile_photo_path" class="btn btn-sm btn-primary mt-2">
                        {{ isLoading ? 'Procesando...' : 'Agrega una fotografía' }}
                    </label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">home</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           v-model="firstStepForm.home_address"
                           class="form-control ms-3"
                           placeholder="Ubicación geográfica en el mapa"
                           required
                           readonly>
                    <button type="button"
                            class="btn btn-primary"
                            @click="openLocationPicker('home_address')">
                        <span class="material-icons">location_on</span>
                    </button>
                </div>
            </div>
            <small class="text-muted"
                   v-if="firstStepForm.home_latitude && firstStepForm.home_longitude">
                Lat: {{ firstStepForm.home_latitude }}, Lng: {{ firstStepForm.home_longitude }}
            </small>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">location_city</span>
                <input type="text"
                       id="home_address_reference"
                       v-model="firstStepForm.home_address_reference"
                       class="form-control ms-3"
                       placeholder="Dirección exacta"
                       required>
            </div>
            <LocationPickerComponent
                    v-if="showLocationPicker"
                    @location-selected="handleLocationSelected"
                    @close="showLocationPicker = false"/>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">fingerprint</span>
                <input type="text" id="dui"
                       v-model="firstStepForm.dui"
                       class="form-control ms-3"
                       maxlength="10"
                       placeholder="Documento de identidad (DUI)"
                       @input="formatDUI"
                       required>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">book</span>
                <textarea type="text"
                          id="emergency_contact_name"
                          v-model="firstStepForm.biography"
                          class="form-control ms-3"
                          placeholder="Biografía"
                          required>
                </textarea>
            </div>
        </div>
    </div>
</template>

<script>

import LocationPickerComponent from "@/components/locationpicker/LocationPickerComponent.vue";
import imageCompression from "browser-image-compression";

export default {
    name: "FirstStepComponent",
    components: {
        LocationPickerComponent
    },
    data() {
        return {
            showLocationPicker: false,
            firstStepForm: {
                home_address: '', //
                home_latitude: null, //
                home_longitude: null, //
                home_address_reference: '', //
                dui: '', //
                biography: '', //
                profile_photo_path: null, //
                profilePhotoFile: null,
            },
            isLoading: false,
        };
    },
    methods: {
        openLocationPicker(field) {
            this.activeAddressField = field;
            this.showLocationPicker = true;
        },
        handleLocationSelected(location) {
            const field = this.activeAddressField;
            this.firstStepForm[field] = location.address;
            this.firstStepForm.home_latitude = location.lat;
            this.firstStepForm.home_longitude = location.lng;
            this.showLocationPicker = false;
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
                    this.firstStepForm.profile_photo_path = reader.result;
                    this.isLoading = false;
                };
                reader.readAsDataURL(compressedFile);

                // Guarda el archivo comprimido para usarlo al enviar
                this.firstStepForm.profilePhotoFile = compressedFile;
            } catch (error) {
                console.error("Error al procesar la imagen:", error);
                this.isLoading = false;
            }
        },
        formatDUI() {
            // Eliminar cualquier carácter que no sea dígito
            let value = this.firstStepForm.dui.replace(/\D/g, '');

            // Si hay más de 9 dígitos, truncar a 9
            if (value.length > 9) {
                value = value.slice(0, 9);
            }

            // Si hay más de 8 dígitos, agregar el guion antes del último dígito
            if (value.length > 8) {
                this.firstStepForm.dui = value.slice(0, 8) + '-' + value.slice(8);
            } else {
                this.firstStepForm.dui = value;
            }
        },
        sendFormData() {
            this.$emit("update-first-step-data", this.firstStepForm);
        },
    },
    watch: {
        firstStepForm: {
            deep: true,
            handler() {
                this.sendFormData();
            }
        }
    }
}

</script>

<style scoped>
.spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.profile-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border: 2px solid #e9ecef;
}

.photo-placeholder {
    font-size: 48px;
    color: #adb5bd;
}
</style>