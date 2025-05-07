<template>
    <div class="agenda-main-container">
        <div class="agenda-header">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                    <h1>Solicitudes de Citas</h1>
                    <p class="subtitle">Gestiona las solicitudes de citas de tus pacientes</p>
                </div>
            </div>
        </div>

        <!-- New modern filter section -->
        <div class="filter-section">
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre o especialidad..." 
                    v-model="searchQuery"
                    class="search-input"
                />
                <button class="clear-search" v-if="searchQuery" @click="searchQuery = ''">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="filter-tabs-container">
                <div class="filter-tabs">
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'all' }"
                        @click="statusFilter = 'all'"
                    >
                        <div class="tab-icon"><i class="fas fa-th-list"></i></div>
                        <span>Todos</span>
                        <div class="tab-count">{{ getCountByStatus('all') }}</div>
                    </button>
                    
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'pendiente_confirmacion' }"
                        @click="statusFilter = 'pendiente_confirmacion'"
                    >
                        <div class="tab-icon pending"><i class="fas fa-clock"></i></div>
                        <span>Pendientes</span>
                        <div class="tab-count">{{ getCountByStatus('pendiente_confirmacion') }}</div>
                    </button>
                    
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'programada' }"
                        @click="statusFilter = 'programada'"
                    >
                        <div class="tab-icon approved"><i class="fas fa-check-circle"></i></div>
                        <span>Aprobadas</span>
                        <div class="tab-count">{{ getCountByStatus('programada') }}</div>
                    </button>
                    
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'cancelada_paciente' }"
                        @click="statusFilter = 'cancelada_paciente'"
                    >
                        <div class="tab-icon canceled"><i class="fas fa-ban"></i></div>
                        <span>Canceladas</span>
                        <div class="tab-count">{{ getCountByStatus('cancelada_paciente') }}</div>
                    </button>
                    
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'cancelada_profesional' }"
                        @click="statusFilter = 'cancelada_profesional'"
                    >
                        <div class="tab-icon rejected"><i class="fas fa-times-circle"></i></div>
                        <span>Rechazadas</span>
                        <div class="tab-count">{{ getCountByStatus('cancelada_profesional') }}</div>
                    </button>
                    
                    <button 
                        class="filter-tab" 
                        :class="{ 'active': statusFilter === 'rescheduled' }"
                        @click="statusFilter = 'rescheduled'"
                    >
                        <div class="tab-icon rescheduled"><i class="fas fa-calendar-alt"></i></div>
                        <span>Reprogramadas</span>
                        <div class="tab-count">{{ getCountByStatus('rescheduled') }}</div>
                    </button>
                </div>
            </div>
        </div>

        <div class="loader-container" v-if="isLoading">
            <div class="loader"></div>
            <p>Cargando citas...</p>
        </div>

        <div v-else>
            <section class="card-container" v-if="filteredAppointments.length > 0">
                <AppointmentCard
                        v-for="appointment in filteredAppointments"
                        :key="appointment.id"
                        :appointment="appointment"
                        @approve="approveAppointment(appointment)"
                        @reschedule="openRescheduleModal(appointment)"
                        @reject="rejectAppointment(appointment)"
                />
            </section>

            <section class="empty-state" v-else>
                <div class="empty-illustration">
                    <i class="fas fa-calendar-times empty-icon"></i>
                </div>
                <h3>No hay solicitudes de citas</h3>
                <p>No se encontraron solicitudes de citas que coincidan con los filtros seleccionados.</p>
                <button class="reset-filters-btn" @click="resetFilters">Reiniciar filtros</button>
            </section>
        </div>

        <!-- Modal para reprogramar cita -->
        <div class="modal-overlay" v-if="showRescheduleModal" @click="closeRescheduleModal">
            <div class="modal-container" @click.stop>
                <div class="modal-header">
                    <h3>Reprogramar Cita</h3>
                    <button class="close-button" @click="closeRescheduleModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="patient-info">
                        <div class="patient-avatar-container">
                            <img :src="selectedAppointment.avatar" alt="Avatar del paciente" class="patient-avatar">
                        </div>
                        <div>
                            <h4>{{ selectedAppointment.patientName }}</h4>
                            <p>{{ selectedAppointment.serviceType }}</p>
                        </div>
                    </div>

                    <div class="reschedule-form">
                        <div class="form-group">
                            <label>Nueva fecha</label>
                            <div class="input-icon-wrapper">
                                <i class="fas fa-calendar input-icon"></i>
                                <input type="date" v-model="rescheduleDate" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Motivo del cambio</label>
                            <div class="input-icon-wrapper textarea-wrapper">
                                <i class="fas fa-comment-alt input-icon"></i>
                                <textarea v-model="rescheduleReason" class="form-control" rows="3"
                                        placeholder="Explica brevemente el motivo del cambio..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="cancel-button" @click="closeRescheduleModal">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="confirm-button" @click="confirmReschedule()">
                        <i class="fas fa-check"></i> Confirmar cambio
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppointmentCard from './AppointmentCard.vue';
import Swal from 'sweetalert2';
import swal from "sweetalert2";

