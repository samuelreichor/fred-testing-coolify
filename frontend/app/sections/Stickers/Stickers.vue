<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useMouseInElement, useMediaQuery } from '@vueuse/core'
import { useGsap } from '#gsap'
import Icon from '~/components/Icon/Icon.vue'

const { stickerAssets } = defineProps<{
  stickerAssets: CraftAsset[]
}>()

type Sticker = {
  url: string
  ratio: 'square' | 'landscape' | 'portrait'
}

function getRatio(asset: CraftAsset) {
  const diff = Math.abs(asset.width - asset.height)
  if (diff < 16) return 'square'
  if (asset.width > asset.height) return 'landscape'
  return 'portrait'
}

const stickers: Sticker[] = stickerAssets.map(s => ({
  url: s.url,
  ratio: getRatio(s),
}))

const wrap = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside } = useMouseInElement(wrap)

type Placement = { xPct: number, yPct: number, sticker: Sticker, scale: number, rotate: number }
const placements = ref<Placement[]>([])

const deck = ref<Sticker[]>(fisherYatesShuffle(stickers))
const currentSticker = computed(() => deck.value[0] ?? null)

const isTouch = useMediaQuery('(hover: none), (any-pointer: coarse)')

const rotate = ref(Math.random() * 20 - 10)
function updateRotate() {
  rotate.value = Math.random() * 20 - 10
}

function advanceDeck() {
  deck.value.shift()
  if (deck.value.length === 0) {
    deck.value = fisherYatesShuffle(stickers)
  }
}

function toPercent(xPx: number, yPx: number) {
  const el = wrap.value!
  const r = el.getBoundingClientRect()
  const xPct = Math.max(0, Math.min(100, (xPx / r.width) * 100))
  const yPct = Math.max(0, Math.min(100, (yPx / r.height) * 100))
  return { xPct, yPct }
}

function animateLastSticker() {
  nextTick(() => {
    const imgs = wrap.value?.querySelectorAll('.sticker')
    const last = imgs?.[imgs.length - 1] as HTMLElement | undefined
    if (!last) return
    useGsap.fromTo(
      last,
      { '--s': 1.01 },
      { '--s': 1, 'duration': 0.25, 'ease': 'power2.out' },
    )
  })
}

function placeCore(xPx: number, yPx: number) {
  if (!currentSticker.value) {
    console.error('No Sticker selected')
    return
  }
  const { xPct, yPct } = toPercent(xPx, yPx)
  placements.value.push({
    xPct,
    yPct,
    sticker: currentSticker.value,
    scale: 1,
    rotate: rotate.value,
  })

  animateLastSticker()
  updateRotate()
  advanceDeck()
}

function place(e: MouseEvent) {
  if (isOutside.value || !wrap.value || !e.target) return

  if ((e.target as HTMLElement).closest('button.clearAllBtn')) return
  placeCore(elementX.value, elementY.value)
}

function placeAtTouch(e: TouchEvent) {
  if (!wrap.value || e.touches.length === 0) return

  if ((e.target as HTMLElement).closest('button.clearAllBtn')) return
  const t = e.touches[0]
  if (!t) {
    console.error('No touch point available')
    return
  }

  const r = wrap.value.getBoundingClientRect()
  const xPx = t.clientX - r.left
  const yPx = t.clientY - r.top
  placeCore(xPx, yPx)
}

const ripOffBtn = useTemplateRef('ripOffBtn')
function ripAllDown() {
  const el = wrap.value
  const btn = ripOffBtn.value
  if (!el || !btn) return
  const nodes = Array.from(el.querySelectorAll<HTMLElement>('.sticker'))
  if (!nodes.length) return

  useGsap.killTweensOf(nodes)
  useGsap.to(btn, {
    rotate: '+=360',
    duration: 0.4,
  })

  useGsap.to(nodes, {
    '--ty': (_: number, node: HTMLElement) => {
      const r = node.getBoundingClientRect()
      const distance = window.innerHeight - r.top + r.height + 400
      return `${distance}px`
    },
    'opacity': 0.8,
    'ease': 'power2.in',
    'duration': 0.6,
    'stagger': { each: 0.03, from: 'end' },
    'overwrite': 'auto',
    'delay': 0.2,
    onComplete() {
      placements.value = []
    },
  })
}

onMounted(() => {
  if (isTouch.value && wrap.value) {
    const r = wrap.value.getBoundingClientRect()
    placeCore(r.width / 2, r.height / 2)
  }
})
</script>

<template>
  <div
    ref="wrap"
    class="outside-container pt-ds-40 relative w-full h-full cursor-pointer"
    @click="place"
    @touchend="placeAtTouch"
  >
    <div class="grid gap-gutter">
      <div>
        <slot />
      </div>
      <div class="text-right">
        <button
          ref="ripOffBtn"
          class="clearAllBtn relative z-50 cursor-pointer"
          @click="ripAllDown()"
          @touchend="ripAllDown()"
        >
          <span class="sr-only">Alle Sticker runter reißen</span>
          <Icon
            name="reset"
            class="w-12 md:w-20"
          />
        </button>
      </div>
    </div>
    <img
      v-for="(p, i) in placements"
      :key="i"
      :src="p.sticker.url"
      :class="['absolute sticker pointer-events-none', p.sticker.ratio]"
      draggable="false"
      :style="{
        left: p.xPct + '%',
        top: p.yPct + '%',
        transform: `translate(-50%, -50%) translateY(var(--ty, 0px)) rotate(var(--rot, ${p.rotate}deg)) scale(var(--s, 1))`,
        willChange: 'transform',
      }"
      :alt="`sticker-${i}-${p.sticker.ratio}`"
      :data-ratio="p.sticker.ratio"
    >

    <Transition
      name="cursor"
      appear
      mode="out-in"
    >
      <img
        v-if="!isOutside && !isTouch && currentSticker"
        :key="currentSticker.url"
        :src="currentSticker.url"
        :class="['cursor absolute pointer-events-none', currentSticker.ratio]"
        draggable="false"
        :style="{
          left: elementX + 'px',
          top: elementY + 'px',
          transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(1.01)`,
        }"
        :alt="`sticker-cursor-${currentSticker.ratio}`"
        :data-ratio="currentSticker.ratio"
      >
    </Transition>
  </div>
</template>

<style scoped>
.cursor-enter-from,
.cursor-leave-to { opacity: 0; }
.cursor-enter-to,
.cursor-leave-from { opacity: 1; }
.cursor-enter-active,
.cursor-leave-active { transition: opacity .1s ease; }

.sticker,
.cursor {
  --landscape-width: 250px;
  --square-width: 150px;
  --portrait-width: 100px;

  @media (min-width: 768px) {
  --landscape-width: 325px;
  --square-width: 200px;
  --portrait-width: 150px;
}
}
.sticker.landscape,
.cursor.landscape {
  width: var(--landscape-width);
}
.sticker.square,
.cursor.square {
  width: var(--square-width);
}
.sticker.portrait,
.cursor.portrait {
  width: var(--portrait-width);
}
</style>
