<template>
    <div class="patients-main-container">
        <div class="patients-header">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div>
                    <h1>Mis Pacientes</h1>
                    <p class="subtitle">Visualiza y gestiona tu lista de pacientes</p>
                </div>
            </div>
        </div>

        <!-- Modern filter and search section -->
        <div class="filter-section">
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input 
                    type="text" 
                    placeholder="Buscar paciente por nombre..." 
                    v-model="searchQuery"
                    class="search-input"
                />
                <button class="clear-search" v-if="searchQuery" @click="searchQuery = ''">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="view-options">
                <button 
                    class="view-option" 
                    :class="{ 'active': viewMode === 'grid' }"
                    @click="viewMode = 'grid'"
                >
                    <i class="fas fa-th-large"></i>
                </button>
                <button 
                    class="view-option" 
                    :class="{ 'active': viewMode === 'list' }"
                    @click="viewMode = 'list'"
                >
                    <i class="fas fa-list"></i>
                </button>
            </div>
        </div>

        <!-- Loading state -->
        <div class="loader-container" v-if="isLoading">
            <div class="loader"></div>
            <p>Cargando pacientes...</p>
        </div>

        <!-- Error state -->
        <div class="error-container" v-else-if="errorMessage">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Ocurrió un error</h3>
            <p>{{ errorMessage }}</p>
            <button class="retry-button" @click="fetchPatients">
                <i class="fas fa-redo"></i> Reintentar
            </button>
        </div>

        <!-- Empty state -->
        <div class="empty-state" v-else-if="patients.length === 0 && !isLoading">
            <div class="empty-illustration">
                <i class="fas fa-user-slash empty-icon"></i>
            </div>
            <h3>No se encontraron pacientes</h3>
            <p>Aún no tienes pacientes asociados a tus clínicas o no has confirmado ninguna cita.</p>
        </div>

        <!-- Content - Grid view -->
        <div v-else-if="viewMode === 'grid'" class="patients-grid">
            <div 
                v-for="(patient, index) in filteredPatients" 
                :key="patient.patient_id"
                class="patient-card"
                :style="{ animationDelay: `${index * 0.05}s` }"
            >
                <div class="patient-card-header">
                    <div class="patient-avatar">
                        <img 
                            :src="getProfileImageUrl(patient.profile_photo_path)" 
                            :alt="`Foto de ${patient.first_name}`"
                            @error="handleImageError"
                        />
                    </div>
                    <div class="patient-info">
                        <h3 class="patient-name">{{ patient.first_name }} {{ patient.last_name }}</h3>
                        <div class="info-badges">
                            <span class="info-badge">{{ getAge(patient.date_of_birth) }} años</span>
                            <span class="info-badge gender">{{ formatGender(patient.gender) }}</span>
                        </div>
                    </div>
                </div>
                <div class="patient-card-body">
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <span>{{ patient.phone }}</span>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <span>{{ patient.email }}</span>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <span>{{ truncateText(patient.address, 40) }}</span>
                        </div>
                    </div>
                </div>
                <div class="patient-card-footer">
                    <button class="action-button emergency">
                        <i class="fas fa-ambulance"></i>
                        <span>Emergencia: {{ patient.emergency_contact_name }}</span>
                        <span class="contact-phone">{{ patient.emergency_contact_phone }}</span>
                    </button>
                    <div class="card-actions">
                        <a :href="getWhatsAppLink(patient.phone)" target="_blank" class="icon-button whatsapp" title="Contactar por WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content - List view -->
        <div v-else class="patients-list">
            <table>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Contacto de emergencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(patient, index) in filteredPatients" 
                        :key="patient.patient_id"
                        :style="{ animationDelay: `${index * 0.05}s` }"
                    >
                        <td>
                            <div class="patient-list-info">
                                <div class="patient-list-avatar">
                                    <img 
                                        :src="getProfileImageUrl(patient.profile_photo_path)" 
                                        :alt="`Foto de ${patient.first_name}`"
                                        @error="handleImageError"
                                    />
                                </div>
                                <div>
                                    <div class="patient-list-name">{{ patient.first_name }} {{ patient.last_name }}</div>
                                    <div class="patient-list-details">
                                        <span>{{ getAge(patient.date_of_birth) }} años</span>
                                        <span class="separator">•</span>
                                        <span>{{ formatGender(patient.gender) }}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="contact-list">
                                <div class="contact-list-item">
                                    <i class="fas fa-phone-alt"></i> {{ patient.phone }}
                                </div>
                                <div class="contact-list-item">
                                    <i class="fas fa-envelope"></i> {{ patient.email }}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="address-cell">
                                {{ truncateText(patient.address, 40) }}
                            </div>
                        </td>
                        <td>
                            <div class="emergency-contact">
                                <div>{{ patient.emergency_contact_name }}</div>
                                <div>{{ patient.emergency_contact_phone }}</div>
                            </div>
                        </td>
                        <td>
                            <div class="table-actions">
                                <a :href="getWhatsAppLink(patient.phone)" target="_blank" class="icon-button-small whatsapp" title="Contactar por WhatsApp">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PatientsView',
    data() {
        return {
            patients: [],
            isLoading: true,
            errorMessage: '',
            searchQuery: '',
            viewMode: 'grid', // 'grid' or 'list'
            fallbackImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        };
    },
    computed: {
        filteredPatients() {
            if (!this.searchQuery.trim()) {
                return this.patients;
            }
            
            const query = this.searchQuery.toLowerCase();
            return this.patients.filter(patient => 
                patient.first_name.toLowerCase().includes(query) ||
                patient.last_name.toLowerCase().includes(query) ||
                patient.email.toLowerCase().includes(query) ||
                patient.phone.toLowerCase().includes(query)
            );
        }
    },
    mounted() {
        this.fetchPatients();
    },
    methods: {
        async fetchPatients() {
            this.isLoading = true;
            this.errorMessage = '';
            
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    this.errorMessage = 'No se encontró token de autenticación';
                    this.isLoading = false;
                    return;
                }
                
                const API_URL = process.env.VUE_APP_API_URL;
                const response = await fetch(`${API_URL}/appointments/clinic-patients`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Error al obtener pacientes');
                }
                
                if (!data.status) {
                    this.errorMessage = data.message || 'No se pudieron recuperar los pacientes';
                    this.patients = [];
                } else {
                    this.patients = data.data || [];
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
                this.errorMessage = error.message || 'Ocurrió un error al cargar los pacientes';
            } finally {
                this.isLoading = false;
            }
        },
        
        getProfileImageUrl(imagePath) {
            if (!imagePath) return this.fallbackImage;
            return `${process.env.VUE_APP_API_URL_IMAGE}/${imagePath}`;
        },
        
        handleImageError(e) {
            e.target.src = this.fallbackImage;
        },
        
        getAge(dateString) {
            if (!dateString) return 'N/A';
            
            const today = new Date();
            const birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        },
        
        formatGender(gender) {
            if (!gender) return 'No especificado';
            
            return gender.toLowerCase() === 'masculino' ? 'Masculino' : 
                  gender.toLowerCase() === 'femenino' ? 'Femenino' : 
                  gender;
        },
        
        truncateText(text, maxLength) {
            if (!text) return '';
            return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
        },
        
        getWhatsAppLink(phone) {
            // Format the phone number by removing non-digit characters
            if (!phone) return '#';
            
            // Remove all non-digit characters including + and spaces
            let formattedPhone = phone.replace(/\D/g, '');
            
            // Remove the country code indicator if present (+ sign)
            if (formattedPhone.startsWith('+')) {
                formattedPhone = formattedPhone.substring(1);
            }
            
            return `https://api.whatsapp.com/send?phone=${formattedPhone}`;
        }
    }
};
</script>

