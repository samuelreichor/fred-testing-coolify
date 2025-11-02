<script setup lang="ts">
import type { CraftPageEntryJobs } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'
import JobsBlock from '~/templates/builders/blocks/JobsBlock.vue'

defineProps<CraftPageEntryJobs>()
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

    <JobsBlock class="mb-ds-40" />
    <ContentBuilder :content="contentBuilder" />
  </NuxtLayout>
</template>
