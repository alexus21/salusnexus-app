<template>
    <section style="background-color: #eee;">
        <div class="container py-5">
            <div class="card">
                <div class="card-body">
                    <div class="row d-flex justify-content-center pb-5">
                        <div class="col-md-8 col-xl-5 mb-4 mb-md-0">
                            <div class="card rounded-3">
                                <div class="card-body p-4">
                                    <div class="text-center mb-4">
                                        <h3>Configuración</h3>
                                        <h6>Método de pago</h6>
                                    </div>
                                    <form @submit.prevent="register">
                                        <div class="d-flex flex-row align-items-center mb-4 pb-1">
                                            <img class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png"
                                                 alt="image"/>
                                            <div class="flex-fill mx-3">
                                                <div data-mdb-input-init class="form-outline">
                                                    <select name="payment_provider" class="form-select" id="">
                                                        <option value="visa">Visa</option>
                                                        <option value="mastercard">MasterCard</option>
                                                        <option value="amex">American Express</option>
                                                        <option value="discover">Discover</option>
                                                        <option value="dinersclub">Diners Club</option>
                                                        <option value="paypal">Paypal</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <p class="fw-bold mb-4">Agregar datos:</p>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="text"
                                                   id="formControlLgXsd"
                                                   class="form-control form-control-lg"
                                                   v-model="card_form.cardholder_name"
                                                   placeholder="Ingresa tu nombre"
                                                   @input="formatName"
                                                   required/>
                                            <label
                                                    class="form-label"
                                                    for="formControlLgXsd">
                                                Nombre del propietario de la tarjeta
                                            </label>
                                        </div>

                                        <div class="row mb-4">
                                            <div class="col-6">
                                                <div data-mdb-input-init class="form-outline">
                                                    <input
                                                            type="text"
                                                            id="formControlLgXM"
                                                            class="form-control form-control-lg"
                                                            maxlength="19"
                                                            placeholder="**** **** **** ****"
                                                            v-model="card_form.card_number"
                                                            @input="formatCardNumber"
                                                            required style="font-size: 19px"/>
                                                    <label
                                                            class="form-label"
                                                            for="formControlLgXM">
                                                        Número de la tarjeta
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div data-mdb-input-init class="form-outline">
                                                    <input type="text"
                                                           id="formControlLgExpk"
                                                           class="form-control form-control-lg"
                                                           placeholder="MM/YYYY"
                                                           v-model="card_form.expiration_date"
                                                           @input="formatExpirationDate"
                                                           required style="font-size: 19px"/>
                                                    <label class="form-label" for="formControlLgExpk">Expiración</label>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div data-mdb-input-init class="form-outline">
                                                    <input type="text"
                                                           id="formControlLgcvv"
                                                           class="form-control form-control-lg"
                                                           placeholder="Cvv"
                                                           v-model="card_form.cvv"
                                                           maxlength="3"
                                                           required style="font-size: 19px"/>
                                                    <label class="form-label" for="formControlLgcvv">Cvv</label>
                                                </div>
                                            </div>
                                        </div>

                                        <button data-mdb-button-init data-mdb-ripple-init
                                                class="btn btn-success btn-lg btn-block" @click="confirmPayment">
                                            Confirmar
                                        </button>
                                        <button class="btn btn-danger btn-lg btn-block ms-5">Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-xl-4 offset-xl-1">
                            <div class="rounded d-flex flex-column p-2 bg-body-tertiary">
                                <div class="p-2 me-3">
                                    <h4>Beneficios adquiridos</h4>
                                </div>
                                <div class="row d-flex justify-content-start align-items-center">
                                    <ul class="features-list">
                                        <SubscriptionFeatureItem
                                                style="margin-bottom: 25px"
                                                v-for="(feature, index) in advancedPlanFeatures"
                                                :key="`advanced-${index}`"
                                                :feature-text="feature"
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SubscriptionFeatureItem from "@/components/subscriptionplan/SubscriptionFeatureItem.vue";
import swal from "sweetalert2";