<style scoped>
.patients-main-container {
    width: 85%;
    margin: 0 auto;
    padding: 30px;
    background-color: #f8fafc;
    min-height: 100vh;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.patients-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 20px;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 12px;
    color: white;
    font-size: 1.3rem;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.patients-header h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    margin-bottom: 5px;
}

.subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1rem;
}

.filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 15px;
    animation: fadeIn 0.6s ease-out;
}

.search-container {
    position: relative;
    flex-grow: 1;
    max-width: 500px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 1rem;
    transition: color 0.3s ease;
}

.search-input:focus + .search-icon {
    color: #3b82f6;
}

.search-input {
    padding: 15px 40px;
    width: 100%;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    background-color: white;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2);
}

.clear-search {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: #f1f5f9;
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    cursor: pointer;
    font-size: 0.7rem;
    transition: all 0.2s ease;
}

.clear-search:hover {
    background: #e2e8f0;
    color: #334155;
}

.view-options {
    display: flex;
    gap: 10px;
}

.view-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    border: 2px solid #e2e8f0;
    color: #64748b;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-option:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.view-option.active {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-color: transparent;
    color: white;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

/* Loading state */
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    color: #64748b;
}

.loader {
    border: 4px solid #f3f4f6;
    border-radius: 50%;
    border-top: 4px solid #3b82f6;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Error & Empty States */
.error-container,
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    text-align: center;
    margin-top: 30px;
}

