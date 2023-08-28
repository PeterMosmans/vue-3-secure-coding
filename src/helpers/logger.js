const logUrl = 'https://extract.pw/loghandler.html'

import { useFetch } from '@/helpers/fetch.js'

// Log some (dummy) information about the note, as we want to have some statistics
export function doSomeLogging(logData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      // Ensure this is a CORS-safe request
      'Content-Type': 'text/plain',
    },
    body: logData,
  }
  const { data, error } = useFetch(logUrl, requestOptions)
}
