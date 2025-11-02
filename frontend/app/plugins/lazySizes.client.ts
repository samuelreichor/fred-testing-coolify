export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    await import('lazysizes')
  })
})
