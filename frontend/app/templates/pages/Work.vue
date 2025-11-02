<script setup lang="ts">
import type { CraftPageEntryCaseStudy } from '#shared/types/base'
import ContentBuilderWork from '~/templates/builders/ContentBuilderWork.vue'
import WorkFacts from '~/sections/WorkFacts/WorkFacts.vue'

const { settingsAppHeader, singleRelatedProjects = [] } = defineProps<CraftPageEntryCaseStudy>()

const navigationTheme = computed(() => settingsAppHeader ? 'dark' : 'light')
</script>

<template>
  <NuxtLayout>
    <template #navigation>
      <Navigation :theme="navigationTheme" />
    </template>
    <div class="max-md:outside-container md:-mt-(--navHeight)">
      <Image
        v-if="groupedProjectImages?.stage"
        :image="groupedProjectImages?.stage"
        transform="16:9"
        :lazy="false"
      />
    </div>
    <SectionHeroText
      :headline="title"
      :intro-text="singleSeoTitle ?? ''"
    />

    <SectionText
      v-if="singleIntroText"
      class="!mt-ds-10"
      :text="singleIntroText"
    />

    <ContentBuilderWork :content="contentBuilderWork" />

    <WorkFacts
      :services="categoryService"
      :project-team="singleAuthor"
      :website="singleLink"
      :partner="categoryPartner"
      :awards="categoryAwards"
    />

    <LazySectionRelatedProjects
      v-if="singleRelatedProjects && singleRelatedProjects.length > 1"
      :related-projects="singleRelatedProjects ?? []"
      headline="Mehr?"
    />
  </NuxtLayout>
</template>
