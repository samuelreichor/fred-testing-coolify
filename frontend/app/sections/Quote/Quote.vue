<script setup lang="ts">
import type { CraftLinkIt } from '#shared/types/base'

defineProps<{
  quote: string | null
  name: string | null
  link: CraftLinkIt | null
}>()
</script>

<template>
  <div
    v-if="quote"
    class="container mt-ds-40"
  >
    <blockquote class="col-span-full">
      <p>„{{ quote }}“</p>
      <div
        v-if="name || link"
        class="mt-ds-16"
      >
        <p v-if="name">
          {{ name }}{{ link && ',' }}
        </p>
        <LinkButton
          v-if="link"
          :link="link"
        />
      </div>
    </blockquote>
  </div>
</template>
