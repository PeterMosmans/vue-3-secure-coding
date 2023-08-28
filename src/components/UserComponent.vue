<template>
  <div class="title">Modify user settings for {{ user.user.username }}</div>
  <br />
  <div class="input-form">
    <input
      v-model="user.user.enterSave"
      class="checkbox"
      type="checkbox"
      @change="user.storeSettings"
    />Enter saves note<br />
    <input
      v-model="user.user.storeNotesLocally"
      class="checkbox"
      type="checkbox"
      @change="changeLocalStorage"
    />Store notes locally<br />
    <div>Customize footer style</div>
    <textarea
      v-model="user.user.style"
      type="text"
      class="text-input"
    ></textarea>
    <button class="button" type="button" @click="updateStyle()">
      Update style
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()

function changeLocalStorage() {
  user.storeSettings()
}

function updateStyle() {
  user.storeSettings()
}
</script>
