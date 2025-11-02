<script setup lang="ts">
const { as = 'h2' } = defineProps<{
  as?: HeadlineTags
}>()

export type HeadlineTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
</script>

<template>
  <component
    :is="as"
    class="headline-root"
  >
    <slot />
  </component>
</template>