export default {
    name: 'AgendaView',
    components: {
        AppointmentCard
    },
    data() {
        return {
            searchQuery: '',
            statusFilter: 'all',
            showRescheduleModal: false,
            selectedAppointment: {},
            rescheduleDate: '',
            rescheduleTime: '',
            rescheduleReason: '',
            isLoading: false,
            pagination: {},
            appointments: [],
        };
    },
    async mounted() {
        // Obtener citas al montar el componente
        await this.fetchAppointments().then(() => {
            // Inicializar datos de carga y paginación
            this.isLoading = false;
            this.pagination = {
                total: 0,
                currentPage: 1,
                lastPage: 1,
                perPage: 10
            };
        });
    },
    computed: {
        filteredAppointments() {
            let result = this.appointments;

            // Filtrar por estado
            if (this.statusFilter !== 'all') {
                result = result.filter(appt => appt.status === this.statusFilter);
            }

            // Filtrar por búsqueda
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(appt =>
                    appt.patientName.toLowerCase().includes(query) ||
                    appt.serviceType.toLowerCase().includes(query)
                );
            }

            return result;
        }
    },
    methods: {
        approveAppointment(appointment) {
            Swal.fire({
                title: '¿Confirmar cita?',
                text: "Se notificará al paciente que su cita ha sido confirmada",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Encontrar y actualizar el estado de la cita
                    const appointmentIndex = this.appointments.findIndex(appt => appt.id === appointment.id);
                    if (appointmentIndex !== -1) {
                        this.appointments[appointmentIndex].status = 'approved';
                        // Llamar a la API para actualizar la cita
                        this.approveOrCancel('programada', appointment);
                    }
                }
            });
        },

        rejectAppointment(appointment) {
            Swal.fire({
                title: '¿Rechazar solicitud?',
                text: "Por favor indique el motivo",
                input: 'textarea',
                inputPlaceholder: 'Ingrese el motivo del rechazo...',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Rechazar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debe ingresar un motivo';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Encontrar y actualizar el estado de la cita
                    const appointmentIndex = this.appointments.findIndex(appt => appt.id === appointment.id);
                    if (appointmentIndex !== -1) {
                        this.appointments[appointmentIndex].status = 'rejected';
                        this.appointments[appointmentIndex].rejectionReason = result.value;
                        // Llamar a la API para actualizar la cita
                        this.approveOrCancel('cancelada_profesional', appointment);
                    }
                }
            });
        },

        openRescheduleModal(appointment) {
            this.selectedAppointment = {...appointment};
            this.rescheduleDate = appointment.preferredDate;
            this.rescheduleTime = appointment.preferredTime;
            this.rescheduleReason = '';
            this.showRescheduleModal = true;
        },

        closeRescheduleModal() {
            this.showRescheduleModal = false;
            this.selectedAppointment = {};
        },

        confirmReschedule() {
            if (!this.rescheduleDate) {
                Swal.fire({
                    title: 'Error',
                    text: 'Debe seleccionar una fecha para la reprogramación',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            // Encontrar y actualizar el estado de la cita
            const appointmentIndex = this.appointments.findIndex(appt => appt.id === this.selectedAppointment.id);
            if (appointmentIndex !== -1) {
                const updatedAppointment = {
                    ...this.appointments[appointmentIndex],
                    status: 'rescheduled',
                    originalDate: this.appointments[appointmentIndex].preferredDate,
                    originalTime: this.appointments[appointmentIndex].preferredTime,
                    rescheduleDate: this.rescheduleDate,
                    rescheduleReason: this.rescheduleReason
                };

                this.appointments[appointmentIndex] = updatedAppointment;

                // Llamar a la API para actualizar la cita
                this.rescheduleAppointment();

                this.closeRescheduleModal();
            }
        },

        // Métodos para consumo de API REST

        async fetchAppointments() {
            try {
                this.isLoading = true;
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('No se encontró token de autenticación');
                    return;
                }

                const API_URL = process.env.VUE_APP_API_URL;
                const response = await fetch(`${API_URL}/appointments/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error al obtener citas: ${response.status}`);
                }

                const data = await response.json();

                // Transformar la respuesta de la API al formato que espera el componente
                this.appointments = this.transformApiResponse(data);

            } catch (error) {
                this.handleApiError(error, 'Error al cargar las citas');
            } finally {
                this.isLoading = false;
            }
        },

        async approveOrCancel(appointment_status, appointment) {
            const API_URL = process.env.VUE_APP_API_URL;

            const clinic = JSON.parse(localStorage.getItem('clinics'));

            let url = '';

            appointment_status === 'programada' ?
                url = `${API_URL}/appointments/confirm/${appointment.id}` :
                url = `${API_URL}/appointments/cancel/${appointment.id}`;

            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        appointment_status: appointment_status,
                        cancellation_reason: appointment.rejectionReason,
                        service_type: appointment.serviceType,
                        appointment_date: appointment.preferredDate,
                        clinic_name: clinic.clinic_name,
                        patient_name: appointment.patientName,
                        doctor_name: "Dr. " + clinic.first_name + ' ' + clinic.last_name,
                        clinic_address: clinic.address + ', ' + clinic.city_name,
                        email: appointment.email,
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar la cita');
                }

                const data = await response.json();

                if(!data.status){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: data.message,
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    this.fetchAppointments();
                })
            } catch (error) {
                console.error('Error al actualizar la cita:', error);
            }
        },

        async rescheduleAppointment() {
            const API_URL = process.env.VUE_APP_API_URL;

            const clinic = JSON.parse(localStorage.getItem('clinics'));

            try {
                const response = await fetch(API_URL + '/appointments/reschedule/' + this.selectedAppointment.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        appointment_date: this.rescheduleDate,
                        reschedule_reason: this.rescheduleReason,
                        clinic_name: clinic.clinic_name,
                        patient_name: this.selectedAppointment.patientName,
                        doctor_name: "Dr. " + clinic.first_name + ' ' + clinic.last_name,
                        clinic_address: clinic.address + ', ' + clinic.city_name,
                        email: this.selectedAppointment.email,
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar la cita');
                }

                const data = await response.json();

                if(!data.status){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: data.message,
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    this.fetchAppointments();
                })
            } catch (error) {
                console.error('Error al actualizar la cita:', error);
            }
        },

        transformApiResponse(apiResponse) {
            // Este método transforma la respuesta de la API al formato que espera el componente
            // Adaptar según la estructura real de la API
            const API_IMAGES_URL = process.env.VUE_APP_API_URL_IMAGE;

            if (!apiResponse || !apiResponse.data) {
                return [];
            }

            return apiResponse.data.map(item => {
                return {
                    id: item.appointment_id,
                    patientName: item.first_name + ' ' + item.last_name || 'Paciente sin nombre',
                    patientAge: this.getAge(item.date_of_birth) || 'N/A',
                    avatar: `${API_IMAGES_URL}/${item.profile_photo_path}`,
                    serviceType: item.service_type || item.serviceType || 'Consulta general',
                    requestDate: item.created_at || item.requestDate || new Date().toISOString().split('T')[0],
                    preferredDate: item.appointment_date || item.preferredDate || new Date().toISOString().split('T')[0],
                    preferredTime: item.preferred_time || item.preferredTime || '10:00',
                    status: item.appointment_status || 'pending',
                    notes: item.notes || '',
                    contactPhone: item.phone || item.contactPhone || 'Sin teléfono',
                    rejectionReason: item.rejection_reason || item.rejectionReason || '',
                    email: item.email,

                    // Campos para citas reprogramadas
                    originalDate: item.original_date || item.originalDate || '',
                    originalTime: item.original_time || item.originalTime || '',
                    rescheduleDate: item.reschedule_date || item.rescheduleDate || '',
                    rescheduleTime: item.reschedule_time || item.rescheduleTime || '',
                    rescheduleReason: item.reschedule_reason || item.rescheduleReason || ''
                };
            });
        },

        getAge(dateString) {
            if (!dateString) return 'N/A';
            
            let today = new Date();
            let birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },

        handleApiError(error, defaultMessage = 'Error en la operación') {
            console.error('API Error:', error);

            let errorMessage = defaultMessage;

            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            console.error(`${defaultMessage}: ${errorMessage}`);
        },

        resetFilters() {
            this.statusFilter = 'all';
            this.searchQuery = '';
            // Recargar citas sin filtros
            this.fetchAppointments();
        },

        getCountByStatus(status) {
            if (status === 'all') {
                return this.appointments.length;
            }
            return this.appointments.filter(appt => appt.status === status).length;
        }
    },
};
</script>

