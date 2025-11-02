<script lang="ts" setup>
import type { CraftEntryTypeBlockIndividualEntryGrid, CraftPageEntryArticle, CraftPageEntryTeam, CraftPageEntryReference, CraftPageEntryCaseStudy } from '#shared/types/base'
import type { DistributivePick } from '~/utils/helper'
import type { ResizableCard } from '~/components/ResizableGrid/ResizableGrid.vue'

import { getIdsFromEntryRelations } from '~/utils/helper'

type MakeSomeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

const { selectIndividualEntries } = defineProps<MakeSomeOptional<CraftEntryTypeBlockIndividualEntryGrid, 'title' | 'singleButton'>>()
const entryIds = getIdsFromEntryRelations(selectIndividualEntries)

type IndiEntryTypes = CraftPageEntryArticle | CraftPageEntryTeam | CraftPageEntryReference | CraftPageEntryCaseStudy
type IndiEntries = DistributivePick<IndiEntryTypes, 'singleSeoTitle' | 'title' | 'groupedProjectImages' | 'singleImageEntry' | 'metadata' | 'label'>
const cards = ref()
await useCraftEntry().id(entryIds).fields(['singleSeoTitle', 'title', 'groupedProjectImages.gridPortrait', 'groupedProjectImages.gridLandscape', 'singleImageEntry', 'label']).all().then(({ data, error }) => {
  if (error.value) {
    console.error((error.value))
  }

  if (data.value) {
    const typedRespData = data.value as IndiEntries[]
    cards.value = transformIndiEntries(typedRespData)
  }
})

function transformIndiEntries(indiEntries: IndiEntries[]): ResizableCard[] {
  const transformedEntries: ResizableCard[] = []
  const isSingleEntry = indiEntries.length === 1

  for (const entry of indiEntries) {
    const { entryType } = entry.metadata
    let card: ResizableCard | null = null

    if (entryType === 'entry_reference' || entryType === 'entry_caseStudy') {
      const refEntry = entry as CraftPageEntryReference
      const images = refEntry.groupedProjectImages
      const image = isSingleEntry
        ? (images?.gridLandscape ?? images?.gridPortrait)
        : images?.gridPortrait

      if (image) {
        card = {
          image,
          headline: entry.title,
          description: entry.singleSeoTitle ?? '',
          path: entry.metadata.fullUri,
        }
      }
    }
    else if (entryType === 'entry_article') {
      if (entry.singleImageEntry) {
        card = {
          image: entry.singleImageEntry,
          headline: entry.title,
          description: (entry as CraftPageEntryArticle).label ?? '',
          path: entry.metadata.fullUri,
        }
      }
    }
    else {
      if (entry.singleImageEntry) {
        card = {
          image: entry.singleImageEntry,
          headline: entry.singleSeoTitle ?? entry.title,
          path: entry.metadata.fullUri,
        }
      }
    }

    if (!card) {
      console.error('Invalid card, there might be an error in the individual entry grid component')
      continue
    }

    transformedEntries.push(card)
  }

  return transformedEntries
}
</script>

<template>
  <SectionIndividualEntryGrid
    :cards="cards"
    :headline="title ?? ''"
    :button="singleButton"
  />
</template>
