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
                                    <span v-if="!patient_form.photo" class="material-icons photo-placeholder">
                                        add_a_photo
                                    </span>
                                    <img class="w-50" v-else :src="patient_form.photo" alt="Foto de perfil">
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
                                       class="form-control" required readonly placeholder="Dirección de residencia">
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
                                   class="form-control" required placeholder="Dirección de referencia">
                        </div>
                        <LocationPickerComponent v-if="showLocationPicker"
                                                 @location-selected="handleLocationSelected"
                                                 @close="showLocationPicker = false"/>
                        <div class="mb-3 d-flex align-items-center">
                            <span class="material-icons">fingerprint</span>
                            <input type="text" id="dui" v-model="patient_form.dui"
                                   class="form-control" required placeholder="Documento de identidad (DUI)">
                        </div>
                    </div>
                </div>
                <div class="navigation-footer">
                    <div class="navigation-buttons">
                        <button title="Cancelar" type="button" class="btn btn-secondary" @click="handleClose">
                            <span class="material-icons">close</span>
                        </button>
                        <button title="Registrar" type="submit" class="btn btn-success ms-3"
                                :disabled="patient_form.home_address_reference === ''">
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
            },
        }
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
        handlePhotoUpload(event) {
            const reader = new FileReader();
            reader.onload = () => {
                this.patient_form.photo = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        },
        handleClose() {
            this.$router.push({ name: 'Home' });
        },
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