<script setup lang="ts">
import type { ImageTextSliderCard } from '~/components/ImageTextSlider/ImageTextSlider.vue'

const { entryId, headline } = defineProps<{
  entryId: number
  headline: string
}>()

if (!entryId) {
  throw new Error('Entry Id not found')
}

type WorkEntry = DistributivePick<(CraftPageEntryReference | CraftPageEntryCaseStudy), 'singleSeoTitle' | 'title' | 'groupedProjectImages' | 'metadata'>
const cards = ref<ImageTextSliderCard[]>()
await useCraftEntry()
  .section('work')
  .relatedTo(entryId)
  .fields(['singleSeoTitle', 'title', 'groupedProjectImages.gridPortrait', 'metadata.fullUri'])
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
  />
</template>
