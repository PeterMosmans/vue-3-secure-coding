<template>
  <div>
    <button class="button" @click="loginLocalUser">Log in (locally)</button>
  </div>
  <ModalComponent
    v-if="showModal"
    @modal-closed="modalClosed"
    :title="title"
    :message="message"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import ModalComponent from '@/components/ModalComponent.vue'
const user = useUserStore()
const showModal = ref(false)
const message = ref('Could not log in - try to log in remotely')
const title = ref('Error')
function loginLocalUser() {
  const result = user.loginLocalUser()
  if (!result) {
    showModal.value = true
  }
}

function modalClosed() {
  showModal.value = false
}
</script>
