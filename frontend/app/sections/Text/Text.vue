<script setup lang="ts">
defineProps<{
  text: string
  animated?: boolean
}>()
</script>

<template>
  <div class="outside-container mt-ds-40">
    <RichText
      :text="text"
      :animated="animated ?? false"
    />
  </div>
</template>
