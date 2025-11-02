<script setup lang="ts">
import type { CraftPageEntryAbout, CraftPageEntryTeam } from '#shared/types/base'
import type { ResizableCard } from '~/components/ResizableGrid/ResizableGrid.vue'
import { getFirstName } from '~/utils/helper'

defineProps<CraftPageEntryAbout>()

const { data: teamEntries, error: teamError } = await useCraftEntry<CraftPageEntryTeam[]>()
  .section('team')
  .fields(['title', 'singleImageEntry', 'metadata.fullUri'])
  .orderBy('title')
  .all()

if (teamError.value) {
  console.error(teamError.value)
}

const teamCards = computed<ResizableCard[]>(() => {
  if (!teamEntries.value) return []

  return teamEntries.value
    .filter(member => member.singleImageEntry && member.metadata?.fullUri)
    .map(member => ({
      image: member.singleImageEntry,
      headline: getFirstName(member.title),
      path: member.metadata.fullUri,
    }))
})

// Split team cards in half, with first half rounded to multiple of 3
const firstHalfTeam = computed(() => {
  const half = Math.ceil(teamCards.value.length / 2)
  const firstHalfSize = Math.round(half / 3) * 3

  return teamCards.value.slice(0, firstHalfSize)
})

const secondHalfTeam = computed(() => {
  const firstHalfSize = firstHalfTeam.value.length
  return teamCards.value.slice(firstHalfSize)
})
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="textHero?.headline ?? title"
      :intro-text="textHero?.richTextSimple ?? ''"
    />

    <div
      v-if="firstHalfTeam.length > 0"
      class="outside-container mt-ds-20 mb-ds-6"
    >
      <ResizableGrid
        :cards="firstHalfTeam"
        :columns="3"
        :columns-sm="1"
      />
    </div>

    <SectionText
      v-if="richTextSimple"
      :text="richTextSimple"
    />

    <div
      v-if="secondHalfTeam.length > 0"
      class="outside-container mt-ds-20 mb-ds-6"
    >
      <ResizableGrid
        :cards="secondHalfTeam"
        :columns="3"
        :columns-sm="2"
      />
    </div>

    <SectionText
      v-if="singleRichText"
      :text="singleRichText"
    />

    <LazySectionRelatedFaqs
      v-if="faqs?.relatedFaqs && faqs?.relatedFaqs.length > 0"
      :headline="faqs?.singleHeadline ?? 'Was du noch niemals wissen wolltest.'"
      :related-faqs="faqs?.relatedFaqs"
    />
  </NuxtLayout>
</template>
