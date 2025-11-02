<script setup lang="ts">
import type { CraftPageEntryTeam } from '#shared/types/base'
import { getFirstName } from '~/utils/helper'

defineProps<CraftPageEntryTeam>()

function getHeadline(fullName: string) {
  const name = getFirstName(fullName)
  return `Das hat ${name} zuletzt gemacht`
}
</script>

<template>
  <NuxtLayout>
    <SectionHeroText :headline="singleSeoTitle ?? title" />
    <SectionImageText
      v-if="singleRichText && singleImageEntry"
      :image="singleImageEntry"
      :text="singleRichText"
      :lazyload-image="false"
    />

    <LazySectionRelatedProjectsTeam
      :headline="getHeadline(title)"
      :entry-id="metadata.id"
    />
  </NuxtLayout>
</template>
