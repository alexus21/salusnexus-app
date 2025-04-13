<template>
    <div class="row">
        <h3 class="form-title text-decoration-underline">Datos médicos</h3>
        <div class="col-md-6">
            <div class="text-center mb-4">
                <div class="profile-photo-container">
                    <div class="profile-photo">
                                    <span v-if="!secondStepForm.license_image_path"
                                          class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                        <img class="w-50" v-else :src="secondStepForm.license_image_path"
                             alt="Foto de perfil">
                    </div>
                    <input type="file" id="photo" @change="handlePhotoUpload" accept="image/*"
                           class="d-none">
                    <label for="photo" class="btn btn-sm btn-primary mt-2">Agrega una fotografía
                        de
                        tu licencia médica</label>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">fingerprint</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           v-model="secondStepForm.license_number"
                           class="form-control ms-3"
                           placeholder="Número de licencia"
                           required>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">policy</span>
                <div class="input-group">
                    <select class="form-select ms-3"
                            v-model="secondStepForm.license_authority">
                        <option disabled value="">Entidad emisora de la licencia</option>
                        <option value="Ministerio de Salud">Ministerio de Salud</option>
                        <option value="Consejo Superior de Salud Pública">Consejo Superior de
                            Salud Pública
                        </option>
                        <option value="Departamento de Comercio EE. UU.">Departamento de
                            Comercio EE. UU.
                        </option>
                        <option value="OMS/OPS">OMS/OPS</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-3">
                    <span class="text-secondary">Emisión:</span>
                </div>
                <div class="col-12 col-md-9">
                    <div class="input-group">
                        <input
                            id="issue_date"
                            type="date"
                            v-model="secondStepForm.issue_date"
                            class="form-control"
                            placeholder="Fecha de emisión"
                        />
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12 col-md-3">
                    <span class="text-secondary">Expiración:</span>
                </div>
                <div class="col-12 col-md-9">
                    <div class="input-group">
                        <input
                            id="expiration_date"
                            type="date"
                            v-model="secondStepForm.expiration_date"
                            class="form-control"
                            placeholder="Fecha de expiración"
                        />
                    </div>
                </div>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">policy</span>
                <div class="input-group">
                    <select class="form-select ms-3" v-model="secondStepForm.speciality_id">
                        <option disabled value="">Seleccionar especialidad médica</option>
                        <option v-for="speciality in specialities" :key="speciality.id"
                                :value="speciality.id">
                            {{ speciality.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">book</span>
                <input type="text"
                       id="emergency_contact_name"
                       v-model="secondStepForm.years_of_experience"
                       class="form-control ms-3"
                       placeholder="Años de experiencia"
                       @input="formatExperience"
                       maxlength="2"
                       required>
            </div>
        </div>
    </div>
</template>

<script>

import imageCompression from "browser-image-compression";
import swal from "sweetalert2";

export default {
    name: "SecondStepComponent",
    components: {},
    data() {
        return {
            showLocationPicker: false,
            secondStepForm: {
                license_number: '', //
                license_authority: '', //
                issue_date: '', //
                expiration_date: '', //
                speciality_id: '', //
                license_image_path: null, //
                years_of_experience: '',
            },
            specialities: {},
            date: new Date(),
            minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
            maxDate: new Date(),
        };
    },
    mounted() {
        this.fetchSpecialities();
    },
    methods: {
        async fetchSpecialities() {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/specialities`, {
                    method: 'GET',
                });

                const data = await response.json();

                if (!data.status) {
                    if (data.error) {
                        this.errors = data.error;
                        const errorMessage = Object.values(this.errors).flat().join('\n');
                        swal.fire({
                            icon: 'error',
                            title: '¡Error al obtener la lista de especialidades!',
                            text: errorMessage
                        });
                        return;
                    }
                }

                this.specialities = data;
            } catch (error) {
                console.error("Error al obtener las especialidades: " + error.message);
                swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: "Ocurrió un error al obtener la lista de especialidades médicas. Por favor, inténtelo de nuevo."
                });
            }
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
                    this.secondStepForm.profile_photo_path = reader.result;
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
        formatExperience() {
            // Eliminar cualquier carácter que no sea dígito
            let value = this.secondStepForm.years_of_experience.replace(/\D/g, '');
            // Si hay más de 2 dígitos, truncar a 2
            if (value.length > 2) {
                value = value.slice(0, 2);
            }
            // Formatear el número de teléfono
            this.secondStepForm.years_of_experience = value;

            this.$emit('update-form', this.secondStepForm);
        },
    }
}

</script>

<style scoped>

</style>