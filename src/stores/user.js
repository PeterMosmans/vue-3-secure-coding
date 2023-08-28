import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/helpers/fetch.js'
import { useNotesStore } from '@/stores/notes'

const baseUrl = '/api/accounts'
const ApiKey = import.meta.env['VITE_API_KEY'] || ''

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    username: '',
    token: '',
    id: 0,
    storeNotesLocally: false,
    storeNotesRemotely: true,
    enterSave: true,
    isAdmin: false,
    style: '',
  })
  const loggedIn = ref(false)
  const notes = useNotesStore()

  watch(
    () => user.id,
    () => {
      notes.loadNotes(user.id, user.storeNotesLocally)
    },
  )

  watch(
    () => user.storeNotesLocally,
    () => {
      if (!user.storeNotesLocally) {
        notes.removeLocally()
      } else {
        notes.storeLocally()
      }
    },
  )

  // Authentication function: Sends username and password to login endpoint
  // If successful, the callback will be the loginUser function
  // The callback is used when any response (data and/or error) is received
  //
  // Note that this is highly insecure, as sensitive parameters are sent as GET request.
  // However, we're not interested in the API - this is a mock-up.
  function login(username, password, stayLoggedIn, callback) {
    const { data, error } = useFetch(
      baseUrl + '?username=' + username + '&password=' + password,
      {},
    )
    watch(data, () => {
      console.log('We received data from the server: ' + data.value)
      if (data.value.length === 1) {
        loadUser(data.value[0])

        if (stayLoggedIn) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
      callback(data, error)
    })
    watch(error, () => {
      console.log('We received error: ' + error.value)
      callback(data, error)
    })
  }

  // Signup function: Sends username and password to signup endpoint
  // The callback is used when any response (data and/or error) is received
  // "restricted" function, therefore add API Key
  function signup(username, password, callback) {
    const submitData = {
      username: username,
      password: password,
      storeNotesLocally: false,
      storeNotesRemotely: true,
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': ApiKey,
      },
      body: JSON.stringify(submitData),
    }
    const { data, error } = useFetch(baseUrl, requestOptions)
    watch(data, () => {
      callback(data, error)
    })
    watch(error, () => {
      callback(data, error)
    })
  }

  // Loads userdata into user store object
  function loadUser(userdata) {
    user.username = userdata.username
    user.id = userdata.id
    user.storeNotesLocally = userdata.storeNotesLocally
    user.storeNotesRemotely = userdata.storeNotesRemotely
    user.enterSave = userdata.enterSave
    user.isAdmin = Boolean(userdata.isAdmin)
    user.token = userdata.token
    user.style = userdata.style
    loggedIn.value = true
  }

  // Save current user settings

  function storeSettings() {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }
    const { data, error } = useFetch(baseUrl + '/' + user.id, requestOptions)
    watch(data, () => {
      console.debug('Successfully modified user settings')
    })
    watch(error, () => {
      console.error('Could not store user settings')
    })
  }

  function logout() {
    notes.removeLocally()
    // Remove reactive array of notes
    notes.notes.splice(0)
    user.isAdmin = false
    user.username = ''
    user.token = ''
    user.id = 0
    user.stayLoggedIn = false
    user.storeNotesLocally = true
    user.storeNotesRemotely = false
    user.style = ''
    localStorage.removeItem('user')
    loggedIn.value = false
  }

  // See if we can find a user account in local storage, and if so, load that
  function loginLocalUser() {
    const userdata = localStorage.getItem('user')
    if (userdata) {
      loadUser(JSON.parse(userdata))
      return true
    }
    return false
  }

  function storeNotes() {
    if (user.storeNotesLocally) {
      notes.storeLocally()
    }
  }

  return {
    user,
    loggedIn,
    login,
    loginLocalUser,
    logout,
    signup,
    storeSettings,
    storeNotes,
  }
})
