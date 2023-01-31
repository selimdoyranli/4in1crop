<template lang="pug">
.crop-panel
  cropper.crop-panel__cropper(v-if="type === 'free'" :src="src" :stencil-props="getFreeStencilProps()" @change="handleOnChangeCropper")
  cropper.crop-panel__cropper(v-else :src="src" :stencil-props="stencilProps" @change="handleOnChangeCropper")

  .crop-panel-footer
    DropdownMenu.crop-panel-aspect-ratio-select-dropdown(v-if="type === 'free'" withDropdownCloser dropup :overlay="false")
      template(#trigger)
        button
          span {{ $t('editor.chooseCustomAspectRatio') }}
          AppIcon(name="prime:caret-up" :width="12" :height="12")
      template(#body)
        AspectRatioSelectMenu(dropdown-closer @onSelect="handleOnSelectFreeFormRatio")

    span.crop-panel-footer__label
      template(v-if="type === 'free'")
        span {{ $t('editor.freeform') }} &nbsp;
        span(v-if="selectedFreeFormRatio && selectedFreeFormRatio.key !== 'free'") ({{ selectedFreeFormRatio.title }})
      template(v-else) {{ aspectRatio }}

    template(v-if="panel.cropper")
      span.crop-panel-footer__label {{ $t('editor.original') }}: {{ panel.cropper.image.width }}x{{ panel.cropper.image.height }}
      span.crop-panel-footer__label {{ $t('editor.cropped') }}: {{ panel.cropper.coordinates.width }}x{{ panel.cropper.coordinates.height }}
</template>

<script>
import { defineComponent, useStore, ref, reactive, computed } from '@nuxtjs/composition-api'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import { AppIcon } from '@/components/Icon'
import { AspectRatioSelectMenu } from '@/components/Menu'

export default defineComponent({
  components: {
    Cropper,
    DropdownMenu,
    AppIcon,
    AspectRatioSelectMenu
  },
  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: null
    },
    aspectRatio: {
      type: String,
      required: false,
      default: null
    },
    stencilProps: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup(props) {
    const store = useStore()

    const original = computed(() => store.getters['editor/original'])

    const panel = reactive({
      cropper: null
    })

    const selectedFreeFormRatio = ref(null)

    const handleOnSelectFreeFormRatio = ratio => {
      selectedFreeFormRatio.value = ratio
    }

    const getFreeStencilProps = () => {
      if (selectedFreeFormRatio.value) {
        if (selectedFreeFormRatio.value.key === 'free') {
          return {}
        } else {
          return {
            aspectRatio: selectedFreeFormRatio.value.ratio
          }
        }
      } else {
        return {}
      }
    }

    const handleOnChangeCropper = ({ coordinates, image, visibleArea, canvas }) => {
      panel.cropper = { coordinates, image, visibleArea, canvas }

      canvas.toBlob(blob => {
        store.commit('editor/SET_CROPPED', { type: props.type, coordinates, file: blob })
      }, original.value.file.type)
    }

    return {
      panel,
      selectedFreeFormRatio,
      handleOnSelectFreeFormRatio,
      getFreeStencilProps,
      handleOnChangeCropper
    }
  }
})
</script>

<style lang="scss" src="./CropPanel.component.scss"></style>
