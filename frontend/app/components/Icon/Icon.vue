<script lang="ts" setup>
const props = defineProps<{ name: string }>()

async function loadIconAsComponent(name: string) {
  try {
    // Load module info for all svg icons
    // Note: This uses Vite-specific functionality, see <https://vitejs.dev/guide/features#glob-import>
    const allIconsAsModules = import.meta.glob<Component>('/assets/svg/*.svg', {
      query: 'component', // Import as Vue component - via "vite-svg-loader"
      eager: false, // Lazy-loaded
    })

    return await allIconsAsModules[`/assets/svg/${name}.svg`]!()
  }
  catch {
    console.error(
      `Icon with the name '${name}' does not exist in the 'app/assets/svg/' folder.`,
    )
  }
}
const iconComponent = ref<Component>()
iconComponent.value = await loadIconAsComponent(props.name)

watch(
  () => props.name,
  async (newName) => {
    iconComponent.value = await loadIconAsComponent(newName)
  },
)
</script>

<template>
  <Suspense>
    <component
      :is="iconComponent"
      :class="$attrs.class"
    />
  </Suspense>
</template>
