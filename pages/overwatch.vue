<template>
  <div id="overwatch">
    <b-modal id="undo-modal" ref="undo-modal" centered title="Undo daily">
      <p class="my-4">
        You are about to delete today's daily update. Are you sure?
      </p>
      <template #modal-footer="{ cancel }">
        <b-button variant="primary" @click="undoDaily">
          Yes I'm sure
        </b-button>
        <b-button variant="secondary" @click="cancel">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <div class="row mb-lg-2">
      <div class="col">
        <h3 v-if="!api.isToday">
          <span class="badge badge-warning">{{ $t('general.overwatch.warning') }}</span> {{ $t('general.overwatch.not updated yet') }}
        </h3>
        <div v-else>
          <h3>Contributor</h3>
          <h4>
            <b-avatar :src="api.contributor.avatar" size="32px" />
            <nuxt-link
              :to="{
                path:
                  '/contributor/' +
                  api.contributor.username.replace(/#/, '%23'),
                params: {
                  contributor: api.contributor.username.replace(/#/, '%23'),
                },
              }"
            >
              {{ api.contributor.username }}
            </nuxt-link>
          </h4>
        </div>
      </div>
      <div class="col col-md-auto">
        <div>
          <client-only placeholder="loading...">
            <countdown
              :time="timeUntilReset"
              :transform="transform"
              @end="handleCountdownEnd"
            >
              <template slot-scope="props">
                <h3>
                  {{ $t('general.overwatch.day ends in') }} {{ props.hours }}:{{
                    props.minutes
                  }}:{{ props.seconds }}
                </h3>
              </template>
            </countdown>
          </client-only>
        </div>
      </div>
    </div>
    <div id="cards">
      <div class="row">
        <div class="col-xl-4 col-md-12 largeTile mb-4 mb-xl-0">
          <arcadetile :gamemode="getTileObjectByIndex(0)" />
        </div>
        <div class="col-xl-8 col-md-12">
          <div class="row mb-4">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(1)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(2)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(3)" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(4)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(5)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4 mb-xl-0">
              <arcadetile :gamemode="getTileObjectByIndex(6)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <div v-if="$auth.loggedIn" class="row">
        <div class="col-12 mt-4">
          <nuxt-link v-if="!api.isToday" to="/submit/overwatch" class="btn btn-block btn-primary">
            Update
          </nuxt-link>
          <button v-else v-b-modal.undo-modal class="btn btn-block btn-warning">
            Undo
          </button>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import countdown from '@chenfengyuan/vue-countdown'

export default {
  name: 'Overwatch',
  components: {
    countdown
  },
  data () {
    return {
      timeUntilReset:
        new Date().setUTCHours(23, 59, 59, 999) - new Date().getTime(),
      api: {
        isToday: false,
        contributor: {
          username: '',
          group: ''
        },
        modes: [{}, {}, {}, {}, {}, {}, {}]
      }
    }
  },
  mounted () {
    this.getDaily()
  },
  methods: {
    getDaily () {
      this.$axios.get('/api/v1/overwatch/today').then((response) => {
        this.api = response.data.data
      }).catch(() => {
        this.$toasted.error('Couldn\'t load today\'s arcade, API might be down').goAway(7500)
      })
    },
    undoDaily () {
      this.$refs['undo-modal'].hide()

      this.$axios.post('/api/v1/overwatch/undo').then((response) => {
        this.$toasted.success('Daily has been undone').goAway(2500)
        this.$router.push({ path: '/submit/overwatch' })
      })
    },
    /*
     * Get mode of tile by index. Returns empty object  on non index to prevent error
     */
    getTileObjectByIndex (tileIndex) {
      if (typeof this.api.modes[tileIndex] !== 'undefined') {
        return this.api.modes[tileIndex]
      }
      return {}
    },
    handleCountdownEnd () {
      this.$toasted.show(
        "Today's arcade has ended, it usually takes 5-10 minutes to update."
      )
      this.getDaily()
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        const digits = value < 10 ? `0${value}` : value
        props[key] = `${digits}`
      })
      return props
    }
  }
}
</script>

<style scoped>
.card {
  height: auto;
  min-height: 100%;
}
</style>
