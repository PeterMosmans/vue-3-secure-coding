import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/helpers/fetch.js'
import { addElements } from '@/helpers/arrays.js'
import { useUserStore } from '@/stores/user'

const baseUrl = '/api/accounts'

export const useAdminStore = defineStore('admin', () => {
  const users = reactive([])
  const user = useUserStore()

  // Admin function - Load all users
  function retrieveUsers() {
    const { data, error } = useFetch(baseUrl, {})

    watch(data, () => {
      addElements(users, data.value)
    })
    watch(error, () => {
      console.error('Could not retrieve users')
    })
  }

  // Admin function - Delete user
  function deleteUser(id) {
    users.splice(
      users.findIndex((x) => x.id === id),
      1,
    )
    // Delete user remotely
    const requestOptions = {
      method: 'DELETE',
    }
    const { data, error } = useFetch(baseUrl + '/' + id, requestOptions)
    watch(data, () => {
      retrieveUsers()
    })
    watch(error, () => {
      console.error('Could not delete user remotely')
    })
  }

  return {
    users,
    retrieveUsers,
    deleteUser,
  }
})
