<template>
    <div class="medipro-dashboard-container">
        <!-- Header de MediPro -->
        <header class="medipro-header">
            <div class="header-content">
                <div class="header-left">
                    <router-link to="/" class="logo-link">
                        <i class="fas fa-heartbeat heart-icon"></i>
                        <span class="logo-text">Salus Nexus</span>
                    </router-link>

                    <!-- <nav class="main-nav">
                        <router-link to="/" class="nav-link active">Inicio</router-link>
                        <router-link to="/pacientes" class="nav-link">Pacientes</router-link>
                        <router-link to="/agenda" class="nav-link">Agenda</router-link>
                        <router-link to="/consultas" class="nav-link">Consultas</router-link>
                    </nav> -->
                </div>

                <div class="header-right">
<!--                    <div class="search-box">-->
<!--                        <input type="text" placeholder="Buscar..."/>-->
<!--                        <i class="fas fa-search search-icon"></i>-->
<!--                    </div>-->

<!--                    <div class="notifications">-->
<!--                        <i class="fas fa-bell"></i>-->
<!--                        <span class="notification-badge"></span>-->
<!--                    </div>-->

                    <div class="user-profile dropdown">
                        <template v-if="isVerified">
                            <img
                                :src="profilePicImage"
                                alt="Dr. Mario García"
                                class="profile-img dropdown-toggle"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            />
                        </template>
                        <div v-else 
                            class="profile-initials dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ getUserInitials() }}
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li v-if="isVerified">
                                <a class="dropdown-item" href="#" @click.prevent="goToDashboard">
                                    <i class="fas fa-th-large"></i> Dashboard
                                </a>
                            </li>
                            <li v-if="isVerified">
                                <a class="dropdown-item" href="#" @click.prevent="goToProfile">
                                    <i class="fas fa-user-circle"></i> Ir al perfil
                                </a>
                            </li>
                            <li v-if="isVerified">
                                <a class="dropdown-item" href="#" @click.prevent="goToClinic">
                                    <i class="fa-solid fa-house-chimney-medical"></i> Mi clínica
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" @click.prevent="logout">
                                    <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <!-- Banner de cuenta no verificada -->
        <div v-if="!isVerified" class="verification-banner">
            <div class="verification-banner-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Tu cuenta no está verificada. Para acceder a todas las funciones, por favor <router-link :to="{ name: 'VerifyProfessionalAccount' }" class="verify-link">verifica tu cuenta</router-link>.</span>
            </div>
        </div>

        <!-- Contenido principal - Nueva interfaz -->
        <div class="dashboard-content">
            <div class="dashboard-header">
                <h1 class="welcome-title">¡Bienvenido/a, Dr. {{user && user.first_name && user.last_name ? (partialName + '!') : 'Cargando...'}}</h1>
                <p class="welcome-subtitle">Aquí tienes pacientes potenciales cercanos a tu ubicación que coinciden con tu especialidad en Cardiología</p>
            </div>

            <!-- Nuevas tarjetas de características -->
            <div class="features-cards">
                <div class="feature-card" @click="isVerified ? goToDashboard() : null" :class="{ 'clickable': isVerified }">
                    <div class="feature-icon">
                        <i class="far fa-eye"></i>
                    </div>
                    <h3>Visibilidad Profesional</h3>
                    <p>Publique su perfil y sea encontrado por nuevos pacientes interesados en su especialidad.</p>
                </div>
                
                <div class="feature-card" @click="isVerified ? goToClinic() : null" :class="{ 'clickable': isVerified }">
                    <div class="feature-icon">
                        <i class="far fa-calendar-alt"></i>
                    </div>
                    <h3>Gestión de Citas</h3>
                    <p>Organice su agenda y gestione pacientes eficientemente con nuestras herramientas avanzadas.</p>
                </div>
                
                <div class="feature-card" @click="isVerified ? $router.push({name: 'Patients'}) : null" :class="{ 'clickable': isVerified }">
                    <div class="feature-icon">
                        <i class="fas fa-user-friends"></i>
                    </div>
                    <h3>Conexión con Pacientes</h3>
                    <p>Acceda a pacientes potenciales buscando su especialidad y expanda su práctica médica.</p>
                </div>
            </div>

            <!-- Sección para cuentas no verificadas -->
            <div v-if="!isVerified">
                <!-- Sección de casi listo para conectar -->
                <div class="ready-connect-section">
                    <div class="ready-connect-content">
                        <h2>¡Casi Listo para Conectar!</h2>
                        <p>Complete la verificación de su cuenta para activar todas las funcionalidades y comenzar a conectar con pacientes en Salus Nexus.</p>
                        <button class="verify-account-btn" @click="$router.push({name: 'VerifyProfessionalAccount'})">
                            Iniciar Verificación
                        </button>
                    </div>
                    <div class="ready-connect-image">
                        <img src="/home-login.png" alt="Verificación de cuenta">
                    </div>
                </div>

                <!-- Sección de verificación de cuenta -->
                <div class="verification-info-section">
                    <p>La verificación es un proceso rápido que garantiza la seguridad de todos los usuarios de nuestra plataforma. Si tiene alguna pregunta, <a href="#" class="support-link">contacte a nuestro equipo de soporte</a>.</p>
                </div>
            </div>

            <!-- Sección para cuentas verificadas -->
            <div v-if="isVerified" class="verified-account-section">
                <div class="dashboard-overview">
                    <h2>Su Panel Principal</h2>
                    <p>Acceda rápidamente a todas las funciones de Salus Nexus</p>
                    
                    <div class="quick-actions-grid">
                        <div class="quick-action-card">
                            <div class="quick-action-icon">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <h3>Mi Perfil</h3>
                            <p>Gestione su información profesional</p>
                        </div>
                        
                        <div class="quick-action-card">
                            <div class="quick-action-icon">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <h3>Agenda</h3>
                            <p>Administre su calendario de citas</p>
                        </div>
                        
                        <div class="quick-action-card">
                            <div class="quick-action-icon">
                                <i class="fas fa-user-friends"></i>
                            </div>
                            <h3>Pacientes</h3>
                            <p>Administre sus pacientes</p>
                        </div>
                        
                        <div class="quick-action-card">
                            <div class="quick-action-icon">
                                <i class="fas fa-clinic-medical"></i>
                            </div>
                            <h3>Mi Clínica</h3>
                            <p>Gestione la información de su consultorio</p>
                        </div>
                        
                        <div class="quick-action-card">
                            <div class="quick-action-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <h3>Reseñas</h3>
                            <p>Vea las opiniones de sus pacientes</p>
                        </div>
                        
                        <div class="quick-action-card">
                            <div class="quick-action-icon dashboard-icon">
                                <i class="fas fa-th-large"></i>
                            </div>
                            <h3>Dashboard Completo</h3>
                            <p>Acceda a todas las funcionalidades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";

