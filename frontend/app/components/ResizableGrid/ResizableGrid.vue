<script lang="ts" setup>
import { useGsap } from '#gsap'

export type ResizableCard = {
  image: CraftAsset
  headline: string
  path: string
  description?: string
}

const { columns = 3, columnsSm, columnsMd, columnsLg } = defineProps<{
  columns?: number
  cards: ResizableCard[]
  columnsSm?: number
  columnsMd?: number
  columnsLg?: number
}>()

const gridColumns = computed(() => {
  const mobileColumns = columnsSm ?? (columns > 4 ? 2 : 1)
  const tabletColumns = columnsMd ?? Math.round(columns / 2)
  const desktopColumns = columnsLg ?? columns

  return `grid grid-cols-${mobileColumns} sm:grid-cols-${tabletColumns} lg:grid-cols-${desktopColumns}`
})
const gridRef = useTemplateRef<HTMLUListElement>('gridRef')

watch(() => columns, () => {
  if (!gridRef.value) {
    console.error('You must provide a valid gridRef')
    return
  }
  const items = gridRef.value.children
  useGsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 1 })
})

const showText = computed(() => columns <= 4)
</script>

<template>
  <ul
    v-if="cards"
    ref="gridRef"
    :class="['grid gap-x-(--container-gap) gap-y-[calc(1rem+var(--container-gap)))] md:gap-y-[calc(1.5rem+var(--container-gap)))]', gridColumns]"
  >
    <li
      v-for="card in cards"
      :key="card.image.metadata.id"
    >
      <NuxtLink :to="card.path">
        <Image
          :image="card.image"
          :transform="columns > 1 ? '3:4' : '16:9'"
          :show-caption="false"
        />
        <template v-if="showText">
          <Headline
            class="mt-4"
            as="h3"
          >
            {{ card.headline }}
          </Headline>
          <p v-if="card.description">
            {{ card.description }}
          </p>
        </template>
      </NuxtLink>
    </li>
  </ul>
</template>
