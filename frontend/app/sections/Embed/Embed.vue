<script setup lang="ts">
import type { CraftEntryTypeSettingsEmbedBlock } from '#shared/types/base'
import CookieOverlay from '~/components/CookieConsentOverlay/CookieOverlay.vue'
import { ref, onMounted, nextTick } from 'vue'

declare const Cookiebot: any // eslint-disable-line

defineProps<{
  code: string | null
  settings?: CraftEntryTypeSettingsEmbedBlock | null
}>()

const { theme } = useThemeSwitcher()
const embedContainer = ref<HTMLElement>()

const checkConsent = () => {
  if (typeof window === 'undefined' || typeof Cookiebot === 'undefined') return true
  return Cookiebot.consented && Cookiebot.consent.marketing
}

const hasConsent = ref(true)

const applyAutoplaySettings = async () => {
  await nextTick()

  if (!embedContainer.value) return

  const iframes = embedContainer.value.querySelectorAll('iframe')
  iframes.forEach((iframe) => {
    iframe.setAttribute('allow', 'autoplay')
    iframe.setAttribute('loading', 'lazy')

    const src = iframe.getAttribute('src')
    if (!src) {
      console.error('Iframe does not have an src', iframe)
      return
    }

    const url = new URL(src)

    if (src.includes('youtube.com/embed') || src.includes('youtube-nocookie.com/embed') || src.includes('player.vimeo.com')) {
      url.searchParams.set('autoplay', '1')
      url.searchParams.set('controls', '0')
      url.searchParams.set('mute', '1')
    }

    iframe.setAttribute('src', url.toString())
  })
}

const handleConsentChange = () => {
  hasConsent.value = checkConsent()
  if (hasConsent.value) {
    applyAutoplaySettings()
  }
}

onMounted(() => {
  hasConsent.value = checkConsent()

  if (hasConsent.value) {
    applyAutoplaySettings()
  }

  window.addEventListener('CookiebotOnAccept', handleConsentChange)
  window.addEventListener('CookiebotOnDecline', handleConsentChange)
})
</script>

<template>
  <div
    v-if="code"
    class="container w-full mt-ds-10"
  >
    <div
      :class="[
        'block w-full col-span-full relative',
        settings?.embedWidth?.value === 'threeQuarter' && 'md:col-span-8',
        settings?.embedWidth?.value === 'half' && 'md:col-span-6',
        settings?.embedPosition?.value === 'left' && 'md:col-start-1',
        settings?.embedPosition?.value === 'center' && settings?.embedWidth?.value === 'half' && 'md:col-start-4',
        settings?.embedPosition?.value === 'center' && settings?.embedWidth?.value === 'threeQuarter' && 'md:col-start-3',
        settings?.embedPosition?.value === 'right' && settings?.embedWidth?.value === 'half' && 'md:col-start-7',
        settings?.embedPosition?.value === 'right' && settings?.embedWidth?.value === 'threeQuarter' && 'md:col-start-5',
      ]"
    >
      <div class="relative w-full aspect-[16/9] overflow-hidden">
        <ClientOnly>
          <div
            v-if="hasConsent"
            ref="embedContainer"
            class="absolute inset-0 w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:max-w-full [&_iframe]:border-0"
            v-html="code"
          />
        </ClientOnly>
        <CookieOverlay
          :show="!hasConsent"
          :theme="theme"
        />
      </div>
    </div>
  </div>
</template>
