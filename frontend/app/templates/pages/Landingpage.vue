<script setup lang="ts">
import type { CraftPageEntryLandingpage } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftPageEntryLandingpage>()
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="textHero?.headline || title"
      :intro-text="textHero?.richTextSimple ?? ''"
    />
    <SectionImageCover
      v-if="imageCover?.singleImage"
      :image="imageCover.singleImage"
      :show-caption="imageCover.showCaption ?? false"
      :image-ratio="imageCover.imageRatio?.value ?? '16:9'"
      :link="imageCover.singleLink ?? null"
    />
    <LazySectionRelatedProjects
      v-if="singleRelatedProjects && singleRelatedProjects.length > 1"
      :related-projects="singleRelatedProjects ?? []"
      headline="Mehr?"
    />
    <ContentBuilder :content="contentBuilder" />
  </NuxtLayout>
</template>
