<script setup lang="ts">
import type { Theme } from '~/types/base'

declare const Cookiebot: any // eslint-disable-line

const { theme = 'light' } = defineProps<{
  show: boolean
  theme?: Theme
}>()

const openCookieSettings = () => {
  Cookiebot?.show()
}

const acceptAllCookies = () => {
  Cookiebot?.submitCustomConsent(true, true, true)
}
</script>

<template>
  <div
    v-if="show"
    class="cookieOverlay @container absolute w-full h-full flex items-center justify-center z-10"
  >
    <div
      class="bg-foreground text-background h-full w-full p-ds-4 md:p-ds-8 lg:p-ds-12 flex flex-col"
      :data-theme="theme"
    >
      <div class="flex flex-col md:flex-row flex-wrap gap-ds-2 md:gap-ds-4 items-start">
        <span>
          Wir nutzen Cookies.
        </span>

        <LinkButtonBase
          as="button"
          class="cursor-pointer whitespace-nowrap"
          :theme="theme === 'dark' ? 'light' : 'dark'"
          @click="openCookieSettings"
        >
          Änder das.
        </LinkButtonBase>
        <LinkButtonBase
          as="button"
          class="cursor-pointer whitespace-nowrap"
          :theme="theme === 'dark' ? 'light' : 'dark'"
          @click="acceptAllCookies"
        >
          Oder Akzeptiers.
        </LinkButtonBase>
      </div>

      <div class="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <Icon
          name="smiley"
          class="w-16 h-16 @md:w-24 @md:h-24 @lg:w-32 @lg:h-32"
        />
      </div>
    </div>
  </div>
</template>
