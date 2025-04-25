<template>
    <div class="agenda-main-container">
        <header class="agenda-header">
            <div>
                <h1>Solicitudes de Citas</h1>
                <p class="subtitle">Gestiona las solicitudes de citas de tus pacientes</p>
            </div>
            <div class="filter-controls">
                <div class="search-container">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" placeholder="Buscar por nombre o especialidad..." v-model="searchQuery" class="search-input" />
                </div>
                <div class="filter-dropdown">
                    <select v-model="statusFilter" class="filter-select">
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendientes</option>
                        <option value="approved">Aprobadas</option>
                        <option value="rejected">Rechazadas</option>
                        <option value="rescheduled">Reprogramadas</option>
                    </select>
                </div>
            </div>
        </header>

        <section class="card-container" v-if="filteredAppointments.length > 0">
            <AppointmentCard 
                v-for="appointment in filteredAppointments" 
                :key="appointment.id" 
                :appointment="appointment"
                @approve="approveAppointment"
                @reschedule="openRescheduleModal"
                @reject="rejectAppointment"
            />
        </section>

        <section class="empty-state" v-else>
            <div class="empty-illustration">
                <i class="fas fa-calendar-times empty-icon"></i>
            </div>
            <h3>No hay solicitudes de citas</h3>
            <p>No se encontraron solicitudes de citas que coincidan con los filtros seleccionados.</p>
        </section>

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
                        <img :src="selectedAppointment.avatar" alt="Avatar del paciente" class="patient-avatar">
                        <div>
                            <h4>{{ selectedAppointment.patientName }}</h4>
                            <p>{{ selectedAppointment.serviceType }}</p>
                        </div>
                    </div>
                    
                    <div class="reschedule-form">
                        <div class="form-group">
                            <label>Nueva fecha</label>
                            <input type="date" v-model="rescheduleDate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Motivo del cambio</label>
                            <textarea v-model="rescheduleReason" class="form-control" rows="3" placeholder="Explica brevemente el motivo del cambio..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-button" @click="closeRescheduleModal">Cancelar</button>
                    <button class="confirm-button" @click="confirmReschedule">Confirmar cambio</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppointmentCard from './AppointmentCard.vue';
