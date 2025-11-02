<script setup lang="ts">
import type { CraftPageEntryWork } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftPageEntryWork>()
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      v-if="textHero?.headline || textHero?.richTextSimple"
      :headline="textHero?.headline || title"
      :intro-text="textHero?.richTextSimple ?? undefined"
    />
    <SectionWorkFilter />
    <ContentBuilder
      class="mt-ds-40"
      :content="contentBuilder"
    />
    <SectionRelatedFaqs
      v-if="relatedFaqs && relatedFaqs?.length > 0"
      headline="Was du noch niemals wissen wolltest."
      :related-faqs="relatedFaqs"
    />
  </NuxtLayout>
</template>
