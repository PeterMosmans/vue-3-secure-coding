import { ref, watchEffect, toValue } from 'vue'

// Generic fetch function
export function useFetch(url, requestOptions) {
  const data = ref(null)
  const error = ref(null)
  watchEffect(async () => {
    // Reset state before fetching...
    data.value = null
    error.value = null

    // Resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = toValue(url)

    try {
      const response = await fetch(urlValue, requestOptions)
      data.value = await response.json()
    } catch (e) {
      error.value = e
    }
  })
  console.log(url)
  return { data, error }
}
