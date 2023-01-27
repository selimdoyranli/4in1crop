<template lang="pug">
.o-app-preloader(v-if="preloader.isLoading" ref="appPreloader")
  a-preloader-spinner
</template>

<script>
import { defineComponent, computed, useStore, onMounted, nextTick } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const preloader = computed(() => store.state.preloader)

    onMounted(() => {
      nextTick(() => {
        if (!preloader.isAttached) {
          store.commit('preloader/HIDE_PRELOADER')
        }
      })
    })

    return { preloader }
  }
})
</script>

<style lang="scss" src="./o-app-preloader.scss" />
