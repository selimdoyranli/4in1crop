<template lang="pug">
.o-post-card
  m-post-card-header(:post="post")
  m-post-card-content(:post="post")
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

<style lang="scss" src="./o-post-card.scss" />
