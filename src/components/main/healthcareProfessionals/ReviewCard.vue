<template>
    <div class="review-card">
        <div class="review-header">
            <div class="reviewer-info">
                <div class="avatar-container">
                    <img :src="profileImageUrl" :alt="review.patient_first_name" class="reviewer-avatar" @error="handleImageError">
                </div>
                <div class="name-date">
                    <div class="reviewer-name">{{ review.patient_first_name }} {{ review.patient_last_name }}</div>
                    <div class="review-date">{{ formatDate(review.review_datetime) }}</div>
                </div>
            </div>
            <div class="rating">
                <div class="stars">
                    <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
                </div>
                <span class="rating-value">{{ review.rating }}</span>
            </div>
        </div>
        
        <div class="review-body">
            <p class="review-comment">{{ review.comment || 'No se dejó ningún comentario.' }}</p>
        </div>
        
        <div class="review-footer" v-if="review.professional_response">
            <div class="response-tag">Tu respuesta:</div>
            <p class="response-text">{{ review.professional_response }}</p>
            <div class="response-date">{{ formatDate(review.response_datetime) }}</div>
        </div>
        
        <div class="review-actions" v-else>
            <button class="action-button" @click="openResponseDialog">
                <i class="fas fa-reply"></i> Responder
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReviewCard',
    props: {
        review: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            fallbackImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
        };
    },
    computed: {
        profileImageUrl() {
            return this.review.profile_photo_path 
                ? `${process.env.VUE_APP_API_URL_IMAGE}/${this.review.profile_photo_path}`
                : this.fallbackImage;
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return 'Fecha no disponible';
            
            const options = { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            return new Date(dateString).toLocaleDateString('es-ES', options);
        },
        
        handleImageError(e) {
            e.target.src = this.fallbackImage;
        },
        
        openResponseDialog() {
            this.$emit('respond', this.review);
        }
    }
};
</script>

<style scoped>
.review-card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 24px;
    transition: all 0.3s ease;
    border: 1px solid #f1f5f9;
    animation: fadeIn 0.5s ease-out;
}

.review-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
}

.reviewer-info {
    display: flex;
    align-items: center;
    gap: 14px;
}

.avatar-container {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    background: #f1f5f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reviewer-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.name-date {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.reviewer-name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1e293b;
}

.review-date {
    font-size: 0.8rem;
    color: #64748b;
}

.rating {
    display: flex;
    align-items: center;
    gap: 8px;
}

.stars {
    display: flex;
    font-size: 1.2rem;
}

.star {
    color: #e2e8f0;
    margin-right: 2px;
}

.star.filled {
    color: #fbbf24;
}

.rating-value {
    font-weight: 700;
    font-size: 1.1rem;
    color: #1e293b;
}

.review-body {
    margin-bottom: 18px;
}

.review-comment {
    color: #334155;
    line-height: 1.6;
    font-size: 1rem;
    margin: 0;
}

.review-footer {
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
}

.response-tag {
    font-weight: 600;
    color: #3b82f6;
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.response-text {
    color: #334155;
    margin: 0 0 8px 0;
    font-size: 0.95rem;
    line-height: 1.5;
}

.response-date {
    font-size: 0.8rem;
    color: #64748b;
    text-align: right;
}

.review-actions {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #eff6ff;
    color: #3b82f6;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-button:hover {
    background-color: #3b82f6;
    color: white;
    transform: translateY(-2px);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
    .review-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .rating {
        align-self: flex-end;
    }
}
</style>
