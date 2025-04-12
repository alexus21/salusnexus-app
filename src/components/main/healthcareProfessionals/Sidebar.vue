<template>
    <aside :class="['sidebar', { 'is-open': isOpen }]">
        <div class="sidebar-logo btn" @click.prevent="goToHome">Salus Nexus</div>
        <nav class="sidebar-nav">
            <ul>
                <li v-for="item in navigationItems" :key="item.name">
                    <a
                        :href="item.href"
                        :class="{ active: activeItem === item.name }"
                        @click.prevent="navigate(item.name)"
                    >
                        <i :class="item.icon"></i> {{ item.label }}
                    </a>
                </li>
            </ul>
        </nav>
        <div class="sidebar-footer">
            <nav class="sidebar-nav">
                <ul>
                    <li v-for="item in footerItems" :key="item.name">
                        <a
                            :href="item.href"
                            :class="{ active: activeItem === item.name }"
                            @click.prevent="navigate(item.name)"
                        >
                            <i :class="item.icon"></i> {{ item.label }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'AppSidebar',
    props: {
        activeItem: {
            type: String,
            default: 'Inicio', // Item activo por defecto
        },
        isOpen: { // Nueva prop para controlar la visibilidad
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            navigationItems: [
                { name: 'Inicio', label: 'Inicio', href: '#', icon: 'fas fa-tachometer-alt' },
                { name: 'Agenda', label: 'Agenda', href: '#', icon: 'fas fa-calendar-alt' },
                { name: 'Pacientes', label: 'Pacientes', href: '#', icon: 'fas fa-users' },
                { name: 'Citas', label: 'Citas', href: '#', icon: 'fas fa-clipboard-list' },
                { name: 'Estadisticas', label: 'Estadísticas', href: '#', icon: 'fas fa-chart-line' },
                { name: 'Resenas', label: 'Reseñas', href: '#', icon: 'fas fa-star' },
                { name: 'Mensajes', label: 'Mensajes', href: '#', icon: 'fas fa-comments' },
                { name: 'Perfil', label: 'Mi Perfil', href: '#', icon: 'fas fa-user-edit' },
                { name: 'Suscripcion', label: 'Suscripción', href: '#', icon: 'fas fa-rocket' },
            ],
            footerItems: [
                { name: 'Configuracion', label: 'Configuración', href: '#', icon: 'fas fa-cog' },
                { name: 'Ayuda', label: 'Ayuda', href: '#', icon: 'fas fa-question-circle' },
                { name: 'Logout', label: 'Cerrar Sesión', href: '#', icon: 'fas fa-sign-out-alt' },
            ],
        };
    },
    methods: {
        navigate(itemName) {
            console.log(`Navegando a: ${itemName}`);
            // Si estamos en móvil y se hace clic en un enlace, podríamos querer cerrar el sidebar
            if (this.isOpen && window.innerWidth < 768) {
                this.$emit('close-sidebar');
            }

            // Emitir eventos originales
            this.$emit('update:activeItem', itemName);
            this.$emit('navigate', itemName);

             // Manejo especial para Logout
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
    width: 250px;
    background-color: #FFFFFF;
    padding: 20px 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E5E7EB;
    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
    overflow-y: auto;
    position: fixed; /* Cambiado para superponer en móvil */
    left: 0;
    top: 0;
    transform: translateX(-100%); /* Oculto por defecto en móvil */
    transition: transform 0.3s ease-in-out;
    z-index: 1000; /* Asegurar que esté por encima del contenido */
}

.sidebar.is-open {
    transform: translateX(0); /* Mostrar sidebar */
}

/* Estilos para pantallas más grandes */
@media (min-width: 768px) {
    .sidebar {
        position: static; /* Volver a posición estática en el layout */
        transform: translateX(0); /* Siempre visible */
        z-index: auto;
        box-shadow: 2px 0 5px rgba(0,0,0,0.05); /* Sombra original */
    }
}

.sidebar-logo {
    padding: 0 20px 20px 20px;
    font-size: 1.5em;
    font-weight: bold;
    color: #3B82F6;
}

.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-nav ul li a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #6B7280;
    transition: background-color 0.2s ease, color 0.2s ease;
    text-decoration: none;
    cursor: pointer;
}
.sidebar-nav ul li a i {
    margin-right: 15px;
    width: 20px;
    text-align: center;
}

.sidebar-nav ul li a:hover {
    background-color: #F3F4F6;
    color: #1F2937;
}

.sidebar-nav ul li a.active {
    background-color: #E0E7FF;
    color: #3B82F6;
    font-weight: 600;
    border-right: 3px solid #3B82F6;
    margin-right: -1px;
}

.sidebar-footer {
    margin-top: auto;
    padding: 20px 20px 0 20px;
    border-top: 1px solid #E5E7EB;
}
</style>