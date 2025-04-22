<template>
    <div class="reviews-main-bg">
        <div class="reviews-content">
            <div class="reviews-header">
                <div>
                    <h2>Reseñas de pacientes</h2>
                    <p class="subtitle">Comentarios y valoraciones recibidas en tu consultorio</p>
                </div>
                <div class="reviews-metrics">
                    <div class="metric">
                        <div class="metric-title">Total Reseñas</div>
                        <div class="metric-value">{{ totalReviews }}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-title">Promedio</div>
                        <div class="metric-value">
                            <span>{{ averageRating.toFixed(1) }}</span>
                            <span class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= Math.round(averageRating) }">★</span>
              </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reviews-list">
                <ReviewCard v-for="review in reviews" :key="review.id" :review="review"/>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewCard from './ReviewCard.vue';

export default {
    name: 'ReviewsView',
    components: {ReviewCard},
    data() {
        return {
            reviews: [
                {
                    id: 1,
                    name: 'Carlos Rodríguez',
                    age: 45,
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    rating: 5,
                    comment: 'Excelente atención, resolvió todas mis dudas y el consultorio está muy limpio.',
                    date: '12-04-2025'
                },
                {
                    id: 2,
                    name: 'Ana Martínez',
                    age: 62,
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    rating: 4,
                    comment: 'Muy profesional y puntual, lo recomiendo.',
                    date: '10-04-2025'
                },
                {
                    id: 3,
                    name: 'Luis Sánchez',
                    age: 53,
                    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
                    rating: 5,
                    comment: 'Me sentí cómodo durante toda la consulta. Volveré.',
                    date: '05-04-2025'
                },
                {
                    id: 4,
                    name: 'Elena Gómez',
                    age: 58,
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    rating: 3,
                    comment: 'La consulta fue buena, pero la espera fue un poco larga.',
                    date: '01-04-2025'
                },
                {
                    id: 5,
                    name: 'Ana Rodríguez',
                    age: 45,
                    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
                    rating: 5,
                    comment: 'Excelente atención, resolvió todas mis dudas y el consultorio está muy limpio.',
                    date: '12-04-2025'
                },
                {
                    id: 6,
                    name: 'Luisa Rodríguez',
                    age: 45,
                    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
                    rating: 5,
                    comment: 'Excelente atención, resolvió todas mis dudas y el consultorio está muy limpio.',
                    date: '12-04-2025'
                },
                {
                    id: 7,
                    name: 'Oliver Twist',
                    age: 45,
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    rating: 5,
                    comment: 'Excelente atención, resolvió todas mis dudas y el consultorio está muy limpio.',
                    date: '12-04-2025'
                }
            ]
        }
    },
    computed: {
        totalReviews() {
            return this.reviews.length;
        },
        averageRating() {
            if (!this.reviews.length) return 0;
            return this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
        }
    }
}
</script>

<style scoped>
.reviews-main-bg {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f4f8ff 0%, #eaf2fb 100%);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    overflow-x: hidden;
}

.reviews-content {
    width: 100%;
    max-width: 1050px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 32px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 32px 0 rgba(30, 34, 90, 0.07);
    padding: 36px 32px 32px 32px;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.reviews-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
    gap: 32px;
}

@media (min-width: 700px) {
    .reviews-header {
        align-items: flex-start;
    }
}


.reviews-header h2 {
    color: #292c6d;
    font-size: 2.1em;
    font-weight: 800;
    margin-bottom: 4px;
    letter-spacing: -1px;
}

.subtitle {
    color: #4a5a88;
    font-size: 1.12em;
    margin-bottom: 0;
}

.reviews-metrics {
    display: flex;
    flex: 1 1 420px;
    min-width: 350px;
    max-width: 500px;
    gap: 32px;
    align-items: flex-end;
    justify-content: flex-end;
    background: #f4f8ff;
    border-radius: 18px;
    box-shadow: 0 1px 8px 0 rgba(30, 34, 90, 0.04);
    padding: 18px 38px;
    margin: 0 auto;
}

@media (max-width: 1100px) {
    .reviews-metrics {
        display: inline-flex;
        width: auto;
        min-width: 0;
        max-width: 100%;
        padding: 12px 14px;
        gap: 16px;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
}

@media (max-width: 700px) {
    .reviews-metrics {
        flex-direction: column;
        width: 100%;
        min-width: 0;
        max-width: 100vw;
        padding: 10px 0;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 12px;
        box-shadow: none;
        gap: 8px;
        background: #f4f8ff;
    }
}

@media (max-width: 900px) {
    .reviews-metrics {
        flex: 1 1 100%;
        min-width: 0;
        max-width: 100vw;
        padding: 14px 10px;
        gap: 12px;
        justify-content: flex-start;
    }
}

@media (max-width: 700px) {
    .reviews-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    .reviews-metrics {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 0;
        max-width: 100vw;
        padding: 10px 0;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 12px;
        box-shadow: none;
        gap: 8px;
    }

    .metric {
        padding: 0 8px;
        min-width: 90px;
    }

    .metric-value {
        font-size: 1.3em;
        gap: 6px;
    }

    .stars {
        font-size: 1.1em;
        margin-left: 4px;
    }
}

.metric {
    background: transparent;
    border-radius: 14px;
    padding: 0 18px;
    min-width: 130px;
    text-align: center;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.metric-title {
    color: #7d8fb3;
    font-size: 1.09em;
    margin-bottom: 5px;
    font-weight: 500;
}

.metric-value {
    color: #292c6d;
    font-size: 2em;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.stars {
    margin-left: 8px;
    font-size: 1.25em;
}

.metric-title {
    color: #7d8fb3;
    font-size: 1em;
    margin-bottom: 6px;
    font-weight: 500;
}

.metric-value {
    color: #292c6d;
    font-size: 1.7em;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.stars {
    margin-left: 8px;
    font-size: 1.12em;
}

.star {
    color: #e6e9f4;
}

.star.filled {
    color: #ffc107;
}

.reviews-list {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

@media (max-width: 1100px) {
    .reviews-content {
        max-width: 100%;
        padding: 18px 1vw 18px 1vw;
    }

    .reviews-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
    }

    .reviews-metrics {
        gap: 14px;
    }
}

@media (max-width: 700px) {
    .reviews-content {
        width: 100%;
        padding: 12px 0.5vw 12px 0.5vw;
        border-radius: 0;
        min-height: 100vh;
        box-shadow: none;
    }

    .reviews-header h2 {
        font-size: 1.4em;
    }

    .metric {
        padding: 10px 10px;
        min-width: 80px;
        font-size: 0.9em;
    }

    .reviews-header {
        gap: 10px;
    }
}
</style>
