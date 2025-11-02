<script setup lang="ts">
import type { CraftAssetRatioValue } from '../image-types'
import { sharedImageProps } from '../image-props'
import { useGsap } from '#gsap'

const props = defineProps({
  ...sharedImageProps,
})

const image = useTemplateRef<HTMLImageElement>('image')
const imageContainer = useTemplateRef<HTMLElement>('imageContainer')

const RATIO_FACTOR = 0.96

const focalPoint = computed(() =>
  `${(props.image?.focalPoint.x ?? 0.5) * 100}% ${(props.image?.focalPoint.y ?? 0.5) * 100}%`,
)

const parseRatio = (ratio: CraftAssetRatioValue) => {
  if (ratio === 'auto') {
    return props.image?.width && props.image?.height
      ? { width: props.image.width, height: props.image.height }
      : null
  }
  const [width, height] = ratio.split(':').map(Number)
  return width && height ? { width, height } : null
}

const imageAspectRatio = computed(() => {
  const ratio = parseRatio(props.transform)
  return ratio ? `${ratio.width} / ${ratio.height}` : 'auto'
})

const containerAspectRatio = computed(() => {
  if (!props.animated) return imageAspectRatio.value

  const ratio = parseRatio(props.transform)
  if (!ratio) return 'auto'

  const containerHeight = Math.round(ratio.height * RATIO_FACTOR * 10) / 10
  return `${ratio.width} / ${containerHeight}`
})

const imgHeight = computed(() => {
  const ratio = parseRatio(props.transform)
  if (!ratio) return props.image?.height

  const width = props.image?.width ?? 0
  return (width * ratio.height) / ratio.width
})

const imageStyle = computed(() => {
  if (!props.animated) {
    return `object-fit: ${props.objectFit}; object-position: ${focalPoint.value}; aspect-ratio: ${imageAspectRatio.value}`
  }

  return `object-fit: ${props.objectFit}; object-position: ${focalPoint.value}; aspect-ratio: ${imageAspectRatio.value}; will-change: transform;  transform: translateZ(0); backface-visibility: hidden;`
})

function animateImg() {
  const ratio = parseRatio(props.transform)
  if (!ratio) return

  const containerHeight = ratio.height * RATIO_FACTOR
  const imageOverflow = ratio.height - containerHeight
  const moveRange = (imageOverflow / ratio.height) * 100

  const rect = imageContainer.value?.getBoundingClientRect()
  const elementTop = (rect?.top ?? 0) + (window.scrollY || window.pageYOffset)
  const isNearTop = elementTop < window.innerHeight * 0.5

  useGsap.fromTo(image.value,
    { yPercent: 0 },
    {
      yPercent: -moveRange,
      ease: 'none',
      scrollTrigger: {
        trigger: imageContainer.value,
        start: isNearTop ? 'top top' : 'top bottom',
        end: isNearTop ? 'bottom top' : 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    },
  )
}

onMounted(() => {
  if (props.animated && image.value) {
    animateImg()
  }
})
</script>

<template>
  <div
    ref="imageContainer"
    :class="props.animated && 'overflow-hidden relative'"
    :style="`aspect-ratio: ${props.animated ? containerAspectRatio : imageAspectRatio}`"
  >
    <img
      v-if="props.image"
      ref="image"
      :loading="props.lazy ? 'lazy': 'eager'"
      :src="props.image.url"
      :srcset="props.image.srcSets.auto"
      :alt="props.image.title"
      :width="props.image.width"
      :height="imgHeight"
      data-sizes="auto"
      :draggable="props.draggable"
      class="w-full h-auto lazyload"
      :style="imageStyle"
    >
  </div>
</template>
