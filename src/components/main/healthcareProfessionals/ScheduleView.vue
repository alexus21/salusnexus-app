<template>
    <div class="schedule-container">
        <h2><i class="fas fa-clock"></i> Horarios de atención</h2>
        <form @submit.prevent>
            <div v-for="day in days" :key="day.name" class="schedule-row">
                <div class="day-label">{{ day.label }}</div>
                <input
                    v-model="schedule[day.name].from"
                    :disabled="!schedule[day.name].open"
                    class="time-input"
                    type="time"
                />
                <span class="a-label">a</span>
                <input
                    v-model="schedule[day.name].to"
                    :disabled="!schedule[day.name].open"
                    class="time-input"
                    type="time"
                />
                <label class="switch">
                    <input v-model="schedule[day.name].open" type="checkbox"/>
                    <span class="slider round"></span>
                </label>
                <span :class="{ closed: !schedule[day.name].open }" class="status-label">
                    {{ schedule[day.name].open ? 'Abierto' : 'Cerrado' }}
                </span>
            </div>
            <button class="save-btn" type="button" @click="saveSchedule">Guardar horario</button>
        </form>
    </div>
</template>

<script>
import swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;

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
            },
            schedules: {
                clinic_id: null,
                days: [
                    {day_of_the_week: 'Lunes', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Martes', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Miércoles', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Jueves', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Viernes', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Sábado', start_time: null, end_time: null, open: null},
                    {day_of_the_week: 'Domingo', start_time: null, end_time: null, open: null},
                ],
            }
        }
    },
    methods: {
        async saveSchedule() {
            const clinic = JSON.parse(localStorage.getItem('clinics'));

            // Create a new schedule object instead of overwriting `this.schedule`
            const newSchedule = {
                clinic_id: clinic[0].id,
                days: [
                    {
                        day_of_the_week: 'Lunes',
                        start_time: this.schedule.lunes.from,
                        end_time: this.schedule.lunes.to,
                        open: this.schedule.lunes.open
                    },
                    {
                        day_of_the_week: 'Martes',
                        start_time: this.schedule.martes.from,
                        end_time: this.schedule.martes.to,
                        open: this.schedule.martes.open
                    },
                    {
                        day_of_the_week: 'Miércoles',
                        start_time: this.schedule.miercoles.from,
                        end_time: this.schedule.miercoles.to,
                        open: this.schedule.miercoles.open
                    },
                    {
                        day_of_the_week: 'Jueves',
                        start_time: this.schedule.jueves.from,
                        end_time: this.schedule.jueves.to,
                        open: this.schedule.jueves.open
                    },
                    {
                        day_of_the_week: 'Viernes',
                        start_time: this.schedule.viernes.from,
                        end_time: this.schedule.viernes.to,
                        open: this.schedule.viernes.open
                    },
                    {
                        day_of_the_week: 'Sábado',
                        start_time: this.schedule.sabado.from,
                        end_time: this.schedule.sabado.to,
                        open: this.schedule.sabado.open
                    },
                    {
                        day_of_the_week: 'Domingo',
                        start_time: this.schedule.domingo.from,
                        end_time: this.schedule.domingo.to,
                        open: this.schedule.domingo.open
                    }
                ]
            };

            // Use `newSchedule` for API calls or further processing
            try {
                const response = await fetch(`${API_URL}/schedules/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(newSchedule)
                });

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
                    title: 'Horarios guardado',
                    text: 'Los horarios se ha guardado correctamente.',
                    confirmButtonText: 'Aceptar'
                });
            } catch (error) {
                console.error('Error al guardar el horario:', error);
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar el horario. Intente nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
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
