<script setup lang="ts">
import type { CraftAsset, CraftEntryTypeSettingsImageGridBlock } from '#shared/types/base'

defineProps<{
  images: CraftAsset[] | null
  settings: CraftEntryTypeSettingsImageGridBlock | null
}>()
</script>

<template>
  <div class="container mt-ds-10">
    <!-- Simple Grid Layout -->
    <div
      v-if="!settings?.layoutImageGrid"
      class="col-span-full grid grid-cols-1 gap-gutter"
      :class="{
        'md:grid-cols-2': settings?.columns?.value === '2',
        'md:grid-cols-3': settings?.columns?.value === '3' || !settings?.columns?.value,
      }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
      >
        <Image
          :image="image"
          :transform="settings?.imageRatio?.value || 'auto'"
          :animated="true"
          :show-caption="settings?.showCaption || false"
        />
      </div>
    </div>

    <!-- Split Grid Layout -->
    <div
      v-else
      class="col-span-full"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="[
            '[&_div]:h-full overflow-hidden col-span-1',
            {
              'md:col-span-2': settings?.splitOrientation ? index % 2 === 1 : index % 2 === 0,
              'md:col-span-1': settings?.splitOrientation ? index % 2 === 0 : index % 2 === 1,
            },
          ]"
        >
          <Image
            :image="image"
            :transform="(settings?.splitOrientation ? index % 2 === 1 : index % 2 === 0) ? '16:9' : '3:4'"
            :animated="true"
            :show-caption="settings?.showCaption || false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
