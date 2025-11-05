<script setup>
import { ref } from 'vue'
import ExportHtmlButton from './ExportHtmlButton.vue'

const tableWrapperRef = ref(null)

const headers = [
  { title: 'Player', key: 'player' },
  { title: 'Country', key: 'country' },
  { title: 'R1', key: 'r1', align: 'end' },
  { title: 'R2', key: 'r2', align: 'end' },
  { title: 'R3', key: 'r3', align: 'end' },
  { title: 'R4', key: 'r4', align: 'end' },
  { title: 'Total', key: 'total', align: 'end' },
  { title: 'To Par', key: 'toPar', align: 'end' },
]

const items = [
  { player: 'Scottie Scheffler', country: 'USA', r1: 68, r2: 65, r3: 70, r4: 67, total: 270, toPar: '-18' },
  { player: 'Rory McIlroy', country: 'NIR', r1: 67, r2: 68, r3: 69, r4: 68, total: 272, toPar: '-16' },
  { player: 'Jon Rahm', country: 'ESP', r1: 70, r2: 66, r3: 68, r4: 69, total: 273, toPar: '-15' },
  { player: 'Collin Morikawa', country: 'USA', r1: 69, r2: 67, r3: 71, r4: 67, total: 274, toPar: '-14' },
  { player: 'Viktor Hovland', country: 'NOR', r1: 68, r2: 70, r3: 68, r4: 69, total: 275, toPar: '-13' },
  { player: 'Xander Schauffele', country: 'USA', r1: 66, r2: 71, r3: 69, r4: 70, total: 276, toPar: '-12' },
  { player: 'Hideki Matsuyama', country: 'JPN', r1: 71, r2: 67, r3: 69, r4: 70, total: 277, toPar: '-11' },
]
</script>

<template>
  <v-container class="pa-6" fluid>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" sm="6">
        <h2 class="text-h5">Golf Tournament Leaderboard</h2>
        <div class="text-body-2 text-medium-emphasis">Current view can be saved as a standalone HTML file.</div>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end align-center">
        <ExportHtmlButton :target-ref="tableWrapperRef" filename="v-data-table" title="Table Export" />
      </v-col>
    </v-row>

    <div ref="tableWrapperRef">
      <v-card variant="outlined" class="rounded-lg">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          items-per-page="5"
          hide-default-footer
          density="comfortable"
          hover
        />
      </v-card>
    </div>
  </v-container>
</template>


