<template>
  <div v-if="!user.loggedIn">
    <div>
      <div class="title">Not logged in</div>
      <div class="input-form-small">
        <router-link class="button" to="login">Log in (online)</router-link>
        <LoginLocalComponent>Log in (locally)</LoginLocalComponent>
        <router-link class="button" to="signup">Sign up</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="title">Notes</div>
    <div>
      <NoteAdd />
      <NoteList :notes="notes.notes" />
    </div>
  </div>
  <!-- <div>
    {{ $debug(notes.notes) }}
  </div> -->
</template>

<script setup>
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import NoteAdd from './NoteAdd.vue'
import NoteList from './NoteList.vue'
import LoginLocalComponent from '@/components/LoginLocalComponent.vue'
import { useUserStore } from '@/stores/user'
import { useNotesStore } from '@/stores/notes'
const user = useUserStore()
const notes = useNotesStore()

// Check whether any of the notes need to be stored
watch(notes, () => {
  user.storeNotes()
})
</script>

<style>
.link {
  @apply text-pink-900;
  @apply font-extrabold;
}
</style>
