<template>
    <div class="schedule-container">
        <div class="schedule-header">
            <div class="header-icon">
                <i class="fas fa-clock"></i>
            </div>
            <div class="header-content">
                <h2>Horarios de atención</h2>
                <p>Configure sus horarios de atención para cada día de la semana</p>
            </div>
        </div>

        <div class="schedule-card">
            <div class="week-days">
                <div v-for="day in days" :key="day.name" 
                    :class="['day-card', {'day-active': activeDay === day.name}]"
                    @click="activeDay = day.name">
                    <div class="day-icon">
                        <i :class="getDayIcon(day.name)"></i>
                    </div>
                    <div class="day-name">{{ day.label }}</div>
                </div>
            </div>

            <div class="schedule-rows">
                <div v-for="day in days" :key="day.name" 
                    :class="['schedule-row', {'hidden': activeDay !== day.name}]">
                    <div class="day-info">
                        <div class="day-label">{{ day.label }}</div>
                    </div>
                    
                    <div class="time-slot">
                        <div class="time-control">
                            <i class="fas fa-sun"></i>
                            <input
                                v-model="schedule[day.name].from"
                                :disabled="!schedule[day.name].open"
                                class="time-input"
                                type="time"
                            />
                        </div>
                        
                        <div class="time-divider">a</div>
                        
                        <div class="time-control">
                            <i class="fas fa-moon"></i>
                            <input
                                v-model="schedule[day.name].to"
                                :disabled="!schedule[day.name].open"
                                class="time-input"
                                type="time"
                            />
                        </div>
                    </div>
                    
                    <div class="day-toggle">
                        <label class="switch">
                            <input v-model="schedule[day.name].open" type="checkbox"/>
                            <span class="slider"></span>
                        </label>
                        <div class="status-indicator">
                            {{ schedule[day.name].open ? 'Abierto' : 'Cerrado' }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-box">
                <div class="info-icon">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <p>Horarios optimizados mejoran su visibilidad en búsquedas</p>
            </div>

            <div class="action-bar">
                <button class="save-button" @click="saveSchedule">
                    <i class="fas fa-save"></i>
                    <span>Guardar horario</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert2";

const API_URL = process.env.VUE_APP_API_URL;

export default {
    name: 'ScheduleView',
    mounted() {
        this.fetchSchedules();
    },
    data() {
        return {
            activeDay: 'lunes',
            days: [
                {name: 'lunes', label: 'Lunes'},
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

            // Objeto para enviar a la API:
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
        getDayIcon(day) {
            const icons = {
                lunes: 'fas fa-briefcase',
                martes: 'fas fa-calendar-alt',
                miercoles: 'fas fa-clipboard-list',
                jueves: 'fas fa-chart-line',
                viernes: 'fas fa-user-friends',
                sabado: 'fas fa-umbrella-beach',
                domingo: 'fas fa-coffee'
            };
            return icons[day] || 'fas fa-calendar';
        },
        async saveSchedule() {
            const saveBtn = document.querySelector('.save-button');
            if (saveBtn) {
                saveBtn.classList.add('loading');
                saveBtn.disabled = true;
            }

            const clinic = JSON.parse(localStorage.getItem('clinics'));

            // Create a new schedule object instead of overwriting `this.schedule`
            const newSchedule = {
                clinic_id: clinic.clinic_id,
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

                if (saveBtn) {
                    saveBtn.classList.remove('loading');
                    saveBtn.disabled = false;
                }

                if(!data.status){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            popup: 'modern-swal',
                            confirmButton: 'modern-swal-button'
                        }
                    });
                    return;
                }

                // Mostrar animación de éxito en todas las filas
                const scheduleRows = document.querySelectorAll('.schedule-row');
                scheduleRows.forEach(row => {
                    row.classList.add('success-flash');
                    setTimeout(() => {
                        row.classList.remove('success-flash');
                    }, 1000);
                });

                swal.fire({
                    icon: 'success',
                    title: 'Horarios guardados',
                    text: 'Los horarios se han guardado correctamente.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        popup: 'modern-swal',
                        confirmButton: 'modern-swal-button'
                    }
                });
            } catch (error) {
                console.error('Error al guardar el horario:', error);
                
                if (saveBtn) {
                    saveBtn.classList.remove('loading');
                    saveBtn.disabled = false;
                }
                
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar el horario. Intente nuevamente.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        popup: 'modern-swal',
                        confirmButton: 'modern-swal-button'
                    }
                });
            }
        },
        async fetchSchedules() {
            const clinic = JSON.parse(localStorage.getItem('clinics'));

            try {
                const response = await fetch(`${API_URL}/schedules/get/clinic/` + clinic.clinic_id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.data.length === 0) {
                    console.log('No hay horarios disponibles');
                    return;
                }

                if (!data.status) {
                    console.log('Error', data);
                    return;
                }

                const defaultSchedule = () => ({
                    from: null,
                    to: null,
                    open: false
                });

                const daysMap = {
                    Lunes: 'lunes',
                    Martes: 'martes',
                    Miércoles: 'miercoles',
                    Jueves: 'jueves',
                    Viernes: 'viernes',
                    Sábado: 'sabado',
                    Domingo: 'domingo'
                };

                // Initialize schedule with independent default objects
                this.schedule = {
                    lunes: defaultSchedule(),
                    martes: defaultSchedule(),
                    miercoles: defaultSchedule(),
                    jueves: defaultSchedule(),
                    viernes: defaultSchedule(),
                    sabado: defaultSchedule(),
                    domingo: defaultSchedule()
                };

                data.data.forEach(day => {
                    const dayKey = daysMap[day.day_of_the_week];
                    if (dayKey) {
                        this.schedule[dayKey] = {
                            from: day.start_time,
                            to: day.end_time,
                            open: day.open
                        };
                    }
                });
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        }
    }
}
</script>

