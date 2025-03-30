<template>
    <div class="container py-md-5 py-3">
        <div class="row align-items-center">
            <div class="col-md-6 text-md-start text-center">
                <div class="mb-md-4 mb-3">
                    <h1 class="home-title display-4">
                        Gestión 
                        <span class="d-none d-md-inline"><br></span>
                        <span class="d-md-none d-inline"> </span>
                        de Salud 
                        <span class="d-none d-md-inline"><br></span>
                        <span class="d-md-none d-inline"> </span>
                        <span class="fw-bold">Simplificada</span>
                    </h1>
                </div>
                <div class="mb-md-5 mb-3">
                    <p class="home-description lead">
                        Una plataforma diseñada para que los profesionales
                        en el área de la salud gestionen sus citas, pacientes y
                        métricas de manera eficiente.
                    </p>
                </div>
                <div class="d-grid gap-3 d-md-flex justify-content-md-start justify-content-center">
                    <button type="button"
                            class="btn btn-primary-custom btn-lg px-4 me-md-2"
                            @click="handleStartNowClick">
                        Comienza Ahora
                    </button>
                    <button type="button"
                            class="btn btn-secondary-custom btn-lg px-4">
                        Más Información
                    </button>
                </div>
            </div>
            <div class="col-md-6 mt-md-0 mt-4">
                <div class="text-center">
                    <img src="/home-picture.svg"
                         alt="Ilustración SalusNexus"
                         class="img-fluid home-image"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeComponent",
    methods: {
        handleMoreInfoClick() {
            console.log('More Info button clicked');
        },
        handleStartNowClick() {
            this.$router.push('/plans/patients');
        }
    }
}
</script>

<style scoped>
body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.home-title {
    font-family: "Georgia", Times, serif;
    color: #1a2b48;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.home-description {
    color: #555;
    line-height: 1.6;
}

.home-image {
    max-width: 90%;
    height: auto;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.08));
}

.btn {
    border-radius: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-weight: 500;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary-custom {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.btn-primary-custom:hover {
    background-color: #0b5ed7;
    border-color: #0a58ca;
    color: white;
}

.btn-secondary-custom {
    background-color: white;
    border: 1px solid #ccc;
    color: #333;
}

.btn-secondary-custom:hover {
    background-color: #f8f9fa;
    border-color: #bbb;
    color: #000;
}

@media (max-width: 767px) {
    .container {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        max-width: 100%;
    }
    
    .home-title {
        font-size: 2.2rem;
        line-height: 1.1;
        margin-bottom: 0.5rem;
    }
    
    .display-4 {
        font-size: calc(1.25rem + 1.5vw);
    }
    
    .lead {
        font-size: 0.95rem;
        line-height: 1.4;
        margin-bottom: 1rem;
    }
    
    .home-image {
        max-width: 80%;
        margin-top: 1rem;
    }
    
    .d-grid {
        width: 100%;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
        gap: 0.75rem !important;
    }
    
    .d-grid .btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        width: 100%;
    }
    
    .btn-lg {
        padding: 0.5rem 1rem !important;
        font-size: 0.9rem !important;
    }
    
    .d-grid .me-md-2 {
        margin-right: 0 !important;
    }
    
    .mb-3 {
        margin-bottom: 0.75rem !important;
    }
    
    .mt-4 {
        margin-top: 1rem !important;
    }
}
</style>