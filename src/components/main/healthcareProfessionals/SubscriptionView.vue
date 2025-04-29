<template>
    <div class="subscription-container">
        <h1 class="page-title">Plan de Suscripción</h1>

        <div class="subscription-cards-container" v-if="subscriptionData">
            <!-- Plan Básico -->
            <div 
                class="subscription-card" 
                :class="{
                    'subscription-card-current': !subscriptionData.subscription_type.includes('avanzado'),
                    'subscription-card-alternate': subscriptionData.subscription_type.includes('avanzado')
                }"
            >
                <div class="subscription-header">
                    <div class="header-content">
                        <h2 class="plan-title">Plan Profesional Básico</h2>
                        <div class="price-container">
                            <span class="price">Gratis</span>
                        </div>
                    </div>
                </div>
                
                <div class="subscription-features">
                    <ul>
                        <li v-for="feature in basicFeatures" :key="feature.id" class="feature-item">
                            <i class="fas fa-check-circle feature-icon"></i>
                            {{ feature.feature }}
                        </li>
                    </ul>
                </div>
                
                <div class="subscription-footer">
                    <button 
                        v-if="subscriptionData.subscription_type === 'profesional_avanzado'"
                        class="btn-switch-plan"
                        @click="handlePlanSwitch"
                    >
                        <i class="fas fa-arrow-down"></i>
                        Cambiar a Plan Básico
                    </button>
                    <button 
                        v-else
                        class="btn-current"
                    >
                        Plan Actual
                    </button>
                </div>
            </div>

            <!-- Plan Premium -->
            <div 
                class="subscription-card" 
                :class="{
                    'subscription-card-premium': true,
                    'subscription-card-current': subscriptionData.subscription_type === 'profesional_avanzado',
                    'subscription-card-alternate': subscriptionData.subscription_type !== 'profesional_avanzado'
                }"
            >
                <div class="subscription-header">
                    <div class="header-content premium-gradient">
                        <span class="badge">
                            <i class="fas fa-crown"></i> RECOMENDADO
                        </span>
                        <h2 class="plan-title">Plan Profesional Premium</h2>
                        <div class="price-container">
                            <span class="price">
                                ${{ premiumPrice }}
                                <span class="price-period">/ Por miembro</span>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="subscription-features">
                    <ul>
                        <li v-for="feature in premiumFeatures" :key="feature.id" class="feature-item">
                            <i class="fas fa-check-circle feature-icon"></i>
                            {{ feature.feature }}
                        </li>
                    </ul>
                </div>
                
                <div class="subscription-footer">
                    <div v-if="subscriptionData.subscription_type !== 'profesional_avanzado'">
                        <button class="btn-primary" @click="handleStartTrial">
                            <i class="fas fa-rocket"></i>
                            Comenzar prueba gratuita de 14 días
                        </button>
                        <span class="payment-note">
                            <i class="fas fa-lock"></i>
                            Se requiere tarjeta de débito/crédito
                        </span>
                    </div>
                    <button 
                        v-else
                        class="btn-current"
                    >
                        Plan Actual
                    </button>
                </div>
            </div>
        </div>

        <div class="loading-container" v-else-if="loading">
            <div class="loading-spinner">
                <i class="fas fa-circle-notch fa-spin"></i>
            </div>
            <p>Cargando información de suscripción...</p>
        </div>

        <div class="error-container" v-else-if="error">
            <i class="fas fa-exclamation-circle error-icon"></i>
            <p>{{ error }}</p>
            <button class="btn-primary" @click="fetchSubscriptionData">
                <i class="fas fa-sync-alt"></i>
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
            error: null,
            premiumPrice: '7.99',
            basicFeatures: [
                { id: 14, feature: "Creación y personalización de perfil profesional" },
                { id: 15, feature: "Publicación y visibilidad de tu negocio" },
                { id: 16, feature: "Recepción de calificaciones de pacientes" },
                { id: 17, feature: "Monitoreo de visualizaciones de pacientes" },
                { id: 18, feature: "Notificaciones de nuevas reseñas" },
                { id: 19, feature: "Búsqueda en el directorio de pacientes" }
            ],
            premiumFeatures: [
                { id: 20, feature: "Todas las ventajas del plan gratuito" },
                { id: 21, feature: "Habilitación para agendar citas" },
                { id: 22, feature: "Historial de citas" },
                { id: 23, feature: "Soporte técnico prioritario" },
                { id: 24, feature: "Habilitación de servicio a domicilio" },
                { id: 25, feature: "Exportación de historiales de pacientes" },
                { id: 26, feature: "Recordatorios personalizados" },
                { id: 27, feature: "Chat integrado para comunicación con pacientes" }
            ]
        }
    },
    created() {
        this.fetchSubscriptionData();
    },
    methods: {
        handlePlanSwitch() {
            this.$router.push({ name: 'AddPaymentMethod' });
        },
        handleStartTrial() {
            this.$router.push({ name: 'AddPaymentMethod' });
        },
        fetchSubscriptionData() {
            this.loading = true;
            this.error = null;
            
            let apiPlanType = 'profesional_gratis';
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.subscription_type) {
                    apiPlanType = user.subscription_type;
                }
            } catch (e) {
                console.error('Error al obtener el tipo de suscripción:', e);
                apiPlanType = 'profesional_gratis';
            }
            
            const apiBaseUrl = process.env.VUE_APP_API_URL;
            const apiUrl = `${apiBaseUrl}/subscription-plan/${apiPlanType}`;
            
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
                });
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.subscription-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
}

