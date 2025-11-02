<script setup lang="ts">
defineProps<{
  images: CraftAsset[] | null
  suffix: string | null
  prefix: string | null
}>()
</script>

<template>
  <LinkButtonBase :mobile-hover="false">
    <span class="flex-row items-center gap-[0.125em] md:inline-flex flex-wrap">
      <span v-if="prefix">
        {{ prefix }}<span :class="['inline', images?.length ? 'md:hidden' : null]">,</span>
      </span>

      <Slideshow
        v-if="images?.length"
        :images="images"
        class="hidden w-[1.5em] md:flex"
        aria-hidden="true"
      />

      {{ suffix }}
    </span>
  </LinkButtonBase>
</template>
