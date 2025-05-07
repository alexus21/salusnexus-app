<template>
    <aside :class="['sidebar', { 'is-open': isOpen }]">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon">SN</div>
                <div class="logo-text">Salus Nexus</div>
            </div>
            <button class="close-button" v-if="isOpen && window.innerWidth < 768" @click="$emit('close-sidebar')">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="user-profile">
            <div class="avatar" v-if="userData.profile_photo_path">
                <img :src="profileImageUrl" alt="Foto de perfil" />
            </div>
            <div class="avatar" v-else>
                <i class="fas fa-user-md"></i>
            </div>
            <div class="user-info">
                <div class="user-name">{{ userTitle }} {{ userData.first_name }} {{ userData.last_name }}</div>
                <div class="user-status">
                    <span class="status-dot"></span>
                    <span>Online</span>
                </div>
                <div class="subscription-badge" :class="{ 'premium': isPremiumUser }">
                    <i :class="isPremiumUser ? 'fas fa-crown' : 'fas fa-user'"></i>
                    <span>{{ isPremiumUser ? 'Premium' : 'Gratis' }}</span>
                </div>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="section-title">MENU PRINCIPAL</div>
                <ul>
                    <li v-for="item in filteredNavigationItems" :key="item.name">
                        <a
                            :href="item.href"
                            :class="['nav-item', { active: activeItem === item.name }]"
                            @click.prevent="item.requiresPremium && !isPremiumUser ? showPremiumFeatureAlert(item.label) : navigate(item.name)"
                        >
                            <div class="nav-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <span class="nav-label">{{ item.label }}</span>
                            <span class="premium-badge" v-if="item.requiresPremium && !isPremiumUser">
                                <i class="fas fa-crown"></i>
                            </span>
                            <span class="hover-indicator"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        
        <div class="sidebar-footer">
            <div class="section-title">OPCIONES</div>
            <nav class="sidebar-nav">
                <ul>
                    <li v-for="item in footerItems" :key="item.name">
                        <a
                            :href="item.href"
                            :class="['nav-item', { active: activeItem === item.name }]"
                            @click.prevent="navigate(item.name)"
                        >
                            <div class="nav-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <span class="nav-label">{{ item.label }}</span>
                            <span class="hover-indicator"></span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="version-info">
                <span>v1.0.0</span>
            </div>
        </div>
    </aside>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'AppSidebar',
    props: {
        activeItem: {
            type: String,
            default: 'Inicio',
        },
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            window: window,
            navigationItems: [
                { name: 'Horario', label: 'Mi horario', href: '/horario', icon: 'fas fa-clock', requiresPremium: false },
                { name: 'Agenda', label: 'Agenda', href: '/agenda', icon: 'fas fa-calendar-alt', requiresPremium: true },
                { name: 'Pacientes', label: 'Pacientes', href: '/pacientes', icon: 'fas fa-users', requiresPremium: true },
                { name: 'Resenas', label: 'Reseñas', href: '#', icon: 'fas fa-star', requiresPremium: true },
                { name: 'Suscripcion', label: 'Suscripción', href: '#', icon: 'fas fa-rocket', requiresPremium: false },
            ],
            footerItems: [
                { name: 'Logout', label: 'Cerrar Sesión', href: '#', icon: 'fas fa-sign-out-alt' },
            ],
            userData: {
                first_name: '',
                last_name: '',
                gender: '',
                profile_photo_path: '',
                subscription_type: 'profesional_gratis'
            }
        };
    },
    computed: {
        userTitle() {
            return this.userData.gender === 'femenino' ? 'Dra.' : 'Dr.';
        },
        profileImageUrl() {
            if (!this.userData.profile_photo_path) return '';
            return `${process.env.VUE_APP_API_URL_IMAGE}/${this.userData.profile_photo_path}`;
        },
        isPremiumUser() {
            return this.userData.subscription_type === 'profesional_avanzado';
        },
        filteredNavigationItems() {
            // Always show all items but mark premium ones
            return this.navigationItems;
        }
    },
    methods: {
        navigate(itemName) {
            console.log(`Navegando a: ${itemName}`);
            if (this.isOpen && window.innerWidth < 768) {
                this.$emit('close-sidebar');
            }

            this.$emit('update:activeItem', itemName);
            this.$emit('navigate', itemName);

            if (itemName === 'Logout') {
                this.Logout();
            }
        },
        showPremiumFeatureAlert(featureName) {
            Swal.fire({
                title: 'Característica Premium',
                html: `<div style="text-align: center; padding: 10px;">
                    <div style="font-size: 2rem; color: #f59e0b; margin-bottom: 15px;"><i class="fas fa-crown"></i></div>
                    <p><strong>${featureName}</strong> está disponible solo para profesionales con suscripción Premium.</p>
                    <p>Actualiza tu suscripción para acceder a todas las funcionalidades.</p>
                </div>`,
                confirmButtonText: 'Ver planes',
                showCancelButton: true,
                cancelButtonText: 'Cerrar',
                confirmButtonColor: '#f59e0b'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Navigate to subscription page
                    this.navigate('Suscripcion');
                }
            });
        },
        goToHome() {
            this.$router.push({ name: 'Home' });
        },
        Logout() {
            localStorage.removeItem('token');
            window.location.reload();
        },
        loadUserData() {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData) {
                    this.userData = {
                        first_name: userData.first_name || '',
                        last_name: userData.last_name || '',
                        gender: userData.gender || 'masculino',
                        profile_photo_path: userData.profile_photo_path || '',
                        subscription_type: userData.subscription_type || 'profesional_gratis'
                    };
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    },
    mounted() {
        this.loadUserData();
    }
};
</script>

