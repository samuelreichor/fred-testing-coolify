<script lang="ts" setup>
import type { ResizableCard } from '~/components/ResizableGrid/ResizableGrid.vue'

defineProps<{
  headline?: string | null
  cards: ResizableCard[]
  button?: CraftLinkIt | null
  columns?: number
}>()
</script>

<template>
  <div class="outside-container mt-ds-10">
    <Headline
      v-if="headline"
      class="mb-ds-10"
      as="h2"
    >
      {{ headline }}
    </Headline>
    <ResizableGrid
      :cards="cards"
      :columns="columns ?? (cards.length > 1 ? 3 : 1)"
    />
    <div
      v-if="button"
      class="mt-ds-20"
    >
      <LinkButton
        :link="button"
      />
    </div>
  </div>
</template>
