<template lang="pug">
.m-post-card-header
  a-card-title(:title="post.title")
  x-material-icon(name="more-vert" :size="22")
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./m-post-card-header.scss" />
