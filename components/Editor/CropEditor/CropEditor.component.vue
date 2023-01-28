<template lang="pug">
.crop-editor
  CropPanel.crop-editor__panel.crop-editor__panel--horizontal
  CropPanel.crop-editor__panel.crop-editor__panel--vertical
  CropPanel.crop-editor__panel.crop-editor__panel--square
  CropPanel.crop-editor__panel.crop-editor__panel--free

  UploadImageCard.col-12.col-lg-8.col-xl-6.col-xxl-5
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { CropPanel } from '@/components/Panel'
import { UploadImageCard } from '@/components/Card'

export default defineComponent({
  components: {
    CropPanel,
    UploadImageCard
  },
  setup() {}
})
</script>

<style lang="scss" src="./CropEditor.component.scss"></style>
