<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" alt="logo" width="30" height="24" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="(link, index) in links" :key="index" class="nav-item">
            <RouterLink class="nav-link" :to="link.path" active-class="active" exact-active-class="active">{{ link.name }}</RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="button" @click.prevent="changeTheme()">Change Theme</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  props: {
    defaultTheme: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      theme: this.defaultTheme,
      useDarkTheme: false,
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about'}
      ]
    }
  },
  methods: {
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'

      this.$emit('change-theme', this.theme)
    }
  }
}
</script>