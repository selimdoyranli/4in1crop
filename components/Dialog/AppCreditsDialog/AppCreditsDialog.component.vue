<template lang="pug">
vs-dialog.app-credits-dialog(v-model="dialog.isOpen" blur @close="handleClose")
  template(#header)
    AppLogo.mt-4
  .app-credits-dialog__body
    p(v-html="$t('credits.description')")
  template(#footer)
    vs-button.mx-auto(transparent href="https://github.com/selimdoyranli/4in1crop" blank)
      AppIcon.me-1(name="charm:github" color="var(--color-text-02)")
      span.color-text-02 Github repository

    // Buymeacoffee Button
    script(
      type="text/javascript"
      src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
      data-name="bmc-button"
      data-slug="selimdoyranli"
      data-color="#FFDD00"
      data-emoji
      data-font="Inter"
      data-text="Buy me a coffee"
      data-outline-color="#000000"
      data-font-color="#000000"
      data-coffee-color="#ffffff"
    )
</template>

<script>
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { AppLogo } from '@/components/Logo'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppLogo,
    AppIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const dialog = reactive({
      isOpen: props.isOpen
    })

    watch(
      () => props.isOpen,
      value => {
        if (value) {
          dialog.isOpen = value
        }
      }
    )

    const handleClose = () => {
      dialog.isOpen = false

      emit('on-close')
    }

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./AppCreditsDialog.component.scss"></style>
