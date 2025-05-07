<template>
    <div class="doctor-profile-page">
        <!-- CDN para fuentes e iconos adicionales -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
        
        <!-- Agregar el componente AppHeader -->
        <app-header ref="appHeader"></app-header>
        
        <div class="profile-main-container">
            <!-- Sidebar izquierdo con foto de perfil y navegación -->
            <div class="profile-sidebar">
                <div class="profile-user">
                    <div class="profile-avatar-wrapper" @click="navigateToHome" title="Ir a inicio">
                        <img :src="profile_photo" alt="Foto de perfil" class="profile-avatar">
                    </div>
                    <h2 class="user-name">{{ user.first_name + ' ' + user.last_name }}</h2>
                    <p class="user-email">{{ user.email }}</p>
                    <button class="edit-profile-btn" @click="handleEditClick">
                        <i class="fas fa-pencil-alt"></i> {{ readonly ? 'Editar perfil' : 'Cancelar' }}
                    </button>
                    <button class="update-profile-btn" @click="fetchUpdate" v-if="!readonly">
                        <i class="fas fa-save"></i> Actualizar
                    </button>
                </div>
                
                <div class="sidebar-nav">
                    <ul>
                        <li :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
                            <i class="fas fa-user"></i> Mi Perfil
                        </li>
                        <li :class="{ active: activeTab === 'horarios' }" @click="activeTab = 'horarios'">
                            <i class="fas fa-clock"></i> Horarios
                        </li>
                        <li :class="{ active: activeTab === 'notificaciones' }" @click="activeTab = 'notificaciones'">
                            <i class="fas fa-bell"></i> Notificaciones
                        </li>
                        <li :class="{ active: activeTab === 'seguridad' }" @click="activeTab = 'seguridad'">
                            <i class="fas fa-shield-alt"></i> Seguridad
                        </li>
                        <li :class="{ active: activeTab === 'configuracion' }" @click="activeTab = 'configuracion'">
                            <i class="fas fa-cog"></i> Configuración
                        </li>
                    </ul>
                </div>
                
                <div class="sidebar-footer">
                    <button class="logout-btn" @click="handleLogout">
                        <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                    </button>
                </div>
            </div>

            <!-- Contenido principal -->
            <div class="profile-content">
                <transition name="fade" mode="out-in">
                    <!-- Pestaña Información Personal -->
                    <div v-if="activeTab === 'personal'" class="content-section" key="personal">
                        <div class="content-header">
                            <h3>
                                <i class="fas fa-id-card"></i>
                                Información Personal
                            </h3>
                            <p class="subtitle">Gestiona tu información personal</p>
                        </div>
                        
                        <div class="form-grid">
                            <!-- Nombre y apellido -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstname">NOMBRE</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-user icon-prefix"></i>
                                        <input 
                                            type="text" 
                                            id="firstname" 
                                            v-model="user.first_name" 
                                            :readonly="readonly" 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastname">APELLIDO</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-user icon-prefix"></i>
                                        <input 
                                            type="text" 
                                            id="lastname" 
                                            v-model="user.last_name" 
                                            :readonly="readonly" 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Email y teléfono -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="email">CORREO ELECTRÓNICO</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-envelope icon-prefix"></i>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            v-model="user.email" 
                                            readonly 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="phone">TELÉFONO</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-phone-alt icon-prefix"></i>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            v-model="user.phone" 
                                            :readonly="readonly" 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Identificación y fecha de nacimiento -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="dui">DUI (DOCUMENTO ÚNICO DE IDENTIDAD)</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-id-card icon-prefix"></i>
                                        <input 
                                            type="text" 
                                            id="dui" 
                                            v-model="user.dui" 
                                            readonly 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="dob">FECHA DE NACIMIENTO</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-calendar-alt icon-prefix"></i>
                                        <input 
                                            type="date" 
                                            id="dob" 
                                            v-model="user.date_of_birth" 
                                            :readonly="readonly" 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Dirección -->
                            <div class="form-row">
                                <div class="form-group full-width">
                                    <label for="address">DIRECCIÓN</label>
                                    <div class="input-with-icon">
                                        <i class="fas fa-map-marker-alt icon-prefix"></i>
                                        <input 
                                            type="text" 
                                            id="address" 
                                            v-model="user.home_address" 
                                            :readonly="readonly" 
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pestaña Horarios -->
                    <div v-else-if="activeTab === 'horarios'" class="content-section" key="horarios">
                        <div class="content-header">
                            <h3>
                                <i class="fas fa-clock"></i>
                                Horarios
                            </h3>
                            <p class="subtitle">Administra tus horarios de atención</p>
                        </div>
                        
                        <div class="schedule-container">
                            <schedule-day-card
                                v-for="(day, index) in weekDays"
                                :key="day.dayName"
                                :day-name="day.dayName"
                                :schedule-text="day.scheduleText"
                                :is-active="day.isActive"
                                @edit="editSchedule(index)"
                            />
                        </div>
                    </div>

                    <!-- Nueva Pestaña Notificaciones -->
                    <div v-else-if="activeTab === 'notificaciones'" class="content-section" key="notificaciones">
                        <div class="content-header">
                            <span class="notification-badge">Centro de notificaciones</span>
                            <h3>
                                <i class="fas fa-bell"></i>
                                Notificaciones
                            </h3>
                            <p class="subtitle">Gestiona todas tus preferencias de notificaciones</p>
                        </div>
                        
                        <div class="notifications-container">
                            <!-- Banner informativo -->
                            <div class="notification-banner">
                                <i class="fas fa-bell"></i>
                                <span>Configura cómo deseas recibir notificaciones y mantente informado de todo lo importante</span>
                            </div>
                            
                            <!-- Sección de preferencias de notificaciones generales -->
                            <div class="notification-section">
                                <div class="notification-section-header">
                                    <div class="icon-container blue">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Preferencias de notificaciones generales</h4>
                                        <p>Define cómo quieres recibir las notificaciones de la plataforma</p>
                                    </div>
                                </div>
                                
                                <div class="notification-options">
                                    <div class="notification-option">
                                        <div class="option-info">
                                            <i class="fas fa-envelope"></i>
                                            <div>
                                                <h5>Correo electrónico</h5>
                                                <p>Recibe notificaciones en tu bandeja de entrada</p>
                                            </div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" v-model="notifications.email">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="notification-option">
                                        <div class="option-info">
                                            <i class="fas fa-mobile-alt"></i>
                                            <div>
                                                <h5>SMS</h5>
                                                <p>Recibe mensajes de texto a tu teléfono</p>
                                            </div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" v-model="notifications.sms">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="notification-option">
                                        <div class="option-info">
                                            <i class="fas fa-desktop"></i>
                                            <div>
                                                <h5>Notificaciones push</h5>
                                                <p>Recibe alertas en tu navegador</p>
                                            </div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" v-model="notifications.push">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sección de notificaciones de seguridad (movida desde la sección de seguridad) -->
                            <div class="notification-section">
                                <div class="notification-section-header">
                                    <div class="icon-container green">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Notificaciones de seguridad</h4>
                                        <p>Recibe alertas sobre actividades sospechosas</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" v-model="securityNotificationsEnabled">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="notification-features">
                                    <div class="notification-feature" :class="{ 'disabled': !securityNotificationsEnabled }">
                                        <i class="fas fa-desktop"></i>
                                        <span>Recibe notificaciones cuando se detecte un inicio de sesión desde un dispositivo desconocido</span>
                                    </div>
                                    <div class="notification-feature" :class="{ 'disabled': !securityNotificationsEnabled }">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>Alertas de ubicaciones inusuales para inicios de sesión</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sección de notificaciones de pacientes -->
                            <div class="notification-section">
                                <div class="notification-section-header">
                                    <div class="icon-container purple">
                                        <i class="fas fa-user-injured"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Notificaciones de pacientes</h4>
                                        <p>Recibe alertas sobre la actividad de tus pacientes</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" v-model="notifications.patients">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="notification-features">
                                    <div class="notification-feature" :class="{ 'disabled': !notifications.patients }">
                                        <i class="fas fa-calendar-check"></i>
                                        <span>Nuevas citas programadas</span>
                                    </div>
                                    <div class="notification-feature" :class="{ 'disabled': !notifications.patients }">
                                        <i class="fas fa-calendar-times"></i>
                                        <span>Cancelaciones de citas</span>
                                    </div>
                                    <div class="notification-feature" :class="{ 'disabled': !notifications.patients }">
                                        <i class="fas fa-star"></i>
                                        <span>Nuevas reseñas de pacientes</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sección de recordatorios -->
                            <div class="notification-section">
                                <div class="notification-section-header">
                                    <div class="icon-container orange">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Recordatorios</h4>
                                        <p>Configura recordatorios para estar al día</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" v-model="notifications.reminders">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="notification-options">
                                    <div class="notification-option">
                                        <div class="option-info">
                                            <i class="fas fa-calendar-day"></i>
                                            <div>
                                                <h5>Recordatorio diario</h5>
                                                <p>Recibe un resumen de tu agenda del día</p>
                                            </div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" v-model="notifications.dailyReminder" :disabled="!notifications.reminders">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="notification-option">
                                        <div class="option-info">
                                            <i class="fas fa-stopwatch"></i>
                                            <div>
                                                <h5>Recordatorio de citas</h5>
                                                <p>Recibe alertas antes de tus citas</p>
                                            </div>
                                        </div>
                                        <div class="select-wrapper" :class="{ 'disabled': !notifications.reminders }">
                                            <select v-model="notifications.appointmentReminder" :disabled="!notifications.reminders">
                                                <option value="15">15 minutos antes</option>
                                                <option value="30">30 minutos antes</option>
                                                <option value="60">1 hora antes</option>
                                                <option value="120">2 horas antes</option>
                                                <option value="1440">1 día antes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="save-notification-settings" @click="saveNotificationSettings">
                                <i class="fas fa-save"></i>
                                Guardar preferencias
                            </button>
                        </div>
                    </div>

                    <!-- Pestaña Seguridad (modificada) -->
                    <div v-else-if="activeTab === 'seguridad'" class="content-section" key="seguridad">
                        <div class="content-header">
                            <span class="security-badge">Protección de cuenta</span>
                            <h3>
                                <i class="fas fa-shield-alt"></i>
                                Seguridad
                            </h3>
                            <p class="subtitle">Configura opciones de seguridad</p>
                        </div>
                        
                        <div class="security-container">
                            <!-- Banner informativo -->
                            <div class="security-banner">
                                <i class="fas fa-shield-alt"></i>
                                <span>Administra la seguridad de tu cuenta y protege tu información personal</span>
                            </div>
                            
                            <!-- Sección cambiar contraseña -->
                            <div class="security-section">
                                <div class="security-section-header">
                                    <div class="icon-container">
                                        <i class="fas fa-lock"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Cambiar contraseña</h4>
                                        <p>Actualiza tu contraseña periódicamente para mayor seguridad</p>
                                    </div>
                                </div>
                                
                                <div class="security-section-content">
                                    <div class="form-group password-group">
                                        <label for="current-password">Contraseña actual</label>
                                        <div class="password-input-container">
                                            <input 
                                                type="password" 
                                                id="current-password" 
                                                v-model="passwords.current"
                                                class="form-control"
                                            />
                                            <button type="button" class="password-toggle">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group password-group">
                                        <label for="new-password">Nueva contraseña</label>
                                        <div class="password-input-container">
                                            <input 
                                                type="password" 
                                                id="new-password" 
                                                v-model="passwords.new"
                                                class="form-control"
                                            />
                                            <button type="button" class="password-toggle">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group password-group">
                                        <label for="confirm-password">Confirmar nueva contraseña</label>
                                        <div class="password-input-container">
                                            <input 
                                                type="password" 
                                                id="confirm-password" 
                                                v-model="passwords.confirm"
                                                class="form-control"
                                            />
                                            <button type="button" class="password-toggle">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <button type="button" class="update-password-btn">
                                        <i class="fas fa-key"></i>
                                        Actualizar contraseña
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Sección autenticación de dos factores -->
                            <div class="security-section">
                                <div class="security-section-header two-factor">
                                    <div class="icon-container purple">
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                    <div class="header-text">
                                        <h4>Autenticación de dos factores</h4>
                                        <p>Añade una capa adicional de seguridad a tu cuenta</p>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" v-model="twoFactorEnabled">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                
                                <div class="security-features">
                                    <div class="security-feature" :class="{ 'disabled': !twoFactorEnabled }">
                                        <i class="fas fa-comment-alt"></i>
                                        <span>Recibe un código de verificación en tu teléfono cada vez que inicies sesión</span>
                                    </div>
                                    <div class="security-feature" :class="{ 'disabled': !twoFactorEnabled }">
                                        <i class="fas fa-lock"></i>
                                        <span>Protege tu cuenta incluso si tu contraseña es comprometida</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Zona de peligro -->
                            <div class="danger-zone">
                                <div class="danger-header">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>Zona de peligro</span>
                                </div>
                                
                                <div class="danger-content">
                                    <h4>Acciones irreversibles para tu cuenta</h4>
                                    <p>Las siguientes acciones son permanentes y no se pueden deshacer. Por favor, procede con precaución.</p>
                                    
                                    <button type="button" class="delete-account-btn" @click="showDeleteAccountModal">
                                        <i class="fas fa-trash-alt"></i>
                                        Eliminar mi cuenta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pestaña Configuración -->
                    <div v-else-if="activeTab === 'configuracion'" class="content-section" key="configuracion">
                        <div class="content-header">
                            <h3>
                                <i class="fas fa-cog"></i>
                                Configuración
                            </h3>
                            <p class="subtitle">Administra las preferencias generales de tu cuenta</p>
                        </div>
                        
                        <div class="config-container">
                            <!-- Contenido de configuración -->
                            <div class="config-section">
                                <h4>Configuración general</h4>
                                <p>Personaliza la plataforma según tus preferencias</p>
                                
                                <div class="config-option">
                                    <div class="option-left">
                                        <i class="fas fa-language"></i>
                                        <div>
                                            <h5>Idioma</h5>
                                            <p>Selecciona el idioma de la plataforma</p>
                                        </div>
                                    </div>
                                    <select v-model="config.language" class="config-select">
                                        <option value="es">Español</option>
                                        <option value="en">English</option>
                                        <option value="pt">Português</option>
                                    </select>
                                </div>
                                
                                <div class="config-option">
                                    <div class="option-left">
                                        <i class="fas fa-palette"></i>
                                        <div>
                                            <h5>Tema</h5>
                                            <p>Elige tu tema preferido</p>
                                        </div>
                                    </div>
                                    <select v-model="config.theme" class="config-select">
                                        <option value="light">Claro</option>
                                        <option value="dark">Oscuro</option>
                                        <option value="system">Sistema</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!-- Añadir el modal de confirmación para eliminar cuenta -->
        <div class="delete-account-modal" v-if="showDeleteModal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <h3>Eliminar cuenta</h3>
                    <button class="close-button" @click="closeDeleteModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="modal-text">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y perderás todos tus datos.</p>
                    <div class="confirmation-input">
                        <p>Escribe "ELIMINAR" para confirmar:</p>
                        <input 
                            type="text" 
                            v-model="deleteConfirmText" 
                            class="form-control delete-confirm" 
                            placeholder="ELIMINAR"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" @click="closeDeleteModal">Cancelar</button>
                    <button 
                        class="confirm-delete-btn" 
                        :disabled="deleteConfirmText !== 'ELIMINAR'"
                        @click="confirmDeleteAccount"
                    >
                        Eliminar permanentemente
                    </button>
                </div>
            </div>
        </div>

        <!-- Añadir overlay para el modal -->
        <div class="modal-overlay" v-if="showDeleteModal" @click="closeDeleteModal"></div>
    </div>
