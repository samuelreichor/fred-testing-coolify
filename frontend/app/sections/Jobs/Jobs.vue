<script setup lang="ts">
import type { CraftPageEntryJob } from '#shared/types/base'

export type JobWithLocation = CraftPageEntryJob & {
  locationData?: {
    title: string
    locationImages: CraftAsset[] | null
  } | null
}

defineProps<{
  jobs: JobWithLocation[]
}>()
</script>

<template>
  <div class="container mt-ds-40">
    <ul class="col-span-full flex flex-col gap-ds-12">
      <li
        v-for="(job, index) in jobs"
        :key="index"
        class="w-full flex items-center justify-between gap-x-4"
      >
        <SlideshowButton
          :href="job.metadata?.fullUri"
          :images="job.locationData?.locationImages || null"
          :prefix="job.title"
          :suffix="job.singleJobLocation?.label"
        />
        <Icon
          name="chevron-right"
          aria-hidden="true"
          class="block md:hidden w-8 h-8 shrink-0"
        />
      </li>
    </ul>
  </div>
</template>
