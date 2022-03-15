<template>
  <div id="overwatch">
    <b-modal id="undo-modal" ref="undo-modal" centered title="Undo daily">
      <p class="my-4">
        You are about to delete today's daily update. Are you sure?
      </p>
      <template #modal-footer="{ cancel }">
        <b-button variant="primary" @click="$bvModal.hide('undo-modal'), $bvModal.show('undo-modal-deletetype')">
          Yes I'm sure
        </b-button>
        <b-button variant="secondary" @click="cancel">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-modal id="undo-modal-deletetype" ref="undo-modal-deletetype" centered title="Undo daily">
      <p class="my-4">
        Do you want to do overwite or delete today's arcade mode? You usually overwrite when the arcade mode has changed. You delete if you made an accident
      </p>
      <template #modal-footer="{ }">
        <b-button variant="primary" @click="undoDaily(false)">
          I'd like to overwrite
        </b-button>
        <b-button variant="secondary" @click="undoDaily(true)">
          Delete that shit
        </b-button>
      </template>
    </b-modal>
    <div class="row mb-lg-2">
      <div class="col">
        <div v-if="!api.isToday">
          <span
            class="badge bg-warning text-dark text-center"
          >{{ $t('general.overwatch.warning') }}</span>
          <h3>
            {{ $t('general.overwatch.not updated yet') }}
          </h3>
        </div>
        <div v-else>
          <h3>Contributor</h3>
          <h4>
            <b-avatar
              :src="
                api.contributor.avatar"
              size="32px"
              class="me-2"
            />
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
        <div class="col-xl-4 col-md-12 largeTile mb-4">
          <arcadetile :gamemode="getTileObjectByIndex(0)" />
        </div>
        <div class="col-xl-8 col-md-12">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(1)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(2)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(3)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(4)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(5)" />
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4">
              <arcadetile :gamemode="getTileObjectByIndex(6)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <div v-if="$auth.loggedIn" class="d-grid gap-2">
        <nuxt-link v-if="!api.isToday" to="/submit/overwatch" class="btn btn-primary">
          Update
        </nuxt-link>
        <button v-else v-b-modal.undo-modal class="btn btn-warning">
          Undo
        </button>
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
    undoDaily (deletetype) {
      this.$axios.post(`/api/v1/overwatch/undo/${deletetype}`).then((response) => {
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
