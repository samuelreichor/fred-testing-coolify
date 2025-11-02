<script setup lang="ts">
import type { ComponentPublicInstance, DefineComponent } from 'vue'
import NuxtLink from '#app/components/nuxt-link'
import { throttle } from '~/utils/helper'
import type { Theme } from '~/types/base'

const { as = NuxtLink, theme, mobileHover = true } = defineProps<{
  as?: string | DefineComponent
  theme?: Theme
  mobileHover?: boolean
}>()

const { theme: globalTheme } = useThemeSwitcher()
const computedTheme = computed(() => !theme ? globalTheme.value : theme)

const buttonBase = useTemplateRef<ComponentPublicInstance | HTMLElement>('buttonBase')
const lineAmount = ref(1)

function getElement(): HTMLElement | undefined {
  if (!buttonBase.value) return undefined
  if ('$el' in buttonBase.value) {
    return buttonBase.value.$el as HTMLElement
  }
  return buttonBase.value as HTMLElement
}

function computeLineAmount() {
  const el = getElement()
  if (!el) return 1
  const h = Math.round(el.getBoundingClientRect().height)

  return (h / (60)) > 1 ? 2 : 1
}

function setLineAmount() {
  lineAmount.value = computeLineAmount()
}

const onResize = throttle(() => {
  setLineAmount()
}, 200)

onMounted(() => {
  setLineAmount()
  const el = getElement()
  if (el) {
    el.setAttribute('data-theme', computedTheme.value)
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

const dataVariant = computed(() => Math.floor(Math.random() * 5))

watch(computedTheme, (e) => {
  const el = getElement()
  if (el) {
    el.setAttribute('data-theme', e)
  }
})
</script>

<template>
  <component
    :is="as"
    ref="buttonBase"
    class="c-linkButtonBase"
    :data-variant="dataVariant"
    :data-lines="lineAmount"
    :data-mobile-hover="mobileHover"
  >
    <slot />
  </component>
</template>
