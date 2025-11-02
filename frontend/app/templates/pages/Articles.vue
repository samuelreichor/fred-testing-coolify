<script setup lang="ts">
import type { CraftEntryTypeEntryArticle } from '#shared/types/base'
import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

defineProps<CraftEntryTypeEntryArticle>()
</script>

<template>
  <NuxtLayout>
    <Headline as="h1">
      {{ singleSeoTitle }}
    </Headline>

    <ContentBuilder :content="contentBuilder" />
  </NuxtLayout>
</template>
