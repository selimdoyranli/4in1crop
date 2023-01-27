<template lang="pug">
.t-feed-post-list
  template(v-for="post in posts")
    o-post-card(:post="post")
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" src="./t-feed-post-list.scss" />
