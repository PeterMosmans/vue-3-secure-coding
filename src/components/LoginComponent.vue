<template>
  <div class="title">Log in</div>
  <div class="input-form-small">
    <input
      v-model="username"
      type="text"
      class="input-field"
      placeholder="Username"
      ref="usernameInput"
      @keyup.enter="passwordInput.focus()"
    />
    <br />
    <input
      v-model="password"
      type="password"
      class="input-field"
      placeholder="Password"
      ref="passwordInput"
      @keyup.enter="login"
    />
    <br />
    <input v-model="stayLoggedIn" type="checkbox" class="checkbox" />
    Stay logged in
    <button
      :class="isDisabled ? 'button-disabled' : 'button'"
      @click="login"
      :disabled="isDisabled"
    >
      Login
    </button>
  </div>
  <ModalComponent
    v-if="showModal"
    @modal-closed="modalClosed"
    :title="title"
    :message="message"
  />
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import ModalComponent from '@/components/ModalComponent.vue'

const user = useUserStore()
import router from '@/router'
const username = ref('')
const password = ref('')
const waiting = ref(false)
const passwordInput = ref()
const usernameInput = ref()
const stayLoggedIn = ref(false)
const title = ref('')
const message = ref('')
const showModal = ref(false)

// Check whether the submit button can be used yet
const isDisabled = computed(
  () => !username.value || !password.value || waiting.value,
)

watch(
  () => user.loggedIn,
  () => {
    if (user.loggedIn) {
      // Use the native Vue Router functionality
      router.push(router.currentRoute.value.query.redirect || '/')
      // DO NOT DO THIS
      // window.open(router.currentRoute.value.query.redirect)
    }
  },
)

onMounted(() => {
  usernameInput.value.focus()
})

function modalClosed() {
  waiting.value = false
  showModal.value = false
  password.value = ''
  passwordInput.value.focus()
}

function login() {
  if (isDisabled.value && waiting.value) {
    modalClosed()
  }
  if (!isDisabled.value) {
    waiting.value = true
    user.login(
      username.value,
      password.value,
      stayLoggedIn.value,
      (data, error) => {
        if (!data.value || error.value || data.value.length !== 1) {
          title.value = 'Error'
          message.value = 'Wrong username and/or password'
          showModal.value = true
        }
      },
    )
  }
}
</script>
