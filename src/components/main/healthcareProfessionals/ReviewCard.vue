<template>
    <div class="review-card">
        <div class="review-profile">
            <img :src="review.avatar" alt="Foto de perfil" class="avatar"/>
            <div class="profile-info">
                <span class="author-name">{{ review.name }}</span>
                <span class="badge-age">{{ review.age }} años</span>
            </div>
        </div>
        <div class="review-content">
            <div class="review-rating">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
            </div>
            <div class="review-bubble">
                <i class="fas fa-quote-left quote-icon"></i>
                <span class="review-comment">{{ review.comment }}</span>
            </div>
            <div class="review-date">
                {{ review.date }}
            </div>
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
    }
}
</script>

<style scoped>
.review-card {
    display: flex;
    align-items: flex-start;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 10px 0 rgba(30, 34, 90, 0.06);
    padding: 22px 28px;
    margin-bottom: 18px;
    transition: box-shadow 0.2s;
    gap: 32px;
    min-height: 120px;
    width: 100%;
}

.review-card:hover {
    box-shadow: 0 4px 18px 0 rgba(30, 34, 90, 0.10);
}

.review-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 110px;
    gap: 8px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid #e6e9f4;
    margin-bottom: 2px;
    background: #f4f8ff;
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.author-name {
    color: #23255d;
    font-weight: 700;
    font-size: 1.08em;
    margin-bottom: 0.5px;
    text-align: center;
}

.badge-age {
    background: #eaf2fb;
    color: #4a5a88;
    font-size: 0.92em;
    border-radius: 8px;
    padding: 2px 10px;
    margin-top: 2px;
    font-weight: 500;
    display: inline-block;
}

.review-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
}

.review-rating {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.18em;
    color: #ffc107;
    font-weight: 600;
    letter-spacing: 1px;
}

.star {
    color: #e6e9f4;
    font-size: 1.25em;
    margin-left: 1px;
}

.star.filled {
    color: #ffc107;
}

.review-bubble {
    background: #f4f8ff;
    border-radius: 14px;
    padding: 18px 24px 18px 38px;
    font-size: 1.08em;
    color: #23255d;
    font-weight: 500;
    box-shadow: 0 1px 4px 0 rgba(30, 34, 90, 0.04);
    position: relative;
    min-height: 44px;
    display: flex;
    align-items: center;
}

.quote-icon {
    position: absolute;
    left: 14px;
    top: 18px;
    color: #b3c2e6;
    font-size: 1.1em;
    opacity: 0.7;
}

.review-comment {
    display: inline-block;
    word-break: break-word;
}

.review-date {
    color: #a3aac2;
    font-size: 0.97em;
    text-align: right;
    margin-top: 8px;
    margin-right: 8px;
}

@media (max-width: 700px) {
    .review-card {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        padding: 16px 8px;
    }

    .review-profile {
        flex-direction: row;
        align-items: center;
        min-width: 0;
        gap: 12px;
        margin-bottom: 0;
    }

    .profile-info {
        align-items: flex-start;
    }

    .review-content {
        gap: 5px;
    }

    .review-bubble {
        padding: 12px 12px 12px 32px;
        font-size: 1em;
    }

    .quote-icon {
        left: 8px;
        top: 12px;
        font-size: 1em;
    }

    .review-rating {
        position: static;
        margin-bottom: 6px;
        text-align: left;
    }
}
</style>
