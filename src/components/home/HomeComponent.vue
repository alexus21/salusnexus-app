<template>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col-md-6 mt-5">
                <div class="row">
                    <p class="home-text">Gestión <br>
                        de Salud <br>
                        Simplificada
                    </p>
                </div>
                <div class="row">
                    <p class="home-description">
                        Una plataforma diseñada para que los profesionales
                        en el área de la salud gestionen sus citas, pacientes y
                        métricas de manera eficiente.
                    </p>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-primary" style="width: 250px; height: 50px">Comienza
                            Ahora
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-outline-light border border-black border-1 text-black"
                                style="width: 250px; height: 50px">Más Información
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6" style="display: flex; justify-content: center; align-items: center; margin-top: 15%;">
                <div class="row justify-content-center w-100">
                    <div class="col-10">
                        <img src="/home-picture.png"
                             alt="salusnexus-logo"
                             class="img-fluid"
                             style="max-width: 100%; object-fit: contain;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeComponent",
}
</script>

<style scoped>

.home-text {
    font-family: "Times New Roman", Times, serif;
    font-size: 100px;
}

.home-description {
    color: gray;
    font-size: 25px;
}

</style>