<script setup lang="ts">
import type { ContentMapping } from '@query-api/vue'
import { CraftNotImplemented } from '#components'
import About from '~/templates/pages/About.vue'
import Articles from '~/templates/pages/Articles.vue'
import Home from '~/templates/pages/Home.vue'
import Jobs from '~/templates/pages/Jobs.vue'
import JobsOverview from '~/templates/pages/JobsOverview.vue'
import Landingpage from '~/templates/pages/Landingpage.vue'
import Pages from '~/templates/pages/Pages.vue'
import Services from '~/templates/pages/Services.vue'
import Team from '~/templates/pages/Team.vue'
import Work from '~/templates/pages/Work.vue'
import WorkOverview from '~/templates/pages/WorkOverview.vue'

const mapping: ContentMapping = {
  pages: {
    'articles': Articles,
    'jobs': Jobs,
    'homepage': Home,
    'pages:entry_about': About,
    'pages:entry_articles': CraftNotImplemented,
    'pages:entry_jobs': JobsOverview,
    'pages:entry_landingpage': Landingpage,
    'pages:entry_pages': Pages,
    'pages:entry_services': Services,
    'pages:entry_work': WorkOverview,
    'team:entry_team': Team,
    'work:entry_caseStudy': Work,
    'work:entry_reference': CraftNotImplemented,
  },
}

const uri = useCraftUri()
const { data, error } = useCraftEntry()
  .uri(uri.value)
  .one()

if (error.value) {
  console.error(error.value)
}

provide('entry', data)

// set seo tags
useSeoMatic()
</script>

<template>
  <CraftPage
    v-if="data"
    :config="mapping"
    :content="data"
  />
</template>
