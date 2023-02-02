import { cropTypeEnum } from '@/enums'

export default () => ({
  isReady: false,
  isBusy: false,
  original: {
    key: cropTypeEnum.ORIGINAL,
    file: null
  },
  cropped: {
    horizontal: {
      key: cropTypeEnum.HORIZONTAL,
      coordinates: {},
      file: null
    },
    vertical: {
      key: cropTypeEnum.VERTICAL,
      coordinates: {},
      file: null
    },
    square: {
      key: cropTypeEnum.SQUARE,
      coordinates: {},
      file: null
    },
    free: {
      key: cropTypeEnum.FREE,
      coordinates: {},
      file: null
    }
  }
})
