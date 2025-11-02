<script setup lang="ts">
import type { CraftEntryTypeBlockImageSlider } from '#shared/types/base'

defineProps<CraftEntryTypeBlockImageSlider>()
</script>

<template>
  <SectionImageSlider
    v-if="singleImages?.length"
    :images="singleImages"
    :show-captions="settingsImageSlider?.showCaption"
    :image-ratio="settingsImageSlider?.imageRatio.value"
  />
</template>
