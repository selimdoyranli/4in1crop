<template lang="pug">
.aspect-ratio-select-menu
  .aspect-ratio-select-menu__group.aspect-ratio-select-menu__group--standard
    .aspect-ratio-select-menu-item(
      v-for="ratio in aspectRatio.standard.list"
      :class="[getSelectedClass(ratio)]"
      @click="selectRatio(ratio)"
    )
      span.aspect-ratio-select-menu-item__title {{ ratio.title }}
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const selectedRatio = ref({
      key: 'free',
      title: 'Freeform',
      ratio: null
    })

    const aspectRatio = ref({
      standard: {
        list: [
          {
            key: 'free',
            title: 'Freeform',
            ratio: null
          },
          {
            key: '2.39/1',
            title: 'Cinema',
            ratio: 2.39 / 1
          },
          {
            key: '1.6180/1',
            title: 'Golden Ratio',
            ratio: 1.618 / 1
          },
          {
            key: '4/3',
            title: '4:3',
            ratio: 4 / 3
          },
          {
            key: '3/2',
            title: '3:2',
            ratio: 3 / 2
          },
          {
            key: '2/3',
            title: '2:3',
            ratio: 2 / 3
          },
          {
            key: '16/10',
            title: '16:10',
            ratio: 16 / 10
          },
          {
            key: '14/9',
            title: '14:9',
            ratio: 14 / 9
          },
          {
            key: '21/9',
            title: '21:9',
            ratio: 21 / 9
          }
        ]
      },
      social: {
        list: []
      }
    })

    const selectRatio = ratio => {
      selectedRatio.value = ratio
    }

    watch(
      () => selectedRatio.value,
      value => {
        if (value) {
          emit('onSelect', selectedRatio.value)
        }
      }
    )

    const getSelectedClass = ratio => {
      const menuItemClassName = 'aspect-ratio-select-menu-item'

      if (ratio.key === selectedRatio.value.key) {
        return `${menuItemClassName}--selected`
      }
    }

    return {
      selectedRatio,
      aspectRatio,
      selectRatio,
      getSelectedClass
    }
  }
})
</script>

<style lang="scss" src="./AspectRatioSelectMenu.component.scss"></style>
