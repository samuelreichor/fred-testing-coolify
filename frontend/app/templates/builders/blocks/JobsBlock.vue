<script setup lang="ts">
import type { CraftPageEntryJob, CraftPageEntryGlobals } from '#shared/types/base'

const globals = inject<Ref<CraftPageEntryGlobals>>('globals')

// Map job locations to global location names
const locationMapping = {
  linz: 'linz',
  linzWien: 'wien',
  linzWienRemote: 'linz',
  neufelden: 'neufelden',
  gleisdorf: 'gleisdorf',
} as const

// Deterministic image selection for SSR consistency to prevent hydration error
function getImages(images: CraftAsset[] | null, jobId: number, count: number = 5): CraftAsset[] | null {
  if (!images || images.length === 0) return null
  if (images.length <= count) return images

  const shuffled = [...images]

  // Shuffle using job ID as seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (jobId + i) % (i + 1)
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }

  return shuffled.slice(0, count)
}

// Location lookup map
const locationsMap = computed(() => {
  if (!globals?.value?.locations) return {}

  return Object.fromEntries(
    globals.value.locations.map(location => [
      location.title.toLowerCase(),
      {
        title: location.title,
        locationImages: location.locationImages,
      },
    ]),
  )
})

const url = computed(() => useCraftQuery('entries').section('jobs').fields(['title', 'singleJobLocation', 'metadata.fullUri']).buildUrl('all'))
const { data: jobEntries, error } = useCraftFetch<CraftPageEntryJob[]>(url, {
  transform: (data) => {
    return transformJobEntries(data)
  },
})

if (error.value) {
  console.error('Error fetching jobs:', error.value)
}

function transformJobEntries(jobEntries: CraftPageEntryJob[]) {
  return jobEntries.map((job) => {
    const jobLocation = job.singleJobLocation?.value
    const mappedLocationName = jobLocation && jobLocation in locationMapping
      ? locationMapping[jobLocation as keyof typeof locationMapping]
      : null
    const locationData = mappedLocationName ? locationsMap.value[mappedLocationName] : null

    return {
      ...job,
      locationData: locationData
        ? {
            ...locationData,
            locationImages: getImages(locationData.locationImages, job.metadata.id),
          }
        : null,
    }
  })
}
</script>

<template>
  <SectionJobs
    v-if="jobEntries?.length > 0"
    :jobs="jobEntries"
  />
</template>
