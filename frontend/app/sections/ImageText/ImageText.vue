<script setup lang="ts">
const { lazyloadImage = true } = defineProps<{
  text: string
  image: CraftAsset
  lazyloadImage?: boolean
}>()
</script>

<template>
  <div
    v-if="text && image"
    class="container mt-ds-10"
  >
    <RichText
      class="col-span-full md:col-span-6"
      :text="text"
    />
    <Image
      :image="image"
      transform="3:4"
      :lazy="lazyloadImage"
      class="col-span-full md:col-span-6"
    />
  </div>
</template>
