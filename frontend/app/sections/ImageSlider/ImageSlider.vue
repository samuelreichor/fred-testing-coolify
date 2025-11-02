<script setup lang="ts">
import type { CraftAsset } from '#shared/types/base'
import type { CraftAssetRatioValue } from '~/components/Image/image-types'

const { showCaptions, imageRatio = '3:4' } = defineProps<{
  images: CraftAsset[] | null
  showCaptions?: boolean | null
  imageRatio?: CraftAssetRatioValue
}>()
</script>

<template>
  <BlossomCarousel
    v-if="images?.length"
    as="ul"
    class="pr-gutter mt-ds-10"
  >
    <li
      v-for="image in images"
      :key="image.metadata.id"
      class="w-col-9 sm:w-col-7 md:w-col-5! pl-gutter"
    >
      <Image
        class=""
        :image="image"
        :show-caption="showCaptions ?? false"
        :transform="imageRatio"
        :draggable="false"
        :animated="false"
      />
    </li>
  </BlossomCarousel>
</template>
