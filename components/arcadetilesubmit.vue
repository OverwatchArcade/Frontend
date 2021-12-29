<template>
  <div v-if="Object.keys(gamemode).length > 0" class="card">
    <span
      class="card-ribbon"
      :class="getRibbonColor(gamemode.label)"
      @click="toggleLabel"
    >
      {{ gamemode.label ? gamemode.label : 'No Label' }}
    </span>
    <img class="card-img-top" :src="gamemode.image">
    <div class="card-body">
      <h5 class="text-players">
        {{ $t('overwatch.players.' + gamemode.players ) }}
      </h5>
      <h4 class="text-gamemode">
        {{ $t('overwatch.arcademodes.' + gamemode.name.replace(/'/g,'')) }}
      </h4>
    </div>
  </div>
  <div v-else class="card">
    <content-loader
      :height="475"
      :width="400"
      :speed="1"
      primary-color="#DADADA"
      secondary-color="#C4C4C4"
    >
      <rect
        x="0"
        y="1"
        rx="5"
        ry="5"
        width="100%"
        height="200"
      />
      <rect
        x="10.78"
        y="250.67"
        rx="0"
        ry="0"
        width="163"
        height="25"
      />
      <rect
        x="10.78"
        y="300.67"
        rx="0"
        ry="0"
        width="226"
        height="46"
      />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'ArcadeTileSubmit',
  components: {
    ContentLoader
  },
  props: {
    gamemode: {
      type: Object,
      default: null
    },
    toggleLabel: {
      type: Function,
      default: null
    }
  },
  methods: {
    getRibbonColor (label) {
      switch (label) {
        case 'Daily':
          return '-secondary'
        case 'Weekly':
          return ''
        default:
          return '-no-label'
      }
    }
  }
}
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  object-position: top;
}

.card-ribbon {
  cursor: pointer;
}
</style>