</template>

<script>
import swal from "sweetalert2";
import ScheduleDayCard from './ScheduleDayCard.vue';
import AppHeader from '../partials/AppHeader.vue';

const API_URL = process.env.VUE_APP_API_URL;
const API_URL_IMAGE = process.env.VUE_APP_API_URL_IMAGE;

export default {
    name: 'DoctorProfileComponent',
    components: {
        ScheduleDayCard,
        AppHeader
    },
    data() {
        return {
            user: {
                first_name: '',
                last_name: '',
                date_of_birth: '',
                phone: '',
                home_address: '',
                email: '',
                profile_photo_path: ''
            },
            loading: true,
            isVerified: null,
            profile_photo: null,
            activeTab: 'personal', // Default active tab
            readonly: true,
            weekDays: [
                { dayName: 'Lunes', scheduleText: '8:00 AM - 5:00 PM', isActive: true },
                { dayName: 'Martes', scheduleText: '8:00 AM - 5:00 PM', isActive: true },
                { dayName: 'Miércoles', scheduleText: '8:00 AM - 5:00 PM', isActive: true },
                { dayName: 'Jueves', scheduleText: '8:00 AM - 5:00 PM', isActive: true },
                { dayName: 'Viernes', scheduleText: '8:00 AM - 5:00 PM', isActive: true },
                { dayName: 'Sábado', scheduleText: '9:00 AM - 1:00 PM', isActive: true },
                { dayName: 'Domingo', scheduleText: 'No disponible', isActive: false },
            ],
            passwords: {
                current: '',
                new: '',
                confirm: ''
            },
            twoFactorEnabled: false,
            securityNotificationsEnabled: true,
            showDeleteModal: false,
            deleteConfirmText: '',
            notifications: {
                email: true,
                sms: false,
                push: true,
                patients: true,
                reminders: true,
                dailyReminder: true,
                appointmentReminder: 30
            },
            config: {
                language: 'es',
                theme: 'light'
            },
            isPageTransitioning: false
        }
    },
    async mounted() {
        await this.fetchUserProfile().then(() => {
            this.showAlertIsNotVerified();
        });
        
        document.body.classList.add('profile-page-active');
        
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        document.body.classList.remove('profile-page-active');
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            console.log('Window resized');
        },
        editSchedule(index) {
            console.log(`Editando horario para ${this.weekDays[index].dayName}`);
            // Aquí se implementaría la lógica para editar el horario seleccionado
        },
        navigateToHome() {
            this.$router.push({ name: 'Home' });
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

                this.user = data.data;
                this.profile_photo = API_URL_IMAGE + '/' + this.user.profile_photo_path;
                this.isVerified = this.user.verified;
                this.loading = false;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error fetching user profile:', error);
                this.loading = false;
            }
        },
        showAlertIsNotVerified() {
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
            this.readonly = !this.readonly;
            
            const formControls = document.querySelectorAll('.form-control');
            formControls.forEach(input => {
                input.classList.add('input-transition');
                setTimeout(() => {
                    input.classList.remove('input-transition');
                }, 500);
            });
        },
        async fetchUpdate(){
            try {
                this.readonly = !this.readonly;

                const response = await fetch(API_URL + '/professionals/update/' + this.user.user_id, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                });

                if (!response.ok) {
                    throw new Error('Error al editar el perfil');
                }

                const data = await response.json();

                console.log(data);

                if(!data.status){
                    swal.fire({
                        icon: 'error',
                        iconColor: '#D69656',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#d65656',
                    });
                    return;
                }

                swal.fire({
                    icon: 'success',
                    iconColor: '#D69656',
                    title: 'Éxito',
                    text: data.message,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#5660d6',
                });

                console.log(data);

            } catch (error) {
                console.error('Error al editar el perfil:', error);
            }
        },
        showDeleteAccountModal() {
            this.showDeleteModal = true;
            this.deleteConfirmText = '';
            
            setTimeout(() => {
                const modal = document.querySelector('.delete-account-modal');
                if (modal) {
                    modal.classList.add('modal-active');
                }
            }, 10);
        },
        closeDeleteModal() {
            const modal = document.querySelector('.delete-account-modal');
            if (modal) {
                modal.classList.remove('modal-active');
                setTimeout(() => {
                    this.showDeleteModal = false;
                }, 300);
            } else {
                this.showDeleteModal = false;
            }
        },
        confirmDeleteAccount() {
            if (this.deleteConfirmText === 'ELIMINAR') {
                swal.fire({
                    icon: 'success',
                    title: 'Cuenta eliminada',
                    text: 'Tu cuenta ha sido eliminada correctamente.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3b82f6',
                }).then(() => {
                    this.handleLogout();
                });
                this.closeDeleteModal();
            }
        },
        handleLogout() {
            this.$refs.appHeader.logout();
        },
        saveNotificationSettings() {
            swal.fire({
                icon: 'success',
                title: 'Configuración guardada',
                text: 'Tus preferencias de notificaciones han sido actualizadas.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3b82f6',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp'
                }
            });
        }
    }
}
</script>

