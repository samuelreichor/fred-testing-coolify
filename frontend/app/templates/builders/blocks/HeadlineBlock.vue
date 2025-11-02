<script setup lang="ts">
import type { CraftEntryTypeBlockHeadline } from '#shared/types/base'

defineProps<CraftEntryTypeBlockHeadline>()
</script>

<template>
  <div
    v-if="singleHeadline"
    class="outside-container mt-ds-40 -mb-ds-10"
  >
    <Headline :as="settingsHeadline?.size.value">
      {{ singleHeadline }}
    </Headline>
  </div>
</template>
