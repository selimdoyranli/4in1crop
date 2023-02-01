export default () => ({
  isReady: false,
  isBusy: false,
  original: {
    key: 'original',
    file: null
  },
  cropped: {
    horizontal: {
      key: 'horizontal',
      coordinates: {},
      file: null
    },
    vertical: {
      key: 'vertical',
      coordinates: {},
      file: null
    },
    square: {
      key: 'square',
      coordinates: {},
      file: null
    },
    free: {
      key: 'free',
      coordinates: {},
      file: null
    }
  }
})
