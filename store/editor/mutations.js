import { cropTypeEnum } from '@/enums'

export default {
  SET_IS_READY(state, isReady) {
    state.isReady = isReady
  },

  SET_IS_BUSY(state, isBusy) {
    state.isBusy = isBusy
  },

  SET_ORIGINAL(state, { file }) {
    state.original.file = file
  },

  SET_CROPPED(state, { type, coordinates, file }) {
    state.cropped[type] = {
      key: type,
      coordinates,
      file
    }
  },

  CLEAR(state) {
    state.isReady = false
    state.isBusy = false

    state.original = {
      key: 'original',
      file: null
    }

    const cropTypes = [cropTypeEnum.HORIZONTAL, cropTypeEnum.VERTICAL, cropTypeEnum.SQUARE, cropTypeEnum.FREE]

    cropTypes.forEach(type => {
      state.cropped[type] = {
        key: type,
        coordinates: {},
        file: null
      }
    })
  }
}