import Swal from 'sweetalert2';

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
            appointments: [
                {
                    id: 1,
                    patientName: 'María González',
                    patientAge: 42,
                    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
                    serviceType: 'Consulta General',
                    requestDate: '2023-10-01',
                    preferredDate: '2023-10-10',
                    preferredTime: '09:30',
                    status: 'pending',
                    notes: 'Paciente con historial de hipertensión. Solicita revisión de medicación actual.',
                    contactPhone: '+503 7256-8901'
                },
                {
                    id: 2,
                    patientName: 'Roberto Flores',
                    patientAge: 35,
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                    serviceType: 'Evaluación Cardiológica',
                    requestDate: '2023-10-02',
                    preferredDate: '2023-10-11',
                    preferredTime: '11:00',
                    status: 'approved',
                    approvedDate: '2023-10-11',
                    approvedTime: '11:00',
                    notes: 'Paciente nuevo, refiere molestias en el pecho al hacer ejercicio.',
                    contactPhone: '+503 7902-4532'
                },
                {
                    id: 3,
                    patientName: 'Sandra Vásquez',
                    patientAge: 29,
                    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
                    serviceType: 'Control Prenatal',
                    requestDate: '2023-10-03',
                    preferredDate: '2023-10-12',
                    preferredTime: '10:00',
                    status: 'rejected',
                    rejectionReason: 'Agenda completa para esa fecha',
                    notes: 'Embarazo de 6 meses, control rutinario',
                    contactPhone: '+503 7812-5690'
                },
                {
                    id: 4,
                    patientName: 'Jorge Mendoza',
                    patientAge: 58,
                    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                    serviceType: 'Control de Diabetes',
                    requestDate: '2023-10-03',
                    preferredDate: '2023-10-15',
                    preferredTime: '14:30',
                    status: 'rescheduled',
                    originalDate: '2023-10-15',
                    originalTime: '14:30',
                    rescheduleDate: '2023-10-18',
                    rescheduleTime: '16:00',
                    rescheduleReason: 'Emergencia médica del doctor',
                    notes: 'Paciente con diabetes tipo 2, control de glucemia',
                    contactPhone: '+503 7346-9012'
                },
                {
                    id: 5,
                    patientName: 'Carolina Domínguez',
                    patientAge: 33,
                    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
                    serviceType: 'Revisión Dermatológica',
                    requestDate: '2023-10-04',
                    preferredDate: '2023-10-20',
                    preferredTime: '11:30',
                    status: 'pending',
                    notes: 'Lesión cutánea en brazo izquierdo',
                    contactPhone: '+503 7651-3489'
                }
            ]
        };
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
        approveAppointment(appointmentId) {
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
                    const appointmentIndex = this.appointments.findIndex(appt => appt.id === appointmentId);
                    if (appointmentIndex !== -1) {
                        this.appointments[appointmentIndex].status = 'approved';
                        // Llamar a la API para actualizar la cita
                        this.updateAppointmentStatus(appointmentId, 'approved');
                    }
                }
            });
        },
        
        rejectAppointment(appointmentId) {
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
                    const appointmentIndex = this.appointments.findIndex(appt => appt.id === appointmentId);
                    if (appointmentIndex !== -1) {
                        this.appointments[appointmentIndex].status = 'rejected';
                        this.appointments[appointmentIndex].rejectionReason = result.value;
                        // Llamar a la API para actualizar la cita
                        this.updateAppointmentStatus(appointmentId, 'rejected', { rejectionReason: result.value });
                    }
                }
            });
        },
        
        openRescheduleModal(appointmentId) {
            const appointment = this.appointments.find(appt => appt.id === appointmentId);
            if (appointment) {
                this.selectedAppointment = appointment;
                this.rescheduleDate = appointment.preferredDate;
                this.rescheduleTime = appointment.preferredTime;
                this.rescheduleReason = '';
                this.showRescheduleModal = true;
            }
        },
        
        closeRescheduleModal() {
            this.showRescheduleModal = false;
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
                this.updateAppointmentStatus(this.selectedAppointment.id, 'rescheduled', {
                    rescheduleDate: this.rescheduleDate,
                    rescheduleReason: this.rescheduleReason
                });
                
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
                
                const API_URL = process.env.VUE_APP_API_URL || 'https://api.example.com';
                const response = await fetch(`${API_URL}/appointments`, {
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
        
        async updateAppointmentStatus(appointmentId, newStatus, additionalData = {}) {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('No se encontró token de autenticación');
                    return false;
                }
                
                const API_URL = process.env.VUE_APP_API_URL || 'https://api.example.com';
                const response = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status: newStatus,
                        ...additionalData
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Error al actualizar estado de cita: ${response.status}`);
                }
                
                // eslint-disable-next-line no-unused-vars
                const data = await response.json();
                
                // Mostrar mensaje de éxito según el tipo de actualización
                let successTitle, successMessage;
                
                switch (newStatus) {
                    case 'approved':
                        successTitle = '¡Confirmada!';
                        successMessage = 'La cita ha sido confirmada exitosamente.';
                        break;
                    case 'rejected':
                        successTitle = 'Rechazada';
                        successMessage = 'La solicitud ha sido rechazada.';
                        break;
                    case 'rescheduled':
                        successTitle = '¡Reprogramada!';
                        successMessage = 'La cita ha sido reprogramada exitosamente.';
                        break;
                    default:
                        successTitle = '¡Actualizada!';
                        successMessage = 'La cita ha sido actualizada exitosamente.';
                }
                
                Swal.fire(
                    successTitle,
                    successMessage,
                    'success'
                );
                
                return true;
                
            } catch (error) {
                this.handleApiError(error, 'Error al actualizar la cita');
                return false;
            }
        },
        
        transformApiResponse(apiResponse) {
            // Este método transforma la respuesta de la API al formato que espera el componente
            // Adaptar según la estructura real de la API
            
            if (!apiResponse || !apiResponse.data) {
                return [];
            }
            
            return apiResponse.data.map(item => {
                return {
                    id: item.id,
                    patientName: item.patient?.name || 'Paciente sin nombre',
                    patientAge: item.patient?.age || 'N/A',
                    avatar: item.patient?.avatar || 'https://via.placeholder.com/48',
                    serviceType: item.service_type || item.serviceType || 'Consulta general',
                    requestDate: item.created_at || item.requestDate || new Date().toISOString().split('T')[0],
                    preferredDate: item.preferred_date || item.preferredDate || new Date().toISOString().split('T')[0],
                    preferredTime: item.preferred_time || item.preferredTime || '10:00',
                    status: item.status || 'pending',
                    notes: item.notes || '',
                    contactPhone: item.patient?.phone || item.contactPhone || 'Sin teléfono',
                    rejectionReason: item.rejection_reason || item.rejectionReason || '',
                    
                    // Campos para citas reprogramadas
                    originalDate: item.original_date || item.originalDate || '',
                    originalTime: item.original_time || item.originalTime || '',
                    rescheduleDate: item.reschedule_date || item.rescheduleDate || '',
                    rescheduleTime: item.reschedule_time || item.rescheduleTime || '',
                    rescheduleReason: item.reschedule_reason || item.rescheduleReason || ''
                };
            });
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
            
            /* 
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            */
        },
        
        async getPaginatedAppointments(page = 1, limit = 10, filters = {}) {
            try {
                this.isLoading = true;
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('No se encontró token de autenticación');
                    return;
                }
                
                // Construir query params para filtros
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    ...this.constructFilterParams(filters)
                }).toString();
                
                const API_URL = process.env.VUE_APP_API_URL || 'https://api.example.com';
                const response = await fetch(`${API_URL}/appointments?${queryParams}`, {
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
                
                // Actualizar estado con la respuesta paginada
                this.appointments = this.transformApiResponse(data);
                
                // Si la API devuelve metadatos de paginación, actualizarlos
                if (data.meta) {
                    this.pagination = {
                        total: data.meta.total || 0,
                        currentPage: data.meta.current_page || page,
                        lastPage: data.meta.last_page || 1,
                        perPage: data.meta.per_page || limit
                    };
                }
                
            } catch (error) {
                this.handleApiError(error, 'Error al cargar las citas');
            } finally {
                this.isLoading = false;
            }
        },
        
        constructFilterParams(filters) {
            // Construye los parámetros de filtro para la API
            const params = {};
            
            if (filters.status && filters.status !== 'all') {
                params.status = filters.status;
            }
            
            if (filters.search) {
                params.search = filters.search;
            }
            
            if (filters.dateFrom) {
                params.date_from = filters.dateFrom;
            }
            
            if (filters.dateTo) {
                params.date_to = filters.dateTo;
            }
            
            return params;
        },
        
        applyFilters() {
            // Crear objeto de filtros basado en estado actual
            const filters = {
                status: this.statusFilter,
                search: this.searchQuery,
                // Puedes agregar más filtros aquí según se necesite
            };
            
            // Llamar a la API con los filtros aplicados
            this.getPaginatedAppointments(1, 10, filters);
        },
        
        resetFilters() {
            this.statusFilter = 'all';
            this.searchQuery = '';
            // Reiniciar otros filtros si existen
            
            // Recargar citas sin filtros
            this.fetchAppointments();
        }
    },
    
    mounted() {
        // Inicializar datos de carga y paginación
        this.isLoading = false;
        this.pagination = {
            total: 0,
            currentPage: 1,
            lastPage: 1,
            perPage: 10
        };
        
        // Obtener citas al montar el componente
        this.fetchAppointments();
    }
};
</script>

<style scoped>
.agenda-main-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    background-color: #f4f8ff;
    min-height: 100vh;
}

.agenda-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 20px;
}

.agenda-header h1 {
    font-size: 1.8em;
    font-weight: 700;
    color: #1F2937;
    margin: 0;
    margin-bottom: 5px;
}

.subtitle {
    color: #6B7280;
    margin: 0;
}

.filter-controls {
    display: flex;
    gap: 15px;
    align-items: center;
}

.search-container {
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6B7280;
}

.search-input {
    padding: 10px 15px 10px 38px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    width: 300px;
    font-size: 0.95em;
    background-color: white;
}

.filter-select {
    padding: 10px 15px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    background-color: white;
    font-size: 0.95em;
    min-width: 180px;
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
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
}

.empty-illustration {
    width: 120px;
    height: 120px;
    background-color: #EBF5FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.empty-icon {
    font-size: 50px;
    color: #3B82F6;
}

.empty-state h3 {
    font-size: 1.3em;
    color: #1F2937;
    margin-bottom: 10px;
}

.empty-state p {
    color: #6B7280;
    max-width: 80%;
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
}

.modal-container {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #E5E7EB;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.3em;
    color: #1F2937;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    color: #6B7280;
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
    border-bottom: 1px solid #E5E7EB;
}

.patient-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.patient-info h4 {
    margin: 0 0 5px 0;
    color: #1F2937;
}

.patient-info p {
    margin: 0;
    color: #6B7280;
}

.reschedule-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group label {
    font-size: 0.95em;
    color: #4B5563;
}

.form-control {
    padding: 10px;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    font-size: 0.95em;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 20px;
    border-top: 1px solid #E5E7EB;
}

.cancel-button {
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    color: #4B5563;
    font-weight: 500;
    cursor: pointer;
}

.confirm-button {
    padding: 8px 16px;
    background-color: #3B82F6;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    cursor: pointer;
}

/* Responsive styles */
@media (max-width: 768px) {
    .agenda-header {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filter-controls {
        flex-direction: column;
        width: 100%;
    }
    
    .search-input {
        width: 100%;
    }
    
    .filter-select {
        width: 100%;
    }
    
    .card-container {
        grid-template-columns: 1fr;
    }
}
</style> 