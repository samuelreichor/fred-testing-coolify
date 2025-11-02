<script setup lang="ts">
import type { CraftOptionExperienceLevel } from '#shared/types/base'

defineProps<{
  experienceLevel: CraftOptionExperienceLevel
  salaryRanges: {
    learning: string
    proficient: string
    mastering: string
  }
}>()

const experienceLevels = [
  { value: 'learning' as const, label: 'Einsteiger:in' },
  { value: 'proficient' as const, label: 'Erfahren' },
  { value: 'mastering' as const, label: 'Oberguru?' },
]
</script>

<template>
  <div class="outside-container mt-ds-20">
    <div class="grid grid-cols-3 grid-rows-3 gap-x-ds-10 gap-y-ds-20 md:grid-rows-1 md:gap-0 overflow-hidden md:overflow-visible">
      <div class="hidden md:block md:col-span-3 relative">
        <div class="h-px w-full bg-foreground z-0" />
        <div class="absolute top-0 left-0 w-full grid grid-cols-3 -translate-y-1/2 z-10">
          <div
            v-for="(level, index) in experienceLevels"
            :key="`desktop-icon-${level.value}`"
            class="col-span-1 flex"
            :class="{
              'justify-start': index === 0,
              'justify-center': index === 1,
              'justify-end': index === 2,
            }"
          >
            <Icon
              v-if="experienceLevel.value === level.value"
              name="big-x"
              aria-hidden="true"
              class="md:w-[162px] md:h-[66px]"
            />
          </div>
        </div>
      </div>

      <template
        v-for="(level, index) in experienceLevels"
        :key="level.value"
      >
        <div class="md:hidden col-span-1 flex justify-center items-center relative">
          <div
            v-if="index === 0"
            class="absolute left-1/2 -translate-x-1/2 w-px bg-black z-0 top-0 h-screen"
          />
          <Icon
            v-if="experienceLevel.value === level.value"
            name="big-x"
            aria-hidden="true"
            class="relative z-10 w-full h-full"
          />
        </div>

        <div
          class="col-span-2 md:col-span-1 flex flex-col justify-center md:mt-ds-20 text-2xl"
          :class="{
            'md:text-left': index === 0,
            'md:text-center': index === 1,
            'md:text-right': index === 2,
          }"
        >
          <span>{{ level.label }}</span>
          <span>
            {{ salaryRanges[level.value] }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
