import { ref, watchEffect } from 'vue'

function setStyle(elment: HTMLElement, css: string | { [key: string]: string }) {
  if (css instanceof String) {
    // split the css string into an array of properties
    const properties = css.split(/[;\n]/gm).filter((v) => v !== '')
    // split each property into an array of [property, value]
    const propArray = properties.map((v) => v.split(/[:\s]/gm).filter((v) => v !== ''))
    // set the style
    propArray.forEach((v) => elment.style.setProperty(v[0], v[1]))
  } else {
    // set the style
    Object.keys(css).forEach((key) => {
      elment.style.setProperty(key, css[key])
    })
  }
}

const useMedia = (query: string, callback?: (e: MediaQueryListEvent) => void) => {
  const matches = ref(true)

  watchEffect((onInvalidate) => {
    const media = window.matchMedia(query)
    let callbackFunc: (e: MediaQueryListEvent) => void

    if (media.matches !== matches.value) {
      matches.value = media.matches
    }

    const onChange = () => {
      matches.value = media.matches
    }

    if (callback) {
      callbackFunc = callback
    }
    else {
      callbackFunc = onChange
    }

    media.addEventListener('change', callbackFunc)

    onInvalidate(() => {
      media.removeEventListener('change', callbackFunc)
    })
  })

  return matches
}

export { setStyle, useMedia }
