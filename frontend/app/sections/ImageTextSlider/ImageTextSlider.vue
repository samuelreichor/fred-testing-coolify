<script setup lang="ts">
import type { ImageTextSliderCard } from '~/components/ImageTextSlider/ImageTextSlider.vue'

defineProps<{
  cards: ImageTextSliderCard[]
  headline?: string
  reducedSpace?: boolean
}>()
</script>

<template>
  <div
    v-if="cards"
    :class="reducedSpace ? 'mt-ds-10' : 'mt-ds-40'"
  >
    <Headline
      v-if="headline"
      class="mb-gutter outside-container"
    >
      {{ headline }}
    </Headline>
    <ImageTextSlider :cards="cards" />
  </div>
</template>
