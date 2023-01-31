export default {
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
