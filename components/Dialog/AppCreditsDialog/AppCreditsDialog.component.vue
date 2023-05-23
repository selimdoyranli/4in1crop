<template lang="pug">
vs-dialog.app-credits-dialog(v-model="dialog.isOpen" blur @close="handleClose")
  template(#header)
    AppLogo.mt-4

  p(v-html="$t('credits.description')")

  template(#footer)
    vs-button(color="#171515" href="https://github.com/selimdoyranli/4in1crop" blank)
      AppIcon.me-1(name="charm:github" color="var(--color-text-02)")
      span.color-text-02 Github repository

    // Buymeacoffee Button
    vs-button(color="#FD0" href="https://www.buymeacoffee.com/selimdoyranli" blank)
      AppIcon.me-1(name="simple-icons:buymeacoffee" color="var(--color-text-02)")
      span.color-text-02 Donate
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
