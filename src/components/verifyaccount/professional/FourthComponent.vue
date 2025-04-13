<template>
    <div class="row">
        <h3 class="form-title text-decoration-underline">Fotografías</h3>
        <div class="row mb-3">
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <div class="profile-photo-container">
                        <div class="profile-photo">
                                    <span v-if="!fourthStepForm.facade_photo"
                                          class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                            <img class="w-50" v-else :src="fourthStepForm.facade_photo"
                                 alt="Foto de perfil">
                        </div>
                        <input type="file" id="facade_photo" @change="handleFacadePhotoUpload" accept="image/*"
                               class="d-none">
                        <label for="facade_photo" class="btn btn-sm btn-primary mt-2">Fachada</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <div class="profile-photo-container">
                        <div class="profile-photo">
                                    <span v-if="!fourthStepForm.waiting_room_photo"
                                          class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                            <img class="w-50" v-else :src="fourthStepForm.waiting_room_photo"
                                 alt="Foto de perfil">
                        </div>
                        <input type="file" id="waiting_room_photo" @change="handleWaitingRoomPhotoUpload" accept="image/*"
                               class="d-none">
                        <label for="waiting_room_photo" class="btn btn-sm btn-primary mt-2">Sala de espera (opcional)</label>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <div class="profile-photo-container">
                        <div class="profile-photo">
                                    <span v-if="!fourthStepForm.office_photo"
                                          class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                            <img class="w-50" v-else :src="fourthStepForm.office_photo"
                                 alt="Foto de perfil">
                        </div>
                        <input type="file" id="room_photo" @change="handleOfficeRoomPhotoUpload" accept="image/*"
                               class="d-none">
                        <label for="room_photo" class="btn btn-sm btn-primary mt-2">Consultorio (opcional)</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import imageCompression from "browser-image-compression";
/*import swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;*/

export default {
    name: "FourthStepComponent",
    data() {
        return {
            showLocationPicker: false,
            fourthStepForm: {
                facade_photo: null,
                waiting_room_photo: null,
                office_photo: null,
            },
        };
    },
    methods: {
        async handleFacadePhotoUpload(event) {
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
                    this.fourthStepForm.facade_photo = reader.result;
                    this.isLoading = false;
                };
                reader.readAsDataURL(compressedFile);

                // Guarda el archivo comprimido para usarlo al enviar
                this.facadePhotoFile = compressedFile;
            } catch (error) {
                console.error("Error al procesar la imagen:", error);
                this.isLoading = false;
            }
        },
        async handleWaitingRoomPhotoUpload(event) {
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
                    this.fourthStepForm.waiting_room_photo = reader.result;
                    this.isLoading = false;
                };
                reader.readAsDataURL(compressedFile);

                // Guarda el archivo comprimido para usarlo al enviar
                this.waitingRoomPhotoFile = compressedFile;
            } catch (error) {
                console.error("Error al procesar la imagen:", error);
                this.isLoading = false;
            }
        },
        async handleOfficeRoomPhotoUpload(event) {
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
                    this.fourthStepForm.office_photo = reader.result;
                    this.isLoading = false;
                };
                reader.readAsDataURL(compressedFile);

                // Guarda el archivo comprimido para usarlo al enviar
                this.officePhotoFile = compressedFile;
            } catch (error) {
                console.error("Error al procesar la imagen:", error);
                this.isLoading = false;
            }
        },sendFormData() {
            this.$emit("update-fourth-step-data", this.fourthStepForm);
        }
    },
    watch: {
        thirdStepForm: {
            deep: true,
            handler() {
                this.sendFormData();
            }
        }
    }
}

</script>

<style scoped>

</style>