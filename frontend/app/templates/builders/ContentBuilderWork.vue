<script setup lang="ts">
import EmbedBlock from '~/templates/builders/blocks/EmbedBlock.vue'
import HeadlineBlock from '~/templates/builders/blocks/HeadlineBlock.vue'
import ButtonBlock from '~/templates/builders/blocks/ButtonBlock.vue'
import ImageCoverBlock from '~/templates/builders/blocks/ImageCoverBlock.vue'
import ImageGridBlock from '~/templates/builders/blocks/ImageGridBlock.vue'
import ImageSliderBlock from '~/templates/builders/blocks/ImageSliderBlock.vue'
import TextBlock from '~/templates/builders/blocks/TextBlock.vue'
import QuoteBlock from '~/templates/builders/blocks/QuoteBlock.vue'
import ImageDoubleBlock from './blocks/ImageDoubleBlock.vue'

defineProps<{
  content: Array<object> | null
}>()

const blockMapping = {
  block_embed: EmbedBlock,
  block_headline: HeadlineBlock,
  block_button: ButtonBlock,
  block_imageCover: ImageCoverBlock,
  block_imageDouble: ImageDoubleBlock,
  block_imageGrid: ImageGridBlock,
  block_imageSlider: ImageSliderBlock,
  block_richText: TextBlock,
  block_quote: QuoteBlock,
}
</script>

<template>
  <CraftArea
    v-if="content"
    :content="content"
    :block-mapping="blockMapping"
  />
</template>
