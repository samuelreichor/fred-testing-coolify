<script setup lang="ts">
import type { Theme } from '~/types/base'
import { lockScroll, releaseScroll } from '~/utils/helper'

type Link = {
  title: string
  uri: string
}

const links: Link[] = [
  {
    title: 'Arbeiten',
    uri: '/p/work',
  },
  {
    title: 'Leistungen',
    uri: '/p/services',
  },
  {
    title: 'Agentur',
    uri: '/p/about',
  },
  {
    title: 'Global',
    uri: '/p/articles',
  },
]

const { theme = 'light' } = defineProps<{
  theme?: Theme
}>()

const isOpen = ref(false)
const route = useRoute()
const router = useRouter()

const navigation = useTemplateRef<HTMLElement | null>('navigation')
const mobileCloseBtn = useTemplateRef<HTMLElement | null>('mobileCloseBtn')
const mobileShowBtn = useTemplateRef<HTMLElement | null>('mobileShowBtn')
const mobileLastNode = useTemplateRef<ComponentPublicInstance>('mobileLastNode')

/* Theming and Hidden Features */
const { isDark } = useThemeSwitcher()
function switchThemeIfYouCan() {
  isDark.value = !isDark.value
}

const {
  showButton,
  setShowButton,
  switchTheme,
} = useAutoColorSwitch({ onSwitch: () => switchThemeIfYouCan() })

/* Core Functionality */
function focusMobileCloseBtn() {
  nextTick(() => {
    mobileCloseBtn.value?.focus()
  })
}

function focusMobileOpenBtn() {
  nextTick(() => {
    mobileShowBtn.value?.focus()
  })
}

function show() {
  if (isOpen.value) return
  isOpen.value = true
  focusMobileCloseBtn()
  lockScroll()
}

function hide() {
  if (!isOpen.value) return
  isOpen.value = false
  focusMobileOpenBtn()
  releaseScroll()
}

function toggle() {
  if (isOpen.value) {
    hide()
  }
  else {
    show()
  }
}

function onResize() {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  if (isDesktop) hide()
}

/* A11Y Functions */
function focusTrap(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key !== 'Tab') return

  const first = mobileCloseBtn.value
  const last = mobileLastNode.value?.$el
  if (!first || !last) return

  if (document.activeElement === first && e.shiftKey) {
    e.preventDefault()
    last.focus()
  }
  else if (document.activeElement === last && !e.shiftKey) {
    e.preventDefault()
    first.focus()
  }
}

const isCurrent = (href: string) => route.path === href

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault()
    hide()
  }
}

onMounted(() => {
  navigation.value?.setAttribute('data-theme', theme)
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('keydown', focusTrap)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('keydown', focusTrap)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <nav
    ref="navigation"
    class="relative text-color-navigation z-40"
    :data-theme="theme"
  >
    <NuxtLink
      href="#main"
      class="focus:translate-y-0 -translate-y-full absolute inset-x-0 h-full flex justify-center items-center bg-background text-foreground z-50 opacity-90"
    >
      Navigation überspringen
    </NuxtLink>

    <!-- Desktop Navigation -->
    <ul class="outside-container py-6 hidden md:flex w-full gap-6 justify-between">
      <li class="hidden md:block">
        <div
          class="flex relative"
          @mouseenter="setShowButton(true)"
          @mouseleave="setShowButton(false)"
          @focusin="setShowButton(true)"
        >
          <NuxtLink
            :class="showButton && 'text-transparent'"
            to="/"
          >
            Fredmansky
          </NuxtLink>
          <client-only>
            <button
              v-show="showButton"
              class="absolute inset-0 overflow-visible flex items-center justify-center"
              aria-label="Auto Theme Switch"
              @click="router.push('/')"
              @mouseleave="setShowButton(false)"
              @blur="setShowButton(false)"
            >
              <img
                class="object-contain w-full"
                :src="`/images/gifs/logo-animated--${theme}.gif`"
                alt="Animiertes Fredmansky Logo"
              >
            </button>
          </client-only>
        </div>
      </li>
      <li
        v-for="link in links"
        :key="link.uri"
      >
        <LinkButtonBase
          :to="link.uri"
          :aria-current="isCurrent(link.uri) ? 'page' : undefined"
          :theme="theme"
          :mobile-hover="false"
        >
          {{ link.title }}
        </LinkButtonBase>
      </li>
    </ul>

    <!-- Mobile Navigation -->
    <div class="flex justify-between outside-container">
      <button
        tabindex="-1"
        aria-hidden="true"
        class="w-28 my-4 md:hidden"
        @click="switchTheme"
      />
      <button
        ref="mobileShowBtn"
        class="md:hidden py-4"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="menuId"
        @click="toggle"
      >
        <span class="sr-only">Navigation öffnen</span>
        <Icon
          name="hamburger"
        />
      </button>
    </div>

    <transition name="fade">
      <div
        v-show="isOpen"
        class="lg:hidden outside-container bg-foreground text-background fixed min-h-dvh inset-0 py-4 flex flex-col justify-between"
      >
        <div>
          <div class="text-right">
            <button
              ref="mobileCloseBtn"
              class="md:hidden"
              aria-expanded="true"
              aria-controls="menuId"
              @click="hide"
            >
              <span class="sr-only">Navigation schließen</span>
              <Icon
                name="close"
              />
            </button>
          </div>
          <ul class="flex flex-col gap-4 mt-ds-32">
            <li
              v-for="(link) in links"
              :key="link.uri"
            >
              <LinkButtonBase
                :to="link.uri"
                :aria-current="isCurrent(link.uri) ? 'page' : undefined"
                :theme="theme === 'dark' ? 'light' : 'dark'"
                :mobile-hover="false"
                @click="hide"
              >
                {{ link.title }}
              </LinkButtonBase>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <LinkButtonBase
              href="tel:+4350353300"
              :theme="theme === 'dark' ? 'light' : 'dark'"
              :mobile-hover="false"
            >
              +43 50 353-300
            </LinkButtonBase>
          </li>
          <li>
            <LinkButtonBase
              ref="mobileLastNode"
              href="mailto:hallo@fredmansky.at"
              :theme="theme === 'dark' ? 'light' : 'dark'"
              :mobile-hover="false"
            >
              hallo@fredmansky.at
            </LinkButtonBase>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.text-color-navigation[data-theme="dark"] {
  color: var(--color-white);
}

.text-color-navigation[data-theme="light"] {
  color: var(--color-black);
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: var(--default-transition-timing-function);
  transition-duration: 150ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
