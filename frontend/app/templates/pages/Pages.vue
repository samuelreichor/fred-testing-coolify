<script setup lang="ts">
import type { CraftPageEntryPages } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftPageEntryPages>()
</script>

<template>
  <NuxtLayout>
    <SectionHeroText
      :headline="textHero?.headline || title"
      :intro-text="textHero?.richTextSimple ?? ''"
    />
    <ContentBuilder
      class="mt-ds-20"
      :content="contentBuilder"
    />
  </NuxtLayout>
</template>
