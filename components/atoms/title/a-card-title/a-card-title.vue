<template lang="pug">
span.a-card-title(v-if="title") {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" src="./a-card-title.scss"></style>
