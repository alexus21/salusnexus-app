<template>
  <li class="d-flex align-items-center mt-2 feature-item">
    <span class="material-icons me-1 icon">check_circle</span>
    <span class="text">{{ featureText }}</span>
  </li>
</template>

<script>
export default {
  name: 'SubscriptionFeatureItem',
  props: {
    featureText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.feature-item {
  color: #374151; 
}

.feature-item .icon {
  color: #1d1f1e;
  font-size: 1.4rem; 
}

.feature-item .text {
    line-height: 1.4;
}
</style> 