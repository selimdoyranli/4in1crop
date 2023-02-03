<template lang="pug">
.aspect-ratio-select-menu
  // Standard List
  .aspect-ratio-select-menu__group.aspect-ratio-select-menu__group--standard
    .aspect-ratio-select-menu-item(
      v-for="ratio in aspectRatio.standard.list"
      :class="[getSelectedClass(ratio)]"
      @click="selectRatio(ratio)"
    )
      span.aspect-ratio-select-menu-item__title(v-html="ratio.title")

  // Social List
  .aspect-ratio-select-menu__group.aspect-ratio-select-menu__group--social
    .aspect-ratio-select-menu-item(v-for="ratio in aspectRatio.social.list" :class="[getSelectedClass(ratio)]" @click="selectRatio(ratio)")
      AppIcon.aspect-ratio-select-menu-item__icon(v-if="ratio.icon" :name="ratio.icon")
      span.aspect-ratio-select-menu-item__title {{ ratio.title }}
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { cropTypeEnum } from '@/enums'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const selectedRatio = ref({
      key: cropTypeEnum.FREE,
      title: 'Freeform',
      ratio: null
    })

    const aspectRatio = ref({
      standard: {
        list: [
          {
            key: cropTypeEnum.FREE,
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
            title: 'Golden <br> Ratio',
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
        list: [
          {
            key: '1/1',
            title: 'Instagram Post - 1080x1080',
            icon: 'ri:instagram-line',
            ratio: 1 / 1
          },
          {
            key: '9/16',
            title: 'Instagram Story - 1080x1920',
            icon: 'ri:instagram-line',
            ratio: 9 / 16
          },
          {
            key: '16/9',
            title: 'Youtube Thumbnail - 1280x720',
            icon: 'ri:youtube-line',
            ratio: 16 / 9
          },
          {
            key: '851/315',
            title: 'Facebook Cover - 851x315',
            icon: 'ri:facebook-circle-line',
            ratio: 851 / 315
          },
          {
            key: '235/197',
            title: 'Facebook Post - 940x788',
            icon: 'ri:facebook-circle-line',
            ratio: 235 / 197
          }
        ]
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
