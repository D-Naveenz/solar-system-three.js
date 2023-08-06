<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue';

// data
const activetheme = ref('light')
</script>

<template>
  <NavbarComponent @change-theme="(theme: string) => activetheme = theme" />

  <RouterView />

  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Active theme: {{ activetheme }}</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
