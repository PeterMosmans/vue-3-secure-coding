import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@/helpers/fetch.js'
import { doSomeLogging } from '@/helpers/logger.js'
const baseUrl = '/api/notes'

export const useNotesStore = defineStore('notes', () => {
  const notes = reactive([])
  const userId = ref(0)
  const storeName = ref()

  // Set userId for the notes, and load the user's notes
  // if locally, then notes will be stored locally
  function loadNotes(id, locally) {
    userId.value = id
    if (userId.value) {
      console.debug('Loading notes for user ' + id)
      storeName.value = 'notes-' + userId.value
      loadNotesRemotely()
      if (locally) {
        storeLocally()
      }
    }
  }

  // If logged in, load notes from remote datastore
  function loadNotesRemotely() {
    const { data, error } = useFetch(baseUrl + '?user_id=' + userId.value, {})
    watch(data, () => {
      addNotes(data.value)
    })
    watch(error, () => {
      console.error('Could not load remote notes')
    })
  }

  // Check if any of the notes in newNotes need to be added to notes
  function addNotes(newNotes) {
    for (var x in newNotes) {
      // Only add notes that aren't already present in the array
      if (notes.findIndex((y) => y.id === newNotes[x].id) === -1) {
        notes.push(newNotes[x])
      }
    }
  }

  // Creates proper note object from a message
  function createNote(message) {
    var id = new Uint32Array(1)
    window.crypto.getRandomValues(id)
    const newNote = {
      note: message,
      user_id: userId.value,
      time: new Date().toDateString(),
      id: id[0],
    }
    return newNote
  }

  // Add a note for the current user
  function addNote(message) {
    const note = createNote(message)
    // add item to the beginning of the array
    notes.unshift(note)
    storeNoteRemotely(note)
  }

  // Updates the local list of notes
  function updateNoteLocally(note) {
    let index = notes.findIndex((x) => x.id === note.id)
    if (index > -1) {
      notes[index].note = note.note
      notes[index].time = note.time
    }
  }

  // Edit a note
  function editNote(id, message) {
    const note = createNote(message)
    note.id = id
    updateNoteLocally(note)
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    }
    const { data, error } = useFetch(baseUrl + '/' + id, requestOptions)
    watch(error, () => {
      console.error('Could not delete note remotely')
    })
  }

  // Save notes to local storage
  function storeLocally() {
    console.debug('Saving all notes (' + notes.length + ') to local storage')
    localStorage.setItem(storeName.value, JSON.stringify(notes))
  }

  // Remove local notes
  function removeLocally() {
    console.debug('Removing notes locally')
    localStorage.removeItem(storeName.value)
  }

  // Save note to remote storage
  function storeNoteRemotely(note) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }
    const { data, error } = useFetch(baseUrl, requestOptions)
    // Log a successful note store
    watch(data, () => doSomeLogging(note.time))
    watch(error, () => {
      console.error('Could not add note remotely')
    })
  }

  function deleteNote(id) {
    notes.splice(
      notes.findIndex((x) => x.id === id),
      1,
    )
    // Delete note remotely
    const requestOptions = {
      method: 'DELETE',
    }
    const { data, error } = useFetch(baseUrl + '/' + id, requestOptions)
    watch(error, () => {
      console.error('Could not delete note remotely')
    })
  }

  return {
    notes,
    loadNotes,
    addNote,
    editNote,
    deleteNote,
    storeLocally,
    removeLocally,
  }
})
