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

      emit('onClose')
    }

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./AppCreditsDialog.component.scss"></style>
