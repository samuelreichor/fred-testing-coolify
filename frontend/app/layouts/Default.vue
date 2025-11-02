<script lang="ts" setup>
import { useGsap } from '#gsap'
import type {
  CraftEntryTypeEntryAbout, CraftEntryTypeEntryArticles,
  CraftEntryTypeEntryArticle, CraftEntryTypeEntryCaseStudy,
  CraftEntryTypeEntryHomepage, CraftEntryTypeEntryJob, CraftEntryTypeEntryJobs,
  CraftEntryTypeEntryPages, CraftEntryTypeEntryTeam, CraftEntryTypeEntryWork,
  CraftEntryTypeEntryReference, CraftEntryTypeEntryLandingpage, CraftPageEntryGlobals,
} from '#shared/types/base'

type CraftEntryType
  = CraftEntryTypeEntryHomepage
    | CraftEntryTypeEntryAbout
    | CraftEntryTypeEntryArticle
    | CraftEntryTypeEntryArticles
    | CraftEntryTypeEntryCaseStudy
    | CraftEntryTypeEntryJobs
    | CraftEntryTypeEntryJob
    | CraftEntryTypeEntryLandingpage
    | CraftEntryTypeEntryPages
    | CraftEntryTypeEntryReference
    | CraftEntryTypeEntryTeam
    | CraftEntryTypeEntryWork

const isProduction = useRuntimeConfig().public.environment === 'production'
const lenisRef = useTemplateRef('lenisRef')

const site = useCraftCurrentSite()
const { data: globalsData, error: globalsError } = await useCraftEntry<CraftPageEntryGlobals>()
  .site(site.value.handle)
  .section('globals')
  .one()

if (globalsError.value) {
  console.error(globalsError.value)
}

provide('globals', globalsData)

const data = inject<Ref<CraftEntryType>>('entry')

watchEffect((onInvalidate) => {
  function update(time: number) {
    lenisRef.value?.lenis?.raf(time * 1000)
  }
  useGsap.ticker.add(update)

  onInvalidate(() => {
    useGsap.ticker.remove(update)
  })
})

const { theme } = useThemeSwitcher()
const navigationTheme = computed(() => theme.value)

// enables hot reloading for live previews
if (useCraftPreview().livePreview) {
  onMounted(() => {
    window.addEventListener('message', async (e) => {
      if (e.data !== 'entry:live-preview:updated') {
        return
      }

      try {
        await refreshNuxtData()
      }
      catch (e) {
        console.error(e)
      }
    })
  })
}
</script>

<template>
  <div>
    <VueLenis
      ref="lenisRef"
      root
      :options="{ autoRaf: false }"
    >
      <slot name="navigation">
        <Navigation :theme="navigationTheme" />
      </slot>
      <main id="main">
        <slot />
        <Debugger v-if="!isProduction" />
      </main>
      <footer class="pt-ds-40">
        <slot name="footer">
          <FooterTop :text="data?.entrySettings?.footerTopText" />
          <Footer />
        </slot>
      </footer>
      <LazyQuickEdit />
    </VueLenis>
  </div>
</template>
