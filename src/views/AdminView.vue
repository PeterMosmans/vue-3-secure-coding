<template>
  <div v-if="user.user.isAdmin">
    <div class="title">Admin page</div>
    <div>
      <table>
        <caption>
          Overview of all users
        </caption>
        <tr>
          <th>username</th>
          <th>admin</th>
        </tr>
        <UserItem
          v-for="user in admin.users"
          :key="user.id"
          :user="user"
          @delete-user="deleteUser(user.id)"
        />
      </table>
    </div>
  </div>
  <div v-else class="title">Sorry, you need to be admin</div>
</template>

<script setup>
import { onMounted } from 'vue'
import UserItem from '@/components/UserItem.vue'
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin'

const admin = useAdminStore()
const user = useUserStore()

onMounted(() => {
  admin.retrieveUsers()
  console.log(user.user.isAdmin)
})
function deleteUser(id) {
  admin.deleteUser(id)
}
</script>

<style>
.ul {
  @apply m-0;
}
</style>
