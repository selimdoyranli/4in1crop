<template lang="pug">
img.a-preloader-spinner(src="@/assets/img/core/loader.svg" :width="width" :height="height")
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: false,
      default: 30
    },
    height: {
      type: Number,
      required: false,
      default: 30
    }
  }
}
</script>

<style lang="scss" src="./a-preloader-spinner.scss" />