const API_IMAGES_URL = process.env.VUE_APP_API_URL_IMAGE;
const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'LoginHome',
    data() {
        return {
            activeFilter: 'nearby',
            showEmptyState: false,
            patients: [
                {
                    id: 1,
                    name: 'Carlos Rodríguez',
                    age: 45,
                    symptoms: 'Dolor en el pecho y dificultad para respirar',
                    specialty: 'Cardiología - Arritmias',
                    location: 'Colonia Guatemala, San Miguel',
                    distance: 2.3,
                    status: 'Nuevo en la plataforma',
                    statusClass: 'status-new',
                    avatar: 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png'
                },
                {
                    id: 2,
                    name: 'Ana Martínez',
                    age: 62,
                    symptoms: 'Hipertensión arterial y mareos frecuentes',
                    specialty: 'Cardiología - Hipertensión',
                    location: 'Colonia Guatemala, San Miguel',
                    distance: 4.1,
                    status: 'Ha visitado tu perfil',
                    statusClass: 'status-visited',
                    avatar: 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png'
                },
                {
                    id: 3,
                    name: 'Luis Sánchez',
                    age: 53,
                    symptoms: 'Palpitaciones y fatiga',
                    specialty: 'Cardiología - Arritmias',
                    location: 'Colonia Guatemala, San Miguel',
                    distance: 1.8,
                    status: 'Nuevo en la plataforma',
                    statusClass: 'status-new',
                    avatar: 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png'
                },
                {
                    id: 4,
                    name: 'Elena Gómez',
                    age: 58,
                    symptoms: 'Antecedentes de infarto, control preventivo',
                    specialty: 'Cardiología - Prevención',
                    location: 'Colonia Guatemala, San Miguel',
                    distance: 3.5,
                    status: 'Ha interactuado con publicaciones',
                    statusClass: 'status-interacted',
                    avatar: 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png'
                }
            ],
            user: null,
            fullName: null,
            partialName: null,
            profilePicImage: null,
            isVerified: null,
            showVerificationBanner: true
        }
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.$router.push({name: 'Login'});
        }
        this.fullName = this.getFullName();
        this.partialName = this.getPartalNme();
        this.setProfilePic();
        this.fetchMyClinic();
        
        // Añadir verificación de cuenta
        await this.fetchUserProfile();
    },
    methods: {
        async fetchMyClinic() {
            try {
                const response = await fetch(`${API_URL}/medical-clinics/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching clinic data');
                }

                const data = await response.json();

                if (!data.status) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                console.log(data.data);

                localStorage.setItem('clinics', JSON.stringify(data.data));
                // console.log(this.myClinic);
            } catch (error) {
                console.error('Error:', error);
            }
        },
        getFullName() {
            if (this.user && this.user.first_name && this.user.last_name) {
                return `${this.user.first_name} ${this.user.last_name}`;
            }
            return 'Cargando...';
        },
        setProfilePic(){
            if (this.user && this.user.profile_photo_path) {
                this.profilePicImage = API_IMAGES_URL + '/' + this.user.profile_photo_path;
            } else {
                this.profilePicImage = 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png';
            }
        },
        getPartalNme(){
            //Obtener solo primer nombre y primer apellido
            if (this.user && this.user.first_name && this.user.last_name) {
                const firstName = this.user.first_name.split(' ')[0];
                const lastName = this.user.last_name.split(' ')[0];
                return `${firstName} ${lastName}`;
            }
        },
        setActiveFilter(filter) {
            this.activeFilter = filter;
            this.showEmptyState = (filter === 'all');
        },
        loadAllPatients() {
            this.showEmptyState = false;
            // Logic to load all patients would go here
        },
        goToProfile() {
            this.$router.push({name: 'UserProfile'});
        },
        goToClinic(){
            this.$router.push({name: 'PreviewClinic'});
        },
        logout() {
            localStorage.removeItem('token');
            window.location.reload();
        },
        goToDashboard() {
            this.$router.push({name: 'Dashboard'});
        },
        async fetchUserProfile() {
            try {
                const response = await fetch(API_URL + '/userprofile', {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el perfil del usuario');
                }

                const data = await response.json();

                if (data.data) {
                    this.isVerified = data.data.verified;
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        },
        getUserInitials() {
            if (this.user && this.user.first_name && this.user.last_name) {
                const firstInitial = this.user.first_name.charAt(0).toUpperCase();
                const lastInitial = this.user.last_name.charAt(0).toUpperCase();
                return `${firstInitial}${lastInitial}`;
            }
            return 'UN'; // User Name default
        }
    }
}
</script>

<style scoped>
/* Estilos generales */
.medipro-dashboard-container {
    width: 100%;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8fafc;
    font-size: 16px;
}

/* Estilos del header */
.medipro-header {
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.header-content {
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 40px;
}

.heart-icon {
    color: #3b82f6;
    font-size: 24px;
    margin-right: 10px;
}

.logo-text {
    color: #3b82f6;
    font-weight: bold;
    font-size: 20px;
}

.main-nav {
    display: flex;
    gap: 25px;
}

.nav-link {
    color: #64748b;
    text-decoration: none;
    padding: 8px 12px;
    font-size: 15px;
    border-radius: 4px;
    transition: all 0.2s;
}

.nav-link:hover {
    color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.05);
}

.nav-link.active {
    color: #3b82f6;
    font-weight: 500;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.search-box {
    position: relative;
}

.search-box input {
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 8px 18px 8px 40px;
    font-size: 15px;
    width: 250px;
    background-color: #f9fafb;
    transition: all 0.2s;
}

.search-box input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 16px;
}

.notifications {
    position: relative;
    cursor: pointer;
}

.notifications i {
    color: #64748b;
    font-size: 20px;
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 50%;
    border: 2px solid #ffffff;
}

.user-profile {
    display: flex;
    align-items: center;
    cursor: default;
    position: relative;
}

.profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}

/* Estilos del contenido principal */
.dashboard-content {
    width: 100%;
    padding: 40px 5%;
    margin: 0 auto;
    box-sizing: border-box;
}

.dashboard-header {
    margin-bottom: 60px;
    text-align: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.welcome-title {
    font-size: 32px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 15px;
}

.welcome-subtitle {
    color: #64748b;
    font-size: 18px;
    max-width: 700px;
    margin: 0 auto;
}

/* Estilos para las tarjetas de características */
.features-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 60px;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2%;
}

.feature-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 35px 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.feature-card.clickable {
    cursor: pointer;
    position: relative;
}

.feature-card.clickable:after {
    content: "Haga clic para acceder";
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    font-size: 12px;
    color: #3b82f6;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.feature-card.clickable:hover:after {
    opacity: 1;
}

.feature-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #f0f5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

.feature-icon i {
    font-size: 28px;
    color: #3b82f6;
}

.feature-card h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 15px;
}

.feature-card p {
    color: #64748b;
    font-size: 16px;
    line-height: 1.6;
}

/* Sección de casi listo para conectar */
.ready-connect-section {
    background-color: #3b82f6;
    border-radius: 16px;
    padding: 50px 60px;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
}

.ready-connect-content {
    flex: 1;
    padding-right: 50px;
}

.ready-connect-content h2 {
    color: white;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
}

.ready-connect-content p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 30px;
}

.verify-account-btn {
    background-color: white;
    color: #3b82f6;
    font-weight: 600;
    padding: 14px 30px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.verify-account-btn:hover {
    background-color: #f8fafc;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.ready-connect-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ready-connect-image img {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: contain;
}

/* Sección de información de verificación */
.verification-info-section {
    background-color: #f0f5ff;
    border-radius: 12px;
    padding: 25px 30px;
    text-align: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.verification-info-section p {
    color: #4b5563;
    font-size: 16px;
    line-height: 1.6;
}

.support-link {
    color: #3b82f6;
    font-weight: 500;
    text-decoration: none;
}

.support-link:hover {
    text-decoration: underline;
}

/* Estilos para el banner de verificación */
.verification-banner {
    width: 100%;
    background-color: #fff6e6;
    border-bottom: 1px solid #fcd34d;
    padding: 12px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.verification-banner-content {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #92400e;
    font-size: 15px;
}

.verification-banner-content i {
    color: #f59e0b;
    font-size: 18px;
}

.verify-link {
    color: #2563eb;
    font-weight: 500;
    text-decoration: underline;
    transition: all 0.2s;
}

.verify-link:hover {
    color: #1d4ed8;
}

/* Estilo para mostrar iniciales en lugar de imagen de perfil */
.profile-initials {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
}

/* Personalización del dropdown de Bootstrap */
.dropdown-menu {
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    min-width: 180px;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    font-size: 14px;
    color: #374151;
}

.dropdown-item i {
    width: 16px;
    text-align: center;
    color: #6b7280;
}

.dropdown-item:hover {
    background-color: #f3f4f6;
    color: #1f2937;
}

.dropdown-item:hover i {
    color: #3b82f6;
}

/* Sección de cuenta verificada */
.verified-account-section {
    max-width: 1600px;
    margin: 0 auto 60px;
}

.dashboard-overview {
    text-align: center;
    margin-bottom: 40px;
}

.dashboard-overview h2 {
    font-size: 28px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
}

.dashboard-overview p {
    color: #64748b;
    font-size: 18px;
    margin-bottom: 40px;
}

.quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin: 0 auto;
    max-width: 1400px;
}

.quick-action-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 30px 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    text-align: center;
    cursor: default;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.quick-action-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.quick-action-icon {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: #f0f5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.quick-action-icon i {
    font-size: 25px;
    color: #3b82f6;
}

.dashboard-icon {
    background-color: #ebf8ff;
}

.dashboard-icon i {
    color: #0ea5e9;
}

.quick-action-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 10px;
}

.quick-action-card p {
    color: #64748b;
    font-size: 15px;
    line-height: 1.5;
}

/* Media queries para responsividad */
@media (max-width: 1400px) {
    .features-cards {
        padding: 0 4%;
    }
    
    .ready-connect-section {
        margin-left: 4%;
        margin-right: 4%;
        padding: 40px 50px;
    }
    
    .verification-info-section {
        margin-left: 4%;
        margin-right: 4%;
    }
    
    .quick-actions-grid {
        grid-template-columns: repeat(3, 1fr);
        padding: 0 4%;
    }
}

@media (max-width: 1200px) {
    .quick-actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 1024px) {
    .dashboard-content {
        padding: 30px 4%;
    }
    
    .features-cards {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 3%;
    }
    
    .ready-connect-section {
        padding: 35px 40px;
    }
    
    .ready-connect-content h2 {
        font-size: 28px;
    }
    
    .ready-connect-content p {
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .header-content {
        padding: 0 15px;
    }
    
    .dashboard-content {
        padding: 20px 3%;
    }
    
    .features-cards {
        grid-template-columns: 1fr;
        padding: 0 5%;
        gap: 20px;
    }
    
    .ready-connect-section {
        flex-direction: column;
        padding: 30px;
        margin-left: 5%;
        margin-right: 5%;
    }
    
    .ready-connect-content {
        padding-right: 0;
        margin-bottom: 30px;
        text-align: center;
    }
    
    .verification-info-section {
        margin-left: 5%;
        margin-right: 5%;
    }
    
    .quick-actions-grid {
        grid-template-columns: 1fr;
        padding: 0 5%;
    }
}

@media (max-width: 640px) {
    .welcome-title {
        font-size: 24px;
    }
    
    .welcome-subtitle {
        font-size: 16px;
    }
    
    .ready-connect-content h2 {
        font-size: 22px;
    }
    
    .ready-connect-section {
        padding: 25px;
    }
    
    .feature-card {
        padding: 25px 20px;
    }
    
    .dashboard-overview h2 {
        font-size: 24px;
    }
    
    .dashboard-overview p {
        font-size: 16px;
    }
}
</style> 