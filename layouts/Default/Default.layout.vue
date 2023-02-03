<template lang="pug">
.layout.default-layout
  AppPreloader
  AppHeader(@onClickCreditsDialog="isOpenCreditsDialog = true")

  // Main
  .layout__inner
    .col.col-12
      .router-view
        nuxt

  // App Credits Dialog
  AppCreditsDialog(:isOpen="isOpenCreditsDialog" @onClose="isOpenCreditsDialog = false")
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
    const isOpenCreditsDialog = ref(false)

    return {
      isOpenCreditsDialog
    }
  }
})
</script>

<style lang="scss" src="./Default.layout.scss"></style>
