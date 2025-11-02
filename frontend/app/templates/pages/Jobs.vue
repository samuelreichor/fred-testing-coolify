<script setup lang="ts">
import type { CraftEntryTypeEntryJob } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

const props = defineProps<CraftEntryTypeEntryJob>()

const headline = computed(() => props.singleSeoTitle || props.title)

const introText = computed(() => ([
  props.singleJobLocation.label,
  props.simpleText,
].filter(Boolean).join(', ')
))
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="headline"
      :intro-text="introText"
    />

    <SectionText
      v-if="singleIntroText"
      :text="singleIntroText"
    />

    <ContentBuilder
      :content="contentBuilder"
    />

    <SectionRelatedFaqs
      v-if="faqs?.relatedFaqs && faqs?.relatedFaqs.length > 0"
      :headline="faqs?.singleHeadline ?? 'Was du noch niemals wissen wolltest.'"
      :related-faqs="faqs?.relatedFaqs"
    />
  </NuxtLayout>
</template>