<style scoped>
/* Estilos generales */
.schedule-container {
    padding: 1.5rem;
    width: 85%;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Cabecera */
.schedule-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
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

.header-content h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a202c;
    margin: 0 0 0.5rem 0;
}

.header-content p {
    color: #64748b;
    margin: 0;
    font-size: 1rem;
}

/* Tarjeta principal */
.schedule-card {
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 1.5rem;
    position: relative;
}

/* Sección de días de la semana */
.week-days {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 1rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.week-days::-webkit-scrollbar {
    display: none;
}

.day-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    width: 90px;
    min-width: 80px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}

.day-card:hover {
    border-bottom-color: #e0e7ff;
}

.day-active {
    border-bottom-color: #3b82f6;
}

.day-active .day-icon {
    background: #3b82f6;
    color: white;
}

.day-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #f1f5f9;
    border-radius: 10px;
    color: #64748b;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.day-name {
    font-weight: 500;
    color: #64748b;
    font-size: 0.9rem;
}

/* Filas de horario */
.schedule-rows {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.schedule-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    background-color: #f8fafc;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.schedule-row.hidden {
    display: none;
}

.day-info {
    min-width: 100px;
}

.day-label {
    font-weight: 600;
    color: #334155;
    font-size: 1rem;
}

/* Control de tiempo */
.time-slot {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.time-control {
    position: relative;
}

.time-control i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 0.9rem;
    z-index: 2;
}

.time-input {
    padding: 0.75rem 0.75rem 0.75rem 2.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.95rem;
    color: #334155;
    width: 120px;
    background-color: white;
    transition: all 0.3s ease;
}

.time-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.time-input:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
}

.time-divider {
    font-weight: 500;
    color: #94a3b8;
}

/* Toggle de disponibilidad */
.day-toggle {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
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
    background-color: #cbd5e0;
    transition: .4s;
    border-radius: 24px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:checked + .slider {
    background-color: #3b82f6;
}

input:focus + .slider {
    box-shadow: 0 0 1px #3b82f6;
}

input:checked + .slider:before {
    transform: translateX(24px);
}

.status-indicator {
    font-weight: 600;
    font-size: 0.85rem;
    min-width: 80px;
    padding: 0.35rem 0.75rem;
    text-align: center;
    border-radius: 6px;
    background-color: #f1f5f9;
    color: #64748b;
    transition: all 0.3s ease;
}

input:checked ~ .status-indicator {
    background-color: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

/* Caja de información */
.info-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.25rem;
    background-color: #fffdf0;
    border-radius: 16px;
    border-left: 4px solid #f6ad55;
}

.info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #feebc8;
    border-radius: 12px;
    color: #dd6b20;
    font-size: 1.1rem;
}

.info-box p {
    margin: 0;
    color: #744210;
    font-weight: 500;
}

/* Barra de acción */
.action-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
}

.save-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.save-button:hover {
    background: #2563eb;
    transform: translateY(-2px);
}

.save-button:active {
    transform: translateY(0);
}

.save-button.loading {
    pointer-events: none;
    opacity: 0.8;
}

.save-button.loading::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: calc(50% - 10px);
    right: 15px;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Animación de guardado exitoso */
.success-flash {
    animation: flash 1s ease;
}

@keyframes flash {
    0% { background-color: #f8fafc; }
    30% { background-color: rgba(16, 185, 129, 0.1); }
    100% { background-color: #f8fafc; }
}

/* Estilos para SweetAlert2 */
:global(.modern-swal) {
    border-radius: 16px !important;
    padding: 2rem !important;
}

:global(.modern-swal-button) {
    background: #3b82f6 !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3) !important;
    padding: 0.75rem 1.5rem !important;
    font-weight: 600 !important;
}

/* Responsive */
@media (max-width: 768px) {
    .schedule-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .day-info {
        margin-bottom: 0.5rem;
    }
    
    .time-slot {
        width: 100%;
        justify-content: space-between;
    }
    
    .day-toggle {
        width: 100%;
        justify-content: flex-end;
        margin-top: 0.5rem;
    }
    
    .week-days {
        overflow-x: auto;
        justify-content: flex-start;
        gap: 1rem;
        padding-bottom: 1rem;
    }
    
    .header-icon {
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
    }
    
    .header-content h2 {
        font-size: 1.5rem;
    }
    
    .header-content p {
        font-size: 0.95rem;
    }
    
    .action-bar {
        justify-content: center;
    }
    
    .save-button {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .time-slot {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
    
    .time-divider {
        display: none;
    }
    
    .time-control {
        width: 100%;
    }
    
    .time-input {
        width: 100%;
    }
    
    .schedule-card {
        padding: 1.25rem;
    }
    
    .day-card {
        min-width: 70px;
    }
}
</style>
