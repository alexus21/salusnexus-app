<template>
    <div class="profile-container">
        <!-- Elementos decorativos de fondo -->
        <div class="decorative-element decorative-element-1"></div>
        <div class="decorative-element decorative-element-2"></div>
        <div class="decorative-element decorative-element-3"></div>
        
        <!-- Profile Header Section -->
        <div class="profile-header">
            <div class="profile-avatar-container">
                <img :src="profile_photo" alt="profile picture" class="profile-avatar">
            </div>
            <div class="profile-header-content">
                <h1 class="profile-name">Dr. {{ user && user.first_name && user.last_name	 ? user.first_name.split(' ')[0] + ' ' + user.last_name.split(' ')[0] : 'Cargando...' }}</h1>
                <div class="profile-location">
                    <i class="material-icons location-icon">location_on</i> 
                    {{ user && user.home_address ? user.home_address.split(',').slice(-2).join(', ') : 'Cargando...' }}
                </div>
                <div class="profile-specialties">
                    <span class="specialty-tag">Medicina General</span>
                    <span class="specialty-tag">Pediatría</span>
                    <span class="specialty-tag">Cardiología</span>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn-edit rounded-pill" @click="handleEditClick">
                    <i class="material-icons">edit</i> Editar
                </button>
            </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="profile-tabs">
            <div class="tab" :class="{ 'active': activeTab === 'personal' }" @click="activeTab = 'personal'">
                Información Personal
            </div>
            <div class="tab" :class="{ 'active': activeTab === 'horarios' }" @click="activeTab = 'horarios'">
                Horarios
            </div>
            <div class="tab" :class="{ 'active': activeTab === 'servicios' }" @click="activeTab = 'servicios'">
                Servicios
            </div>
        </div>

        <!-- Tab Content Sections -->
        <div class="tab-content">
            <!-- Información Personal Tab -->
            <div v-if="activeTab === 'personal'" class="personal-info-tab">
                <!-- Interfaz visual moderna de datos personales -->
                <div class="info-cards-container">
                    <div class="info-card" title="Nombre Completo">
                        <div class="info-card-icon bg-primary-soft">
                            <i class="material-icons">person</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Nombre Completo</div>
                            <div class="info-card-value">{{ user && user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : 'Cargando...' }}</div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Fecha de Nacimiento">
                        <div class="info-card-icon bg-purple-soft">
                            <i class="material-icons">cake</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Fecha de Nacimiento</div>
                            <div class="info-card-value">
                                {{ user && user.date_of_birth ? new Date(user.date_of_birth + 'T00:00:00Z').toLocaleDateString('es-ES', {timeZone: 'UTC'}) : 'Cargando...' }}
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Identificación">
                        <div class="info-card-icon bg-teal-soft">
                            <i class="material-icons">credit_card</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Identificación</div>
                            <div class="info-card-value">{{ user ? (user.phone || '45678902') : 'Cargando...' }}</div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Correo Electrónico">
                        <div class="info-card-icon bg-info-soft">
                            <i class="material-icons">email</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Correo Electrónico</div>
                            <div class="info-card-value">{{ user ? user.email : 'Cargando...' }}</div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Teléfono">
                        <div class="info-card-icon bg-orange-soft">
                            <i class="material-icons">phone</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Teléfono</div>
                            <div class="info-card-value">{{ user ? user.phone : 'Cargando...' }}</div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Dirección">
                        <div class="info-card-icon bg-success-soft">
                            <i class="material-icons">home</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Dirección</div>
                            <div class="info-card-value">{{ user ? user.home_address : 'Cargando...' }}</div>
                        </div>
                    </div>
                    
                    <div class="info-card" title="Título Profesional">
                        <div class="info-card-icon bg-indigo-soft">
                            <i class="material-icons">school</i>
                        </div>
                        <div class="info-card-content">
                            <div class="info-card-title">Título Profesional</div>
                            <div class="info-card-value">{{ user && user.title ? user.title : 'Cargando...' }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Horarios Tab -->
            <div v-if="activeTab === 'horarios'" class="horarios-tab">
                <div class="schedule-cards-container">
                    <div class="schedule-card weekday" title="Horario de Lunes a Viernes">
                        <div class="schedule-card-icon">
                            <i class="material-icons">date_range</i>
                        </div>
                        <div class="schedule-card-content">
                            <div class="schedule-card-day">Lunes a Viernes</div>
                            <div class="schedule-card-time">8:00 AM - 5:00 PM</div>
                            <div class="schedule-status-indicator active" title="Activo"></div>
                        </div>
                    </div>
                    
                    <div class="schedule-card weekend" title="Horario de Sábados">
                        <div class="schedule-card-icon">
                            <i class="material-icons">weekend</i>
                        </div>
                        <div class="schedule-card-content">
                            <div class="schedule-card-day">Sábados</div>
                            <div class="schedule-card-time">9:00 AM - 1:00 PM</div>
                            <div class="schedule-status-indicator active" title="Activo"></div>
                        </div>
                    </div>
                    
                    <div class="schedule-card sunday inactive" title="Horario de Domingos">
                        <div class="schedule-card-icon">
                            <i class="material-icons">today</i>
                        </div>
                        <div class="schedule-card-content">
                            <div class="schedule-card-day">Domingos</div>
                            <div class="schedule-card-time">No disponible</div>
                            <div class="schedule-status-indicator" title="Inactivo"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Servicios Tab -->
            <div v-if="activeTab === 'servicios'" class="servicios-tab">
                <div class="services-cards-container">
                    <div class="service-card consultation" title="Consulta General">
                        <div class="service-card-icon">
                            <i class="material-icons">healing</i>
                        </div>
                        <div class="service-card-content">
                            <h3 class="service-card-title">Consulta General</h3>
                            <p class="service-card-description">Diagnóstico y evaluación médica integral para pacientes de todas las edades</p>
                            <div class="service-card-duration">
                                <i class="material-icons">schedule</i> 30 min
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card examination" title="Examen Físico">
                        <div class="service-card-icon">
                            <i class="material-icons">monitor_heart</i>
                        </div>
                        <div class="service-card-content">
                            <h3 class="service-card-title">Examen Físico</h3>
                            <p class="service-card-description">Evaluación completa del estado físico y signos vitales del paciente</p>
                            <div class="service-card-duration">
                                <i class="material-icons">schedule</i> 45 min
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card specialized" title="Consulta Especializada">
                        <div class="service-card-icon">
                            <i class="material-icons">medical_information</i>
                        </div>
                        <div class="service-card-content">
                            <h3 class="service-card-title">Consulta Especializada</h3>
                            <p class="service-card-description">Atención médica enfocada en áreas específicas según la especialidad del médico</p>
                            <div class="service-card-duration">
                                <i class="material-icons">schedule</i> 60 min
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";

// const API_URL = process.env.VUE_APP_API_URL;
const API_URL_IMAGE = process.env.VUE_APP_API_URL_IMAGE;

export default {
    name: 'DoctorProfileComponent',
    data() {
        return {
            user: null,
            loading: true,
            isVerified: null,
            profile_photo: null,
            activeTab: 'personal', // Default active tab
        }
    },
    async mounted() {
        await this.loadUserData();
    },
    methods: {
        async loadUserData() {
            this.user = JSON.parse(localStorage.getItem('user'));
            console.log(this.user);
            //Esperar un segundo para simular la carga de datos
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isVerified = this.user.verified;
            this.profile_photo = API_URL_IMAGE + '/' + this.user.profile_photo_path;
            await this.showAlertIsNotVerified();
        },
        async showAlertIsNotVerified() {
            if (!this.isVerified) {
                swal.fire({
                    icon: 'warning',
                    iconColor: '#D69656',
                    title: '¡Atención!',
                    text: 'Tu cuenta no está verificada. Por favor verifica tu cuenta para acceder a todas las funciones.',
                    confirmButtonText: 'Verificar',
                    confirmButtonColor: '#5660d6',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({name: 'VerifyProfessionalAccount'});
                    }
                });
            }
        },
        handleEditClick() {
            // Handle edit profile action
            console.log('Edit profile clicked');
            // Future implementation for edit functionality
        }
    },
}
</script>