<style scoped>
.sidebar {
    width: 210px;
    background: linear-gradient(135deg, #2d3590 0%, #212475 100%);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    border-radius: 0 0 0 0;
    box-shadow: 5px 0 20px rgba(0, 0, 0, 0.1);
    color: #fff;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    padding: 0;
}

/* Subscription badge styles */
.subscription-badge {
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 10px;
    margin-top: 5px;
    gap: 4px;
}

.subscription-badge.premium {
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
    color: #fff;
    box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);
}

/* Premium feature badge */
.premium-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 8px;
    box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
}

/* SweetAlert custom styles - moved to script section */

.sidebar.is-open {
    transform: translateX(0);
}

/* Estilos para pantallas más grandes */
@media (min-width: 768px) {
    .sidebar {
        position: static;
        transform: translateX(0);
        z-index: auto;
    }
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #3b82f6;
    color: white;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
}

.logo-text {
    font-size: 16px;
    font-weight: 700;
    color: white;
}

.close-button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.2);
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    margin: 0 0 16px 0;
}

.avatar {
    width: 38px;
    height: 38px;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-info {
    flex: 1;
    overflow: hidden;
}

.user-name {
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-status {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
}

.status-dot {
    width: 6px;
    height: 6px;
    background-color: #10b981;
    border-radius: 50%;
    display: inline-block;
}

.nav-section {
    margin-bottom: 20px;
}

.section-title {
    padding: 0 16px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    margin: 2px 0;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    margin-right: 12px;
    transition: all 0.2s ease;
    color: rgba(255, 255, 255, 0.8);
}

.nav-label {
    font-weight: 500;
    font-size: 13px;
}

.hover-indicator {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    background: #3b82f6;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
}

.nav-item:hover .hover-indicator {
    opacity: 1;
}

.nav-item.active {
    background: rgba(59, 130, 246, 0.1);
    color: #fff;
}

.nav-item.active .nav-icon {
    color: #3b82f6;
}

.nav-item.active .hover-indicator {
    opacity: 1;
}

.sidebar-footer {
    margin-top: auto;
    padding: 16px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.version-info {
    padding: 12px 16px;
    text-align: center;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
}

/* Animaciones */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.sidebar-nav ul li {
    animation: fadeIn 0.3s ease forwards;
    opacity: 0;
}

.sidebar-nav ul li:nth-child(1) { animation-delay: 0.1s; }
.sidebar-nav ul li:nth-child(2) { animation-delay: 0.2s; }
.sidebar-nav ul li:nth-child(3) { animation-delay: 0.3s; }
.sidebar-nav ul li:nth-child(4) { animation-delay: 0.4s; }
.sidebar-nav ul li:nth-child(5) { animation-delay: 0.5s; }

/* Media queries para responsividad */
@media (max-width: 767px) {
    .sidebar {
        width: 200px;
    }
    
    .nav-item {
        padding: 8px 12px;
    }
    
    .nav-icon {
        width: 28px;
        height: 28px;
    }
}
</style>