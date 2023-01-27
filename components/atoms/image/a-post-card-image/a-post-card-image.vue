<template lang="pug">
img.a-post-card-image(:src="src" :alt="altText")
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    altText: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" src="./a-post-card-image.scss" />
