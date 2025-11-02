<script setup lang="ts">
import { sharedImageProps, captionProps } from './image-props'

const props = defineProps({
  ...sharedImageProps,
  ...captionProps,
  showCaption: {
    type: Boolean,
    default: () => false,
  },
})
</script>

<template>
  <div v-if="props.image">
    <ImagePartialsFigure
      v-if="props.showCaption && props.image.caption"
      :image="props.image"
      :lazy="props.lazy"
      :object-fit="props.objectFit"
      :transform="props.transform"
      :caption="props.image.caption"
      :caption-classes="props.captionClasses"
      :animated="props.animated"
      :draggable="props.draggable"
    />
    <ImagePartialsImg
      v-else
      :image="props.image"
      :lazy="props.lazy"
      :object-fit="props.objectFit"
      :transform="props.transform"
      :animated="props.animated"
      :draggable="props.draggable"
    />
  </div>
</template>
