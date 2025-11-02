<script setup lang="ts">
import type { CraftPageEntryModules } from '#shared/types/base'

import ContentBuilder from '~/templates/builders/ContentBuilder.vue'

const { data, error } = await useCraftEntry<CraftPageEntryModules>()
  .uri('content-guidelines/modules')
  .one()

if (error.value) {
  console.error(error.value)
}

useHead({
  title: 'Fredmansky Modules',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <ContentBuilder
      v-if="data?.contentBuilder"
      :content="data?.contentBuilder"
    />
  </NuxtLayout>
</template>
