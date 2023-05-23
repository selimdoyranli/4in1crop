<template lang="pug">
.layout.default-layout(@drag.stop.prevent @dragstart.stop.prevent @dragend.stop.prevent @dragover.stop.prevent @drop.prevent)
  AppPreloader
  AppHeader(@on-click-credits-dialog="isOpenCreditsDialog = true")

  // Main
  .layout__inner(
    :class="[dragEnterActiveClass]"
    @drag.stop.prevent
    @dragstart.stop.prevent
    @dragend.stop.prevent
    @dragover.stop.prevent="onDragOver"
    @drop.prevent="onFileDrop"
  )
    .col.col-12
      .router-view
        nuxt

    // Drop target
    .drop-target(v-if="!preloader.isLoading && !isReady" @dragleave.stop.prevent="onDragLeave")
      span.drop-target__title {{ $t('uploader.drop') }}

  // App Credits Dialog
  AppCreditsDialog(:is-open="isOpenCreditsDialog" @on-close="isOpenCreditsDialog = false")
</template>

<script>
import { defineComponent, useStore, ref, computed } from '@nuxtjs/composition-api'
import { AppPreloader } from '@/components/Preloader'
import { AppHeader } from '@/components/Header'
import { AppCreditsDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppPreloader,
    AppHeader,
    AppCreditsDialog
  },
  setup() {
    const baseClassName = 'default-layout'

    const store = useStore()

    const isActiveDragOver = ref(false)

    const isOpenCreditsDialog = ref(false)

    const preloader = computed(() => store.getters['preloader/preloader'])
    const isReady = computed(() => store.getters['editor/isReady'])

    const onDragOver = () => {
      isActiveDragOver.value = true
    }

    const onDragLeave = () => {
      isActiveDragOver.value = false
    }

    const onFileDrop = event => {
      if (!isReady.value) {
        store.commit('editor/SET_DROPPED_FILES', event.dataTransfer.files)

        isActiveDragOver.value = false
      }
    }

    const dragEnterActiveClass = computed(() => {
      if (isActiveDragOver.value) {
        return `${baseClassName}--dragOver`
      }
    })

    return {
      preloader,
      isReady,
      isOpenCreditsDialog,
      onDragOver,
      onDragLeave,
      onFileDrop,
      dragEnterActiveClass
    }
  }
})
</script>

<style lang="scss" src="./Default.layout.scss"></style>