<style scoped>
.agenda-main-container {
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

.agenda-header {
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
    background: #3b82f6;
    border-radius: 12px;
    color: white;
    font-size: 1.3rem;
}

.agenda-header h1 {
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
    margin-bottom: 30px;
    animation: fadeIn 0.6s ease-out;
}

.search-container {
    position: relative;
    margin-bottom: 20px;
    width: 100%;
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

.filter-tabs-container {
    position: relative;
    overflow-x: auto;
    padding-bottom: 5px;
}

.filter-tabs-container::-webkit-scrollbar {
    height: 5px;
}

.filter-tabs-container::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.filter-tabs-container::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.filter-tabs {
    display: flex;
    gap: 10px;
    padding: 5px 0;
    min-width: min-content;
}

.filter-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    color: #64748b;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.filter-tab:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.filter-tab.active {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    color: #1e293b;
    font-weight: 600;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #f1f5f9;
    border-radius: 8px;
    color: #64748b;
    transition: all 0.3s ease;
}

.filter-tab.active .tab-icon {
    color: white;
}

.filter-tab.active .tab-icon.pending {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.filter-tab.active .tab-icon.approved {
    background: linear-gradient(135deg, #10b981, #34d399);
}

.filter-tab.active .tab-icon.canceled {
    background: linear-gradient(135deg, #ef4444, #f87171);
}

.filter-tab.active .tab-icon.rejected {
    background: linear-gradient(135deg, #e11d48, #fb7185);
}

.filter-tab.active .tab-icon.rescheduled {
    background: linear-gradient(135deg, #6366f1, #818cf8);
}

.tab-count {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 600;
    min-width: 22px;
    height: 22px;
    border-radius: 20px;
    padding: 0 6px;
    transition: all 0.3s ease;
}

.filter-tab.active .tab-count {
    background-color: white;
    color: #1e293b;
}

.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
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

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
}

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

.empty-illustration {
    width: 120px;
    height: 120px;
    background-color: #eef2ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.empty-icon {
    font-size: 50px;
    color: #6366f1;
}

.empty-state h3 {
    font-size: 1.3rem;
    color: #1e293b;
    margin-bottom: 10px;
}

.empty-state p {
    color: #64748b;
    max-width: 80%;
    margin-bottom: 20px;
}

.reset-filters-btn {
    background-color: #eef2ff;
    color: #6366f1;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.reset-filters-btn:hover {
    background-color: #6366f1;
    color: white;
}

/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
}

.modal-container {
    background-color: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #1e293b;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-button:hover {
    background-color: #f1f5f9;
    color: #1e293b;
}

.modal-body {
    padding: 20px;
}

.patient-info {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
}

.patient-avatar-container {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    overflow: hidden;
    background: #f1f5f9;
}

.patient-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.patient-info h4 {
    margin: 0 0 5px 0;
    color: #1e293b;
    font-weight: 600;
}

.patient-info p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
}

.reschedule-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.9rem;
    color: #334155;
    font-weight: 500;
}

.input-icon-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
}

.textarea-wrapper .input-icon {
    top: 20px;
    transform: none;
}

.form-control {
    padding: 12px 12px 12px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.95rem;
    width: 100%;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px;
    border-top: 1px solid #e2e8f0;
    background-color: #f8fafc;
    border-radius: 0 0 16px 16px;
}

.cancel-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancel-button:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
}

.confirm-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: #3b82f6;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.confirm-button:hover {
    background-color: #2563eb;
}

/* Responsive styles */
@media (max-width: 768px) {
    .agenda-main-container {
        width: 95%;
        padding: 20px 15px;
    }
    
    .agenda-header {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-section {
        overflow-x: hidden;
    }
    
    .search-container {
        max-width: none;
    }
    
    .filter-tabs {
        padding-bottom: 10px;
    }
    
    .filter-tab {
        padding: 8px 12px;
        font-size: 0.85rem;
    }
    
    .tab-icon {
        width: 24px;
        height: 24px;
        font-size: 0.8rem;
    }
    
    .modal-container {
        width: 95%;
    }
}
</style> 