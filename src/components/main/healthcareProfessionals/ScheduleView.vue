<template>
    <div class="schedule-container">
        <h2><i class="fas fa-clock"></i> Horarios de atención</h2>
        <form @submit.prevent>
            <div v-for="day in days" :key="day.name" class="schedule-row">
                <div class="day-label">{{ day.label }}</div>
                <input
                    type="time"
                    v-model="schedule[day.name].from"
                    :disabled="!schedule[day.name].open"
                    class="time-input"
                />
                <span class="a-label">a</span>
                <input
                    type="time"
                    v-model="schedule[day.name].to"
                    :disabled="!schedule[day.name].open"
                    class="time-input"
                />
                <label class="switch">
                    <input type="checkbox" v-model="schedule[day.name].open"/>
                    <span class="slider round"></span>
                </label>
                <span class="status-label" :class="{ closed: !schedule[day.name].open }">
                    {{ schedule[day.name].open ? 'Abierto' : 'Cerrado' }}
                </span>
            </div>
            <button type="button" class="save-btn" @click="saveSchedule">Guardar horario</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ScheduleView',
    data() {
        return {
            days: [
                {name: 'lunes', label: 'lunes'},
                {name: 'martes', label: 'Martes'},
                {name: 'miercoles', label: 'Miércoles'},
                {name: 'jueves', label: 'Jueves'},
                {name: 'viernes', label: 'Viernes'},
                {name: 'sabado', label: 'Sábado'},
                {name: 'domingo', label: 'Domingo'}
            ],
            schedule: {
                lunes: {from: '08:00', to: '17:00', open: true},
                martes: {from: '08:00', to: '17:00', open: true},
                miercoles: {from: '08:00', to: '17:00', open: true},
                jueves: {from: '08:00', to: '17:00', open: true},
                viernes: {from: '08:00', to: '15:00', open: true},
                sabado: {from: '09:00', to: '12:00', open: true},
                domingo: {from: '09:00', to: '12:00', open: false}
            }
        }
    },
    methods: {
        saveSchedule() {
            // Aquí se puede hacer un POST a una API con this.schedule
            console.log('Horario a guardar:', this.schedule);
        }
    }
}
</script>

<style scoped>
.schedule-container {
    background: #fff;
    border-radius: 10px;
    padding: 24px 32px;
    max-width: 800px;
    margin: 32px auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.schedule-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.day-label {
    width: 110px;
    font-weight: 500;
}

.time-input {
    width: 110px;
    margin: 0 8px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
}

.a-label {
    margin: 0 8px;
    color: #666;
}

.status-label {
    margin-left: 16px;
    font-weight: bold;
    color: #0a7cff;
    min-width: 60px;
    text-align: left;
}

.status-label.closed {
    color: #aaa;
    text-decoration: line-through;
}

.switch {
    margin-left: 16px;
    position: relative;
    display: inline-block;
    width: 38px;
    height: 22px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 22px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #0a7cff;
}

input:checked + .slider:before {
    transform: translateX(16px);
}

.save-btn {
    margin-top: 24px;
    padding: 8px 28px;
    background: #0a7cff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

.save-btn:hover {
    background: #075bb5;
}
</style>
