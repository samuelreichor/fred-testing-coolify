<script setup lang="ts">
import type { CraftEntryTypeBlockRichText } from '#shared/types/base'

defineProps<CraftEntryTypeBlockRichText>()
</script>

<template>
  <SectionText
    v-if="singleRichText"
    :text="singleRichText"
    :animated="isAnimated ?? false"
  />
</template>
