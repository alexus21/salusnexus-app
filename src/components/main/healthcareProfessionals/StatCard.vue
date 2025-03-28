<template>
    <div class="card">
        <h3>{{ title }}</h3>
        <span class="value">{{ value }}</span>
        <span v-if="subValue" class="sub-value" :style="{ color: trendColor }">
      <i v-if="icon" :class="icon"></i> {{ subValue }}
    </span>
    </div>
</template>

<script>
export default {
    name: 'StatCard',
    props: {
        title: { type: String, required: true },
        value: { type: [String, Number], required: true },
        subValue: { type: String, default: '' },
        icon: { type: String, default: '' }, // e.g., 'fas fa-star'
        trend: { type: String, default: 'neutral' } // 'positive', 'negative', 'neutral'
    },
    computed: {
        trendColor() {
            if (this.trend === 'positive') return '#10B981'; // Verde
            if (this.trend === 'negative') return '#EF4444'; // Rojo
            if (this.icon && this.icon.includes('fa-star')) return '#F59E0B'; // Amarillo para estrellas
            return '#6B7280'; // Gris por defecto
        }
    }
};
</script>

<style scoped>
/* Copiar los estilos CSS del .card del HTML anterior aquí */
.card {
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
}

.card h3 {
    margin: 0 0 8px 0;
    font-size: 0.9em;
    color: #6B7280;
    text-transform: uppercase;
    font-weight: 500;
}

.card .value {
    font-size: 2em;
    font-weight: bold;
    color: #1F2937;
    display: block; /* Asegura que el sub-valor quede debajo si es necesario */
    line-height: 1.1;
}

.card .sub-value {
    font-size: 0.9em;
    color: #6B7280; /* Color base, será sobrescrito por trendColor */
    display: block;
    margin-top: 4px;
}
.card .sub-value i {
    margin-right: 4px;
}
</style>