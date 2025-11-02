<script setup lang="ts">
import CodeBlock from '~/templates/builders/blocks/CodeBlock.vue'
import EmbedBlock from '~/templates/builders/blocks/EmbedBlock.vue'
import FaqBlock from '~/templates/builders/blocks/FaqBlock.vue'
import HeadlineBlock from '~/templates/builders/blocks/HeadlineBlock.vue'
import ButtonBlock from '~/templates/builders/blocks/ButtonBlock.vue'
import ImageCoverBlock from '~/templates/builders/blocks/ImageCoverBlock.vue'
import ImageGridBlock from '~/templates/builders/blocks/ImageGridBlock.vue'
import ImageSliderBlock from '~/templates/builders/blocks/ImageSliderBlock.vue'
import IndividualEntryGrid from '~/templates/builders/blocks/IndividualEntryGrid.vue'
import JobBlock from '~/templates/builders/blocks/JobsBlock.vue'
import TextBlock from '~/templates/builders/blocks/TextBlock.vue'
import SalaryBandBlock from '~/templates/builders/blocks/SalaryBandBlock.vue'
import QuoteBlock from '~/templates/builders/blocks/QuoteBlock.vue'
import RelatedProjectsBlock from '~/templates/builders/blocks/RelatedProjectsBlock.vue'

defineProps<{
  content: Array<object> | null
}>()

const blockMapping = {
  block_code: CodeBlock,
  block_embed: EmbedBlock,
  block_faq: FaqBlock,
  block_headline: HeadlineBlock,
  block_button: ButtonBlock,
  block_imageCover: ImageCoverBlock,
  block_imageGrid: ImageGridBlock,
  block_imageSlider: ImageSliderBlock,
  block_individualEntryGrid: IndividualEntryGrid,
  block_jobs: JobBlock,
  block_richText: TextBlock,
  block_relatedProjects: RelatedProjectsBlock,
  block_salaryBand: SalaryBandBlock,
  block_quote: QuoteBlock,
}
</script>

<template>
  <CraftArea
    v-if="content"
    class="contentBuilder-margin-correction"
    :content="content"
    :block-mapping="blockMapping"
  />
</template>
