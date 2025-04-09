<template>
    <div class="row d-flex justify-content-center m-3 gap-lg-3">
        <button id="btnMonthlyPayment">Mensual</button>
        <button id="btnYearlyPayment" class="d-flex align-items-center justify-content-center">
            Anual <p id="saving">
            Ahorre 20%</p>
        </button>
    </div>
    <div class="row d-flex justify-content-center m-3">
        <div class="col-md-auto p-3 m-3 text-start subscription-card" id="basicPlanInfo">
            <div class="row d-flex justify-content-start ms-1">
                <p class="btn btn-light text-black border-1 border-dark-subtle"
                   style="width: auto; font-size: 18px; font-weight: bold;">
                    FREE
                </p>
            </div>
            <div class="row d-flex justify-content-start mt-3">
                <p>Plan básico inicial</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="price">$0</p>
            </div>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="fw-bold">Por miembro</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <ul class="features-list">
                   <SubscriptionFeatureItem
                       v-for="(feature, index) in basicPlanFeatures"
                       :key="`basic-${index}`"
                       :feature-text="feature"
                   />
                </ul>
            </div>
            <div class="row d-flex justify-content-center align-items-center mt-auto pt-3 m-1">
                <button class="btn btn-dark text-white border-1 border-black w-100" @click="start">
                    Comenzar gratis
                </button>
            </div>
            <div class="row d-flex justify-content-center align-items-center text-center mt-2">
                <p class="small">No se requiere tarjeta de débito/crédito</p>
            </div>
        </div>

        <div class="col-md-auto p-3 m-3 text-start subscription-card" id="advancedPlanInfo">
            <div class="row d-flex justify-content-start ms-1">
                <p class="btn btn-light text-black border-1 border-dark-subtle"
                   style="width: auto; font-size: 18px; font-weight: bold;">
                    ADVANCED
                </p>
            </div>
            <div class="row d-flex justify-content-start mt-3">
                <p>Plan profesional</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="price">$5.99</p>
            </div>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="fw-bold">Por miembro</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <ul class="features-list">
                    <SubscriptionFeatureItem
                        v-for="(feature, index) in advancedPlanFeatures"
                        :key="`advanced-${index}`"
                        :feature-text="feature"
                    />
                </ul>
            </div>
            <div class="row d-flex justify-content-center align-items-center mt-auto pt-3 m-1">
                <button class="btn btn-dark text-white border-1 border-black w-100" @click="start">
                    Comenzar prueba gratuita de 14 días
                </button>
            </div>
            <div class="row d-flex justify-content-center align-items-center text-center mt-2">
                <p class="small">Se requiere tarjeta de débito/crédito</p>
            </div>
        </div>
    </div>
    <div class="col m-3">
        <div class="row d-flex justify-content-center">
            <p style="font-size: 25px; font-family: 'Arial', sans-serif, 'Comic Sans MS', cursive">Métodos de pago</p>
        </div>
        <div class="row d-flex justify-content-center">
            <img src="/visa.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
            <img src="/mastercard.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
            <img src="/maestro.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
            <img src="/paypal.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
            <img src="/diners.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
            <img src="/amex.png" alt="visa" class="img-fluid" style="width:auto; height: 25px;">
        </div>
        <div class="row d-flex justify-content-center mt-3">
            <p>Aceptamos Visa, American Express, Mastercard y PayPal</p>
        </div>
    </div>
</template>

<script>
import SubscriptionFeatureItem from '@/components/subscriptionplan/SubscriptionFeatureItem.vue';

export default {
    name: 'PatientSubscriptionPlansComponent',
    components: {
        SubscriptionFeatureItem
    },
    data() {
        return {
            basicPlanFeatures: [
                'Creación de perfil básico',
                'Acceso completo al directorio de profesionales',
                'Publicar reseñas y calificar establecimientos',
                'Agendar citas',
                'Solicitar servicios a domicilio'
            ],
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
        start() {
            this.$router.push({
                name: 'Register',
            });
        }
    }
}

</script>

<style scoped>
body {
    overflow: hidden;
}

#btnMonthlyPayment {
    color: white;
    background-color: #000000;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 250px;
    height: 50px;
    border-radius: 5px;
}

#btnYearlyPayment {
    color: black;
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    border-radius: 5px;
    width: 250px;
}

#saving {
    background-color: #eddb8c;
    margin-left: 10px; /* Adjust as needed */
    margin-top: 17px;
    border-radius: 5px;
    padding: 3px; /* Adjust as needed */
}

.subscription-card {
    border-radius: 10px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    min-height: 450px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra base sutil */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
}

.subscription-card:hover {
    transform: scale(1.03); /* Escalar ligeramente al pasar el ratón */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

.subscription-card .price {
    font-family: 'Arial Black', sans-serif, 'Comic Sans MS', cursive;
    font-size: 50px;
    margin-bottom: 0;
}

.subscription-card .features-list {
    padding-left: 0;
    list-style: none;
    font-size: 0.9rem;
}

#basicPlanInfo {
    border: 2px solid #4f3df8;
}

#advancedPlanInfo {
    border: 2px solid #1b007d;
}
</style>