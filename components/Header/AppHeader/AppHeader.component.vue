<template lang="pug">
header.header.app-header
  AppLogo
  .app-header-action
    vs-button(flat active :disabled="!original.file" @click="downloadAll")
      AppIcon.me-1(name="charm:download")
      | Download
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppLogo,
    AppIcon
  },
  setup() {
    const store = useStore()

    const JSZip = require('jszip')
    const zip = new JSZip()
    const FileSaver = require('file-saver')

    const original = computed(() => store.getters['editor/original'])
    const horizontalCropped = computed(() => store.getters['editor/horizontalCropped'])
    const verticalCropped = computed(() => store.getters['editor/verticalCropped'])
    const squareCropped = computed(() => store.getters['editor/squareCropped'])
    const freeCropped = computed(() => store.getters['editor/freeCropped'])

    const downloadAll = () => {
      const croppedList = [horizontalCropped.value, verticalCropped.value, squareCropped.value, freeCropped.value]

      zip.file(`image-${original.value.key}.jpg`, original.value.file)
      croppedList.forEach(cropped => {
        URL.createObjectURL(cropped.file)

        zip.file(`image-${cropped.key}.jpg`, cropped.file)
      })

      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, '4in1crop-images.zip')
      })
    }

    return {
      original,
      downloadAll
    }
  }
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
