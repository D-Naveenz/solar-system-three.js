<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue';

// data
const activeTheme = ref('light')

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
    '--color-text': `var(--vt-c-text-${lightName}-2)`,
  }
}

function setStyle(elment: HTMLElement, css: string | { [key: string]: string }) {
  if (css instanceof String) {
    // split the css string into an array of properties
    var properties = css.split(/[;\n]/gm).filter((v) => v !== '')
    // split each property into an array of [property, value]
    var propArray = properties.map((v) => v.split(/[:\s]/gm).filter((v) => v !== ''))
    // set the style
    propArray.forEach((v) => elment.style.setProperty(v[0], v[1]))
  }
  else {
    // set the style
    Object.keys(css).forEach((key) => {
      elment.style.setProperty(key, css[key])
    })
  }
}
</script>

<template>
  <NavbarComponent @change-theme="(theme: string) => (activeTheme = theme)" />

  <RouterView />
</template>
