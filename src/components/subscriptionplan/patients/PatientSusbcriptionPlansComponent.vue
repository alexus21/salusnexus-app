<template>
    <div class="row d-flex justify-content-center">
        <button id="btnMonthlyPayment">Mensual</button>
        <button id="btnYearlyPayment" class="d-flex align-items-center justify-content-center">
            Anual <p id="saving">
            Ahorre 20%</p>
        </button>
    </div>
    <div class="row d-flex justify-content-center">
        <div class="col-md-auto p-5 m-5 text-start" id="basicPlanInfo">
            <div class="row d-flex justify-content-start ms-1">
                <p class="btn btn-light text-black border-1 border-dark-subtle"
                   style="width: auto; font-size: 20px; font-weight: bold;">
                    FREE
                </p>
            </div>
            <div class="row d-flex justify-content-start mt-3">
                <p>Plan básico inicial</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <p style="font-family: 'Arial Black', sans-serif, 'Comic Sans MS', cursive; font-size: 70px">$0</p>
            </div>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="fw-bold">Por miembro</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <ul>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Creación de perfil básico
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Acceso completo al directorio de profesionales
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Publicar reseñas y calificar establecimientos
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Agendar citas
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Solicitar servicios a domicilio
                    </li>
                </ul>
            </div>
            <div class="row d-flex justify-content-center align-items-center">
                <button class="btn btn-dark text-white border-1 border-black"
                        style="width: 100%;">
                    Comenzar gratis
                </button>
            </div>
            <div class="row d-flex justify-content-center align-items-center text-center mt-2">
                <p>No se requiere tarjeta de débito/crédito</p>
            </div>
        </div>

        <!--                -->
        <div class="col-md-auto p-5 m-5 text-start" id="advancedPlanInfo">
            <div class="row d-flex justify-content-start ms-1">
                <p class="btn btn-light text-black border-1 border-dark-subtle"
                   style="width: auto; font-size: 20px; font-weight: bold;">
                    ADVANCED
                </p>
            </div>
            <div class="row d-flex justify-content-start mt-3">
                <p>Plan profesional</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <p style="font-family: 'Arial Black', sans-serif, 'Comic Sans MS', cursive; font-size: 70px">$5.99</p>
            </div>
            <div class="row d-flex justify-content-start align-items-center">
                <p class="fw-bold">Por miembro</p>
            </div>
            <hr>
            <div class="row d-flex justify-content-start align-items-center">
                <ul>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Todas las ventajas del plan básico
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Acceso a reseñas públicas de otros pacientes
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Historial de citas
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Soporte prioritario para la gestión de citas
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Consejos de salud personalizados según perfil
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Detalles de medicamentos recetados
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Notificaciones de citas futuras
                    </li>
                    <li class="d-flex align-items-center mt-3">
                        <span class="material-icons me-1">check_circle</span>
                        Recordatorios personalizados para ti
                    </li>
                </ul>
            </div>
            <div class="row d-flex justify-content-center align-items-center">
                <button class="btn btn-dark text-white border-1 border-black"
                        style="width: 100%;">
                    Comenzar prueba gratuita de 14 días
                </button>
            </div>
            <div class="row d-flex justify-content-center align-items-center text-center mt-2">
                <p>Se requiere tarjeta de débito/crédito</p>
            </div>
        </div>
    </div>
    <div class="col">
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
export default {
    name: 'PatientSubscriptionPlansComponent',
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
    width: 200px;
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

#basicPlanInfo {
    border: 3px solid #4f3df8;
    border-radius: 10px;
    margin: 0; /* Adjust as needed */
    padding: 0; /* Adjust as needed */
}

#advancedPlanInfo {
    border: 3px solid #1b007d;
    border-radius: 10px;
    margin: 0; /* Adjust as needed */
    padding: 0; /* Adjust as needed */
}
</style>