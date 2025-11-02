<script setup lang="ts">
import type { CraftEntryTypeBlockSalaryBand } from '#shared/types/base'

defineProps<CraftEntryTypeBlockSalaryBand>()
</script>

<template>
  <SectionSalaryBand
    v-if="salaryRanges?.length"
    :experience-level="experienceLevel"
    :salary-ranges="{
      learning: salaryRanges?.[0]?.learning || '',
      proficient: salaryRanges?.[0]?.proficient || '',
      mastering: salaryRanges?.[0]?.mastering || '',
    }"
  />
</template>