export default {
    name: 'AddPaymentMethodComponent',
    components: {SubscriptionFeatureItem},
    data() {
        return {
            card_form: {
                card_number: '',
                cardholder_name: '',
                expiration_date: '',
                cvv: ''
            },
            advancedPlanFeatures: [
                'Todas las ventajas del plan básico',
                'Acceso a reseñas públicas de otros pacientes',
                'Historial de citas',
                'Soporte prioritario para la gestión de citas',
                'Consejos de salud personalizados según perfil',
                'Detalles de medicamentos recetados',
                'Notificaciones de citas futuras',
                'Recordatorios personalizados para ti'
            ]
        }
    },
    methods: {
        formatName() {
            // Eliminar cualquier carácter que no sea letra o espacio
            this.card_form.cardholder_name =
                this.card_form.cardholder_name.replace(/[^a-zÁáÉéÍíÓóÚúÑñÜüÇçA-Z\s\-']/g, '');

            // Limitar a 50 caracteres
            if (this.card_form.cardholder_name.length > 50) {
                this.card_form.cardholder_name = this.card_form.cardholder_name.slice(0, 50);
            }

            // Primero convertir todo a minúsculas
            let nameInLowerCase = this.card_form.cardholder_name.toLowerCase();

            // Luego capitalizar la primera letra de cada palabra
            this.card_form.cardholder_name = nameInLowerCase.replace(/(^|\s|-)([a-záéíóúüñç])/g, function (match, separator, char) {
                return separator + char.toUpperCase();
            });
        },
        formatCardNumber() {
            // Remove all non-digit characters
            let digits = this.card_form.card_number.replace(/\D/g, '');

            // Limit to a maximum of 16 digits
            if (digits.length > 19) {
                digits = digits.slice(0, 19);
            }

            // Format into groups of 4 digits separated by spaces
            this.card_form.card_number = digits.replace(/(\d{4})(?=\d)/g, (match, group, offset) => {
                return offset < 12 ? group + ' ' : group;
            });
        },
        formatExpirationDate() {
            // Remove all non-digit characters
            let digits = this.card_form.expiration_date.replace(/\D/g, '');

            if (digits[0] > 1) {
                digits = '0' + digits;
            }

            // Limit to a maximum of 4 digits
            if (digits.length > 4) {
                digits = digits.slice(0, 4);
            }

            // Format into MM/YYYY
            if (digits.length > 2) {
                this.card_form.expiration_date = digits.slice(0, 2) + '/' + digits.slice(2);
            } else {
                this.card_form.expiration_date = digits;
            }
        },
        validateInput() {
            const currentYear = new Date().getFullYear();
            const lastTwoDigitsOfTheYear = currentYear.toString().slice(-2);
            const lastTwoDigitsOfExpirationYear = this.card_form.expiration_date.slice(3, 5);

            if (this.card_form.cardholder_name === '') {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre del propietario de la tarjeta no puede estar vacío.',
                });
                return false;
            }

            if (lastTwoDigitsOfExpirationYear < lastTwoDigitsOfTheYear) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'La fecha de expiración no puede ser anterior a la fecha actual.',
                });
                return false;
            }

            if (this.card_form.card_number.length < 19) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El número de la tarjeta no es válido.',
                });
                return false;
            }

            if (this.card_form.cvv.length < 3) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El CVV no es válido.',
                });
                return false;
            }

            if (this.card_form.expiration_date.length < 4) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'La fecha de expiración no es válida.',
                });
                return false;
            }

            if (this.card_form.cardholder_name.length < 3) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre del propietario de la tarjeta no es válido.',
                });
                return false;
            }

            return true;
        },
        confirmPayment() {
            if(!this.validateInput()) {
                return;
            }

            // If all validations pass, proceed with the payment
            swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Método de pago agregado correctamente.',
            });
        },
    }
}
</script>

<style scoped>
.input-group {
    display: flex;
    align-items: center;
    gap: 10px; /* Adjust spacing between elements */
}

.input-group .form-control {
    flex: 1; /* Ensures the input takes up available space */
}

.input-group-text {
    cursor: pointer; /* Makes the icons clickable */
}
</style>