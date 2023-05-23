<template lang="pug">
.upload-image-card(ref="rootRef")
  .upload-image-card-head
    AppIcon.upload-image-card-head__icon(name="heroicons-solid:photo" :width="32" :height="32")
    h1.upload-image-card-head__title {{ $t('uploader.title') }}

  p.upload-image-card__description(v-html="$t('uploader.description')")

  .upload-image-card-action
    vs-button.upload-image-card-action__button(size="xl" primary active flat :loading="isBusy" @click.native="handleClickUploadButton")
      | {{ $t('uploader.choosePhoto') }}

  // File Input
  input#imageFile(ref="imageFileRef" type="file" v-show="false" :accept="inputAcceptedFileExtensions" @change="handleChangeFile")
</template>

<script>
import { defineComponent, useContext, useStore, ref, computed, watch } from '@nuxtjs/composition-api'
import useEditor from '@/hooks/useEditor'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()
    const store = useStore()

    const { sleep, acceptedFileExtensions, getFileExtension } = useEditor()

    const rootRef = ref(null)
    const imageFileRef = ref(null)

    const isBusy = computed(() => store.getters['editor/isBusy'])
    const inputAcceptedFileExtensions = computed(() => {
      return acceptedFileExtensions.value
        .map(extension => {
          return `image/${extension}`
        })
        .join(',')
    })

    const handleClickUploadButton = () => {
      imageFileRef.value.click()
    }

    const droppedFiles = computed(() => store.getters['editor/droppedFiles'])

    watch(
      () => droppedFiles.value,
      value => {
        const file = value[0]
        setFile(file)
      }
    )

    const handleChangeFile = () => {
      const file = imageFileRef.value.files[0]
      setFile(file)
    }

    const setFile = file => {
      store.commit('editor/SET_IS_BUSY', true)

      const fileExtension = getFileExtension(file.name).toLowerCase()

      if (acceptedFileExtensions.value.includes(fileExtension)) {
        sleep(1000).then(() => {
          store.commit('editor/SET_IS_READY', true)
          store.commit('editor/SET_IS_BUSY', false)
          store.commit('editor/SET_ORIGINAL', { file: file })
        })
      } else {
        store.commit('editor/SET_IS_BUSY', false)
        imageFileRef.value.value = null

        context.$izitoast.error({
          message: 'Unsupported file extension'
        })
      }
    }

    return {
      rootRef,
      imageFileRef,
      acceptedFileExtensions,
      inputAcceptedFileExtensions,
      isBusy,
      handleClickUploadButton,
      handleChangeFile
    }
  }
})
</script>

<style lang="scss" src="./UploadImageCard.component.scss"></style>
