<template>
  <div class="input-form">
    <textarea
      ref="inputField"
      v-model="message"
      type="text"
      class="note-input"
      @keyup.enter="enterKey()"
    ></textarea>
    <br />
    <input
      v-model="user.user.enterSave"
      type="checkbox"
      @change="user.storeSettings"
    />
    Save with enter
    <button
      :class="message ? 'button' : 'button-disabled'"
      :disabled="message.value"
      type="button"
      @click="addNote()"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useNotesStore } from '@/stores/notes'
const user = useUserStore()
const notes = useNotesStore()

// Run code after the component has finished the initial rendering
onMounted(() => {
  inputField.value.focus()
})

const inputField = ref(null)
const message = ref('')

// Handle the enter key being pressed
function enterKey() {
  if (!user.user.enterSave) {
    return
  }
  // Remove the trailing enter
  message.value = message.value.trimEnd()

  addNote()
}

function addNote() {
  notes.addNote(message.value)

  // Clear the note input once we've added it
  message.value = ''
  inputField.value.focus()
}
</script>

<style scoped>
.note-add {
  @apply bg-yellow-100;
  @apply h-40;
  @apply p-2;
  @apply m-2;
  @apply rounded;
}
</style>
