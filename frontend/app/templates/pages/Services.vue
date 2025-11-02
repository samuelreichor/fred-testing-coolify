<script setup lang="ts">
import type { CraftPageEntryServices } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftPageEntryServices>()
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="textHero?.headline || title"
      :intro-text="textHero?.richTextSimple ?? ''"
    />
    <ContentBuilder
      :content="contentBuilder"
      class="mt-ds-40"
    />
  </NuxtLayout>
</template>
