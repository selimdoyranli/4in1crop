<template lang="pug">
.upload-image-card(ref="rootRef")
  .upload-image-card-head
    AppIcon.upload-image-card-head__icon(name="heroicons-solid:photo" :width="32" :height="32")
    h1.upload-image-card-head__title {{ $t('uploader.title') }}

  p.upload-image-card__description(v-html="$t('uploader.description')")

  .upload-image-card-action
    vs-button.upload-image-card-action__button(
      size="xl"
      primary
      active
      flat
      :loading="card.isBusy"
      @click.native="handleClickUploadButton"
    )
      | {{ $t('uploader.choosePhoto') }}

  // File Input
  input#imageFile(ref="imageFileRef" type="file" v-show="false" @change="handleChangeFile")
</template>

<script>
import { defineComponent, useStore, ref, reactive } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const store = useStore()

    const rootRef = ref(null)
    const imageFileRef = ref(null)

    const card = reactive({
      isBusy: false
    })

    const handleClickUploadButton = () => {
      imageFileRef.value.click()
    }

    const handleChangeFile = () => {
      card.isBusy = true

      setTimeout(() => {
        emit('onChooseFile', { fileInput: imageFileRef.value })
        card.isBusy = false
        store.commit('editor/SET_ORIGINAL', { file: imageFileRef.value.files[0] })
      }, 1000) // Create virtual delay effect
    }

    return {
      rootRef,
      imageFileRef,
      card,
      handleClickUploadButton,
      handleChangeFile
    }
  }
})
</script>

<style lang="scss" src="./UploadImageCard.component.scss"></style>
