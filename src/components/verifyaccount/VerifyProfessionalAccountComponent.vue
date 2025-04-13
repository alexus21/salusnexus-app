<template>
    <div class="register-form" v-if="!isVerified">
        <div class="form-container">
            <h2 class="form-title text-decoration-underline">Verifica tu cuenta</h2>
            <form @submit.prevent="register">
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <FirstStepComponent @update-first-step-data="updateFirstStepForm" />
                        </div>
                        <div class="carousel-item">
                            <SecondStepComponent @update-second-step-data="updateSecondStepForm" />
                        </div>
                        <div class="carousel-item">
                            <ThirdStepComponent @update-third-step-data="updateThirdStepForm" />
                        </div>
                        <div class="carousel-item">
                            <FourthStepComponent @update-fourth-step-data="updateFourthStepForm" />
                        </div>
                    </div>
                </div>

                <!-- Botones abajo del carrusel -->
                <div class="navigation-buttons mt-3">
                    <button class="btn btn-outline-primary me-3 icon-btn" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="prev" :disabled="!enablePreviousButton" @click="handlePrevButton">
                        <span class="material-icons">arrow_back_ios</span>
                    </button>
                    <button title="Cancelar" type="button" class="btn btn-secondary icon-btn" @click="handleClose">
                        <span class="material-icons">close</span>
                    </button>
                    <button title="Registrar" type="button" class="btn btn-success ms-3 icon-btn" :disabled="!canSubmit"
                            @click="verifyAccount">
                        <span class="material-icons">send</span>
                    </button>
                    <button class="btn btn-outline-primary ms-3 icon-btn" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="next" :disabled="!enableNextButton" @click="handleNextButton">
                        <span class="material-icons">arrow_forward_ios</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";
import FirstStepComponent from "@/components/verifyaccount/professional/FirstStepComponent.vue";
import SecondStepComponent from "@/components/verifyaccount/professional/SecondStepComponent.vue";
import ThirdStepComponent from "@/components/verifyaccount/professional/ThirdStepComponent.vue";
import FourthStepComponent from "@/components/verifyaccount/professional/FourthComponent.vue";

export default {
    name: 'VerifyProfessionalAccountComponent',
    components: {
        FourthStepComponent,
        ThirdStepComponent,
        SecondStepComponent,
        FirstStepComponent,
    },
    data() {
        return {
            showLocationPicker: false,
            professional_form: {
                home_address: '', //
                home_latitude: null, //
                home_longitude: null, //
                home_address_reference: '', //
                profile_photo_path: null, //
                dui: '', //
                biography: '', //

                license_number: '', //
                license_authority: '', //
                issue_date: '', //
                expiration_date: '', //
                speciality_id: '', //
                license_image_path: null, //
                years_of_experience: '',

                clinic_name: '',
                clinic_address: '',
                clinic_map_location: '',
                clinic_latitude: null,
                clinic_longitude: null,
                clinic_address_reference: '',
                description: '',
                city_id: null,
                speciality_type: 'primaria',
                facade_photo: null,
                waiting_room_photo: null,
                office_photo: null,
            },
            errors: {},
            isVerified: false,
            current_step: 0,
            enablePreviousButton: false,
            enableNextButton: true,
        }
    },
    computed: {
        canSubmit() {
            return this.professional_form.home_address_reference !== '' &&
                this.professional_form.home_address !== '' &&
                this.professional_form.dui !== '' &&
                this.professional_form.emergency_contact_name !== '' &&
                this.professional_form.emergency_contact_phone !== '' && this.current_step === 3;
        }
    },
    mounted() {
        this.checkIfIsVerified();
    },
    methods: {
        handleNextButton() {
            if (this.current_step < 3) {
                this.current_step += 1;
            }
            this.enablePreviousButton = this.current_step > 0;
            this.enableNextButton = this.current_step < 3;
        },
        handlePrevButton() {
            if (this.current_step > 0) {
                this.current_step -= 1;
            }
            this.enablePreviousButton = this.current_step > 0;
            this.enableNextButton = this.current_step < 3;
        },
        async checkIfIsVerified() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.verified) {
                await this.showAlertIsVerified();
            }
        },
        handleClose() {
            this.$router.push({name: 'Home'});
        },
        async verifyAccount() {
            console.log(this.professional_form);

            swal.fire({
                title: "Cargando...",
                text: "Por favor, espere mientras se verifica su cuenta.",
                timerProgressBar: true,
                didOpen: () => {
                    swal.showLoading();
                },
            });

            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/verification/professionals`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(this.professional_form)
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

                swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: data.message
                }).then(() => {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    this.$router.push({name: 'UserProfileComponent'});
                });
            } catch (error) {
                console.error("Error al verificar la cuenta: " + error.message);
                swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: "Ocurrió un error al verificar la cuenta. Por favor, inténtelo de nuevo."
                });
            }
        },
        async showAlertIsVerified() {
            swal.fire({
                icon: 'success',
                iconColor: '#4CAF50',
                title: 'Cuenta verificada',
                text: 'Esta cuenta ya ha sido verificada. Puedes continuar con el uso de la aplicación.',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isVerified = true;
                    this.$router.push({name: 'UserProfile'});
                }
            });
        },
        updateFirstStepForm(data) {
            this.professional_form.home_address = data.home_address;
            this.professional_form.home_latitude = data.home_latitude;
            this.professional_form.home_longitude = data.home_longitude;
            this.professional_form.home_address_reference = data.home_address_reference;
            this.professional_form.dui = data.dui;
            this.professional_form.biography = data.biography;
            this.professional_form.profile_photo_path = data.profile_photo_path;
        },
        updateSecondStepForm(data) {
            this.professional_form.license_number = data.license_number;
            this.professional_form.license_authority = data.license_authority;
            this.professional_form.issue_date = data.issue_date;
            this.professional_form.expiration_date = data.expiration_date;
            this.professional_form.speciality_id = data.speciality_id;
            this.professional_form.license_image_path = data.license_image_path;
            this.professional_form.years_of_experience = data.years_of_experience;
        },
        updateThirdStepForm(data) {
            this.professional_form.clinic_name = data.clinic_name;
            this.professional_form.clinic_address = data.clinic_address;
            this.professional_form.clinic_latitude = data.clinic_latitude;
            this.professional_form.clinic_longitude = data.clinic_longitude;
            this.professional_form.clinic_address_reference = data.clinic_address_reference;
            this.professional_form.description = data.description;
            this.professional_form.city_id = data.city_id;
            this.professional_form.speciality_type = data.speciality_type;
            this.professional_form.facade_photo = data.facade_photo;
            this.professional_form.waiting_room_photo = data.waiting_room_photo;
            this.professional_form.office_photo = data.office_photo;
        },
        updateFourthStepForm(data) {
            this.professional_form.facade_photo = data.facade_photo;
            this.professional_form.waiting_room_photo = data.waiting_room_photo;
            this.professional_form.office_photo = data.office_photo;
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

.icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 4px;
    vertical-align: middle;
}

.icon-btn .material-icons {
    font-size: 20px;
    line-height: 1;
}

/* Ajustes específicos para arrow_forward_ios y arrow_back_ios que tienen un alineado especial */
.icon-btn .material-icons:is([data-icon="arrow_forward_ios"], [data-icon="arrow_back_ios"]) {
    position: relative;
    top: 1px; /* Ajuste vertical fino */
}

</style>