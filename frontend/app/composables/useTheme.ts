import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Theme } from '~/types/base'

export function useThemeSwitcher() {
  const colorMode = useColorMode()
  const theme = computed(() => colorMode.value as Theme)
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      const themeColorMetaTags = [...document.querySelectorAll('#theme-color-meta')] as HTMLMetaElement[]
      if (colorMode.value === 'dark') {
        themeColorMetaTags.forEach((metaTag) => {
          metaTag.content = '#ffffff'
        })
      }
      else {
        themeColorMetaTags.forEach((metaTag) => {
          metaTag.content = '#191919'
        })
      }
    },
  })
  return { isDark, colorMode, theme }
}

type UseAutoColorSwitchOptions = {
  onSwitch: () => void
  switchDelayMs?: number
  storageKey?: string
}

export function useAutoColorSwitch({
  onSwitch,
  switchDelayMs = 3000,
  storageKey = 'color-mode-auto-switched',
}: UseAutoColorSwitchOptions) {
  const showButton = ref(false)
  const progress = ref(0)
  const autoSwitched = ref(false)

  let rafId: number | null = null
  let startTs = 0

  const readStorage = () => {
    if (typeof window === 'undefined') return
    autoSwitched.value = window.sessionStorage.getItem(storageKey) === 'true'
  }

  const writeStorage = () => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(storageKey, 'true')
  }

  const stop = () => {
    if (rafId != null) cancelAnimationFrame(rafId)
    rafId = null
  }

  const reset = () => {
    stop()
    progress.value = 0
  }

  const switchTheme = () => {
    onSwitch()
    autoSwitched.value = true
    writeStorage()
  }

  const tick = (now: number) => {
    if (!startTs) startTs = now
    const elapsed = now - startTs
    progress.value = Math.min(1, elapsed / switchDelayMs)

    if (elapsed >= switchDelayMs) {
      switchTheme()
      reset()
      return
    }
    rafId = requestAnimationFrame(tick)
  }

  const start = () => {
    reset()
    startTs = 0
    rafId = requestAnimationFrame(tick)
  }

  const setShowButton = (val: boolean) => {
    showButton.value = val
    if (val) start()
    else reset()
  }

  onMounted(readStorage)
  onBeforeUnmount(stop)

  return {
    // state
    showButton,
    progress,
    autoSwitched,

    // actions
    setShowButton,
    switchTheme,
    start,
    reset,
    stop,
  }
}

export function useInvertedTheme(
  source: Theme | Ref<Theme>,
): ComputedRef<Theme> {
  return computed<Theme>(() => {
    const value = unref(source)
    if (value !== 'dark' && value !== 'light') {
      console.error('You should provide a valid theme ("dark" | "light")')
      return 'light' // Fallback
    }
    return value === 'dark' ? 'light' : 'dark'
  })
}
