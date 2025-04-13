<template>
    <div class="register-form" v-if="!isVerified">
        <div class="form-container">
            <h2 class="form-title text-decoration-underline">Verifica tu cuenta</h2>
            <form @submit.prevent="register">
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <FirstStepComponent />
                        </div>
                        <div class="carousel-item">
                            <SecondStepComponent />
                        </div>
                        <div class="carousel-item">
                            <ThirdStepComponent />
                        </div>
                        <div class="carousel-item">
                            <FourthStepComponent />
                        </div>
                    </div>
                </div>

                <!-- Botones abajo del carrusel -->
                <div class="navigation-footer text-center mt-4">
                    <!-- Otros botones -->
                    <div class="navigation-buttons mt-3">
                        <button class="btn btn-outline-primary me-3" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="prev">
                            <span class="material-icons">arrow_back_ios</span>
                        </button>
                        <button title="Cancelar" type="button" class="btn btn-secondary" @click="handleClose">
                            <span class="material-icons">close</span>
                        </button>
                        <button title="Registrar" type="button" class="btn btn-success ms-3" :disabled="!canSubmit"
                                @click="verifyAccount">
                            <span class="material-icons">verified</span>
                        </button>
                        <button class="btn btn-outline-primary ms-3" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="next">
                            <span class="material-icons">arrow_forward_ios</span>
                        </button>
                    </div>
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
        // LocationPickerComponent
    },
    data() {
        return {
            showLocationPicker: false,
            professional_form: {
                license_number: '', //
                license_authority: '', //
                issue_date: '', //
                expiration_date: '', //
                speciality_id: '', //
                license_image_path: null, //
                years_of_experience: '',

                home_address: '', //
                home_latitude: null, //
                home_longitude: null, //
                home_address_reference: '', //
                profile_photo_path: null, //
                dui: '', //
                biography: '', //

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
            photoFile: null,
            errors: {},
            isVerified: false,
        }
    },
    computed: {
        canSubmit() {
            return this.professional_form.home_address_reference !== '' &&
                this.professional_form.home_address !== '' &&
                this.professional_form.dui !== '' &&
                this.professional_form.emergency_contact_name !== '' &&
                this.professional_form.emergency_contact_phone !== '';
        }
    },
    mounted() {
        this.checkIfIsVerified();
    },
    methods: {
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
            const formData = new FormData();

            // Agregar los datos del formulario
            formData.append('home_address', this.professional_form.home_address);
            formData.append('home_latitude', this.professional_form.home_latitude);
            formData.append('home_longitude', this.professional_form.home_longitude);
            formData.append('home_address_reference', this.professional_form.home_address_reference);
            formData.append('dui', this.professional_form.dui);
            formData.append('emergency_contact_name', this.professional_form.emergency_contact_name);
            formData.append('emergency_contact_phone', this.professional_form.emergency_contact_phone);

            // Agregar el archivo directamente si existe
            if (this.photoFile) {
                formData.append('profile_photo_path', this.photoFile);
            }

            swal.fire({
                title: "Cargando...",
                text: "Por favor, espere mientras se verifica su cuenta.",
                timerProgressBar: true,
                didOpen: () => {
                    swal.showLoading();
                },
            });

            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/verification/patient`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData
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