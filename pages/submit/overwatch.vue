<template>
  <div id="cards">
    <div class="row">
      <div class="col">
        <h2>Overwatch</h2>
        <h4>You are about to submit a new daily</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-md-12 largeTile mb-4">
        <arcadetilesubmit :gamemode="getTileObjectByIndex(0)" :toggle-label="() => toggleLabel(0)" />
        <multiselect
          v-model="multiselect.arcademodes[0]"
          :options="arcademodes"
          :custom-label="multiSelectLabel"
          track-by="id"
          :show-labels="false"
          :allow-empty="false"
          @input="onChange(multiselect.arcademodes[0], 0)"
        />
      </div>
      <div class="col-xl-8 col-md-12">
        <div class="row mb-4">
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(1)" :toggle-label="() => toggleLabel(1)" />
            <multiselect
              v-model="multiselect.arcademodes[1]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[1], 1)"
            />
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(2)" :toggle-label="() => toggleLabel(2)" />
            <multiselect
              v-model="multiselect.arcademodes[2]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[2], 2)"
            />
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(3)" :toggle-label="() => toggleLabel(3)" />
            <multiselect
              v-model="multiselect.arcademodes[3]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[3], 3)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(4)" :toggle-label="() => toggleLabel(4)" />
            <multiselect
              v-model="multiselect.arcademodes[4]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[4], 4)"
            />
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(5)" :toggle-label="() => toggleLabel(5)" />
            <multiselect
              v-model="multiselect.arcademodes[5]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[5], 5)"
            />
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
            <arcadetilesubmit :gamemode="getTileObjectByIndex(6)" :toggle-label="() => toggleLabel(6)" />
            <multiselect
              v-model="multiselect.arcademodes[6]"
              :options="arcademodes"
              :custom-label="multiSelectLabel"
              track-by="id"
              :show-labels="false"
              :allow-empty="false"
              @input="onChange(multiselect.arcademodes[6], 6)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2">
      <button class="btn btn-warning btn-block" @click="submitDaily()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Arcadetilesubmit from '~/components/arcadetilesubmit.vue'
export default {
  name: 'OWSubmit',
  components: {
    Multiselect,
    Arcadetilesubmit
  },
  middleware: 'auth',
  data () {
    return {
      multiselect: {
        arcademodes: []
      },
      submit: {
        Game: 0,
        TileModes: [
          {
            arcadeModeId: 0,
            tileId: 1,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 2,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 3,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 4,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 5,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 6,
            labelId: 0
          },
          {
            arcadeModeId: 0,
            tileId: 7,
            labelId: 0
          }
        ]
      },
      labels: [],
      arcademodes: [],
      daily: {
        isToday: false,
        contributor: {
          username: '',
          group: ''
        },
        modes: [{}, {}, {}, {}, {}, {}, {}]
      }
    }
  },
  async mounted () {
    await this.getArcadeModes()
    await this.getTileLabels()
    await this.getDaily()
  },
  methods: {
    multiSelectLabel ({ name, players }) {
      return `[${players}] ${name}`
    },
    onChange (val, id) {
      this.previewArcadeModeTile(id, val)
    },
    toggleLabel (tileId) {
      const currentLabelid = this.submit.TileModes[tileId].labelId
      let nextLabelId = currentLabelid + 1
      if (nextLabelId > this.labels.length) {
        nextLabelId = 1
      }
      const label = this.labels.filter(function (item) { return (item.id === nextLabelId) })
      this.submit.TileModes[tileId].labelId = label[0].id
      this.daily.modes[tileId].label = label[0].value
    },
    findLabelIdByValue (labelValue) {
      const foundLabel = this.labels.filter(function (item) { return (item.value === labelValue) })
      // Returns label id if found, else return "no label" with default value 1
      return (foundLabel[0]?.id ?? 1)
    },
    /* Gets called onChange multiselect arcademode */
    previewArcadeModeTile (tileId, data) {
      /* Arcade preview */
      this.daily.modes[tileId].name = data.name
      this.daily.modes[tileId].players = data.players
      this.daily.modes[tileId].image = data.image
      /* Submit data */
      this.submit.TileModes[tileId].arcadeModeId = data.id
    },
    /*
     * Change label from API response to corresponding LabelId in submit
     */
    setCorrectLabelId () {
      const tileModes = this.submit.TileModes
      const dailyModes = this.daily.modes
      const func = this.findLabelIdByValue

      dailyModes.forEach(function (key, val) {
        const labelId = func(key.label)
        tileModes[val].labelId = labelId
      })

      this.submit.TileModes = tileModes
    },
    /*
     * Change arcade from API response to corresponding arcadeModeId in submit
     */
    setCorrectArcadeModeId () {
      const tileModes = this.submit.TileModes
      const multiSelectArcadeModes = this.multiselect.arcademodes
      const arcadeModes = this.arcademodes

      this.daily.modes.forEach(function (daily, dailyKey) {
        const mode = arcadeModes.filter(function (mode) { return (mode.name === daily.name && mode.players === daily.players) })
        if (mode.length) {
          tileModes[dailyKey].arcadeModeId = mode[0].id
          multiSelectArcadeModes[dailyKey] = mode[0]
        }
      })
      this.multiselect.arcademodes = multiSelectArcadeModes
      this.submit.TileModes = tileModes
    },
    /*
     * Get mode of tile by index. Returns empty object on non index to prevent error
     */
    getTileObjectByIndex (tileIndex) {
      if (typeof this.daily.modes[tileIndex] !== 'undefined') {
        return this.daily.modes[tileIndex]
      }
      return {}
    },
    async getDaily () {
      const $toasted = this.$toasted
      await this.$axios
        .get('/api/v1/overwatch/today')
        .then((response) => {
          this.daily = response.data.data
          // Makes sure all daily slots. Overwatch currently has 7 daily slots
          for (let i = this.daily.modes.length; i < 7; i++) {
            this.daily.modes.push({})
          }
          this.setCorrectLabelId()
          this.setCorrectArcadeModeId()
          $toasted.success('Submits filled from last submit.').goAway(2500)
        })
        .catch(function () {
          $toasted.error("ERROR - Couldn't prefill daily").goAway(2500)
        })
    },
    async getArcadeModes () {
      const $toasted = this.$toasted
      await this.$axios
        .get('/api/v1/overwatch/arcademodes')
        .then((response) => {
          this.arcademodes = response.data.data
        })
        .catch(function () {
          $toasted.error("ERROR - Couldn't fetch arcademodes").goAway(2500)
        })
    },
    async getTileLabels () {
      const $toasted = this.$toasted
      await this.$axios
        .get('/api/v1/overwatch/labels')
        .then((response) => {
          this.labels = response.data.data
          this.labels[0].value = 'No label'
        })
        .catch(function () {
          $toasted.error("ERROR - Couldn't fetch labels").goAway(2500)
        })
    },
    async submitDaily () {
      const $toasted = this.$toasted
      this.$axios.setToken(this.$auth.strategy.token.get(), 'Bearer')
      await this.$axios
        .post('/api/v1/overwatch/submit', this.submit)
        .then(() => {
          $toasted.success('Thank you for your contribution!').goAway(5000)
          $toasted.info('A tweet will be sent shortly :)').goAway(5000)
          this.$router.push({ path: '/overwatch' })
        })
        .catch(function (e) {
          if (e.response.status === 409) {
            $toasted.error('Daily has already been submitted').goAway(5000)
          } else {
            $toasted.error('Something went wrong').goAway(5000)
          }
        })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.card {
  height: auto;
  min-height: 80%;
}
.multiselect {
  margin: 10px 0;
}
</style>
