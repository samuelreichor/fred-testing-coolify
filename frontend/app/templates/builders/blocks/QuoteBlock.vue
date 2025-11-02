<script setup lang="ts">
import type { CraftEntryTypeBlockQuote } from '#shared/types/base'

defineProps<CraftEntryTypeBlockQuote>()
</script>

<template>
  <SectionQuote
    v-if="singleQuote"
    :quote="singleQuote"
    :name="singleSource"
    :link="singleSourceUrl"
  />
</template>
