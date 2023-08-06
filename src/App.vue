<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { setStyle, useMedia } from '@/utils/theme'

import NavbarComponent from '@/components/NavbarComponent.vue'

// data
const activeTheme = ref(useMedia('(prefers-color-scheme: dark)').value? 'dark' : 'light')

// watcher
watch(activeTheme, (theme) => {
  setStyle(document.documentElement, themeProps(theme))
})

// methods
function themeProps(theme: string) {
  let colorName = theme === 'light' ? 'white' : 'black'
  let lightName = theme

  return {
    '--color-background': `var(--vt-c-${colorName})`,
    '--color-background-soft': `var(--vt-c-${colorName}-soft)`,
    '--color-background-mute': `var(--vt-c-${colorName}-mute)`,
    '--color-border': `var(--vt-c-divider-${lightName}-2)`,
    '--color-border-hover': `var(--vt-c-divider-${lightName}-1)`,
    '--color-heading': `var(--vt-c-text-${lightName}-1)`,
    '--color-text': `var(--vt-c-text-${lightName}-2)`
  }
}

onMounted(() => {
  // set initial theme according to user's preference
  setStyle(document.documentElement, themeProps(activeTheme.value))
})
</script>

<template>
  <NavbarComponent
    :active-theme="activeTheme"
    @change-theme="(theme: string) => (activeTheme = theme)"
  />

  <RouterView />
</template>
