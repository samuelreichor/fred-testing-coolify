<script setup lang="ts">
import type { CraftEntryRelation, CraftLinkIt } from '#shared/types/base'
import { getFullPathFromUrl } from '~/utils/helper'

const { partner = [] } = defineProps<{
  services: CraftEntryRelation[]
  projectTeam: CraftEntryRelation[]
  website?: CraftLinkIt | null
  partner?: CraftEntryRelation[] | null
  awards?: CraftEntryRelation[] | null
}>()

const partnerIds = getIdsFromEntryRelations(partner ?? [])
const { data: partnerEntries, error } = partnerIds.length
  ? useCraftEntry<CraftPageEntryPartner[]>()
      .section('partner')
      .id(partnerIds)
      .all()
  : { data: [], error: ref(null) }

if (error.value) {
  console.error(error.value)
}
</script>

<template>
  <div class="outside-container flex flex-col gap-ds-10 pt-ds-40">
    <RichText>
      <h2>
        Leistungen
      </h2>
      <p>
        {{ services.map(e => e.title).join(', ') }}
      </p>
    </RichText>

    <RichText
      v-if="projectTeam.length"
    >
      <h2>
        Projektteam
      </h2>
      <p>
        <template
          v-for="(p, index) in projectTeam"
          :key="p.id"
        >
          <NuxtLink :to="getFullPathFromUrl(p.url)">
            {{ p.title }}
          </NuxtLink>{{ index < projectTeam.length -1 ? ', ' : '' }}
        </template>
      </p>
    </RichText>
    <RichText
      v-if="partnerEntries && partnerEntries.length"
    >
      <h2>
        Credits
      </h2>
      <p>
        <template
          v-for="(p, index) in partnerEntries"
          :key="p.metadata.id"
        >
          <NuxtLink
            :href="p.singleLink?.url"
            :target="p.singleLink?.target"
          >
            {{ p.title }}
          </NuxtLink>{{ index < partnerEntries.length -1 ? ', ' : '' }}
        </template>
      </p>
    </RichText>
    <RichText
      v-if="awards && awards.length"
    >
      <h2>
        Awards
      </h2>
      <p>
        {{ awards.map(e => e.title).join(', ') }}
      </p>
    </RichText>
    <div v-if="website">
      <LinkButton :link="website" />
    </div>
  </div>
</template>
