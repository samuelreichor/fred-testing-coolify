<script setup lang="ts">
defineProps<{
  text?: string | null
}>()
</script>

<template>
  <div class="outside-container flex flex-col justify-center min-h-screen py-ds-56 bg-foreground">
    <RichText
      class="text-background text-xl font-medium"
      :text="text ?? '<p>Fredmansky.<br>Macht’s einfach.</p>'"
    />
  </div>
</template>
