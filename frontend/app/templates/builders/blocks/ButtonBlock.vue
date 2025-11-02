<script setup lang="ts">
import type { CraftEntryTypeBlockButton } from '#shared/types/base'

defineProps<CraftEntryTypeBlockButton>()
</script>

<template>
  <div class="outside-container -mt-ds-10">
    <LinkButton
      v-if="singleButton"
      :link="singleButton"
    />
  </div>
</template>
