<template>
    <div class="reviews-main-container">
        <div class="reviews-header">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div>
                    <h1>Reseñas y Valoraciones</h1>
                    <p class="subtitle">Gestiona los comentarios y valoraciones de tus pacientes</p>
                </div>
            </div>
            
            <div class="rating-summary">
                <div class="average-rating">
                    <div class="rating-number">{{ averageRating.toFixed(1) }}</div>
                    <div class="rating-stars">
                        <div class="stars-container">
                            <div v-for="n in 5" :key="n" class="star-wrapper">
                                <i class="fas fa-star" :class="{ filled: n <= Math.round(averageRating) }"></i>
                            </div>
                        </div>
                        <div class="rating-label">{{ totalReviews }} Valoraciones</div>
                    </div>
                </div>
                
                <div class="rating-bars">
                    <div v-for="n in 5" :key="n" class="rating-bar-item">
                        <div class="rating-label">{{ 6-n }}</div>
                        <div class="rating-bar-container">
                            <div class="rating-bar" :style="{ width: getPercentageForRating(6-n) + '%' }"></div>
                        </div>
                        <div class="rating-count">{{ getCountForRating(6-n) }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Loading state -->
        <div class="loader-container" v-if="isLoading">
            <div class="loader"></div>
            <p>Cargando reseñas...</p>
        </div>
        
        <!-- Error state -->
        <div class="error-container" v-else-if="errorMessage">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Ocurrió un error</h3>
            <p>{{ errorMessage }}</p>
            <button class="retry-button" @click="fetchReviews">
                <i class="fas fa-redo"></i> Reintentar
            </button>
        </div>
        
        <!-- Empty state -->
        <div class="empty-state" v-else-if="reviews.length === 0">
            <div class="empty-illustration">
                <i class="fas fa-comment-slash empty-icon"></i>
            </div>
            <h3>No hay reseñas disponibles</h3>
            <p>Aún no tienes reseñas de tus pacientes. Las reseñas aparecerán aquí cuando tus pacientes califiquen tus servicios.</p>
        </div>
        
        <!-- Content -->
        <div v-else>
            <div class="reviews-filter">
                <div class="search-container">
                    <i class="fas fa-search search-icon"></i>
                    <input 
                        type="text" 
                        placeholder="Buscar en las reseñas..." 
                        v-model="searchQuery"
                        class="search-input"
                    />
                    <button class="clear-search" v-if="searchQuery" @click="searchQuery = ''">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="filter-options">
                    <select v-model="ratingFilter" class="filter-select">
                        <option value="all">Todas las valoraciones</option>
                        <option value="5">5 estrellas</option>
                        <option value="4">4 estrellas</option>
                        <option value="3">3 estrellas</option>
                        <option value="2">2 estrellas</option>
                        <option value="1">1 estrella</option>
                    </select>
                    
                    <select v-model="sortOption" class="filter-select">
                        <option value="newest">Más recientes primero</option>
                        <option value="oldest">Más antiguas primero</option>
                        <option value="highest">Mayor valoración primero</option>
                        <option value="lowest">Menor valoración primero</option>
                    </select>
                </div>
            </div>
            
            <div class="reviews-list">
                <ReviewCard 
                    v-for="review in filteredReviews" 
                    :key="review.id" 
                    :review="review"
                    @respond="openResponseModal"
                />
            </div>
        </div>
        
        <!-- Response Modal -->
        <div v-if="showResponseModal" class="modal-overlay" @click="closeResponseModal">
            <div class="modal-container" @click.stop>
                <div class="modal-header">
                    <h3>Responder a la reseña</h3>
                    <button class="close-button" @click="closeResponseModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="review-summary">
                        <div class="review-summary-stars">
                            <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= selectedReview.rating }">★</span>
                            <span class="rating-value">{{ selectedReview.rating }}</span>
                        </div>
                        <div class="reviewer-name">{{ selectedReview.patient_first_name }} {{ selectedReview.patient_last_name }}</div>
                        <p class="review-summary-comment">{{ selectedReview.comment || 'No se dejó ningún comentario.' }}</p>
                    </div>
                    
                    <div class="response-form">
                        <label for="responseText">Tu respuesta:</label>
                        <textarea 
                            id="responseText"
                            v-model="responseText"
                            placeholder="Escribe tu respuesta a esta reseña..."
                            class="response-textarea"
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="cancel-button" @click="closeResponseModal">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="submit-button" @click="submitResponse" :disabled="!responseText.trim()">
                        <i class="fas fa-paper-plane"></i> Enviar respuesta
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewCard from './ReviewCard.vue';
import Swal from 'sweetalert2';