<style scoped>
/* Base Styles and Variables */
:root {
    --primary-color: #0d6efd;
    --primary-light: rgba(13, 110, 253, 0.1);
    --primary-dark: #0b5ed7;
    --secondary-color: #6c757d;
    --success-color: #198754;
    --info-color: #0dcaf0;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
    --light-color: #f8f9fa;
    --dark-color: #212529;
    --border-color: #dee2e6;
    --border-radius: 0.375rem;
    --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Container Styles with gradient background like HomeComponent */
.profile-container {

    width: 100%;
    height: 98vh;
    padding: 1.5rem;
    background: linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 50%, #F8FBFF 100%);
    /* border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); */
    font-family: var(--font-family);
    position: relative;
    overflow: hidden;
    
}

/* Elementos decorativos de fondo - similares al HomeComponent */
.decorative-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.2;
    background: linear-gradient(45deg, #0d6efd, #36b9cc);
    z-index: 0;
}

.decorative-element-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
}

.decorative-element-2 {
    width: 100px;
    height: 100px;
    bottom: 50px;
    left: 15%;
}

.decorative-element-3 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    right: 10%;
}

/* Profile Header Section con efectos mejorados */
.profile-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    animation: fadeInUp 0.8s;
}

.profile-avatar-container {
    flex-shrink: 0;
    position: relative;
}

