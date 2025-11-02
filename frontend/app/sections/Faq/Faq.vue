<script setup lang="ts">
import Accordion from '~/components/Accordion/Accordion.vue'

defineProps<{
  headline: string | null
  accordionData: CraftEntryTypeBlockAccordionContent[] | null
  link?: CraftLinkIt | null
  reducedSpace: boolean | null
}>()
</script>

<template>
  <div
    class="container"
    :class="reducedSpace ? 'mt-ds-16' : 'mt-ds-40' "
  >
    <div class="col-span-full">
      <Headline
        v-if="headline"
        as="h2"
        class="mb-ds-4"
      >
        {{ headline }}
      </Headline>

      <div
        v-if="accordionData && accordionData.length > 0"
        class="max-md:space-y-2 mb-ds-10"
      >
        <Accordion
          v-for="(item, index) in accordionData"
          :key="index"
          :summary="item.singleLabel || ''"
          :content="item.singleRichText || ''"
          :heading-level="headline ? 'h3' : 'h2'"
        />
      </div>

      <LinkButton
        v-if="link"
        :link="link"
      >
        {{ link.label }}
      </LinkButton>
    </div>
  </div>
</template>
