<script setup lang="ts">
import type { CraftEntryTypeBlockImageDouble, CraftOptionColumns, CraftOptionImageRatio } from '#shared/types/base'

const { settingsImageDouble } = defineProps<CraftEntryTypeBlockImageDouble>()
const splitOrientation = computed(() => settingsImageDouble?.columnRatio?.value === 'smallLarge' ? true : false)
</script>

<template>
  <SectionImageGrid
    :images="singleImageDouble"
    :settings="{
      showCaption: false,
      layoutImageGrid: true,
      columns: {
        value: '2',
      } as CraftOptionColumns,
      splitOrientation: splitOrientation ?? false,
      imageRatio: {
        value: '16:9',
      } as CraftOptionImageRatio,
    }"
  />
</template>
