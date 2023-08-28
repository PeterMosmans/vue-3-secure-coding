<template>
  <div class="note-list">
    <ul>
      <NoteItem v-for="note in notes" :key="note.id" :note="note" />
    </ul>
  </div>
</template>

<script setup>
import NoteItem from './NoteItem.vue'
// Define which properties can be set by parent components
defineProps(['notes'])
</script>

<style>
.note-list ul {
  @apply m-0;
  /*list-style: none;
  padding: 0; */
}
</style>
