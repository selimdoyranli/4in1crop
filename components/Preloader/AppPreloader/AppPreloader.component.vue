<template lang="pug">
.app-preloader(v-if="preloader.isLoading")
  .app-preloader__inner
    AppLogo.app-preloader__logo
    p.app-preloader__message {{ $t('general.loading') }} ...

  .app-preloader__bar
</template>

<script>
import { defineComponent, useStore, computed, onMounted, nextTick } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'

export default defineComponent({
  components: {
    AppLogo
  },
  setup() {
    const store = useStore()
    const preloader = computed(() => store.getters['preloader/preloader'])
    onMounted(async () => {
      await nextTick()

      setTimeout(() => {
        store.commit('preloader/HIDE')
      }, 2000) // Create virtual delay effect
    })

    return {
      preloader
    }
  }
})
</script>

<style lang="scss" src="./AppPreloader.component.scss"></style>
