<script setup lang="ts">
const isHidden = ref(true)

const toggleIsActive = () => {
  isHidden.value = !isHidden.value
}
const columnAmount = 12
</script>

<template>
  <button
    class="z-50 relative text-[16px] bg-foreground text-background p-1"
    @click="toggleIsActive()"
  >
    Grid
  </button>
  <div
    :class="[
      ' fixed top-0 left-0 right-0 h-screen z-40',
      isHidden && 'hidden',
    ]"
  >
    <div class="container w-full h-full">
      <div
        v-for="(item, index) in columnAmount"
        :key="item"
        class="col-span-1 bg-accent/10 text-black flex justify-center items-end"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>
