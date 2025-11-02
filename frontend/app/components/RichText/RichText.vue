<script setup lang="ts">
import type { Theme } from '~/types/base'
import { useGsap, useSplitText } from '#gsap'

const { text = '', theme, animated = false } = defineProps<{
  text?: string
  theme?: Theme
  animated?: boolean
}>()

const slots = useSlots()

const textWrapper = useTemplateRef<HTMLElement>('textWrapper')
const { theme: globalTheme } = useThemeSwitcher()
const computedTheme = computed(() => !theme ? globalTheme.value : theme)

function adjustLinks(textWrapper: HTMLElement) {
  const links = textWrapper.querySelectorAll('a')
  if (links) {
    links.forEach((link) => {
      link.setAttribute('data-theme', computedTheme.value)
    })
  }
}

function animateTextByScroll(textWrapper: HTMLElement) {
  const split = useSplitText.create(textWrapper, {
    type: 'words',
    tag: 'span',
    wordsClass: 'word',
  })

  const words = split.words
  useGsap.set(words, { opacity: 0.2 })

  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: words,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  tl.to(words, {
    opacity: 1,
    duration: 0.1,
    stagger: 0.2,
  }, 0)
}

watch(computedTheme, () => {
  if (textWrapper.value) {
    adjustLinks(textWrapper.value)
  }
})

onMounted(() => {
  if (textWrapper.value) {
    adjustLinks(textWrapper.value)

    if (animated) {
      animateTextByScroll(textWrapper.value)
    }
  }
})
</script>

<template>
  <div
    v-if="text || slots.default"
    ref="textWrapper"
  >
    <div
      v-if="text"
      class="c-text--richText"
      v-html="text"
    />
    <div
      v-else
      class="c-text--richText"
    >
      <slot />
    </div>
  </div>
</template>
