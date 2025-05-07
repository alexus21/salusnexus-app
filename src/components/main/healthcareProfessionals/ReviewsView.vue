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
                
                <div class="filter-controls">
                    <!-- Filtro de estrellas -->
                    <div class="filter-card">
                        <div class="filter-label">Valoración</div>
                        <div class="rating-chips">
                            <div 
                                class="rating-chip" 
                                :class="{ active: ratingFilter === 'all' }"
                                @click="ratingFilter = 'all'"
                            >
                                <span>Todas</span>
                            </div>
                            <div 
                                v-for="rating in [5, 4, 3, 2, 1]" 
                                :key="rating"
                                class="rating-chip" 
                                :class="{ active: ratingFilter === rating.toString() }"
                                @click="ratingFilter = rating.toString()"
                            >
                                <div class="star-rating">
                                    <i v-for="star in rating" :key="star" class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Filtro de ordenamiento -->
                    <div class="filter-card sort-filter">
                        <div class="filter-label">Ordenar por</div>
                        <div class="sort-options">
                            <div 
                                class="sort-option" 
                                :class="{ active: sortOption === 'newest' }"
                                @click="sortOption = 'newest'"
                            >
                                <i class="fas fa-clock"></i>
                                <span>Más recientes</span>
                            </div>
                            <div 
                                class="sort-option" 
                                :class="{ active: sortOption === 'oldest' }"
                                @click="sortOption = 'oldest'"
                            >
                                <i class="fas fa-history"></i>
                                <span>Más antiguas</span>
                            </div>
                            <div 
                                class="sort-option" 
                                :class="{ active: sortOption === 'highest' }"
                                @click="sortOption = 'highest'"
                            >
                                <i class="fas fa-sort-amount-up"></i>
                                <span>Mayor valoración</span>
                            </div>
                            <div 
                                class="sort-option" 
                                :class="{ active: sortOption === 'lowest' }"
                                @click="sortOption = 'lowest'"
                            >
                                <i class="fas fa-sort-amount-down"></i>
                                <span>Menor valoración</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Resumen de filtros aplicados -->
                <div class="active-filters" v-if="ratingFilter !== 'all' || sortOption !== 'newest'">
                    <div class="active-filters-label">Filtros aplicados:</div>
                    <div class="filter-tags">
                        <div class="filter-tag" v-if="ratingFilter !== 'all'">
                            <span v-if="ratingFilter === '1'">1 estrella</span>
                            <span v-else>{{ ratingFilter }} estrellas</span>
                            <button class="remove-filter" @click="ratingFilter = 'all'">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="filter-tag" v-if="sortOption !== 'newest'">
                            <span v-if="sortOption === 'oldest'">Más antiguas primero</span>
                            <span v-else-if="sortOption === 'highest'">Mayor valoración primero</span>
                            <span v-else-if="sortOption === 'lowest'">Menor valoración primero</span>
                            <button class="remove-filter" @click="sortOption = 'newest'">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <button class="clear-all-filters" @click="clearAllFilters">
                        Borrar todos los filtros
                    </button>
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
        },
        
        clearAllFilters() {
            this.ratingFilter = 'all';
            this.sortOption = 'newest';
            this.searchQuery = '';
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

/* Review Filters - Modern UI */
.reviews-filter {
    margin-bottom: 30px;
    animation: fadeIn 0.5s ease;
}

.search-container {
    position: relative;
    max-width: 600px;
    margin-bottom: 20px;
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
    padding: 14px 40px;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    background-color: white;
    color: #1e293b;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
    outline: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
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

.filter-controls {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.filter-card {
    background: white;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 300px;
    transition: all 0.3s ease;
}

.filter-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filter-label {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 12px;
}

/* Chips de valoración */
.rating-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.rating-chip {
    padding: 8px 14px;
    border-radius: 50px;
    background-color: #f8fafc;
    color: #64748b;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rating-chip:hover {
    background-color: #f1f5f9;
    transform: translateY(-2px);
}

.rating-chip.active {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.star-rating {
    display: flex;
    gap: 2px;
    color: #fbbf24;
}

/* Opciones de ordenamiento */
.sort-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.sort-option {
    padding: 10px;
    border-radius: 10px;
    background-color: #f8fafc;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
}

.sort-option:hover {
    background-color: #f1f5f9;
    transform: translateY(-2px);
}

.sort-option.active {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

/* Filtros activos */
.active-filters {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 16px;
    background-color: #f0f9ff;
    border-radius: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.active-filters-label {
    color: #0284c7;
    font-weight: 500;
    font-size: 0.9rem;
}

.filter-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background-color: white;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #334155;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.remove-filter {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f5f9;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 0.7rem;
    transition: all 0.2s ease;
}

.remove-filter:hover {
    background-color: #e2e8f0;
    color: #334155;
}

.clear-all-filters {
    padding: 6px 12px;
    background-color: transparent;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    color: #64748b;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.clear-all-filters:hover {
    background-color: #f1f5f9;
    color: #334155;
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

/* Responsive Design */
@media (max-width: 768px) {
    .filter-controls {
        flex-direction: column;
    }
    
    .filter-card {
        width: 100%;
    }
    
    .sort-options {
        grid-template-columns: 1fr;
    }
    
    .active-filters {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .filter-tags {
        width: 100%;
    }
    
    .clear-all-filters {
        align-self: flex-end;
    }
}

@media (max-width: 576px) {
    .rating-chips {
        justify-content: center;
    }
}
</style>
