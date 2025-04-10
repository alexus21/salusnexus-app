<template>
    <li class="feature-item">
        <div class="feature-icon">
            <i :class="iconClass"></i>
        </div>
        <span class="feature-text">{{ featureText }}</span>
    </li>
</template>

<script>
export default {
    name: 'SubscriptionFeatureItem',
    props: {
        featureText: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'check-circle'
        },
        isPremium: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconClass() {
            // Mapa de nombres de características a íconos de FontAwesome
            const iconMap = {
                'básico': 'check-circle',
                'reseñas': 'users',
                'historial': 'calendar-alt',
                'soporte': 'headset',
                'salud': 'heartbeat',
                'medicamentos': 'pills',
                'notificaciones': 'bell',
                'recordatorios': 'clock',
                'premium': 'crown'
            };

            // Detectar automáticamente el ícono basado en el texto
            let iconName = this.icon;

            // Buscar palabras clave en el texto para asignar ícono
            if (this.isPremium || this.featureText.toLowerCase().includes('premium')) {
                iconName = 'crown';
            } else {
                for (const [keyword, icon] of Object.entries(iconMap)) {
                    if (this.featureText.toLowerCase().includes(keyword)) {
                        iconName = icon;
                        break;
                    }
                }
            }

            return `fas fa-${iconName}`;
        }
    }
};
</script>

<style scoped>
.feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 0;
    border-radius: 0;
    transition: none;
    background-color: transparent;
}

.feature-item:hover {
    background-color: transparent;
    transform: none;
}

.feature-icon {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: #0d6efd;
    font-size: 18px;
}

.feature-text {
    color: #4B5563;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
}
</style> 