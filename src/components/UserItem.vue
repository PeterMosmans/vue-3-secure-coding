<template>
  <tr>
    <td>{{ user.username }}</td>
    <td>
      <input
        type="checkbox"
        v-model="user.isAdmin"
        :checked="user.isAdmin"
        @change="updateUser"
      />
    </td>
    <td><button @click="emit('deleteUser')">Delete</button></td>
  </tr>
</template>

<script setup>
const props = defineProps(['user'])
const emit = defineEmits(['deleteUser'])
const baseUrl = '/api/accounts'

function updateUser() {
  console.log(props.user.id + ' ' + props.user.admin + ' ' + props.user)
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props.user),
  }
  console.log('App.vue - updating user remotely')
  fetch(baseUrl + '/' + props.user.id, requestOptions)
    .then((response) => response.json())
    .then(() => console.log('Modified user'))
}
</script>
