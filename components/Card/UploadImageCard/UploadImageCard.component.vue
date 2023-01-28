<template lang="pug">
.upload-image-card
  .upload-image-card-head
    AppIcon.upload-image-card-head__icon(name="heroicons-solid:photo" :width="32" :height="32")
    h1.upload-image-card-head__title KIRPMAYA BAŞLA

  p.upload-image-card__description Kırpmak istediğin bir fotoğrafı seç, 16:9, 9:16, 1:1 ve free oranlar için <br> tek ekranda hızlıca kırp ve indir.

  .upload-image-card-action
    vs-button.upload-image-card-action__button(size="xl" primary flat active)
      | Fotoğraf Seç
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup() {}
})
</script>

<style lang="scss" src="./UploadImageCard.component.scss"></style>