export default {
    name: 'ReviewsView',
    components: {
        ReviewCard
    },
    data() {
        return {
            reviews: [],
            isLoading: true,
            errorMessage: '',
            searchQuery: '',
            ratingFilter: 'all',
            sortOption: 'newest',
            showResponseModal: false,
            selectedReview: null,
            responseText: ''
        };
    },
    computed: {
        totalReviews() {
            return this.reviews.length;
        },
        
        averageRating() {
            if (!this.reviews.length) return 0;
            const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
            return sum / this.reviews.length;
        },
        
        filteredReviews() {
            let result = [...this.reviews];
            
            // Apply rating filter
            if (this.ratingFilter !== 'all') {
                const rating = parseInt(this.ratingFilter);
                result = result.filter(review => review.rating === rating);
            }
            
            // Apply search filter
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(review => {
                    const fullName = `${review.patient_first_name} ${review.patient_last_name}`.toLowerCase();
                    const comment = (review.comment || '').toLowerCase();
                    
                    return fullName.includes(query) || comment.includes(query);
                });
            }
            
            // Apply sorting
            switch (this.sortOption) {
                case 'newest':
                    result.sort((a, b) => new Date(b.review_datetime) - new Date(a.review_datetime));
                    break;
                case 'oldest':
                    result.sort((a, b) => new Date(a.review_datetime) - new Date(b.review_datetime));
                    break;
                case 'highest':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case 'lowest':
                    result.sort((a, b) => a.rating - b.rating);
                    break;
            }
            
            return result;
        }
    },
    mounted() {
        this.fetchReviews();
    },
    methods: {
        async fetchReviews() {
            this.isLoading = true;
            this.errorMessage = '';
            
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.errorMessage = 'No se encontró token de autenticación';
                    this.isLoading = false;
                    return;
                }
                
                // Get clinic ID from localStorage
                const clinicsData = localStorage.getItem('clinics');
                if (!clinicsData) {
                    this.errorMessage = 'No se encontró información de clínica';
                    this.isLoading = false;
                    return;
                }
                
                const clinics = JSON.parse(clinicsData);
                const clinicId = clinics.clinic_id;
                
                if (!clinicId) {
                    this.errorMessage = 'No se encontró ID de clínica válido';
                    this.isLoading = false;
                    return;
                }
                
                const API_URL = process.env.VUE_APP_API_URL;
                const response = await fetch(`${API_URL}/reviews/get/by-clinic/${clinicId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (!data.data) {
                    this.reviews = [];
                } else {
                    this.reviews = data.data;
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                this.errorMessage = error.message || 'Ocurrió un error al cargar las reseñas';
            } finally {
                this.isLoading = false;
            }
        },
        
        getCountForRating(rating) {
            return this.reviews.filter(review => review.rating === rating).length;
        },
        
        getPercentageForRating(rating) {
            if (this.reviews.length === 0) return 0;
            return (this.getCountForRating(rating) / this.reviews.length) * 100;
        },
        
        openResponseModal(review) {
            this.selectedReview = review;
            this.responseText = '';
            this.showResponseModal = true;
        },
        
        closeResponseModal() {
            this.showResponseModal = false;
            this.selectedReview = null;
            this.responseText = '';
        },
        
        async submitResponse() {
            if (!this.responseText.trim() || !this.selectedReview) return;
            
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No se encontró token de autenticación');
                }
                
                const API_URL = process.env.VUE_APP_API_URL;
                const response = await fetch(`${API_URL}/reviews/respond/${this.selectedReview.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        professional_response: this.responseText
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`Error al enviar respuesta: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Respuesta enviada',
                        text: 'Tu respuesta ha sido publicada correctamente',
                        confirmButtonText: 'Aceptar'
                    });
                    
                    // Update the review in the local array
                    const reviewIndex = this.reviews.findIndex(r => r.id === this.selectedReview.id);
                    if (reviewIndex !== -1) {
                        this.reviews[reviewIndex].professional_response = this.responseText;
                        this.reviews[reviewIndex].response_datetime = new Date().toISOString();
                    }
                    
                    this.closeResponseModal();
                } else {
                    throw new Error(data.message || 'Error al enviar la respuesta');
                }
            } catch (error) {
                console.error('Error submitting response:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Ocurrió un error al enviar la respuesta',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    }
};
</script>

<style scoped>
.reviews-main-container {
    width: 85%;
    margin: 0 auto;
    padding: 30px;
    background-color: #f8fafc;
    min-height: 100vh;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.reviews-header {
    margin-bottom: 30px;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
}

.header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    border-radius: 12px;
    color: white;
    font-size: 1.3rem;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
}

h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    margin-bottom: 5px;
}

.subtitle {
    color: #64748b;
    margin: 0;
    font-size: 1rem;
}

.rating-summary {
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    gap: 40px;
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.average-rating {
    display: flex;
    align-items: center;
    gap: 20px;
}

.rating-number {
    font-size: 4rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
}

.rating-stars {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.stars-container {
    display: flex;
    gap: 4px;
}

.star-wrapper {
    font-size: 1.5rem;
    color: #e2e8f0;
}

.star-wrapper i.filled {
    color: #fbbf24;
}

.rating-label {
    color: #64748b;
    font-size: 0.9rem;
}

.rating-bars {
    flex: 1;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.rating-bar-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.rating-bar-container {
    flex: 1;
    height: 8px;
    background-color: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.rating-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
    border-radius: 4px;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.rating-count {
    min-width: 30px;
    text-align: right;
    color: #64748b;
    font-size: 0.9rem;
}

/* Loading, Error, and Empty States */
.loader-container, .error-container, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
}

.loader {
    border: 4px solid #f3f4f6;
    border-radius: 50%;
    border-top: 4px solid #f59e0b;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader-container p {
    color: #64748b;
}

.error-icon, .empty-illustration {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 40px;
    color: #ef4444;
}

.empty-illustration {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    color: #f59e0b;
}

.error-container h3, .empty-state h3 {
    font-size: 1.3rem;
    color: #1e293b;
    margin-bottom: 10px;
}

.error-container p, .empty-state p {
    color: #64748b;
    max-width: 80%;
    margin-bottom: 20px;
}

.retry-button {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.retry-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
}

/* Review Filters */
.reviews-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    gap: 16px;
    flex-wrap: wrap;
}

.search-container {
    position: relative;
    flex: 1;
    max-width: 400px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 1rem;
}

.search-input {
    width: 100%;
    padding: 12px 40px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.15);
}

.clear-search {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: #f1f5f9;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.7rem;
}

.clear-search:hover {
    background: #e2e8f0;
    color: #334155;
}

.filter-options {
    display: flex;
    gap: 12px;
}

.filter-select {
    padding: 10px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background-color: white;
    color: #334155;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.filter-select:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.15);
}

/* Reviews List */
.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
}

.modal-container {
    background-color: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: slideUp 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #1e293b;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-button:hover {
    background-color: #f1f5f9;
    color: #1e293b;
}

.modal-body {
    padding: 20px;
}

.review-summary {
    background-color: #f8fafc;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
}

.review-summary-stars {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}

.review-summary-stars .star {
    color: #e2e8f0;
    font-size: 1.2rem;
}

.review-summary-stars .star.filled {
    color: #fbbf24;
}

.rating-value {
    font-weight: 600;
    color: #1e293b;
}

.reviewer-name {
    font-weight: 600;
    color: #334155;
    margin-bottom: 8px;
}

.review-summary-comment {
    color: #475569;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
}

.response-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #334155;
}

.response-textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    resize: vertical;
    transition: all 0.3s ease;
}

.response-textarea:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.15);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px;
    border-top: 1px solid #e2e8f0;
    background-color: #f8fafc;
    border-radius: 0 0 16px 16px;
}

.cancel-button, .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cancel-button {
    background-color: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
}

.cancel-button:hover {
    background-color: #f1f5f9;
    color: #475569;
}

.submit-button {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: white;
    border: none;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
}

.submit-button:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

/* Responsive Styles */
@media (max-width: 992px) {
    .rating-summary {
        flex-direction: column;
        gap: 30px;
    }
    
    .average-rating {
        margin: 0 auto;
    }
    
    .rating-bars {
        max-width: none;
    }
}

@media (max-width: 768px) {
    .reviews-main-container {
        width: 95%;
        padding: 20px 15px;
    }
    
    .reviews-filter {
        flex-direction: column;
        align-items: stretch;
    }
    
    .search-container {
        max-width: none;
    }
    
    .filter-options {
        flex-wrap: wrap;
    }
    
    .filter-select {
        flex: 1;
        min-width: 120px;
    }
}

@media (max-width: 576px) {
    .rating-summary {
        padding: 16px;
    }
    
    .average-rating {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
    
    .rating-number {
        font-size: 3rem;
    }
    
    .modal-container {
        width: 95%;
    }
}
</style>
