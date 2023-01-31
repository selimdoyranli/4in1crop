export default {
  SET_ORIGINAL(state, { file }) {
    state.original.file = file
  },
  SET_CROPPED(state, { type, coordinates, file }) {
    state.cropped[type] = {
      key: type,
      coordinates,
      file
    }
  }
}
