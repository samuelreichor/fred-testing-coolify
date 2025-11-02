<script setup lang="ts">
import type { CraftEntryTypeBlockImageGrid } from '#shared/types/base'

defineProps<CraftEntryTypeBlockImageGrid>()
</script>

<template>
  <SectionImageGrid
    v-if="singleImages?.length"
    :images="singleImages"
    :settings="settingsImageGrid"
  />
</template>
