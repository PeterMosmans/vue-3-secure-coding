<template>
  <GDialog v-model="showModal" max-width="300" local>
    <div class="modal">
      <div class="modal-title">{{ title }}</div>
      <div>{{ message }}</div>
      <button class="button" @click="closeModal">Close</button>
    </div>
  </GDialog>
</template>

<script setup>
import { ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'
const props = defineProps(['title', 'message'])
const emit = defineEmits(['modalClosed'])
const showModal = ref(true)
function closeModal() {
  showModal.value = false
  emit('modalClosed')
}
</script>

<style>
.modal {
  @apply bg-red-200;
  @apply p-2;
}

.modal-title {
  @apply text-xl;
  @apply w-max;
  @apply text-center;
  @apply p-2;
  @apply inline-block;
}
</style>
