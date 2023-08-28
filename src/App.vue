<template>
  <div class="h-screen">
    <div class="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
      <div class="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
        <div class="sticky top-0 p-4 w-full">
          <ul
            class="flex sm:flex-col overflow-hidden content-center justify-between"
          >
            <li>
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <div v-if="!user.loggedIn">
              <li>
                <RouterLink to="/login" class="nav-link">Login</RouterLink>
              </li>
              <li>
                <RouterLink to="/signup" class="nav-link">Signup</RouterLink>
              </li>
            </div>
            <div v-else>
              <li>
                <RouterLink to="user" class="nav-link">Userpage</RouterLink>
              </li>
              <div v-if="user.user.isAdmin">
                <li>
                  <RouterLink to="admin" class="nav-link">Admin</RouterLink>
                </li>
              </div>
              <li>
                <RouterLink to="/logout" class="nav-link"
                  >Log out {{ user.user.username }}</RouterLink
                >
              </li>
            </div>
          </ul>
        </div>
      </div>
      <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
        <RouterView />
      </main>
    </div>
    <footer
      class="mt-auto p-1 text-xs p-1 text-right w-full text-pink-900 bottom-0"
    >
      <div v-bind:style="user.user.style">
        Built with Vue 3 / Vite / Vue Router / Pinia / Tailwind CSS
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user'
import { RouterLink, RouterView } from 'vue-router'
const user = useUserStore()
// Helper function to display all available environment variables
for (const [key, value] of Object.entries(import.meta.env)) {
  console.log(key + ' ' + value)
}
</script>

<style>
.nav-link,
.router-link-active {
  @apply my-2;
  @apply block;
  @apply rounded;
  @apply bg-neutral-100;
  @apply px-7;
  @apply pb-3.5;
  @apply pt-4;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply leading-tight;
  @apply text-neutral-500;
  @apply mr-4;
}

.router-link-active {
  @apply bg-neutral-200;
}
</style>
