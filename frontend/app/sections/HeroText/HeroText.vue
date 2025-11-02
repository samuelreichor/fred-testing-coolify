<script setup lang="ts">
defineProps<{
  headline: string
  introText?: string
}>()
</script>

<template>
  <div class="outside-container mt-ds-32">
    <Headline as="h1">
      {{ headline }}
    </Headline>
    <RichText
      v-if="introText"
      class="mt-4"
      :text="introText"
    />
  </div>
</template>