.error-icon,
.empty-illustration {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 40px;
    color: #ef4444;
}

.empty-illustration {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    color: #3b82f6;
}

.error-container h3,
.empty-state h3 {
    font-size: 1.3rem;
    color: #1e293b;
    margin-bottom: 10px;
}

.error-container p,
.empty-state p {
    color: #64748b;
    max-width: 80%;
    margin-bottom: 20px;
}

.retry-button {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.retry-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

/* Grid View */
.patients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 25px;
}

.patient-card {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    border: 1px solid #f1f5f9;
}

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

.patient-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.patient-card-header {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid #f1f5f9;
    position: relative;
    overflow: hidden;
}

.patient-card-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.patient-avatar {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    overflow: hidden;
    background: #f1f5f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.patient-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.patient-info {
    flex: 1;
}

.patient-name {
    margin: 0 0 8px 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
}

.info-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.info-badge {
    display: inline-block;
    padding: 4px 10px;
    background-color: #f1f5f9;
    color: #64748b;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.info-badge.gender {
    background-color: #dbeafe;
    color: #3b82f6;
}

.patient-card-body {
    padding: 15px 20px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.2s ease;
}

.contact-item:hover {
    transform: translateX(5px);
}

.contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #f8fafc;
    border-radius: 10px;
    color: #3b82f6;
    transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
    background: #e0f2fe;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.patient-card-footer {
    padding: 15px 20px;
    background-color: #f8fafc;
    border-top: 1px solid #f1f5f9;
}

.action-button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 15px;
}

.action-button.emergency {
    background-color: #fff1f2;
    color: #e11d48;
    border: 1px solid #fecdd3;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.action-button.emergency:hover {
    background-color: #ffe4e6;
    box-shadow: 0 4px 10px rgba(225, 29, 72, 0.1);
}

.contact-phone {
    margin-left: auto;
    font-weight: 600;
}

.card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.icon-button:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.icon-button.primary {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border: none;
    color: white;
}

.icon-button.primary:hover {
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.icon-button.whatsapp {
    background: #25D366;
    border: none;
    color: white;
    font-size: 1.2rem;
    box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2);
}

.icon-button.whatsapp:hover {
    background: #1da851;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 12px rgba(37, 211, 102, 0.25);
}

/* List View */
.patients-list {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
}

.patients-list table {
    width: 100%;
    border-collapse: collapse;
}

.patients-list th {
    padding: 15px 20px;
    text-align: left;
    color: #475569;
    font-weight: 600;
    font-size: 0.9rem;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.patients-list td {
    padding: 15px 20px;
    border-bottom: 1px solid #f1f5f9;
}

.patients-list tr {
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
}

.patients-list tr:hover {
    background-color: #f8fafc;
}

.patients-list tr:last-child td {
    border-bottom: none;
}

.patient-list-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.patient-list-avatar {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    overflow: hidden;
    background: #f1f5f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.patient-list-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.patient-list-name {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
}

.patient-list-details {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #64748b;
}

.separator {
    margin: 0 5px;
    color: #cbd5e1;
}

.contact-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.contact-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #475569;
}

.contact-list-item i {
    color: #3b82f6;
    width: 16px;
}

.address-cell {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #475569;
    font-size: 0.9rem;
}

.emergency-contact {
    font-size: 0.9rem;
    color: #475569;
    line-height: 1.5;
}

.table-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

.icon-button-small {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.icon-button-small:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.icon-button-small.primary {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border: none;
    color: white;
}

.icon-button-small.primary:hover {
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.icon-button-small.whatsapp {
    background: #25D366;
    border: none;
    color: white;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgba(37, 211, 102, 0.2);
}

.icon-button-small.whatsapp:hover {
    background: #1da851;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(37, 211, 102, 0.25);
}

/* Responsive Media Queries */
@media (max-width: 992px) {
    .patients-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
    
    .patients-list th:nth-child(3),
    .patients-list td:nth-child(3) {
        display: none;
    }
}

@media (max-width: 768px) {
    .patients-main-container {
        width: 95%;
        padding: 20px 15px;
    }

    .filter-section {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search-container {
        max-width: none;
    }
    
    .view-options {
        justify-content: flex-end;
    }
    
    .patients-list th:nth-child(4),
    .patients-list td:nth-child(4) {
        display: none;
    }
}

@media (max-width: 640px) {
    .patients-grid {
        grid-template-columns: 1fr;
    }
    
    .action-button.emergency {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .contact-phone {
        margin-left: 0;
    }
    
    .patients-list th:nth-child(2),
    .patients-list td:nth-child(2) {
        display: none;
    }
}
</style>
