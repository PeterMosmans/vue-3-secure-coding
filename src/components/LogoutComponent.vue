<template>
  <div class="title">Log out</div>
  <div v-if="user.loggedIn" class="input-form-small">
    Logged in as {{ user.user.username }}
    <button class="button" @click="logout">Logout</button>
  </div>
  <div>
    Please note that logging out also means clearing all notes from local
    storage
  </div>
</template>

<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
const user = useUserStore()

function logout() {
  user.logout()
  router.push('/')
}
</script>
