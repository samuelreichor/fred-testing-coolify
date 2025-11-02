import { BlossomCarousel } from '@blossom-carousel/vue'
import '@blossom-carousel/core/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('BlossomCarousel', BlossomCarousel)
})
