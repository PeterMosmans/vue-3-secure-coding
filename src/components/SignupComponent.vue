<template>
  <div v-if="signedUp < 2">
    <div class="title">Sign up</div>
    <div class="input-form-small">
      <input
        v-model="username"
        type="text"
        class="input-field"
        ref="usernameInput"
        placeholder="Username"
        @keyup.enter="passwordInput.focus()"
      />
      <br />
      <input
        v-model="password"
        type="password"
        class="input-field"
        placeholder="Password"
        ref="passwordInput"
        @keyup.enter="passwordAgainInput.focus()"
      />
      <input
        v-model="passwordAgain"
        type="password"
        class="input-field"
        placeholder="Password (again)"
        ref="passwordAgainInput"
        @keyup.enter="submit()"
      />
      <br />
      <button
        :class="isDisabled ? 'button-disabled' : 'button'"
        @click="submit"
        :disabled="isDisabled"
      >
        Sign Up
      </button>
    </div>
  </div>
  <div v-else>
    Successfully signed up - please
    <router-link class="link" to="login">log in</router-link> to continue
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const username = ref('')
const password = ref('')
const passwordAgain = ref('')
const usernameInput = ref()
const passwordInput = ref()
const passwordAgainInput = ref()

onMounted(() => {
  usernameInput.value.focus()
})

// State of submitting:
// 0 - Has not submitted yet
// 1 - Submitted but no response received yet
// 2 - Received response from server
const signedUp = ref(0)

// Check whether the submit button can be used yet
const isDisabled = computed(
  () =>
    !username.value ||
    password.value === '' ||
    passwordAgain.value != password.value ||
    signedUp.value === 1,
)

// Submit data to sign up endpoint
function submit() {
  const user = useUserStore()
  signedUp.value = 1
  user.signup(username.value, password.value, (data, error) => {
    if (data.value && 'id' in data.value) {
      signedUp.value = 2
    } else {
      alert('Could not sign up')
      signedUp.value = 0
    }
  })
}
</script>
