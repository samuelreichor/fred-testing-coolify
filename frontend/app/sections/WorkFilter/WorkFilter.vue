<script setup lang="ts">
import type { ResizableCard } from '~/components/ResizableGrid/ResizableGrid.vue'

const route = useRoute()
const router = useRouter()

const currentPage = shallowRef<number>(1)
const currentLayout = shallowRef<'small' | 'large'>('large')

const columns = computed(() => currentLayout.value === 'large' ? 3 : 5)
const limit = computed(() => columns.value * currentPage.value * 4)

const units = await useCraftEntry<CraftPageEntryUnit[]>()
  .section('units')
  .all()
  .then(({ data, error }) => {
    if (error.value) {
      console.error(error.value)
    }

    return data.value || []
  })

const selectedUnit = computed(() => {
  return units.find(unit => unit.metadata.slug === route.query.unit)
})

const works = await useCraftEntry<CraftPageEntryCaseStudy[]>()
  .section('work')
  .fields([
    'metadata.fullUri',
    'title',
    'singleSeoTitle',
    'groupedProjectImages.gridPortrait',
    'unitIds',
  ])
  .all()
  .then(({ data, error }) => {
    if (error.value) {
      console.error(error.value)
    }

    return data.value || []
  })

const cards = computed(() => {
  return works
    .filter(work => work.groupedProjectImages?.gridPortrait)
    .filter((work) => {
      const unitIds = work.unitIds?.split(',').map(Number)
      return !selectedUnit.value || (unitIds && unitIds.includes(selectedUnit.value.metadata.id))
    })
    .map<ResizableCard>(work => ({
      headline: work.title ?? '',
      description: work.singleSeoTitle ?? '',
      image: work.groupedProjectImages.gridPortrait,
      path: work.metadata.fullUri,
    }))
})

watch(() => route.query.unit, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="outside-container mt-ds-20">
    <div class="flex flex-row justify-between">
      <ul class="flex-row items-center gap-ds-3 hidden md:flex">
        <li>
          <button
            :class="['cursor-pointer', { 'opacity-25': selectedUnit }]"
            @click="router.push({ query: {} })"
          >
            Alles.
          </button>
        </li>

        <li
          v-for="unit in units"
          :key="unit.title"
        >
          <button
            :class="['cursor-pointer', { 'opacity-25': selectedUnit?.metadata.id !== unit.metadata.id }]"
            @click="router.push({ query: { unit: unit.metadata.slug } })"
          >
            {{ unit.title }}.
          </button>
        </li>
      </ul>

      <button
        class="flex flex-row gap-ds-2 justify-between cursor-pointer"
        @click="currentLayout = (currentLayout === 'small' ? 'large' : 'small')"
      >
        <span :class="{ 'opacity-25': currentLayout !== 'large' }">Groß</span>
        <span :class="{ 'opacity-25': currentLayout !== 'small' }">Klein</span>
      </button>
    </div>
  </div>

  <SectionIndividualEntryGrid
    v-if="cards"
    :cards="cards.slice(0, limit)"
    :columns="columns"
  />

  <div
    v-if="cards.length > limit"
    class="outside-container mt-ds-20"
  >
    <button
      class="cursor-pointer"
      @click="currentPage++"
    >
      Mehr. Noch mehr.
    </button>
  </div>
</template>
