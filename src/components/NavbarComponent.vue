<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

// props
const props = defineProps({
  defaultTheme: {
    type: String,
    default: 'light'
  }
})

// emits
const emit = defineEmits(['changeTheme'])

// data
const theme = ref(props.defaultTheme)
const links = ref([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' }
])

// computed properties
const buttonIcon = computed(() => {
  return theme.value === 'light' ? 'fa-sun' : 'fa-moon'
})

// methods
function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'

  emit('changeTheme', theme.value)
}
</script>

<template>
  <nav :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg', 'changable-theme']">
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
            <RouterLink
              class="nav-link"
              :to="link.path"
              active-class="active"
              exact-active-class="active"
              >{{ link.name }}</RouterLink
            >
          </li>
        </ul>
        <form class="d-flex">
          <button
            class="btn btn-outline-primary btn-box"
            type="button"
            title="Change Theme"
            @click.prevent="changeTheme()"
          >
            <i class="fa-solid" :class="buttonIcon"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.btn-box {
  i {
    width: 1rem;
    height: 1rem;
  }
}
</style>