.subscription-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 0 auto;
    max-width: 1000px;
}

.page-title {
    margin-bottom: 2rem;
    color: #1a1f36;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, #1a1f36 0%, #3B82F6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeIn 0.6s ease-out;
}

.subscription-card {
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transform: translateY(0);
    transition: all 0.3s ease;
    animation: slideUp 0.6s ease-out;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.subscription-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.subscription-card-premium {
    border: 2px solid transparent;
    background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(135deg, #3B82F6, #2563EB) border-box;
}

.subscription-card-current {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
}

.subscription-card-alternate {
    opacity: 0.95;
}

.subscription-header {
    position: relative;
    overflow: hidden;
}

.header-content {
    padding: 2rem;
    background-color: #f8fafc;
    text-align: center;
    position: relative;
    z-index: 1;
}

.premium-gradient {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: white;
}

.premium-gradient .plan-title,
.premium-gradient .price {
    color: white;
}

.badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: pulse 2s infinite;
}

.badge i {
    color: #FFD700;
}

.plan-title {
    font-size: 2rem;
    color: #1a1f36;
    margin-bottom: 1rem;
    font-weight: 700;
}

.price-container {
    margin-top: 1rem;
}

.price {
    font-size: 3.5rem;
    font-weight: 700;
    color: #1a1f36;
    line-height: 1;
}

.price-period {
    font-size: 1rem;
    color: #64748b;
    font-weight: normal;
}

.subscription-features {
    padding: 2rem;
    flex-grow: 1;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    padding: 0.75rem 0;
    color: #1a1f36;
    animation: fadeIn 0.3s ease-out;
    animation-fill-mode: both;
}

.feature-item:nth-child(1) { animation-delay: 0.1s; }
.feature-item:nth-child(2) { animation-delay: 0.2s; }
.feature-item:nth-child(3) { animation-delay: 0.3s; }
.feature-item:nth-child(4) { animation-delay: 0.4s; }
.feature-item:nth-child(5) { animation-delay: 0.5s; }

.feature-icon {
    color: #3B82F6;
    margin-right: 1rem;
    font-size: 1.25rem;
    background: #e0e7ff;
    padding: 0.5rem;
    border-radius: 50%;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.subscription-footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.btn-primary {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-switch-plan {
    background: #f1f5f9;
    color: #1a1f36;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.btn-switch-premium {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: white;
}

.btn-switch-plan:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-current {
    background: #e0e7ff;
    color: #3B82F6;
    border: 2px solid #3B82F6;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: default;
    width: 100%;
}

.payment-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    color: #64748b;
    font-size: 0.9rem;
}

.loading-container {
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    max-width: 500px;
    margin: 0 auto;
}

.loading-spinner {
    font-size: 3rem;
    color: #3B82F6;
    margin-bottom: 1.5rem;
}

.error-container {
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    max-width: 500px;
    margin: 0 auto;
}

.error-icon {
    font-size: 3rem;
    color: #EF4444;
    margin-bottom: 1.5rem;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
}

@media (max-width: 768px) {
    .subscription-container {
        padding: 1rem;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .plan-title {
        font-size: 1.75rem;
    }
    
    .price {
        font-size: 2.5rem;
    }
    
    .subscription-cards-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .feature-icon {
        min-width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }
}
</style> 