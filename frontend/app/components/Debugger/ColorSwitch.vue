<script lang="ts" setup>
import { useInvertedTheme } from '~/composables/useTheme'

const { isDark, theme } = useThemeSwitcher()
const invertedTheme = useInvertedTheme(theme)
</script>

<template>
  <client-only>
    <button
      class="z-50 text-[16px] bg-foreground text-background p-1"
      @click="isDark = !isDark"
    >
      {{ invertedTheme }}
    </button>
  </client-only>
</template>
