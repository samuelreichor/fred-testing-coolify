<script setup lang="ts">
import type { CraftPageEntryHomepage } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftPageEntryHomepage>()
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="textHero?.headline ?? title"
      :intro-text="textHero?.richTextSimple ?? ''"
    />
    <ContentBuilder :content="contentBuilder" />
    <LazySectionTextWithStickers
      v-if="textWithStickers"
      :text-with-stickers="textWithStickers"
    />
  </NuxtLayout>
</template>
