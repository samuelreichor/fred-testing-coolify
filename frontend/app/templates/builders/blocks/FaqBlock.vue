<script setup lang="ts">
import type { CraftEntryTypeBlockFaq, CraftPageBlockAccordionContent } from '#shared/types/base'
import { getIdsFromEntryRelations } from '~/utils/helper'

const { relatedFaqs } = defineProps<CraftEntryTypeBlockFaq>()

const entryIds = getIdsFromEntryRelations(relatedFaqs)

const { data: faqs, error } = useCraftEntry<CraftPageBlockAccordionContent[]>()
  .id(entryIds)
  .fields(['singleLabel', 'singleRichText'])
  .all()

if (error.value) {
  console.log(error.value)
}
</script>

<template>
  <SectionFaq
    v-if="faqs"
    :headline="title ?? ''"
    :accordion-data="faqs"
    :link="singleButton"
    :reduced-space="isLessSpacingAbove ?? false"
  />
</template>
