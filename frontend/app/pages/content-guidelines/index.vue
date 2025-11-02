<script setup lang="ts">
import type { HeadlineTags } from '~/components/Headline/Headline.vue'
import { htmlContent } from './RteExample'
import { DummyImage } from './DummyImage'

const classes = {
  mainHeadlines: 'mt-10 block',
  subHeadlines: 'mt-6 mb-2 block',
}

const fontsArr = ['font-sans']
const fontsizeArr = [
  'text-base',
  'text-xl',
]
const colorArr = [
  'bg-black',
  'bg-white',
  'bg-accent',
  'bg-foreground',
  'bg-blackground',
]
const headlineArr: HeadlineTags[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const spacingVars = [
  'pt-ds-1',
  'pt-ds-2',
  'pt-ds-3',
  'pt-ds-4',
  'pt-ds-6',
  'pt-ds-8',
  'pt-ds-10',
  'pt-ds-12',
  'pt-ds-16',
  'pt-ds-20',
  'pt-ds-24',
  'pt-ds-28',
  'pt-ds-32',
  'pt-ds-40',
  'pt-ds-48',
  'pt-ds-56',
  'pt-ds-64',
  'pt-ds-72',
  'pt-ds-80',
  'pt-ds-88',
  'pt-ds-96',
]

const boxes = ref<HTMLElement[]>([])
const labels = ref<string[]>(Array(spacingVars.length).fill(''))

function fmt(px: number) {
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  return `${Math.round(px)}px (${(px / root).toFixed(2)}rem)`
}

function updateSpacings() {
  boxes.value.forEach((el, i) => {
    if (!el) return
    const h = el.getBoundingClientRect().height
    labels.value[i] = fmt(h)
  })
}

onMounted(async () => {
  await nextTick()
  updateSpacings()
  window.addEventListener('resize', updateSpacings)
})

useHead({
  title: 'Fredmansky Style Guide',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <div>
      <div class="outside-container">
        <span :class="classes.mainHeadlines">Font Families</span>
        <div
          v-for="font in fontsArr"
          :key="font"
        >
          <span :class="classes.subHeadlines">{{ font }}:</span>
          <p :class="font">
            The quick brown fredmansky jumps over the lazy developer.
          </p>
        </div>

        <hr class="my-ds-12">

        <!-- Overview of all Text Sizes -->
        <span :class="classes.mainHeadlines">Text Sizes</span>
        <div
          v-for="fontSize in fontsizeArr"
          :key="fontSize"
        >
          <span :class="classes.subHeadlines">{{ fontSize }}:</span>
          <span :class="fontSize">
            The quick brown fredmansky jumps over the lazy developer.
          </span>
        </div>

        <hr class="my-ds-12">

        <!-- Overview of all Colors -->
        <span :class="classes.mainHeadlines">Colors</span>
        <div class="flex flex-wrap gap-10 mt-4">
          <div
            v-for="color in colorArr"
            :key="color"
          >
            <span class="block mb-2">{{ color }}</span>
            <div :class="[color, 'h-40 aspect-square items-center justify-center']" />
          </div>
        </div>

        <hr class="my-ds-12">

        <!-- Overview of all Headline Component Styles -->
        <span :class="classes.mainHeadlines">Headline Component Styles</span>
        <div
          v-for="headlineSize in headlineArr"
          :key="headlineSize"
        >
          <span :class="classes.subHeadlines">{{ headlineSize }}:</span>
          <Headline :as="headlineSize">
            The quick brown fredmansky jumps over the lazy developer.
          </Headline>
        </div>

        <hr class="my-ds-12">

        <!-- Overview of all Richtext Styles -->
        <span :class="classes.mainHeadlines">Text Component Full Example (base)</span>
        <RichText
          variant="base"
          :text="htmlContent"
          :class="classes.subHeadlines"
        />

        <hr class="my-ds-12">

        <!-- Overview of all Button Variants -->
        <span :class="classes.mainHeadlines">Button Variants</span>
        <div class="block">
          <LinkButtonBase
            href="/page-1"
          >
            Test Button
          </LinkButtonBase>
        </div>
        <div class="block">
          <LinkButtonBase
            href="/page-1"
          >
            The quick brown fredmansky jumps over the lazy developer.
          </LinkButtonBase>
        </div>

        <hr class="my-ds-12">

        <!-- Overview of Spacings -->
        <span :class="classes.mainHeadlines">Spacing Variants</span>
        <div
          v-for="(spacing, i) in spacingVars"
          :key="spacing!"
        >
          <span :class="classes.subHeadlines">{{ spacing }}: {{ labels[i] }}</span>
          <div
            :ref="(el) => (boxes[i] = el as HTMLElement)"
            :class="[spacing, 'bg-accent relative']"
          />
        </div>

        <hr class="my-ds-12">
        <!--    Overview of Basic Components    -->
        <span :class="[classes.mainHeadlines, 'mb-ds-4']">Accordion</span>

        <Accordion
          summary="Wie fühlt es sich an, bei Fredmansky zu arbeiten?"
          content="Lorem ipsum dolor sit amet consectetur adipiscing elit, et enim accumsan massa porttitor dis nec, mauris est quam dui elementum sagittis. Primis molestie dignissim pulvinar nunc urna tristique rutrum sed diam gravida,"
        />
        <Accordion
          summary="Was passiert, wenn mal etwas schiefläuft?"
          content="Lorem ipsum dolor sit amet consectetur adipiscing elit, et enim accumsan massa porttitor dis nec, mauris est quam dui elementum sagittis."
        />
        <Accordion
          summary="Wie geht ihr mit Feedback um – intern und mit Kunden?"
          content="Lorem ipsum dolor sit amet consectetur adipiscing elit, et enim accumsan massa porttitor dis nec, mauris est quam dui elementum sagittis. Primis molestie dignissim pulvinar nunc urna tristique rutrum sed diam gravida,"
        />

        <hr class="my-ds-12">

        <span :class="classes.mainHeadlines">Image</span>
        <span :class="classes.subHeadlines">Image with Caption and 16/9 Ratio</span>
        <Image
          v-if="DummyImage[0]"
          :image="DummyImage[0]"
          :show-caption="true"
          transform="16:9"
        />

        <span :class="classes.subHeadlines">Image without Caption and 16/9 Ratio</span>
        <Image
          v-if="DummyImage[0]"
          :image="DummyImage[0]"
          :show-caption="false"
          transform="16:9"
        />

        <span :class="classes.subHeadlines">Image without Caption and 3/4 Ratio</span>
        <Image
          v-if="DummyImage[0]"
          :image="DummyImage[0]"
          :show-caption="false"
          transform="3:4"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
