<template lang="pug">
header.header.app-header
  AppLogo

  .app-header__actions
    .app-header-action-item
      vs-tooltip(v-model="isVisibleReadyTooltip" bottom dark :class="[disabledReadyTooltipClass]")
        vs-button(flat active :loading="isBusy" :disabled="!original.file" @click="downloadAll")
          AppIcon.me-0.me-lg-1(name="charm:download")
          span.d-none.d-lg-inline-block {{ $t('general.downloadAll') }}
        template(#tooltip)
          span {{ $t('general.readyForDownload') }}

    .app-header-action-item
      DropdownMenu.language-dropdown-menu(withDropdownCloser direction="right" :overlay="false")
        template(#trigger)
          vs-button(color="dark" flat active)
            AppIcon.me-0.me-lg-1(name="prime:language")
            span.d-none.d-lg-inline-block {{ $i18n.localeProperties.title }}
            AppIcon.ms-1(name="prime:caret-down")
        template(#body)
          li.language-dropdown-menu-item(dropdown-closer @click="$i18n.setLocale('en')")
            span.language-dropdown-menu-item__title English
          li.language-dropdown-menu-item(dropdown-closer @click="$i18n.setLocale('tr')")
            span.language-dropdown-menu-item__title Türkçe

    .app-header-action-item
      vs-button(transparent dark active @click="$emit('onClickCreditsDialog')")
        AppIcon.me-0.me-lg-1(name="charm:github" color="var(--color-text-02)")
        span.color-text-02.d-none.d-lg-inline-block Created by @selimdoyranli
</template>

<script>
import { defineComponent, useContext, useStore, ref, computed, watch } from '@nuxtjs/composition-api'
import useEditor from '@/hooks/useEditor'
import { AppLogo } from '@/components/Logo'
import { AppIcon } from '@/components/Icon'
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'

export default defineComponent({
  components: {
    AppLogo,
    AppIcon,
    DropdownMenu
  },
  setup() {
    const context = useContext()
    const store = useStore()
    const { sleep, getFileExtension } = useEditor()

    const JSZip = require('jszip')
    const zip = new JSZip()
    const FileSaver = require('file-saver')

    const selectedLanguage = ref(context.i18n.locale)

    watch(
      () => selectedLanguage.value,
      value => {
        if (value) {
          context.i18n.setLocale(selectedLanguage.value)
        }
      }
    )

    const isReady = computed(() => store.getters['editor/isReady'])
    const isBusy = computed(() => store.getters['editor/isBusy'])
    const isVisibleReadyTooltip = ref(false)

    watch(
      () => isReady.value,
      value => {
        if (value) {
          sleep(2000).then(() => {
            isVisibleReadyTooltip.value = true
          })

          sleep(4000).then(() => {
            isVisibleReadyTooltip.value = false
          })
        }
      }
    )

    const disabledReadyTooltipClass = computed(() => {
      if (isReady.value && !isBusy.value) {
        return `pointer-events-auto`
      } else {
        return `pointer-events-none`
      }
    })

    const original = computed(() => store.getters['editor/original'])
    const horizontalCropped = computed(() => store.getters['editor/horizontalCropped'])
    const verticalCropped = computed(() => store.getters['editor/verticalCropped'])
    const squareCropped = computed(() => store.getters['editor/squareCropped'])
    const freeCropped = computed(() => store.getters['editor/freeCropped'])

    const downloadAll = () => {
      store.commit('editor/SET_IS_BUSY', true)
      sleep(1000).then(() => {
        store.commit('editor/SET_IS_BUSY', false)
        const croppedList = [horizontalCropped.value, verticalCropped.value, squareCropped.value, freeCropped.value]

        zip.file(`image-${original.value.key}.${getFileExtension(original.value.file.name)}`, original.value.file)
        croppedList.forEach(cropped => {
          URL.createObjectURL(cropped.file)

          zip.file(`image-${cropped.key}.${getFileExtension(original.value.file.name)}`, cropped.file)
        })

        zip.generateAsync({ type: 'blob' }).then(content => {
          FileSaver.saveAs(content, '4in1crop-images.zip')
        })
      })
    }

    return {
      selectedLanguage,
      isReady,
      isBusy,
      isVisibleReadyTooltip,
      disabledReadyTooltipClass,
      original,
      downloadAll
    }
  }
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