.profile-avatar-container::before {
    content: '';
    position: absolute;
    width: 140px;
    height: 140px;
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.2) 0%, rgba(54, 185, 204, 0.1) 100%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    animation: pulseBlob 4s infinite alternate;
}

.profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border: 3px solid white;
    transition: transform 0.5s ease;
}

.profile-avatar:hover {
    transform: scale(1.05);
}

.profile-header-content {
    flex: 1;
    min-width: 200px;
    animation: fadeInUp 0.9s;
}

.profile-name {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--dark-color);
    font-family: "Georgia", Times, serif;
}

.profile-location {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    color: var(--secondary-color);
    font-size: 0.95rem;
}

.location-icon {
    font-size: 1.2rem;
    margin-right: 0.35rem;
    color: var(--primary-color);
}

.profile-specialties {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.specialty-tag {
    background-color: rgba(13, 110, 253, 0.1);
    color: var(--primary-color);
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition);
}

.specialty-tag:hover {
    background-color: rgba(13, 110, 253, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.profile-actions {
    margin-left: auto;
    display: flex;
    flex-shrink: 0;
    animation: fadeInUp 1s;
}

.btn-edit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 0.625rem 1.25rem;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.btn-edit::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: -1;
}

.btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(13, 110, 253, 0.2);
}

.btn-edit:hover::after {
    transform: translateX(0);
}

/* Navigation Tabs con animación y estilo mejorado */
.profile-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin: 1.5rem 0 0;
    position: relative;
    z-index: 2;
    animation: fadeInUp 1.1s;
}

.tab {
    padding: 1rem 1.5rem;
    font-weight: 500;
    color: var(--secondary-color);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.tab:hover {
    color: var(--primary-color);
}

.tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 110, 253, 0.05);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: -1;
}

.tab:hover::before {
    transform: translateY(0);
}

/* Tab Content Sections */
.tab-content {
    padding: 1.5rem 0;
    position: relative;
    z-index: 2;
    animation: fadeIn 1.2s;
}

/* Information Sections con efectos de gradiente */
.info-section {
    margin-bottom: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    border-top: 4px solid transparent;
}

.info-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}

.person-section {
    border-top-color: #0d6efd;
}

.contact-section {
    border-top-color: #36b9cc;
}

.specialty-section {
    border-top-color: #6f42c1;
}

.info-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230d6efd' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: -1;
}

.info-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    gap: 0.75rem;
}

.info-icon {
    color: var(--primary-color);
    font-size: 1.5rem;
    background-color: rgba(13, 110, 253, 0.1);
    padding: 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-title {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
    color: var(--dark-color);
}

.info-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: var(--transition);
}

.info-row:hover {
    background-color: rgba(13, 110, 253, 0.05);
}

.info-label {
    flex-basis: 180px;
    font-weight: 500;
    color: var(--secondary-color);
}

.info-value {
    flex: 1;
    min-width: 200px;
    font-weight: 400;
    color: var(--dark-color);
}

/* Schedule Styles mejorados con gradientes */
.schedule-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.schedule-card {
    position: relative;
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    overflow: hidden;
    transition: all 0.3s ease;
}

.schedule-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to bottom, var(--primary-color), var(--primary-dark));
    z-index: 1;
}

