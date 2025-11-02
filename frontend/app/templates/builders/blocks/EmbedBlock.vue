<script setup lang="ts">
import type { CraftEntryTypeBlockEmbed } from '#shared/types/base'

defineProps<CraftEntryTypeBlockEmbed>()
</script>

<template>
  <SectionEmbed
    v-if="singleEmbedCode"
    :code="singleEmbedCode"
    :settings="settingsEmbed"
  />
</template>
