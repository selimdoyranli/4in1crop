export default {
  isReady(state) {
    return state.isReady
  },

  isBusy(state) {
    return state.isBusy
  },

  original(state) {
    return state.original
  },

  horizontalCropped(state) {
    return state.cropped.horizontal
  },

  verticalCropped(state) {
    return state.cropped.vertical
  },

  squareCropped(state) {
    return state.cropped.square
  },

  freeCropped(state) {
    return state.cropped.free
  }
}
