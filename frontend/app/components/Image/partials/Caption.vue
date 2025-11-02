<script setup lang="ts">
const props = defineProps({
  caption: {
    type: String,
    default: () => '',
  },
  as: {
    type: String,
    default: () => 'figcaption',
  },
})
</script>

<template>
  <component
    :is="props.as"
    class="mt-ds-6 text-base"
  >
    <p v-if="props.caption">
      {{ props.caption }}
    </p>
  </component>
</template>
