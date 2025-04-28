<template>
  <div class="subscription-container">
    <h1 class="page-title">Plan de Suscripción</h1>
    
    <div class="subscription-card" v-if="subscriptionData">
      <div class="subscription-header">
        <span class="badge" v-if="subscriptionData.subscription_type.includes('avanzado')">RECOMENDADO</span>
        <h2 class="plan-title">{{ subscriptionData.name }}</h2>
        <div class="price-container">
          <span class="price" v-if="subscriptionData.price_monthly">
            ${{ subscriptionData.price_monthly }}
            <span class="price-period">/ Por miembro</span>
          </span>
          <span class="price" v-else>Gratis</span>
        </div>
      </div>
      
      <div class="subscription-features">
        <ul>
          <li v-for="feature in subscriptionData.features" :key="feature.id">
            <i class="fas fa-check-circle feature-icon"></i>
            {{ feature.feature }}
          </li>
        </ul>
      </div>
      
      <div class="subscription-footer">
        <button class="btn-primary" v-if="!subscriptionData.subscription_type.includes('gratis')">
          Comenzar prueba gratuita de 14 días
        </button>
        <span class="payment-note" v-if="!subscriptionData.subscription_type.includes('gratis')">
          Se requiere tarjeta de débito/crédito
        </span>
        <button class="btn-current" v-else>
          Plan Actual
        </button>
      </div>
    </div>
    
    <div class="loading-container" v-else-if="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Cargando información de suscripción...</p>
    </div>
    
    <div class="error-container" v-else-if="error">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
      <button class="btn-primary" @click="fetchSubscriptionData">
        Intentar nuevamente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionView',
  data() {
    return {
      subscriptionData: null,
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchSubscriptionData();
  },
  methods: {
    fetchSubscriptionData() {
      this.loading = true;
      this.error = null;
      
      // Obtener el tipo de plan seleccionado del localStorage
      const selectedPlan = localStorage.getItem('selected_plan') || 'gratis';
      
      // Transformar el tipo de plan para la API
      const apiPlanType = `paciente_${selectedPlan}`;
      
      // Obtener la URL base de la API
      const apiBaseUrl = process.env.VUE_APP_API_URL || 'http://localhost:8000/api';
      
      // Construir la URL completa
      const apiUrl = `${apiBaseUrl}/subscription-plan/${apiPlanType}`;
      
      // Realizar la petición a la API
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo obtener la información del plan');
          }
          return response.json();
        })
        .then(data => {
          this.subscriptionData = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error al obtener datos de suscripción:', error);
          this.error = 'No se pudo cargar la información del plan. Por favor, intenta nuevamente.';
          this.loading = false;
          
          // Para desarrollo/demostración, usar datos de ejemplo si hay error
          if (process.env.NODE_ENV === 'development') {
            this.subscriptionData = {
              id: 1,
              name: "Plan profesional",
              subscription_type: "paciente_avanzado",
              price_monthly: "5.99",
              price_annual: null,
              currency: "USD",
              description: "Plan profesional para pacientes",
              is_active: true,
              discount_percent: null,
              features: [
                { id: 1, feature: "Todas las ventajas del plan básico" },
                { id: 2, feature: "Acceso a reseñas públicas de otros pacientes" },
                { id: 3, feature: "Historial de citas" },
                { id: 4, feature: "Soporte prioritario para la gestión de citas" },
                { id: 5, feature: "Consejos de salud personalizados según perfil" },
                { id: 6, feature: "Detalles de medicamentos recetados" },
                { id: 7, feature: "Notificaciones de citas futuras" },
                { id: 8, feature: "Recordatorios personalizados para ti" }
              ]
            };
            this.error = null;
            this.loading = false;
          }
        });
    }
  }
}
</script>

<style scoped>
.subscription-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

.subscription-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #e0e7ff;
}

.subscription-header {
  padding: 1.5rem;
  position: relative;
  background-color: #f9faff;
  border-bottom: 1px solid #e0e7ff;
  text-align: center;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #3B82F6;
  color: white;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: bold;
  border-bottom-left-radius: 8px;
}

.plan-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.price-container {
  margin-top: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.price-period {
  font-size: 1rem;
  color: #666;
  font-weight: normal;
}

.subscription-features {
  padding: 1.5rem;
}

.subscription-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subscription-features li {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem 0;
  color: #333;
}

.feature-icon {
  color: #3B82F6;
  margin-right: 0.75rem;
  font-size: 1.2rem;
  margin-top: 0.1rem;
}

.subscription-footer {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #e0e7ff;
}

.btn-primary {
  background-color: #3B82F6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563EB;
}

.btn-current {
  background-color: #E0E7FF;
  color: #3B82F6;
  border: 2px solid #3B82F6;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  width: 100%;
}

.payment-note {
  display: block;
  margin-top: 0.75rem;
  color: #666;
  font-size: 0.875rem;
}

.loading-container, .error-container {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.loading-container i, .error-container i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.loading-container i {
  color: #3B82F6;
}

.error-container i {
  color: #EF4444;
}

.error-container button {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .subscription-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .price {
    font-size: 2rem;
  }
}
</style> 