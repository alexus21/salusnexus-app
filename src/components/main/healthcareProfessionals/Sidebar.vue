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
            <div class="avatar">
                <i class="fas fa-user-md"></i>
            </div>
            <div class="user-info">
                <div class="user-name">Dr. Professional</div>
                <div class="user-status">
                    <span class="status-dot"></span>
                    <span>Online</span>
                </div>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="section-title">Menu Principal</div>
                <ul>
                    <li v-for="item in navigationItems" :key="item.name">
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
            </div>
        </nav>
        
        <div class="sidebar-footer">
            <div class="section-title">Opciones</div>
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
                { name: 'Horario', label: 'Mi horario', href: '/horario', icon: 'fas fa-clock' },
                { name: 'Agenda', label: 'Agenda', href: '/agenda', icon: 'fas fa-calendar-alt' },
                { name: 'Pacientes', label: 'Pacientes', href: '/pacientes', icon: 'fas fa-users' },
                { name: 'Resenas', label: 'Reseñas', href: '#', icon: 'fas fa-star' },
                { name: 'Suscripcion', label: 'Suscripción', href: '#', icon: 'fas fa-rocket' },
            ],
            footerItems: [
                { name: 'Logout', label: 'Cerrar Sesión', href: '#', icon: 'fas fa-sign-out-alt' },
            ],
        };
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
        goToHome() {
            this.$router.push({ name: 'Home' });
        },
        Logout() {
            localStorage.removeItem('token');
            window.location.reload();
        }
    },
};
</script>

<style scoped>
.sidebar {
    width: 270px;
    background: linear-gradient(135deg, #2b3990 0%, #232976 100%);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    border-radius: 0 24px 24px 0;
    box-shadow: 5px 0 20px rgba(0, 0, 0, 0.1);
    color: #fff;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    padding: 0;
}

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
    padding: 20px;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3a8ffe 0%, #1a56db 100%);
    border-radius: 12px;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(26, 86, 219, 0.3);
}

.logo-text {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(90deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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
    gap: 12px;
    padding: 16px 20px;
    margin: 0 12px 16px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    transition: all 0.2s ease;
}

.user-profile:hover {
    background: rgba(255, 255, 255, 0.12);
}

.avatar {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #3a8ffe 0%, #1a56db 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    gap: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

.status-dot {
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    display: inline-block;
}

.nav-section {
    margin-bottom: 20px;
}

.section-title {
    padding: 0 20px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin: 4px 12px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease;
    text-decoration: none;
    cursor: pointer;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
}

.nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-right: 12px;
    transition: all 0.2s ease;
}

.nav-label {
    font-weight: 500;
    font-size: 14px;
}

.hover-indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 0;
    background: linear-gradient(90deg, #3a8ffe, #1a56db);
    transition: width 0.2s ease;
    border-radius: 3px;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
}

.nav-item:hover .nav-icon {
    background: rgba(58, 143, 254, 0.2);
}

.nav-item:hover .hover-indicator {
    width: 100%;
}

.nav-item.active {
    background: linear-gradient(90deg, rgba(58, 143, 254, 0.2), rgba(26, 86, 219, 0.1));
    color: #fff;
}

.nav-item.active .nav-icon {
    background: linear-gradient(135deg, #3a8ffe 0%, #1a56db 100%);
    box-shadow: 0 4px 8px rgba(26, 86, 219, 0.3);
}

.sidebar-footer {
    margin-top: auto;
    padding: 16px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.version-info {
    padding: 12px 24px;
    text-align: center;
    font-size: 12px;
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
        width: 250px;
    }
    
    .nav-item {
        padding: 10px 14px;
    }
    
    .nav-icon {
        width: 32px;
        height: 32px;
    }
}
</style>