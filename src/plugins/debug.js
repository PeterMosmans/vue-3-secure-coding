export default {
  install: (app, options) => {
    // Helper function that dumps the contents of an array of objects
    app.config.globalProperties.$debug = (objectArray) => {
      let message = ''
      objectArray.forEach((object) => {
        for (const [key, value] of Object.entries(object)) {
          message += key + ': ' + value + '\n'
        }
      })
      return message
    }
  },
}
