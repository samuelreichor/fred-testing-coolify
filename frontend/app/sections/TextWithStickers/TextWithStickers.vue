<script setup lang="ts">
import type { CraftContentBlockTextWithStickers } from '#shared/types/base'

const { data: stickers } = useCraftAsset<CraftAsset[]>().volume('stickers').all()
defineProps<{
  textWithStickers: CraftContentBlockTextWithStickers
}>()
</script>

<template>
  <SectionStickers
    v-if="stickers"
    :sticker-assets="stickers"
  >
    <RichText :text="textWithStickers.desktopText" />
  </SectionStickers>
</template>
