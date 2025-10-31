<script setup>
import { ref } from 'vue'
import ExportHtmlButton from './ExportHtmlButton.vue'

const tableWrapperRef = ref(null)

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Title', key: 'title' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
]

const items = [
  { name: 'Alice Johnson', title: 'Product Manager', email: 'alice@example.com', status: 'Active' },
  { name: 'Bob Smith', title: 'Software Engineer', email: 'bob@example.com', status: 'Active' },
  { name: 'Carol Chen', title: 'Designer', email: 'carol@example.com', status: 'Inactive' },
  { name: 'Diego Ruiz', title: 'QA Analyst', email: 'diego@example.com', status: 'Active' },
  { name: 'Eve Summers', title: 'DevRel', email: 'eve@example.com', status: 'On leave' },
  { name: 'Frank Li', title: 'Security Engineer', email: 'frank@example.com', status: 'Active' },
  { name: 'Grace Hopper', title: 'Scientist', email: 'grace@example.com', status: 'Inactive' },
]
</script>

<template>
  <v-container class="pa-6" fluid>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" sm="6">
        <h2 class="text-h5">Mock Data Table</h2>
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


