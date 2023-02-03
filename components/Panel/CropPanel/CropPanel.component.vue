<template lang="pug">
.crop-panel
  cropper.crop-panel__cropper(
    v-if="type === cropTypeEnum.FREE"
    ref="cropperRef"
    :src="src"
    :stencil-props="getFreeStencilProps()"
    @change="handleOnChangeCropper"
  )
  cropper.crop-panel__cropper(
    v-else
    ref="cropperRef"
    :src="src"
    :stencil-props="stencilProps"
    @ready="handleOnReadyCropper"
    @change="handleOnChangeCropper"
  )

  .crop-panel-footer
    .crop-panel-footer__actions
      DropdownMenu.crop-panel-aspect-ratio-select-dropdown(v-if="type === cropTypeEnum.FREE" withDropdownCloser dropup :overlay="false")
        template(#trigger)
          button
            span {{ $t('editor.chooseCustomAspectRatio') }}
            AppIcon(name="prime:caret-up" :width="12" :height="12")
        template(#body)
          AspectRatioSelectMenu(dropdown-closer @onSelect="handleOnSelectFreeFormRatio")

    .crop-panel-footer__info
      span.crop-panel-footer__label
        template(v-if="type === cropTypeEnum.FREE")
          span {{ $t('editor.freeform') }}
          span(v-if="selectedFreeFormRatio && selectedFreeFormRatio.key !== cropTypeEnum.FREE") &nbsp; ({{ selectedFreeFormRatio.title }})
        template(v-else) {{ aspectRatio }}

      template(v-if="panel.cropper")
        span.crop-panel-footer__label {{ $t('editor.original') }}: {{ panel.cropper.image.width }}x{{ panel.cropper.image.height }}
        span.crop-panel-footer__label {{ $t('editor.cropped') }}: {{ panel.cropper.coordinates.width }}x{{ panel.cropper.coordinates.height }}
</template>

<script>
import { defineComponent, useStore, ref, reactive, computed, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import { cropTypeEnum } from '@/enums'
import useEditor from '@/hooks/useEditor'
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
    const { sleep } = useEditor()

    const cropperRef = ref(null)

    const isReady = computed(() => store.getters['editor/isReady'])
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
        if (selectedFreeFormRatio.value.key === cropTypeEnum.FREE) {
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

    const handleOnReadyCropper = () => {
      const { coordinates } = cropperRef.value

      const center = {
        left: coordinates.left + coordinates.width / 2,
        top: coordinates.top + coordinates.height / 2
      }

      cropperRef.value.setCoordinates([
        ({ imageSize }) => ({
          width: imageSize.width,
          height: imageSize.height
        }),
        ({ coordinates }) => ({
          left: center.left - coordinates.width / 2,
          top: center.top - coordinates.height / 2
        })
      ])
    }

    const handleOnChangeCropper = ({ coordinates, image, visibleArea, canvas }) => {
      panel.cropper = { coordinates, image, visibleArea, canvas }

      store.commit('editor/SET_IS_BUSY', true)

      canvas.toBlob(blob => {
        store.commit('editor/SET_CROPPED', { type: props.type, coordinates, file: blob })
      }, original.value.file.type)

      sleep(1000).then(() => {
        store.commit('editor/SET_IS_BUSY', false)
      })
    }

    const zoom = value => {
      cropperRef.value.zoom(value)
    }

    onMounted(() => {
      window.addEventListener('resize', () => {
        if (isReady.value) {
          zoom(0)
        }
      })
    })

    return {
      cropTypeEnum,
      cropperRef,
      panel,
      selectedFreeFormRatio,
      handleOnSelectFreeFormRatio,
      getFreeStencilProps,
      handleOnReadyCropper,
      handleOnChangeCropper
    }
  }
})
</script>

<style lang="scss" src="./CropPanel.component.scss"></style>
