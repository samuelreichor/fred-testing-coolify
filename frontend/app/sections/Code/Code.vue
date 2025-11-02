<script setup lang="ts">
defineProps<{
  code: string | ''
  language?: string
}>()

const { theme } = useThemeSwitcher()
const currentTheme = computed(() => theme.value === 'dark' ? 'github-light' : 'github-dark')
</script>

<template>
  <div class="outside-container mt-ds-40">
    <div class="overflow-x-auto rounded-lg p-ds-4 bg-foreground no-scroll-bar">
      <ClientOnly>
        <Shiki
          :key="currentTheme"
          :lang="(language || 'javascript') as 'javascript'"
          :code="code"
          :highlight-options="{ theme: currentTheme }"
          class=" [&_.shiki]:leading-snug [&_.shiki]:!bg-transparent"
        />
      </ClientOnly>
    </div>
  </div>
</template>
