<template lang="pug">
i.x-material-icon(:class="iconClass" :style="{ 'font-size': `${size}px` }")
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 16
    }
  },
  setup(props) {
    const iconClass = computed(() => `zmdi zmdi-${props.name}`)

    return { iconClass }
  }
})
</script>

<style lang="scss" src="./x-material-icon.scss" />
