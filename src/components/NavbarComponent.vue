<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

// props
const props = defineProps({
  activeTheme: {
    type: String,
    default: 'light'
  }
})

// emits
const emit = defineEmits(['changeTheme', 'navbarHeight'])

// data
const theme = ref('light')
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

onMounted(() => {
  theme.value = props.activeTheme

  // get the navbar height
  const navbar = document.querySelector('nav')
  if (navbar) {
    emit('navbarHeight', navbar.offsetHeight)
  }
})
</script>

<template>
  <nav :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg', 'changable-theme']">
    <div class="container-fluid">
      <a class="navbar-brand">
        <img src="@/assets/logo.png" alt="logo" width="34" height="32" />
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
  a:link:hover {
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
