<script setup lang="ts">
defineProps<{
  summary: string
  content: string
  headingLevel?: 'h2' | 'h3'
}>()
</script>

<template>
  <div>
    <details class="group peer">
      <summary
        class="flex cursor-pointer items-start gap-4 font-medium list-none text-left"
      >
        <span class="relative shrink-0 mt-[calc((var(--line-base-height)-1.5rem)/2)] md:mt-[calc((var(--line-base-height)-3rem)/2)] w-6 h-6 md:w-12 md:h-12 md:order-last text-foreground">
          <Icon
            name="chevron-right"
            aria-hidden="true"
            class="transition-['opacity','transform'] duration-300 absolute inset-0 inline-flex origin-center group-open:opacity-100 group-open:-rotate-90 md:opacity-0 group-hover:md:opacity-100"
          />
        </span>
        <Headline
          :as="headingLevel || 'h3'"
          class="!text-wrap"
        >
          {{ summary }}
        </Headline>
      </summary>
    </details>

    <div
      class="grid overflow-hidden grid-rows-[0fr] peer-open:grid-rows-[1fr] transition-all duration-500 ease-in-out"
    >
      <div class="min-h-0">
        <div
          class="pt-2 pb-6 max-md:pl-10"
          v-html="content"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
</style>
