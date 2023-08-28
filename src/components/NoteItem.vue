<template>
  <li>
    <div v-if="!editMode">
      <p v-html="note.note" />
      <span>
        Written at {{ props.note.time }}
        <button class="button-small" @click="editNote">edit</button>
        <button class="button-small" @click="notes.deleteNote(note.id)">
          delete
        </button>
      </span>
    </div>
    <div v-else>
      <textarea
        ref="inputField"
        v-model="edited"
        type="text"
        class="form-control"
      ></textarea>

      <span>
        <button class="button-small" @click="editNote">save</button>
        <button class="button-small" @click="editMode = false">cancel</button>
      </span>
    </div>
  </li>
</template>

<script setup>
import { onUpdated, ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
const notes = useNotesStore()
const props = defineProps(['note'])
// Run code after the component has finished the initial rendering
onUpdated(() => {
  if (editMode.value) {
    inputField.value.focus()
  }
})

const edited = ref('')
const inputField = ref(null)

// State counter: 1 - currently editing
const editMode = ref(false)

// Generic edit note function that checks what state editing is in
function editNote() {
  if (editMode.value) {
    notes.editNote(props.note.id, edited.value)
  } else {
    edited.value = props.note.note
  }
  editMode.value = !editMode.value
}
</script>

<style>
.note-list li {
  @apply bg-yellow-100;
  @apply m-1;
  @apply p-2;
  @apply border;
}

.note-list li span {
  @apply block;
  @apply bg-yellow-50;
  @apply border;
  @apply text-sm;
  @apply text-right;
}
</style>
