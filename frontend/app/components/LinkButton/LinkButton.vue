<script setup lang="ts">
const { link } = defineProps<{
  link: CraftLink | CraftLinkIt
}>()

const href = computed(() =>
  ('path' in link && link.path)
    ? link.path
    : link.url,
)
</script>

<template>
  <LinkButtonBase
    v-if="link"
    :href="href"
    :target="link.target"
  >
    {{ link.label }}
  </LinkButtonBase>
</template>