.schedule-card.weekday::before {
    background: linear-gradient(to bottom, #0d6efd, #0a58ca);
}

.schedule-card.weekend::before {
    background: linear-gradient(to bottom, #6f42c1, #6610f2);
}

.schedule-card.sunday::before {
    background: linear-gradient(to bottom, #6c757d, #495057);
}

.schedule-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.schedule-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(54, 185, 204, 0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
}

.schedule-card.weekday .schedule-card-icon {
    background: linear-gradient(135deg, #0d6efd, #0b5ed7);
    color: white;
}

.schedule-card.weekend .schedule-card-icon {
    background: linear-gradient(135deg, #6f42c1, #6610f2);
    color: white;
}

.schedule-card.sunday .schedule-card-icon {
    background: linear-gradient(135deg, #6c757d, #495057);
    color: white;
}

.schedule-card:hover .schedule-card-icon {
    transform: scale(1.1);
}

.schedule-card-icon i {
    font-size: 1.75rem;
}

.schedule-card-content {
    flex: 1;
    position: relative;
}

.schedule-card-day {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark-color);
    margin-bottom: 0.5rem;
}

.schedule-card-time {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
}

.schedule-card.inactive .schedule-card-time {
    color: var(--secondary-color);
    font-style: italic;
}

.schedule-status-indicator {
    position: absolute;
    top: 0.5rem;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--secondary-color);
}

.schedule-status-indicator.active {
    background-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.2);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(25, 135, 84, 0.4);
    }
    70% {
        box-shadow: 0 0 0 5px rgba(25, 135, 84, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(25, 135, 84, 0);
    }
}

/* Services Styles con efectos de hover mejorados */
.services-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.service-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background-image: linear-gradient(90deg, var(--primary-color), var(--info-color));
    z-index: 1;
}

.service-card.consultation::before {
    background-image: linear-gradient(90deg, #0d6efd, #0dcaf0);
}

.service-card.examination::before {
    background-image: linear-gradient(90deg, #6f42c1, #0dcaf0);
}

.service-card.specialized::before {
    background-image: linear-gradient(90deg, #d63384, #fd7e14);
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.service-card-icon {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.service-card.consultation .service-card-icon {
    color: #0d6efd;
    background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 202, 240, 0.1) 100%);
}

.service-card.examination .service-card-icon {
    color: #6f42c1;
    background: linear-gradient(135deg, rgba(111, 66, 193, 0.1) 0%, rgba(13, 202, 240, 0.1) 100%);
}

.service-card.specialized .service-card-icon {
    color: #d63384;
    background: linear-gradient(135deg, rgba(214, 51, 132, 0.1) 0%, rgba(253, 126, 20, 0.1) 100%);
}

.service-card:hover .service-card-icon {
    transform: scale(1.1) translateY(-5px);
}

.service-card-icon i {
    font-size: 2rem;
}

.service-card-content {
    position: relative;
    z-index: 1;
}

.service-card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--dark-color);
    margin-bottom: 0.75rem;
}

.service-card-description {
    font-size: 0.95rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    line-height: 1.5;
}

.service-card-duration {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
}

.service-card.consultation .service-card-duration {
    color: #0d6efd;
}

.service-card.examination .service-card-duration {
    color: #6f42c1;
}

.service-card.specialized .service-card-duration {
    color: #d63384;
}

.service-card-duration i {
    font-size: 1rem;
}

/* Animaciones */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes pulseBlob {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        transform: translate(-50%, -50%) scale(1.05);
    }
}

/* Media queries más completos para responsive design */
@media (max-width: 1200px) {
    .profile-container {
        margin: 1.5rem;
        width: calc(100% - 3rem);
    }
}

@media (max-width: 991px) {
    .profile-container {
        margin: 1rem;
        padding: 1.25rem;
        width: calc(100% - 2rem);
    }
    
    .profile-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
        padding-bottom: 1.25rem;
    }
    
    .profile-header-content {
        width: 100%;
    }
    
    .profile-specialties {
        justify-content: center;
    }
    
    .profile-actions {
        margin: 1rem auto 0;
    }
    
    .profile-tabs {
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 0.5rem;
        justify-content: flex-start;
        width: 100%;
    }
    
    .tab {
        padding: 0.75rem 1rem;
        flex: 0 0 auto;
    }
    
    .info-row {
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .info-label {
        flex-basis: auto;
    }
    
    .info-value {
        min-width: auto;
    }
}

@media (max-width: 767px) {
    .profile-container {
        margin: 0.75rem;
        padding: 1rem;
        width: calc(100% - 1.5rem);
        border-radius: 0.75rem;
    }
    
    .info-cards-container,
    .schedule-cards-container,
    .services-cards-container {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .info-card,
    .schedule-card,
    .service-card {
        padding: 1rem;
    }
    
    .info-card-icon,
    .service-card-icon {
        width: 40px;
        height: 40px;
    }
    
    .info-card-icon i,
    .service-card-icon i {
        font-size: 1.25rem;
    }
    
    .schedule-card-icon {
        width: 42px;
        height: 42px;
    }
    
    .schedule-card-icon i {
        font-size: 1.5rem;
    }
    
    .service-card-description {
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
    }
}

@media (max-width: 576px) {
    .profile-container {
        margin: 0.5rem;
        padding: 0.75rem;
        width: calc(100% - 1rem);
        border-radius: 0.5rem;
    }
    
    .profile-name {
        font-size: 1.5rem;
    }
    
    .profile-avatar {
        width: 100px;
        height: 100px;
    }
    
    .btn-edit {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    .decorative-element {
        opacity: 0.1;
    }
    
    .tab {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
    }
    
    .info-card-title {
        font-size: 0.8rem;
    }
    
    .info-card-value {
        font-size: 0.95rem;
    }
    
    .schedule-card-day {
        font-size: 1rem;
    }
    
    .schedule-card-time {
        font-size: 1.1rem;
    }
    
    .service-card-title {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    
    .service-card-description {
        font-size: 0.85rem;
        line-height: 1.4;
    }
    
    .service-card-duration {
        font-size: 0.8rem;
    }
}

/* Corregir comportamiento para pantallas muy pequeñas */
@media (max-width: 360px) {
    .profile-container {
        margin: 0.25rem;
        padding: 0.5rem;
        width: calc(100% - 0.5rem);
    }
    
    .profile-avatar {
        width: 80px;
        height: 80px;
    }
    
    .profile-name {
        font-size: 1.25rem;
    }
    
    .profile-location {
        font-size: 0.85rem;
    }
    
    .specialty-tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
    
    .info-card,
    .schedule-card,
    .service-card {
        padding: 0.75rem;
    }
}

/* Nuevos estilos para tarjetas de información */
.info-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;
}

.info-card {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    gap: 1rem;
}

.info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230d6efd' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.25;
    z-index: 0;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.info-card-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
}

.info-card:hover .info-card-icon {
    transform: scale(1.1);
}

.info-card-icon i {
    font-size: 1.5rem;
}

.info-card-content {
    flex: 1;
    position: relative;
    z-index: 1;
}

.info-card-title {
    font-size: 0.875rem;
    color: var(--secondary-color);
    margin-bottom: 0.35rem;
    position: relative;
    transition: all 0.3s ease;
    transform-origin: left;
}

.info-card:hover .info-card-title {
    transform: scale(0.9);
    opacity: 0.8;
}

.info-card-value {
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--dark-color);
    word-break: break-word;
}

/* Colores de fondo para los iconos */
.bg-primary-soft {
    background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
}

.bg-purple-soft {
    background: linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%);
}

.bg-teal-soft {
    background: linear-gradient(135deg, #20c997 0%, #198754 100%);
}

.bg-info-soft {
    background: linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%);
}

.bg-orange-soft {
    background: linear-gradient(135deg, #fd7e14 0%, #d56512 100%);
}

.bg-success-soft {
    background: linear-gradient(135deg, #198754 0%, #146c43 100%);
}

.bg-indigo-soft {
    background: linear-gradient(135deg, #6610f2 0%, #520dc2 100%);
}

/* Mejora para el responsive de las tarjetas */
@media (max-width: 767px) {
    .info-cards-container {
        grid-template-columns: 1fr;
    }
    
    .info-card {
        padding: 1rem;
    }
    
    .info-card-icon {
        width: 40px;
        height: 40px;
    }
    
    .info-card-icon i {
        font-size: 1.25rem;
    }
}

/* Responsive para las nuevas tarjetas */
@media (max-width: 767px) {
    .schedule-cards-container,
    .services-cards-container {
        grid-template-columns: 1fr;
    }
    
    .schedule-card,
    .service-card {
        padding: 1.25rem;
    }
    
    .service-card-icon {
        width: 50px;
        height: 50px;
    }
    
    .service-card-icon i {
        font-size: 1.5rem;
    }
}
</style> 