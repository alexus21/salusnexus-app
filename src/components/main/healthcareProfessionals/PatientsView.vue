<template>
    <div class="patients-main-bg">
        <div class="patients-content">
            <div class="patients-header">
                <h2>Pacientes</h2>
                <button class="add-btn" @click="addPatient">+ Agregar paciente</button>
            </div>
            <div class="patients-list">
                <div v-for="patient in patients" :key="patient.id" class="patient-card"
                     @click="goToPatient(patient.id)">
                    <img :src="patient.avatar" class="avatar" alt="Foto de paciente"/>
                    <div class="info">
                        <div class="name-age">
                            <span class="name">{{ patient.name }}</span>
                            <span class="age-badge">{{ patient.age }} años</span>
                        </div>
                        <div class="meta">
                            <span class="last-visit">Última consulta: {{ patient.lastVisit }}</span>
                            <span class="total-visits">Consultas: <b>{{ patient.totalVisits }}</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PatientsView',
    data() {
        return {
            patients: [
                {
                    id: 1,
                    name: 'Ana Martínez',
                    age: 62,
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    lastVisit: '10-04-2025',
                    totalVisits: 8
                },
                {
                    id: 2,
                    name: 'Carlos Rodríguez',
                    age: 45,
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    lastVisit: '05-04-2025',
                    totalVisits: 5
                },
                {
                    id: 3,
                    name: 'Luisa Sánchez',
                    age: 53,
                    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
                    lastVisit: '01-04-2025',
                    totalVisits: 12
                }
            ]
        }
    },
    methods: {
        goToPatient(id) {
            // Navegación a detalles del paciente (placeholder)
            this.$router.push({name: 'PatientDetail', params: {id}});
        },
        addPatient() {
            // Acción para agregar paciente
            alert('Funcionalidad próximamente disponible');
        }
    }
}
</script>

<style scoped>
.patients-main-bg {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f4f8ff 0%, #eaf2fb 100%);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
}

.patients-content {
    width: 100%;
    max-width: 1050px;
    margin: 32px auto 0 auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 32px 0 rgba(30, 34, 90, 0.07);
    padding: 36px 32px 32px 32px;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.patients-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}

.add-btn {
    background: #466bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 18px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.add-btn:hover {
    background: #2945b7;
}

.patients-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.patient-card {
    display: flex;
    align-items: center;
    gap: 22px;
    background: #f4f8ff;
    border-radius: 12px;
    box-shadow: 0 2px 10px 0 rgba(30, 34, 90, 0.07);
    padding: 18px 26px;
    cursor: pointer;
    transition: box-shadow 0.18s, background 0.18s;
}

.patient-card:hover {
    box-shadow: 0 4px 18px 0 rgba(30, 34, 90, 0.14);
    background: #eaf2fb;
}

.avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
}

.info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.name-age {
    display: flex;
    align-items: center;
    gap: 12px;
}

.name {
    font-size: 1.15em;
    font-weight: 700;
    color: #292c6d;
}

.age-badge {
    background: #eaf2fb;
    color: #466bff;
    font-size: 0.95em;
    border-radius: 7px;
    padding: 2px 10px;
    font-weight: 600;
}

.meta {
    display: flex;
    gap: 20px;
    font-size: 0.98em;
    color: #7d8fb3;
}

.last-visit {
    font-size: 0.97em;
}

.total-visits {
    background: #fff;
    color: #466bff;
    border-radius: 7px;
    padding: 2px 8px;
    font-weight: 600;
    font-size: 0.98em;
}

@media (max-width: 700px) {
    .patients-content {
        padding: 16px 2vw 16px 2vw;
        border-radius: 0;
    }

    .patients-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .patient-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 12px;
    }

    .avatar {
        width: 52px;
        height: 52px;
    }
}
</style>
