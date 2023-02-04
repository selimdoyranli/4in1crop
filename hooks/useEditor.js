import { ref } from '@nuxtjs/composition-api'

export default () => {
  const acceptedFileExtensions = ref(['jpg', 'jpeg', 'jfif', 'png', 'bmp'])

  /**
   * @function sleep Sleep for action
   * @param {number} ms Delay ms
   * @returns {Promise} Sleep time
   */
  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * @function getFileExtension Get file extension by filename
   * @param {string} filename
   * @returns {string} File extension (e.g: png, gif, GIF, jpg, JPG ...)
   */
  const getFileExtension = filename => {
    return filename.split('.').pop()
  }

  return {
    acceptedFileExtensions,
    sleep,
    getFileExtension
  }
}
