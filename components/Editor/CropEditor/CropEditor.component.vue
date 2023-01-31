<template lang="pug">
.crop-editor
  CropPanel.crop-editor__panel(
    v-for="panel in editor.panels"
    :key="panel.type"
    ref="panelRef"
    :type="panel.type"
    :src="editor.src"
    :class="[getPanelClass(panel), disabledPanelClass]"
    :aspect-ratio="panel.aspectRatio"
    :stencil-props="panel.stencilProps"
  )

  UploadImageCard.col-12.col-lg-8.col-xl-6.col-xxl-5(v-if="editor.isVisibleUploader" @onChooseFile="handleOnChooseFile")
</template>

<script>
import { defineComponent, ref, reactive, computed } from '@nuxtjs/composition-api'
import { CropPanel } from '@/components/Panel'
import { UploadImageCard } from '@/components/Card'

export default defineComponent({
  components: {
    CropPanel,
    UploadImageCard
  },
  setup() {
    const panelRef = ref(null)
    const panelClassName = 'crop-editor__panel'

    const editor = reactive({
      isVisibleUploader: true,
      src: null,
      panels: [
        {
          type: 'horizontal',
          aspectRatio: '16:9',
          stencilProps: {
            aspectRatio: 16 / 9
          }
        },
        {
          type: 'vertical',
          aspectRatio: '9:16',
          stencilProps: {
            aspectRatio: 9 / 16
          }
        },
        {
          type: 'square',
          aspectRatio: '1:1',
          stencilProps: {
            aspectRatio: 1 / 1
          }
        },
        {
          type: 'free',
          aspectRatio: '4:3',
          stencilProps: {
            aspectRatio: 4 / 3
          }
        }
      ]
    })

    const handleOnChooseFile = ({ fileInput }) => {
      if (fileInput.files && fileInput.files[0]) {
        const src = URL.createObjectURL(fileInput.files[0])

        editor.src = src
      }

      editor.isVisibleUploader = false
    }

    const getPanelClass = panel => {
      return `${panelClassName}--${panel.type}`
    }

    const disabledPanelClass = computed(() => {
      if (!editor.src) {
        return `${panelClassName}--disabled`
      }
    })

    return {
      editor,
      panelRef,
      handleOnChooseFile,
      getPanelClass,
      disabledPanelClass
    }
  }
})
</script>

<style lang="scss" src="./CropEditor.component.scss"></style>
