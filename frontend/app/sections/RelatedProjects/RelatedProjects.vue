<script setup lang="ts">
import type { CraftEntryRelation } from '#shared/types/base'
import type { ImageTextSliderCard } from '~/components/ImageTextSlider/ImageTextSlider.vue'
import type { DistributivePick } from '~/utils/helper'

const { relatedProjects } = defineProps<{
  headline?: string
  relatedProjects: CraftEntryRelation[]
  reducedSpace?: boolean
}>()
type WorkEntry = DistributivePick<(CraftPageEntryReference | CraftPageEntryCaseStudy), 'singleSeoTitle' | 'title' | 'groupedProjectImages' | 'metadata'>

const cards = ref<ImageTextSliderCard[]>()
await useCraftEntry()
  .section('work')
  .id(getIdsFromEntryRelations(relatedProjects ?? []))
  .fields(['singleSeoTitle', 'title', 'groupedProjectImages.gridPortrait', 'metadata'])
  .all()
  .then(({ data, error }) => {
    if (error.value) {
      console.error((error.value))
    }

    if (data.value) {
      const typedRespData = (data.value ?? []) as WorkEntry[]
      cards.value = typedRespData
        .filter(e => e.groupedProjectImages?.gridPortrait)
        .map<ImageTextSliderCard>(e => ({
          headline: e.title ?? '',
          description: e.singleSeoTitle ?? '',
          image: e.groupedProjectImages.gridPortrait,
          path: e.metadata.fullUri,
        }))
    }
  })
</script>

<template>
  <SectionImageTextSlider
    v-if="cards && cards.length > 1"
    :headline="headline"
    :cards="cards"
    :reduced-space="reducedSpace"
  />
</template>
