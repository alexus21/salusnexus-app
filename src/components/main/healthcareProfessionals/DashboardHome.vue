<template>
    <main class="main-content">
        <header class="main-header">
            <h1>Bienvenido, {{ professionalName }}</h1>
            <p>Aquí tienes un resumen de tu actividad hoy.</p>
        </header>

        <!-- Tarjetas de Estadísticas -->
        <section class="stats-cards">
            <StatCard
                v-for="stat in stats"
                :key="stat.title"
                :title="stat.title"
                :value="stat.value"
                :sub-value="stat.subValue"
                :icon="stat.icon"
                :trend="stat.trend"
            />
        </section>

        <!-- Gráfico Principal -->
        <section class="main-chart-section">
            <h2>Visualizaciones del Perfil</h2>
            <ChartPlaceholder :chartData="profileViewsData" />
        </section>

        <!-- Actividad Reciente / Próximas Citas -->
        <section class="activity-section">
            <h2>Próximas Citas</h2>
            <ul class="activity-list">
                <li v-if="upcomingAppointments.length === 0">No tienes citas próximas hoy.</li>
                <li v-for="appt in upcomingAppointments" :key="appt.id">
                    <span class="time">{{ appt.time }}</span> {{ appt.patientName }} - {{ appt.type }}
                </li>
                <li v-if="upcomingAppointments.length > 0">
                    <a href="#" @click.prevent="viewAllAppointments" class="view-all-link">
                        Ver todas las citas →
                    </a>
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
import StatCard from '@/components/main/healthcareProfessionals/StatCard.vue'
import ChartPlaceholder from '@/components/main/healthcareProfessionals/ChartPlaceholder.vue';

export default {
    name: 'DashboardHome',
    components: {
        StatCard,
        ChartPlaceholder,
    },
    data() {
        return {
            professionalName: 'Dr. García',
            stats: [
                { title: 'Citas Hoy', value: 5 },
                { title: 'Nuevas Reseñas', value: 2, subValue: 'Promedio: 4.8', icon: 'fas fa-star' },
                { title: 'Vistas Perfil (7d)', value: 152, subValue: '+15%', trend: 'positive' },
                { title: 'Próxima Cita', value: '10:30 AM', subValue: 'Ana Martínez' }
            ],

            profileViewsData: {  },
            upcomingAppointments: [
                { id: 1, time: '10:30 AM', patientName: 'Ana Martínez', type: 'Consulta General' },
                { id: 2, time: '11:00 AM', patientName: 'Carlos López', type: 'Revisión Dental' },
                { id: 3, time: '11:45 AM', patientName: 'Luisa Fernández', type: 'Seguimiento' },
            ],
        };
    },
    methods: {
        fetchDashboardData() {

            console.log("Obteniendo datos del dashboard...");

        },
        viewAllAppointments() {

            console.log("Navegar a la agenda completa");

        }
    },
    mounted() {

        this.fetchDashboardData();
    }
};
</script>

<style scoped>
.main-content {
    flex-grow: 1;
    padding: 30px;
    height: 100vh;
    overflow-y: auto;
}

.main-header h1 {
    font-size: 1.8em;
    margin-bottom: 5px;
    font-weight: 600;
    color: #1F2937;
}
.main-header p {
    color: #6B7280;
    margin-bottom: 30px;
}

.stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.main-chart-section {
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
    margin-bottom: 30px;
}

.main-chart-section h2 {
    margin: 0 0 20px 0;
    font-size: 1.2em;
    font-weight: 600;
}

.activity-section {
    /* Podrías darle un estilo de card si prefieres */
    margin-bottom: 30px;
}
.activity-section h2 {
    margin: 0 0 15px 0;
    font-size: 1.2em;
    font-weight: 600;
}
.activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #FFFFFF;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
}
.activity-list li {
    padding: 12px 0;
    border-bottom: 1px solid #E5E7EB;
    font-size: 0.95em;
    color: #374151;
}
.activity-list li:last-child {
    border-bottom: none;
}
.activity-list .time {
    color: #6B7280;
    margin-right: 10px;
    font-weight: 500;
    display: inline-block;
    width: 70px; /* Alinea los horarios */
}
.view-all-link {
    color:#3B82F6;
    font-size: 0.9em;
    display: block;
    text-align: right;
    padding-top: 10px;
    text-decoration: none;
}
.view-all-link:hover {
    text-decoration: underline;
}

</style>