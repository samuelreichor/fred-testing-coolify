<script setup lang="ts">
import { useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

const { images, interval = 250 } = defineProps<{
  images?: CraftAsset[]
  interval?: number
}>()

const imagesIndex = shallowRef(0)
const imagesRef = useTemplateRef('images')

const preferredMotion = usePreferredReducedMotion()

const { pause, resume } = useIntervalFn(() => {
  imagesIndex.value = (imagesIndex.value + 1) % (imagesRef.value?.length || 0)
}, interval, {
  immediate: false,
  immediateCallback: true,
})

const hasMotion = computed(() => {
  return preferredMotion.value !== 'reduce'
})
</script>

<template>
  <span class="relative flex flex-row items-center">
    <span
      class="peer grid w-full overflow-hidden"
      @mouseenter="hasMotion ? resume() : null"
      @mouseleave="hasMotion ? pause() : null"
    >
      <Image
        v-for="(image, index) in images"
        ref="images"
        :key="image.url"
        :class="['row-start-1 row-end-1 col-start-1 col-end-1', imagesIndex === index ? 'visible' : 'invisible']"
        :image="image"
        :animated="false"
        transform="16:9"
        :lazy="index!==0"
      />
    </span>

    <span class="absolute z-1 left-[calc(100%+0.2em)] w-[calc(100vw-200px)] max-w-150 hidden pointer-events-none touch-none peer-hover:block">
      <span class="grid w-full overflow-hidden">
        <Image
          v-for="(image, index) in images"
          :key="image.url"
          :class="['row-start-1 row-end-1 col-start-1 col-end-1', imagesIndex === index ? 'visible' : 'invisible']"
          :image="image"
          :animated="false"
          transform="16:9"
        />
      </span>
    </span>
  </span>
</template>
