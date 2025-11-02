<script lang="ts" setup>
import type { CraftAssetRatioValue } from '~/components/Image/image-types'
import NuxtLink from '#app/components/nuxt-link'

defineProps<{
  image: CraftAsset
  showCaption: boolean
  imageRatio: CraftAssetRatioValue
  link?: CraftLinkIt | null
}>()
</script>

<template>
  <div class="outside-container mt-ds-10">
    <component
      :is="link ? NuxtLink : 'div'"
      :to="link?.path"
      :target="link?.target"
    >
      <Image
        :image="image"
        :show-caption="showCaption"
        :transform="imageRatio"
      />
    </component>
  </div>
</template>
