<script lang="ts" setup>
import type { CraftEntryTypeBlockImageCover } from '#shared/types/base'

const { imageRatio } = defineProps<CraftEntryTypeBlockImageCover>()
const computedImageRatio = computed(() => imageRatio.value ?? '16:9')
</script>

<template>
  <SectionImageCover
    v-if="singleImage"
    :image="singleImage"
    :show-caption="!!showCaption"
    :image-ratio="computedImageRatio"
    :link="singleLink"
  />
</template>
