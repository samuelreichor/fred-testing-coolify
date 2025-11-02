import type { RouterConfig } from '@nuxt/schema'
import { useLenis } from 'lenis/vue'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const lenis = useLenis()

    const isSamePath = to.path === from.path
    const hasHash = Boolean(to.hash)
    const hasQuery = Boolean(to.query)

    // restore saved position
    if (savedPosition) {
      if (isSamePath) {
        return savedPosition
      }

      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:transition:finish', () => {
          requestAnimationFrame(() => resolve(savedPosition))
        })
      })
    }

    // with hash on same path
    if (hasHash && isSamePath) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => resolve({ el: to.hash }))
      })
    }

    // with hash on different path
    if (hasHash && !isSamePath) {
      if (lenis.value) lenis.value.stop()

      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:transition:finish', () => {
          requestAnimationFrame(() => {
            lenis.value?.start()
            resolve({ el: to.hash })
          })
        })
      })
    }

    // with query on same page
    if (hasQuery && isSamePath) {
      return null
    }

    // default navigation
    if (lenis.value) lenis.value.stop()

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:transition:finish', () => {
        requestAnimationFrame(() => {
          if (lenis.value) lenis.value.start()
          resolve({ top: 0, left: 0 })
        })
      })
    })
  },
}
