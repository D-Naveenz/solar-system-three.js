<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue';
</script>

<template>
  <NavbarComponent :change-theme="(theme: string) => activetheme = theme" />

  <RouterView />

  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Active theme: {{ activetheme }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      activetheme: 'light',
    }
  },
}
</script>

<style scoped>
</style>
