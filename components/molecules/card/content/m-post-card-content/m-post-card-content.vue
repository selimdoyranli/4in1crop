<template lang="pug">
.m-post-card-content
  a-post-card-image(:src="post.image" :alt-text="post.title")
  a-card-title.m-post-card-content__description(:title="post.body")
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

<style lang="scss" src="./m-post-card-content.scss" />
