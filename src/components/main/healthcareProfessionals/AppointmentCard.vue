<template>
    <div class="appointment-card" :class="statusClass">
        <div class="card-header">
            <div class="patient-info">
                <img :src="appointment.avatar" alt="Avatar del paciente" class="patient-avatar">
                <div>
                    <h3 class="patient-name">{{ appointment.patientName }}</h3>
                    <span class="patient-age">{{ appointment.patientAge }} años</span>
                </div>
            </div>
            <div class="status-badge" :class="statusClass">
                {{ statusText }}
            </div>
        </div>

        <div class="card-body">
            <div class="appointment-detail">
                <i class="fas fa-stethoscope icon"></i>
                <div>
                    <span class="label">Servicio</span>
                    <span class="value">{{ appointment.serviceType }}</span>
                </div>
            </div>

            <div class="appointment-detail">
                <i class="fas fa-calendar-day icon"></i>
                <div>
                    <span class="label">Fecha solicitada</span>
                    <span class="value">{{ formatDate(appointment.preferredDate) }}</span>
                </div>
            </div>

            <div class="appointment-detail">
                <i class="fas fa-clock icon"></i>
                <div>
                    <span class="label">Hora</span>
                    <span class="value">{{ formatTime(appointment.preferredTime) }}</span>
                </div>
            </div>

            <div class="appointment-detail" v-if="appointment.status === 'rescheduled'">
                <i class="fas fa-calendar-alt icon rescheduled"></i>
                <div>
                    <span class="label">Reprogramada para</span>
                    <span class="value highlight">{{ formatDate(appointment.rescheduleDate) }} a las {{ formatTime(appointment.rescheduleTime) }}</span>
                </div>
            </div>

            <div class="appointment-detail" v-if="appointment.status === 'rejected' && appointment.rejectionReason">
                <i class="fas fa-comment-alt icon rejected"></i>
                <div>
                    <span class="label">Motivo de rechazo</span>
                    <span class="value rejection-reason">{{ appointment.rejectionReason }}</span>
                </div>
            </div>

            <div class="appointment-notes" v-if="appointment.notes">
                <div class="notes-header">
                    <i class="fas fa-sticky-note"></i>
                    <span>Notas del paciente</span>
                </div>
                <p class="notes-content">{{ appointment.notes }}</p>
            </div>
        </div>

        <div class="card-footer">
            <div class="contact-info">
                <i class="fas fa-phone-alt"></i>
                <span>{{ appointment.contactPhone }}</span>
            </div>
            <div class="action-buttons" v-if="appointment.status === 'pendiente_confirmacion'">
                <button class="action-btn approve" @click="fetchConfirmOrCancel('programada')">
                    <i class="fas fa-check"></i> Aceptar
                </button>
                <button class="action-btn reschedule" @click="$emit('reschedule', appointment.id)">
                    <i class="fas fa-calendar-alt"></i> Reprogramar
                </button>
                <button class="action-btn reject" @click="fetchConfirmOrCancel('cancelada_profesional')">
                    <i class="fas fa-times"></i> Rechazar
                </button>
            </div>
            <div class="action-buttons" v-else-if="appointment.status === 'approved'">
                <button class="action-btn reschedule" @click="$emit('reschedule', appointment.id)">
                    <i class="fas fa-calendar-alt"></i> Reprogramar
                </button>
                <button class="action-btn reject" @click="$emit('reject', appointment.id)">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";

