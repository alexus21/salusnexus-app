<template>
    <div :class="['schedule-day-card', { inactive: !isActive }]">
        <div class="day-header">
            <h4>{{ dayName }}</h4>
            <div :class="['status-badge', { active: isActive }]">
                {{ isActive ? 'Activo' : 'Inactivo' }}
            </div>
        </div>
        <div class="day-content">
            <div class="time-display">
                <i :class="isActive ? 'fas fa-clock' : 'fas fa-times-circle'"></i>
                <span>{{ scheduleText }}</span>
            </div>
            <button class="edit-schedule-btn" @click="$emit('edit')">
                <i class="fas fa-pen"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScheduleDayCard',
    props: {
        dayName: {
            type: String,
            required: true
        },
        scheduleText: {
            type: String,
            default: 'No disponible'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    emits: ['edit']
}
</script>

<style scoped>
.schedule-day-card {
    background-color: #f8fafc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
}

.schedule-day-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.schedule-day-card.inactive {
    opacity: 0.7;
}

.day-header {
    padding: 15px;
    background-color: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.day-header h4 {
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
    margin: 0;
}

.status-badge {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 50px;
    background-color: #f1f5f9;
    color: #64748b;
}

.status-badge.active {
    background-color: #ecfdf5;
    color: #10b981;
}

.day-content {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.time-display {
    display: flex;
    align-items: center;
}

.time-display i {
    margin-right: 10px;
    color: #3b82f6;
    font-size: 1.1rem;
}

.schedule-day-card.inactive .time-display i {
    color: #94a3b8;
}

.edit-schedule-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e2e8f0;
    color: #64748b;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.edit-schedule-btn:hover {
    background-color: #cbd5e1;
    color: #0f172a;
}
</style>