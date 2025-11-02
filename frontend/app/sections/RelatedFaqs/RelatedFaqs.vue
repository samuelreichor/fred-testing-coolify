<script setup lang="ts">
import type { CraftEntryRelation } from '#shared/types/base'

const { relatedFaqs } = defineProps<{
  headline: string
  relatedFaqs: CraftEntryRelation[]
}>()

const faqs = ref<CraftEntryTypeBlockAccordionContent[] | null>(null)
await useCraftEntry()
  .section('faqs')
  .id(getIdsFromEntryRelations(relatedFaqs ?? []))
  .fields(['singleLabel', 'singleRichText'])
  .all()
  .then(({ data, error }) => {
    if (error.value) {
      console.error((error.value))
    }

    if (data.value) {
      faqs.value = (data.value ?? []) as CraftEntryTypeBlockAccordionContent[]
    }
  })
</script>

<template>
  <SectionFaq
    :headline="headline"
    :accordion-data="faqs"
    :reduced-space="false"
  />
</template>
