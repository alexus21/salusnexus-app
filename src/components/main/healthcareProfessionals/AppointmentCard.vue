<template>
    <div class="appointment-card" :class="statusClass">
        <div class="card-header">
            <div class="patient-info">
                <div class="avatar-container">
                    <img :src="appointment.avatar" alt="Avatar del paciente" class="patient-avatar">
                </div>
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
            <div class="appointment-details-grid">
                <div class="appointment-detail">
                    <div class="detail-icon">
                        <i class="fas fa-stethoscope"></i>
                    </div>
                    <div>
                        <span class="label">Servicio</span>
                        <span class="value">{{ appointment.serviceType }}</span>
                    </div>
                </div>

                <div class="appointment-detail">
                    <div class="detail-icon">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div>
                        <span class="label">Fecha solicitada</span>
                        <span class="value">{{ formatDate(appointment.preferredDate) }}</span>
                    </div>
                </div>

                <div class="appointment-detail">
                    <div class="detail-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div>
                        <span class="label">Hora</span>
                        <span class="value">{{ formatTime(appointment.preferredTime) }}</span>
                    </div>
                </div>

                <div class="appointment-detail" v-if="appointment.status === 'rescheduled'">
                    <div class="detail-icon rescheduled">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div>
                        <span class="label">Reprogramada para</span>
                        <span class="value highlight">{{ formatDate(appointment.rescheduleDate) }} a las {{ formatTime(appointment.rescheduleTime) }}</span>
                    </div>
                </div>
            </div>

            <div class="appointment-detail" v-if="appointment.status === 'rejected' && appointment.rejectionReason">
                <div class="detail-icon rejected">
                    <i class="fas fa-comment-alt"></i>
                </div>
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
                <div class="contact-icon">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <span>{{ appointment.contactPhone }}</span>
            </div>
            <div class="action-buttons" v-if="appointment.status === 'pendiente_confirmacion'">
                <button class="action-btn approve" @click="$emit('approve', appointment)">
                    <i class="fas fa-check"></i> Aceptar
                </button>
                <button class="action-btn reschedule" @click="$emit('reschedule', appointment)">
                    <i class="fas fa-calendar-alt"></i> Reprogramar
                </button>
                <button class="action-btn reject" @click="$emit('reject', appointment)">
                    <i class="fas fa-times"></i> Rechazar
                </button>
            </div>
            <div class="action-buttons" v-else-if="appointment.status === 'programada'">
                <button class="action-btn reschedule" @click="$emit('reschedule', appointment)">
                    <i class="fas fa-calendar-alt"></i> Reprogramar
                </button>
                <button class="action-btn reject" @click="$emit('reject', appointment)">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
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
                case 'cancelada_paciente': return 'Cancelada';
                case 'cancelada_profesional': return 'Rechazada';
                case 'rescheduled': return 'Reprogramada';
                default: return 'Desconocido';
            }
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return 'Fecha no disponible';
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', options);
        },
        formatTime(timeString) {
            return timeString || 'Hora no disponible';
        },
    }
};
</script>

<style scoped>
.appointment-card {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    position: relative;
    border: 1px solid #f1f5f9;
}

.appointment-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.appointment-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #94a3b8;
    transition: background 0.3s ease;
}

.appointment-card.status-pending::before {
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.appointment-card.status-approved::before {
    background: linear-gradient(90deg, #10b981, #34d399);
}

.appointment-card.status-rejected::before {
    background: linear-gradient(90deg, #ef4444, #f87171);
}

.appointment-card.status-rescheduled::before {
    background: linear-gradient(90deg, #6366f1, #818cf8);
}

.card-header {
    padding: 18px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
}

.patient-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.avatar-container {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    overflow: hidden;
    background: #f1f5f9;
    position: relative;
}

.patient-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.patient-name {
    margin: 0 0 4px 0;
    font-size: 1.15em;
    font-weight: 600;
    color: #1e293b;
}

.patient-age {
    font-size: 0.85em;
    color: #64748b;
    background-color: #f8fafc;
    padding: 3px 10px;
    border-radius: 20px;
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    padding: 20px;
}

.appointment-details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 16px;
}

.appointment-detail {
    display: flex;
    gap: 14px;
    align-items: flex-start;
}

.detail-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #f1f5f9;
    border-radius: 10px;
    color: #64748b;
    font-size: 0.95em;
}

.detail-icon.rescheduled {
    background-color: #eef2ff;
    color: #6366f1;
}

.detail-icon.rejected {
    background-color: #fef2f2;
    color: #ef4444;
}

.label {
    display: block;
    font-size: 0.8em;
    color: #64748b;
    margin-bottom: 4px;
}

.value {
    display: block;
    font-weight: 500;
    color: #1e293b;
}

.value.highlight {
    color: #6366f1;
    font-weight: 600;
}

.rejection-reason {
    color: #ef4444;
    font-style: italic;
}

.appointment-notes {
    margin-top: 16px;
    padding: 14px;
    background-color: #f8fafc;
    border-radius: 10px;
}

.notes-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    color: #334155;
}

.notes-content {
    margin: 0;
    color: #475569;
    font-size: 0.9em;
    line-height: 1.5;
}

.card-footer {
    padding: 16px 20px;
    background-color: #f8fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f1f5f9;
}

.contact-info {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #475569;
    font-size: 0.9em;
}

.contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #f1f5f9;
    border-radius: 8px;
    color: #64748b;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    font-size: 0.85em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-btn.approve {
    background-color: #ecfdf5;
    color: #10b981;
}

.action-btn.approve:hover {
    background-color: #10b981;
    color: white;
}

.action-btn.reschedule {
    background-color: #eef2ff;
    color: #6366f1;
}

.action-btn.reschedule:hover {
    background-color: #6366f1;
    color: white;
}

.action-btn.reject {
    background-color: #fef2f2;
    color: #ef4444;
}

.action-btn.reject:hover {
    background-color: #ef4444;
    color: white;
}

@media (max-width: 640px) {
    .appointment-details-grid {
        grid-template-columns: 1fr;
    }
    
    .card-footer {
        flex-direction: column;
        gap: 16px;
    }
    
    .action-buttons {
        width: 100%;
        justify-content: center;
    }
    
    .contact-info {
        width: 100%;
        justify-content: center;
    }
}
</style> 