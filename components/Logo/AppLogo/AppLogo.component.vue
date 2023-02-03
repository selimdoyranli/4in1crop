<template lang="pug">
a.app-logo(:href="`https://${$t('app.domain')}`" :title="$t('app.name')")
  img.app-logo__img(src="@/assets/img/core/logo/4in1crop-logo.png" alt="4in1crop")
  span.app-logo__title {{ $t('app.name') }}
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {}
})
</script>

<style lang="scss" src="./AppLogo.component.scss"></style>