<style scoped>
/* Estilos generales */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.doctor-profile-page {
    min-height: 100vh;
    background-color: #f5f7fa;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-main-container {
    display: flex;
    flex: 1;
    padding-top: 15px; /* Altura del header para evitar superposición */
    min-height: calc(100vh - 65px); /* Restar la altura del header */
}

/* Sidebar izquierdo */
.profile-sidebar {
    width: 280px;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 65px; /* Ajustar para que empiece después del header */
    height: calc(100vh - 65px); /* Restar la altura del header */
    z-index: 10;
    overflow-y: auto; /* Permitir desplazamiento si el contenido es muy largo */
}

.profile-user {
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e9ecef;
}

.profile-avatar-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
    border: 3px solid #f0f2f5;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.profile-avatar-wrapper:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.profile-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
}

.user-email {
    font-size: 0.9rem;
    color: #718096;
    margin-bottom: 20px;
}

.edit-profile-btn, .update-profile-btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 10px;
}

.edit-profile-btn {
    background-color: #3b82f6;
    color: white;
}

.edit-profile-btn:hover {
    background-color: #2563eb;
}

.update-profile-btn {
    background-color: #10b981;
    color: white;
}

.update-profile-btn:hover {
    background-color: #059669;
}

.sidebar-nav {
    flex-grow: 1;
    padding: 20px 15px;
}

