<template>
    <div class="row">
        <h3 class="form-title text-decoration-underline">Datos de tu clínica médica</h3>
        <div class="col-md-6">
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">house</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           v-model="thirdStepForm.clinic_name"
                           class="form-control ms-3"
                           placeholder="Nombre de la clínica"
                           required>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">description</span>
                <textarea type="text" id="dui"
                       v-model="thirdStepForm.description"
                       class="form-control ms-3"
                       maxlength="10"
                       placeholder="Descripción de tu clínica"
                       required>
                </textarea>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">medical_services</span>
                <input type="text"
                       id="emergency_contact_name"
                       v-model="thirdStepForm.speciality_type"
                       class="form-control ms-3"
                       placeholder="Años de experiencia"
                       required>
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">location_city</span>
                <div class="input-group">
                    <select class="form-select ms-3" v-model="thirdStepForm.department_id" @change="fetchCities">
                        <option disabled value="">Seleccionar departamento</option>
                        <option v-for="department in departments" :key="department.id"
                                :value="department.id">
                            {{ department.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">apartment</span>
                <div class="input-group">
                    <select class="form-select ms-3" v-model="thirdStepForm.city_id">
                        <option disabled value="">Seleccionar ciudad</option>
                        <option v-for="city in cities" :key="city.id"
                                :value="city.id">
                            {{ city.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">home</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           v-model="thirdStepForm.clinic_address"
                           class="form-control ms-3"
                           placeholder="Dirección de la clínica"
                           required>
                </div>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <span class="material-icons">share_location</span>
                <div class="input-group">
                    <input type="text"
                           id="home_address"
                           name="home_address"
                           class="form-control ms-3"
                           placeholder="Ubicación"
                           v-model="thirdStepForm.clinic_address_reference"
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
                   v-if="thirdStepForm.home_latitude && thirdStepForm.home_longitude">
                Lat: {{ thirdStepForm.home_latitude }}, Lng:
                {{ thirdStepForm.home_longitude }}
            </small>
            <LocationPickerComponent
                    v-if="showLocationPicker"
                    @location-selected="handleLocationSelected"
                    @close="showLocationPicker = false"/>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";
import LocationPickerComponent from "@/components/locationpicker/LocationPickerComponent.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: "ThirdStepComponent",
    components: {LocationPickerComponent},
    data() {
        return {
            showLocationPicker: false,
            thirdStepForm: {
                clinic_name: '', //
                clinic_address: '', //
                latitude: null, //
                longitude: null, //
                clinic_address_reference: '', //
                description: '',
                city_id: '',
                speciality_type: '',
                facade_photo: null,
                waiting_room_photo: null,
                office_photo: null,
                department_id: '',
            },
            departments: {},
            cities: {},
            facadePhotoFile: null,
            waitingRoomPhotoFile: null,
            officePhotoFile: null,
            isLoading: false,
        };
    },
    mounted() {
        this.fetchDepartments();
    },
    methods: {
        async fetchDepartments() {
            try {
                const response = await fetch(API_URL + '/departments', {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los departamentos");
                }

                const data = await response.json();
                if (!data.status) {
                    if (data.error) {
                        this.errors = data.error;
                        const errorMessage = Object.values(this.errors).flat().join('\n');
                        swal.fire({
                            icon: 'error',
                            title: '¡Error al obtener la lista de departamentos!',
                            text: errorMessage
                        });
                        return;
                    }
                }

                this.departments = data;
            } catch (error) {
                console.error("Error:", error);
            }
        },
        async fetchCities() {
            try {
                const response = await fetch(API_URL + '/cities/' + this.thirdStepForm.department_id, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener las ciudades");
                }

                const data = await response.json();
                if (!data.status) {
                    if (data.error) {
                        this.errors = data.error;
                        const errorMessage = Object.values(this.errors).flat().join('\n');
                        swal.fire({
                            icon: 'error',
                            title: '¡Error al obtener la lista de ciudades!',
                            text: errorMessage
                        });
                        return;
                    }
                }

                this.cities = data;
            } catch (error) {
                console.error("Error:", error);
            }
        },
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
        sendFormData() {
            this.$emit("update-third-step-data", this.thirdStepForm);
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