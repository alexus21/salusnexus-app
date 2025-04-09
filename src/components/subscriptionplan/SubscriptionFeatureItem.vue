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
  margin-bottom: 18px;
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: rgba(13, 110, 253, 0.04);
}

.feature-item:hover {
  background-color: rgba(13, 110, 253, 0.08);
  transform: translateX(5px);
}

.feature-icon {
  width: 36px;
  height: 36px;
  background-color: rgba(13, 110, 253, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #0d6efd;
  font-size: 16px;
}

.feature-text {
  color: #374151;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.4;
}

/* Estilos para plan premium */
li.feature-item.premium {
  background-color: rgba(255, 215, 0, 0.08);
}

li.feature-item.premium .feature-icon {
  background-color: rgba(255, 215, 0, 0.2);
  color: #E6B800;
}

li.feature-item.premium .feature-text {
  font-weight: 600;
}
</style> 