.sidebar-nav ul {
    list-style: none;
}

.sidebar-nav li {
    padding: 12px 20px 12px 16px;
    display: flex;
    align-items: center;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    border-radius: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    border-left: 4px solid transparent;
}

.sidebar-nav li:hover, 
.sidebar-nav li.active {
    background-color: #eaf2ff;
    color: #3b82f6;
    border-left: 4px solid #3b82f6;
    box-shadow: 0 2px 5px rgba(59, 130, 246, 0.1);
}

.sidebar-nav li i {
    margin-right: 12px;
    min-width: 24px;
    text-align: center;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    color: inherit;
}

/* Añadir una pequeña marca indicadora a la izquierda */
.sidebar-nav li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: transparent;
    border-radius: 0 2px 2px 0;
    transition: all 0.3s ease;
}

.sidebar-nav li:hover::before,
.sidebar-nav li.active::before {
    background-color: #3b82f6;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid #e9ecef;
}

.logout-btn {
    width: 100%;
    padding: 10px;
    background-color: #f1f5f9;
    border: none;
    border-radius: 8px;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background-color: #fef2f2;
    color: #ef4444;
}

.logout-btn i {
    margin-right: 8px;
}

/* Área de contenido principal */
.profile-content {
    flex-grow: 1;
    padding: 30px;
    max-width: calc(100% - 280px);
}

