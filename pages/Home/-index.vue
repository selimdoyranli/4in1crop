<template lang="pug">
.page.home-page
  CropEditor
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { CropEditor } from '@/components/Editor'

export default defineComponent({
  components: {
    CropEditor
  },
  layout: 'Default/Default.layout',
  setup() {}
})
</script>

<style lang="scss" src="./Home.page.scss"></style>
