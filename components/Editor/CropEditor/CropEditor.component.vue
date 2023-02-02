<template lang="pug">
.crop-editor
  CropPanel.crop-editor__panel(
    v-for="panel in editor.panels"
    :key="panel.type"
    ref="panelRef"
    :type="panel.type"
    :src="src"
    :class="[getPanelClass(panel), disabledPanelClass]"
    :aspect-ratio="panel.aspectRatio"
    :stencil-props="panel.stencilProps"
  )

  UploadImageCard.col-12.col-lg-8.col-xl-6.col-xxl-5(v-if="!isReady")
</template>

<script>
import { defineComponent, useStore, ref, reactive, computed } from '@nuxtjs/composition-api'
import { cropTypeEnum } from '@/enums'
import { CropPanel } from '@/components/Panel'
import { UploadImageCard } from '@/components/Card'

export default defineComponent({
  components: {
    CropPanel,
    UploadImageCard
  },
  setup() {
    const store = useStore()

    const panelRef = ref(null)
    const panelClassName = 'crop-editor__panel'

    const isReady = computed(() => store.getters['editor/isReady'])
    const original = computed(() => store.getters['editor/original'])
    const src = computed(() => {
      if (original.value.file) {
        return URL.createObjectURL(original.value.file)
      }
    })

    const editor = reactive({
      panels: [
        {
          type: cropTypeEnum.HORIZONTAL,
          aspectRatio: '16:9',
          stencilProps: {
            aspectRatio: 16 / 9
          }
        },
        {
          type: cropTypeEnum.VERTICAL,
          aspectRatio: '9:16',
          stencilProps: {
            aspectRatio: 9 / 16
          }
        },
        {
          type: cropTypeEnum.SQUARE,
          aspectRatio: '1:1',
          stencilProps: {
            aspectRatio: 1 / 1
          }
        },
        {
          type: cropTypeEnum.FREE,
          aspectRatio: '4:3',
          stencilProps: {
            aspectRatio: 4 / 3
          }
        }
      ]
    })

    const getPanelClass = panel => {
      return `${panelClassName}--${panel.type}`
    }

    const disabledPanelClass = computed(() => {
      if (!src.value) {
        return `${panelClassName}--disabled`
      }
    })

    return {
      panelRef,
      isReady,
      src,
      editor,
      getPanelClass,
      disabledPanelClass
    }
  }
})
</script>

<style lang="scss" src="./CropEditor.component.scss"></style>