.content-section {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.content-header {
    padding: 20px 25px;
    border-bottom: 1px solid #e9ecef;
}

.content-header h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.content-header h3 i {
    margin-right: 10px;
    color: #3b82f6;
}

.subtitle {
    color: #718096;
    font-size: 0.9rem;
}

.form-grid {
    padding: 25px;
}

.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.form-group {
    flex: 1;
    min-width: 300px;
}

.form-group.full-width {
    flex-basis: 100%;
    max-width: 100%;
}

.form-group label {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 6px;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.input-with-icon {
    position: relative;
}

.icon-prefix {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
}

.form-control {
    width: 100%;
    padding: 12px 15px 12px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #1e293b;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-control[readonly] {
    background-color: #f8fafc;
    cursor: not-allowed;
}

.emergency-contact-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.emergency-contact-section h4 {
    font-size: 1.1rem;
    font-weight: 500;
    color: #2d3748;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

.emergency-contact-section h4 i {
    margin-right: 10px;
    color: #ef4444;
}

/* Estilos para la sección de horarios */
.schedule-container {
    padding: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* Responsive design */
@media (max-width: 1024px) {
    .form-group {
        min-width: 250px;
    }
}

@media (max-width: 768px) {
    .profile-main-container {
        flex-direction: column;
        padding-top: 65px; /* Mantener el espacio para el header fijo */
    }
    
    .profile-sidebar {
        width: 100%;
        height: auto;
        position: relative;
        top: 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .profile-user {
        padding: 20px;
    }
    
    .profile-avatar-wrapper {
        width: 80px;
        height: 80px;
    }
    
    .sidebar-nav {
        padding: 10px 0;
    }
    
    .sidebar-nav ul {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 10px;
        -webkit-overflow-scrolling: touch; /* Mejorar desplazamiento en iOS */
    }
    
    .sidebar-nav li {
        padding: 10px 15px;
        flex-shrink: 0; /* Evitar que los elementos se compriman */
    }
    
    .sidebar-footer {
        display: none; /* El logout ahora está en el header */
    }
    
    .profile-content {
        max-width: 100%;
        padding: 20px;
    }
    
    .form-row {
        flex-direction: column;
        gap: 15px;
    }
    
    .form-group {
        flex: auto;
        min-width: 100%;
    }
    
    .schedule-container {
        grid-template-columns: 1fr;
    }
    
    /* Ajustes para el modal en pantallas pequeñas */
    .delete-account-modal {
        width: 95%;
    }
}

@media (max-width: 480px) {
    .profile-content {
        padding: 15px;
    }
    
    .content-header {
        padding: 15px;
    }
    
    .content-header h3 {
        font-size: 1.2rem;
    }
    
    .form-grid, .schedule-container {
        padding: 15px;
    }
    
    .user-name {
        font-size: 1.1rem;
    }
    
    .user-email {
        font-size: 0.85rem;
    }
    
    /* Ajustes adicionales para pantallas muy pequeñas */
    .profile-sidebar {
        padding-bottom: 10px;
    }
    
    .sidebar-nav li {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
    
    .sidebar-nav li i {
        font-size: 1rem;
    }
}

/* Transiciones entre pestañas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Estilos para la sección de notificaciones */
.notification-badge {
    display: inline-block;
    background-color: #3b82f6;
    color: white;
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 10px;
    font-weight: 500;
    float: left;
    margin-right: 15px;
    animation: pulse 2s infinite;
}

.notifications-container {
    padding: 25px;
}

.notification-banner {
    display: flex;
    align-items: center;
    background-color: white;
    color: #4b5563;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    border-top: 4px solid #3b82f6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.notification-banner:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.notification-banner i {
    font-size: 1.5rem;
    margin-right: 15px;
    color: #3b82f6;
}

.notification-section {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.notification-section:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.notification-section-header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
}

.icon-container {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ebf5ff;
    margin-right: 15px;
    transition: all 0.3s ease;
}

.icon-container i {
    font-size: 1.3rem;
    color: #3b82f6;
    transition: all 0.3s ease;
}

.icon-container.blue {
    background-color: #ebf5ff;
}

.icon-container.blue i {
    color: #3b82f6;
}

.icon-container.purple {
    background-color: #f3e8ff;
}

.icon-container.purple i {
    color: #8b5cf6;
}

.icon-container.green {
    background-color: #dcfce7;
}

.icon-container.green i {
    color: #10b981;
}

.icon-container.orange {
    background-color: #fff7ed;
}

.icon-container.orange i {
    color: #f59e0b;
}

.notification-section:hover .icon-container {
    transform: scale(1.05);
}

.header-text {
    flex-grow: 1;
}

.header-text h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
}

.header-text p {
    color: #718096;
    font-size: 0.9rem;
    margin: 0;
}

.notification-options {
    padding: 15px 20px;
}

.notification-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f1f5f9;
}

.notification-option:last-child {
    border-bottom: none;
}

.option-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.option-info i {
    font-size: 1.2rem;
    color: #64748b;
    min-width: 24px;
    text-align: center;
}

.option-info h5 {
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
    margin: 0 0 3px 0;
}

.option-info p {
    font-size: 0.85rem;
    color: #718096;
    margin: 0;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e2e8f0;
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .toggle-slider {
    background-color: #3b82f6;
}

input:checked + .toggle-slider:before {
    transform: translateX(22px);
}

.notification-features {
    padding: 15px 20px;
}

.notification-feature {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.notification-feature:hover {
    background-color: #f8fafc;
}

.notification-feature:last-child {
    margin-bottom: 0;
}

.notification-feature i {
    color: #3b82f6;
    font-size: 1rem;
    margin-right: 12px;
    width: 20px;
    text-align: center;
}

.notification-feature span {
    color: #4b5563;
    font-size: 0.9rem;
}

/* Estilo para elementos deshabilitados */
.notification-feature.disabled,
.security-feature.disabled {
    opacity: 0.5;
    filter: grayscale(0.5);
}

.select-wrapper {
    position: relative;
    min-width: 150px;
}

.select-wrapper select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 8px 30px 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: white;
    font-size: 0.9rem;
    color: #2d3748;
    cursor: pointer;
}

.select-wrapper:after {
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
}

.select-wrapper.disabled {
    opacity: 0.5;
}

.save-notification-settings {
    display: block;
    width: 100%;
    padding: 12px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(59, 130, 246, 0.3);
}

.save-notification-settings i {
    margin-right: 8px;
}

.save-notification-settings:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
}

.save-notification-settings:active {
    transform: translateY(0);
}

/* Estilos para la sección de seguridad */
.security-badge {
    display: inline-block;
    background-color: #2563eb;
    color: white;
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 10px;
    font-weight: 500;
    float: left;
    margin-right: 15px;
}

.security-container {
    padding: 25px;
}

.security-banner {
    display: flex;
    align-items: center;
    background-color: white;
    color: #4b5563;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
    border-top: 4px solid #3b82f6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.security-banner:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.security-banner i {
    font-size: 1.5rem;
    margin-right: 15px;
    color: #3b82f6;
}

.security-section {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.security-section:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.security-section-header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
}

.security-section-header.two-factor {
    border-bottom: none;
}

.security-section-content {
    padding: 20px;
}

.password-group {
    margin-bottom: 15px;
    max-width: 500px;
}

.password-input-container {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
}

.password-toggle:hover {
    color: #3b82f6;
}

.update-password-btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(59, 130, 246, 0.3);
}

.update-password-btn i {
    margin-right: 8px;
}

.update-password-btn:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
}

.security-features {
    padding: 15px 20px;
}

.security-feature {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.security-feature:hover {
    background-color: #f8fafc;
}

.security-feature:last-child {
    margin-bottom: 0;
}

.security-feature i {
    color: #3b82f6;
    font-size: 1rem;
    margin-right: 12px;
    width: 20px;
    text-align: center;
}

.security-feature span {
    color: #4b5563;
    font-size: 0.9rem;
}

.danger-zone {
    border: 1px solid #fecaca;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 30px;
    border-top: 4px solid #ef4444;
    transition: all 0.3s ease;
}

.danger-zone:hover {
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.1);
}

.danger-header {
    background-color: #fee2e2;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #fecaca;
}

.danger-header i {
    color: #ef4444;
    margin-right: 10px;
}

.danger-header span {
    color: #b91c1c;
    font-weight: 600;
}

.danger-content {
    padding: 20px;
}

.danger-content h4 {
    color: #dc2626;
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.danger-content p {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 20px;
}

.delete-account-btn {
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(239, 68, 68, 0.3);
}

.delete-account-btn i {
    margin-right: 8px;
}

.delete-account-btn:hover {
    background-color: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
}

.delete-account-btn:active {
    transform: translateY(0);
}

/* Estilos para la sección de configuración */
.config-container {
    padding: 25px;
}

.config-section {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    transition: all 0.3s ease;
}

.config-section:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.config-section h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
}

.config-section p {
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 20px;
}

.config-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f1f5f9;
}

.config-option:last-child {
    border-bottom: none;
}

.option-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.option-left i {
    font-size: 1.2rem;
    color: #3b82f6;
    min-width: 24px;
    text-align: center;
}

.option-left h5 {
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
    margin: 0 0 3px 0;
}

.option-left p {
    font-size: 0.85rem;
    color: #718096;
    margin: 0;
}

.config-select {
    padding: 8px 30px 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: white;
    font-size: 0.9rem;
    color: #2d3748;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-5-5 1.5-1.5L8 8.5 11.5 5 13 6.5l-5 5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: all 0.3s ease;
}

.config-select:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Formulario */
.form-grid {
    padding: 25px;
}

.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.form-group {
    flex: 1;
    min-width: 300px;
}

.form-group.full-width {
    flex-basis: 100%;
    max-width: 100%;
}

.form-group label {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 6px;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.input-with-icon {
    position: relative;
}

.icon-prefix {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    transition: all 0.3s ease;
}

.form-control {
    width: 100%;
    padding: 12px 15px 12px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #1e293b;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-control:focus + .icon-prefix {
    color: #3b82f6;
}

.form-control[readonly] {
    background-color: #f8fafc;
    cursor: not-allowed;
}

/* Responsive design adicional */
@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 15px;
    }
    
    .form-group {
        flex: auto;
        min-width: 100%;
    }
    
    .notification-section-header,
    .security-section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .notification-section-header .toggle-switch,
    .security-section-header .toggle-switch {
        align-self: flex-end;
        margin-top: -30px;
    }
    
    .config-option {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .config-select {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .notifications-container, 
    .security-container,
    .config-container {
        padding: 15px;
    }
    
    .notification-banner, 
    .security-banner {
        padding: 15px;
    }
    
    .notification-section-header,
    .security-section-header {
        padding: 15px;
    }
    
    .notification-options,
    .notification-features,
    .security-features {
        padding: 10px 15px;
    }
    
    .option-info, 
    .option-left {
        gap: 10px;
    }
    
    .icon-container {
        width: 40px;
        height: 40px;
    }
    
    .icon-container i {
        font-size: 1.1rem;
    }
    
    .header-text h4 {
        font-size: 1rem;
    }
    
    .header-text p {
        font-size: 0.8rem;
    }
}
</style> 