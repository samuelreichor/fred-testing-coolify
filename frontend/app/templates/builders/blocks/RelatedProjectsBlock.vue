<script setup lang="ts">
import type { CraftEntryTypeBlockRelatedProjects } from '#shared/types/base'

defineProps<CraftEntryTypeBlockRelatedProjects>()
</script>

<template>
  <LazySectionRelatedProjects
    v-if="singleRelatedProjects?.length"
    :headline="singleHeadline ?? ''"
    :related-projects="singleRelatedProjects"
    :reduced-space="isLessSpacingAbove ?? false"
  />
</template>
