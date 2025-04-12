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

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">location_city</span>
                <input type="text"
                       id="home_address_reference"
                       v-model="secondStepForm.issue_date"
                       class="form-control ms-3"
                       placeholder="Dirección"
                       required>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">fingerprint</span>
                <input type="text" id="dui"
                       v-model="secondStepForm.expiration_date"
                       class="form-control ms-3"
                       maxlength="10"
                       placeholder="Documento de identidad (DUI)"
                       @input="formatDUI"
                       required>
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
                       v-model="secondStepForm.biography"
                       class="form-control ms-3"
                       placeholder="Años de experiencia"
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
    components: {
    },
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
                            title: '¡Error!',
                            text: errorMessage
                        });
                        return;
                    }
                }

                this.specialities = data;
                console.log(this.specialities);
            } catch (error) {
                console.error("Error al obtener las especialidades: " + error.message);
                swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: "Ocurrió un error al obtener la lista de especialidades médicas. Por favor, inténtelo de nuevo."
                });
            }
        },
        openLocationPicker(field) {
            this.activeAddressField = field;
            this.showLocationPicker = true;
        },
        handleLocationSelected(location) {
            const field = this.activeAddressField;
            this.secondStepForm[field] = location.address;
            this.secondStepForm.home_latitude = location.lat;
            this.secondStepForm.home_longitude = location.lng;
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
        formatDUI() {
            // Eliminar cualquier carácter que no sea dígito
            let value = this.secondStepForm.dui.replace(/\D/g, '');

            // Si hay más de 9 dígitos, truncar a 9
            if (value.length > 9) {
                value = value.slice(0, 9);
            }

            // Si hay más de 8 dígitos, agregar el guion antes del último dígito
            if (value.length > 8) {
                this.secondStepForm.dui = value.slice(0, 8) + '-' + value.slice(8);
            } else {
                this.secondStepForm.dui = value;
            }
        },
        formatPhone() {
            // Eliminar cualquier carácter que no sea dígito
            let value = this.secondStepForm.emergency_contact_phone.replace(/\D/g, '');

            // Verificar si el primer dígito es 2, 6 o 7
            if (value.length > 0 && !/^[267]/.test(value)) {
                // Si el primer dígito no es 2, 6 ni 7, borrar todo
                this.secondStepForm.emergency_contact_phone = '';
            } else {
                // Si hay más de 8 dígitos, truncar a 8
                if (value.length > 8) {
                    value = value.slice(0, 8);
                }
                // Formatear el número de teléfono
                this.secondStepForm.emergency_contact_phone = value;
            }

            this.$emit('update-form', this.secondStepForm);
        },
        formatName() {
            // Eliminar cualquier carácter que no sea letra o espacio
            this.secondStepForm.emergency_contact_name =
                this.secondStepForm.emergency_contact_name.replace(/[^a-zÁáÉéÍíÓóÚúÑñÜüÇçA-Z\s\-']/g, '');

            // Limitar a 50 caracteres
            if (this.secondStepForm.emergency_contact_name.length > 50) {
                this.secondStepForm.emergency_contact_name = this.secondStepForm.emergency_contact_name.slice(0, 50);
            }

            // Primero convertir todo a minúsculas
            let nameInLowerCase = this.secondStepForm.emergency_contact_name.toLowerCase();

            // Luego capitalizar la primera letra de cada palabra
            this.secondStepForm.emergency_contact_name = nameInLowerCase.replace(/(^|\s|-)([a-záéíóúüñç])/g, function (match, separator, char) {
                return separator + char.toUpperCase();
            });

            this.$emit('update-form', this.secondStepForm);
        },
    }
}

</script>

<style scoped>

</style>