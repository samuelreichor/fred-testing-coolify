import type { CraftEntryRelation } from '../../shared/types/base'

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}

export type DistributivePick<U, K extends PropertyKey>
  = U extends unknown ? Pick<U, Extract<keyof U, K>> : never

export function convertUrlsToOrigin(urls: Array<string | undefined>) {
  if (!urls || urls.length === 0 || urls.every(u => !u)) {
    return ['.ddev.site']
  }
  return urls.map(url => url?.replace('https://', '') ?? '')
}

export function getFullPathFromUrl(url: string) {
  if (!url) {
    return '/'
  }

  const pattern = /https?:\/\/[^/]+(\/.*)/
  const matches = url.match(pattern)

  if (matches && matches[1] !== undefined) {
    return matches[1]
  }

  return '/'
}

export function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) {
  let isWaiting = false

  return (...args: T) => {
    if (isWaiting) {
      return
    }

    callback(...args)
    isWaiting = true

    setTimeout(() => {
      isWaiting = false
    }, delay)
  }
}

export function lockScroll() {
  document.body.setAttribute('data-lenis-prevent', 'true')
  document.body.classList.add('overflow-hidden')
}

export function releaseScroll() {
  document.body.removeAttribute('data-lenis-prevent')
  document.body.classList.remove('overflow-hidden')
}

export function getIdsFromEntryRelations(entryRelations: CraftEntryRelation[]) {
  if (!entryRelations) {
    return []
  }
  return entryRelations.map(e => e.id)
}

export function fisherYatesShuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]!
    a[i] = a[j]!
    a[j] = tmp
  }
  return a
}

export function getFirstName(fullName: string): string {
  const parts = fullName.trim().split(' ')

  if (parts.length === 1) {
    return fullName
  }

  return parts.slice(0, -1).join(' ')
}
