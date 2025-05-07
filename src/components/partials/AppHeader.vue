<template>
    <!-- Header de MediPro -->
    <header class="medipro-header">
        <div class="header-content">
            <div class="header-left">
                <router-link to="/" class="logo-link">
                    <i class="fas fa-heartbeat heart-icon"></i>
                    <span class="logo-text">Salus Nexus</span>
                </router-link>
            </div>

            <div class="header-right">
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
</template>

<script>
const API_IMAGES_URL = process.env.VUE_APP_API_URL_IMAGE;
const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'AppHeader',
    data() {
        return {
            user: null,
            profilePicImage: null,
            isVerified: null
        }
    },
    async mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.$router.push({name: 'Login'});
        }
        this.setProfilePic();
        
        // Añadir verificación de cuenta
        await this.fetchUserProfile();
    },
    methods: {
        setProfilePic(){
            if (this.user && this.user.profile_photo_path) {
                this.profilePicImage = API_IMAGES_URL + '/' + this.user.profile_photo_path;
            } else {
                this.profilePicImage = 'https://salusnexus-app.s3.us-east-2.amazonaws.com/images/2868b57e-c141-4948-97eb-84475e246755.png';
            }
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
</style> 