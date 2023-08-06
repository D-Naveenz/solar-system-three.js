<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String,
    default: 'light'
  }
})
</script>

<template>
  <div class="container-fluid about" :class="[`theme-${props.theme}`]">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
