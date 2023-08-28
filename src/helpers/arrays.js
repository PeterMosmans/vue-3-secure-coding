// Check if objects in newObjects need to be added to objects
// Note that objects eed to have an id property
export function addElements(objects, newObjects) {
  newObjects.forEach((x) => {
    if (objects.findIndex((y) => y.id === x.id) === -1) {
      objects.push(x)
    }
  })
}
