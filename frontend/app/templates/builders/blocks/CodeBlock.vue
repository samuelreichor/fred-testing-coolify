<script setup lang="ts">
import type { CraftEntryTypeBlockCode } from '#shared/types/base'

defineProps<CraftEntryTypeBlockCode>()
</script>

<template>
  <SectionCode
    v-if="singleCode"
    :code="singleCode"
    :language="singleCodeLanguage?.value === 'twig' ? 'liquid' : singleCodeLanguage?.value"
  />
</template>
