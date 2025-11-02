<script setup lang="ts">
import type { CraftPageEntryGlobals } from '#shared/types/base'

const globals = inject<Ref<CraftPageEntryGlobals>>('globals')

const links = [
  {
    label: 'Shop',
    url: '/shop',
  },
  {
    label: 'Jobs',
    url: '/p/jobs',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/fredmansky/',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/fredmansky',
  },
  {
    label: 'Impressum',
    url: '/p/impressum',
  },
  {
    label: 'Datenschutz',
    url: '/p/datenschutz',
  },
]
</script>

<template>
  <div
    class="relative h-lvh clip-path-inset"
  >
    <div class="outside-container fixed bottom-0 h-lvh flex flex-col justify-between gap-ds-20 py-ds-10">
      <div class="flex flex-col gap-ds-20">
        <p>
          <LinkButtonBase
            href="tel:+4350353"
            :mobile-hover="false"
          >
            +43 50 353
          </LinkButtonBase>

          <br>

          <LinkButtonBase
            href="mailto:hello@fredmansky.at"
            :mobile-hover="false"
          >
            hello@fredmansky.at
          </LinkButtonBase>
        </p>

        <ul v-if="globals?.locations">
          <li
            v-for="location in globals?.locations"
            :key="location.title"
          >
            <SlideshowButton
              :href="location.page?.url"
              :images="location.locationImages"
              :prefix="location.location"
              :suffix="location.address"
            />
          </li>
        </ul>
      </div>

      <nav class="flex flex-col gap-ds-4">
        <p>
          <LinkButtonBase
            href="/p/newsletter"
            :mobile-hover="false"
          >
            Pssst! Willst du Werbenewsletter?
          </LinkButtonBase>
        </p>

        <p>
          <template
            v-for="(link, index) in links"
            :key="link.label"
          >
            <LinkButtonBase
              :href="link.url"
              :mobile-hover="false"
            >
              {{ link.label }}
            </LinkButtonBase>

            <span v-if="index < links.length - 1">, </span>
          </template>
        </p>
      </nav>
    </div>
  </div>
</template>
