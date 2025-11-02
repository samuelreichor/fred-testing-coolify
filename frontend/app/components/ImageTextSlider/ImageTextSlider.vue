<script setup lang="ts">
import type { CraftAsset } from '#shared/types/base'

export type ImageTextSliderCard = {
  image: CraftAsset
  path: string
  headline?: string
  description?: string
}
defineProps<{
  cards: ImageTextSliderCard[] | null
}>()
</script>

<template>
  <div class="">
    <BlossomCarousel
      as="ul"
      class="pr-gutter"
    >
      <li
        v-for="card in cards"
        :key="card.image.metadata.id"
        class="w-col-9 sm:w-col-7 md:w-col-5! pl-gutter"
      >
        <NuxtLink
          :to="card.path"
        >
          <Image
            :image="card.image"
            :show-caption="false"
            transform="3:4"
            :draggable="false"
            :animated="false"
          />
          <div
            v-if="card.headline || card.description"
            class="mt-4"
          >
            <Headline
              v-if="card.headline"
              as="h3"
            >
              {{ card.headline }}
            </Headline>
            <p v-if="card.description">
              {{ card.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </BlossomCarousel>
  </div>
</template>
