<template>
    <div class="row">
        <h3 class="form-title text-decoration-underline">Datos de tu clínica médica</h3>
        <div class="col-md-6">
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">fingerprint</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           v-model="thirdStepForm.license_number"
                           class="form-control ms-3"
                           placeholder="Número de licencia"
                           required>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">policy</span>
                <div class="input-group">
                    <select class="form-select ms-3"
                            v-model="thirdStepForm.license_authority">
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
                       v-model="thirdStepForm.issue_date"
                       class="form-control ms-3"
                       placeholder="Dirección"
                       required>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">fingerprint</span>
                <input type="text" id="dui"
                       v-model="thirdStepForm.expiration_date"
                       class="form-control ms-3"
                       maxlength="10"
                       placeholder="Documento de identidad (DUI)"
                       @input="formatDUI"
                       required>
            </div>

            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">policy</span>
                <div class="input-group">
                    <select class="form-select ms-3" v-model="thirdStepForm.speciality_id">
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
                       v-model="thirdStepForm.biography"
                       class="form-control ms-3"
                       placeholder="Años de experiencia"
                       required>
            </div>
        </div>
    </div>
</template>

<script>

import imageCompression from "browser-image-compression";

export default {
    name: "ThirdStepComponent",
    components: {
    },
    data() {
        return {
            showLocationPicker: false,
            thirdStepForm: {
                clinic_name: '',
                clinic_address: '',
                latitude: null,
                longitude: null,
                clinic_address_reference: '',
                description: '',
                city_id: null,
                speciality_type: 'primaria',
                facade_photo: null,
                waiting_room_photo: null,
                office_photo: null,
            }
        };
    },
    methods: {
        openLocationPicker(field) {
            this.activeAddressField = field;
            this.showLocationPicker = true;
        },
        handleLocationSelected(location) {
            const field = this.activeAddressField;
            this.thirdStepForm[field] = location.address;
            this.thirdStepForm.home_latitude = location.lat;
            this.thirdStepForm.home_longitude = location.lng;
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
                    this.thirdStepForm.profile_photo_path = reader.result;
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
            let value = this.thirdStepForm.dui.replace(/\D/g, '');

            // Si hay más de 9 dígitos, truncar a 9
            if (value.length > 9) {
                value = value.slice(0, 9);
            }

            // Si hay más de 8 dígitos, agregar el guion antes del último dígito
            if (value.length > 8) {
                this.thirdStepForm.dui = value.slice(0, 8) + '-' + value.slice(8);
            } else {
                this.thirdStepForm.dui = value;
            }
        },
        formatPhone() {
            // Eliminar cualquier carácter que no sea dígito
            let value = this.thirdStepForm.emergency_contact_phone.replace(/\D/g, '');

            // Verificar si el primer dígito es 2, 6 o 7
            if (value.length > 0 && !/^[267]/.test(value)) {
                // Si el primer dígito no es 2, 6 ni 7, borrar todo
                this.thirdStepForm.emergency_contact_phone = '';
            } else {
                // Si hay más de 8 dígitos, truncar a 8
                if (value.length > 8) {
                    value = value.slice(0, 8);
                }
                // Formatear el número de teléfono
                this.thirdStepForm.emergency_contact_phone = value;
            }

            this.$emit('update-form', this.thirdStepForm);
        },
        formatName() {
            // Eliminar cualquier carácter que no sea letra o espacio
            this.thirdStepForm.emergency_contact_name =
                this.thirdStepForm.emergency_contact_name.replace(/[^a-zÁáÉéÍíÓóÚúÑñÜüÇçA-Z\s\-']/g, '');

            // Limitar a 50 caracteres
            if (this.thirdStepForm.emergency_contact_name.length > 50) {
                this.thirdStepForm.emergency_contact_name = this.thirdStepForm.emergency_contact_name.slice(0, 50);
            }

            // Primero convertir todo a minúsculas
            let nameInLowerCase = this.thirdStepForm.emergency_contact_name.toLowerCase();

            // Luego capitalizar la primera letra de cada palabra
            this.thirdStepForm.emergency_contact_name = nameInLowerCase.replace(/(^|\s|-)([a-záéíóúüñç])/g, function (match, separator, char) {
                return separator + char.toUpperCase();
            });

            this.$emit('update-form', this.thirdStepForm);
        },
    }
}

</script>

<style scoped>

</style>