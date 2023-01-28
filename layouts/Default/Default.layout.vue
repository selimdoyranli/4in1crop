<template lang="pug">
.layout.default-layout
  AppHeader

  // Main
  .layout__inner
    .col.col-12
      .router-view
        nuxt
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { AppHeader } from '@/components/Header'

export default defineComponent({
  components: {
    AppHeader
  },
  setup() {}
})
</script>

<style lang="scss" src="./Default.layout.scss"></style>