export default {
    name: 'AppointmentCard',
    props: {
        appointment: {
            type: Object,
            required: true
        }
    },
    computed: {
        statusClass() {
            return {
                'status-pending': this.appointment.status === 'pendiente_confirmacion',
                'status-approved': this.appointment.status === 'programada',
                'status-rejected': this.appointment.status === 'cancelada_paciente' || this.appointment.status === 'cancelada_profesional',
                'status-rescheduled': this.appointment.status === 'rescheduled'
            };
        },
        statusText() {
            switch (this.appointment.status) {
                case 'pendiente_confirmacion': return 'Pendiente';
                case 'programada': return 'Aprobada';
                case 'cancelada_paciente': return 'Rechazada';
                case 'cancelada_profesional': return 'Rechazada';
                case 'rescheduled': return 'Reprogramada';
                default: return 'Desconocido';
            }
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', options);
        },
        formatTime(timeString) {
            return timeString;
        },
        async fetchConfirmOrCancel(appointment_status){
            const API_URL = process.env.VUE_APP_API_URL;

            const clinic = JSON.parse(localStorage.getItem('clinics'));
            const user = JSON.parse(localStorage.getItem('user'));

            try {
                const response = await fetch(API_URL + '/appointments/confirm/' + this.appointment.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        appointment_status: appointment_status,
                        service_type: this.appointment.serviceType,
                        appointment_date: this.appointment.preferredDate,
                        clinic_name: clinic.clinic_name,
                        patient_name: this.appointment.patientName,
                        doctor_name: "Dr. " + clinic.first_name + ' ' + clinic.last_name,
                        clinic_address: clinic.address + ', ' + clinic.city_name,
                        email: user.email,
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
                    window.location.reload();
                })
            } catch (error) {
                console.error('Error al actualizar la cita:', error);
            }
        }
    }
};
</script>

<style scoped>
.appointment-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.2s ease;
    border-top: 4px solid #94a3b8;
}

.appointment-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
}

.appointment-card.status-pending {
    border-top-color: #f59e0b;
}

.appointment-card.status-approved {
    border-top-color: #10b981;
}

.appointment-card.status-rejected {
    border-top-color: #ef4444;
}

.appointment-card.status-rescheduled {
    border-top-color: #6366f1;
}

.card-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #e5e7eb;
}

.patient-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.patient-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.patient-name {
    margin: 0;
    font-size: 1.1em;
    font-weight: 600;
    color: #1f2937;
}

.patient-age {
    font-size: 0.9em;
    color: #6b7280;
    background-color: #f3f4f6;
    padding: 2px 8px;
    border-radius: 12px;
}

.status-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 500;
    background-color: #f3f4f6;
    color: #1f2937;
}

.status-badge.status-pending {
    background-color: #fff7ed;
    color: #f59e0b;
}

.status-badge.status-approved {
    background-color: #ecfdf5;
    color: #10b981;
}

.status-badge.status-rejected {
    background-color: #fef2f2;
    color: #ef4444;
}

.status-badge.status-rescheduled {
    background-color: #eef2ff;
    color: #6366f1;
}

.card-body {
    padding: 16px;
}

.appointment-detail {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: flex-start;
}

.icon {
    font-size: 1.1em;
    color: #6b7280;
    margin-top: 2px;
}

.icon.rescheduled {
    color: #6366f1;
}

.icon.rejected {
    color: #ef4444;
}

.label {
    display: block;
    font-size: 0.85em;
    color: #6b7280;
    margin-bottom: 2px;
}

.value {
    display: block;
    font-size: 1em;
    color: #1f2937;
    font-weight: 500;
}

.value.highlight {
    color: #3b82f6;
    font-weight: 600;
}

.rejection-reason {
    color: #ef4444;
    font-style: italic;
}

.appointment-notes {
    margin-top: 16px;
    background-color: #f3f4f6;
    border-radius: 8px;
    padding: 12px;
}

.notes-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 0.9em;
    color: #4b5563;
    font-weight: 500;
}

.notes-content {
    margin: 0;
    font-size: 0.95em;
    color: #4b5563;
    line-height: 1.5;
}

.card-footer {
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
}

.contact-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 0.9em;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background-color 0.2s ease;
}

.action-btn.approve {
    background-color: #ecfdf5;
    color: #10b981;
}

.action-btn.approve:hover {
    background-color: #d1fae5;
}

.action-btn.reschedule {
    background-color: #eef2ff;
    color: #6366f1;
}

.action-btn.reschedule:hover {
    background-color: #dbeafe;
}

.action-btn.reject {
    background-color: #fef2f2;
    color: #ef4444;
}

.action-btn.reject:hover {
    background-color: #fee2e2;
}

@media (max-width: 640px) {
    .card-footer {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .action-buttons {
        width: 100%;
        justify-content: space-between;
    }
}
</style> 