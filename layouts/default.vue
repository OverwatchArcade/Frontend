<template>
  <div id="app" class="container pb-4">
    <section id="header" class="mt-5 mb-5">
      <div class="row">
        <div class="col-auto">
          <nuxt-link to="/">
            <h1 class="text-center text-sm-left text-white">
              <img src="/img/ow-arcade-115.png" class="logo">
              OverwatchArcade.today
            </h1>
          </nuxt-link>
        </div>
        <client-only>
          <div
            v-if="$auth.loggedIn"
            id="loggedIn"
            class="col align-self-center text-center"
          >
            <nuxt-link
              :to="{
                path: '/contributor/' + $auth.user.username,
              }"
            >
              <h3 class="float-lg-end text-sm-left">
                <b-avatar :src="$auth.user.avatar" />
                <span id="username" class="ms-2">{{ $auth.user.username }}</span>
              </h3>
            </nuxt-link>
          </div>
        </client-only>
      </div>
    </section>
    <Nuxt />
    <section id="footer" class="mt-4">
      <div class="row">
        <div class="col-12 col-md-9 mb-sm-5">
          <p class="small">
            {{ $t('general.footer.copyright_materials') }}<br>
            {{ $t('general.footer.copyright_site') }}
            <a
              rel="license"
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            >Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              International License</a>
          </p>
          <p class="small">
            <a href="https://github.com/OverwatchArcade/Frontend/tree/main/i18n">📑 Help translate this site</a>
          </p>
          <a href="//github.com/OverwatchArcade" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'github']"
              style="font-size: 24px"
            />
          </a>
          <a href="//twitter.com/owarcade" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'twitter']"
              class="ms-2"
              style="font-size: 24px"
            />
          </a>
          <a href="https://discord.gg/totalmayhem" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'discord']"
              class="ms-2"
              style="font-size: 24px"
            />
          </a>
        </div>
        <div class="col-12 col-md-3">
          <Multiselect
            v-model="translate"
            :options="$i18n.locales"
            label="translations"
            :searchable="false"
            :allow-empty="false"
            :close-on-select="true"
            :show-labels="false"
            @select="setLocaleAndUpdateSelect"
          >
            <template slot="singleLabel" slot-scope="props">
              <CountryFlag :country="props.option.code" size="small" />
              {{ props.option.name }}
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc">
                <span
                  class="option__title"
                ><CountryFlag :country="props.option.code" size="small" />{{
                  props.option.name
                }}</span>
              </div>
            </template>
          </Multiselect>

          <client-only>
            <multiselect
              v-if="$auth.loggedIn"
              v-model="overwatch.event"
              :options="overwatch.events"
              placeholder="Select event"
              :close-on-select="true"
              :allow-empty="false"
              class="mt-2"
              @input="postOverwatchEvent"
            />
          </client-only>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import CountryFlag from 'vue-country-flag'
import { VBTooltip } from 'bootstrap-vue'

export default {
  components: {
    Multiselect,
    CountryFlag
  },
  directives: { 'b-tooltip': VBTooltip },
  data () {
    return {
      translate: null,
      overwatch: {
        event: null,
        events: []
      }
    }
  },
  computed: {},
  mounted () {
    const loc = this.$i18n.locale
    this.translate = this.$i18n.locales.filter(function (item) {
      return item.code === loc
    })
    this.getBackgroundImage()
    this.getOverwatchEvents()
  },
  methods: {
    setLocaleAndUpdateSelect (selectedOption) {
      this.$i18n.setLocale(selectedOption.code)
    },
    getBackgroundImage () {
      this.$axios.get('/api/v1/overwatch/event/wallpaper').then((response) => {
        document.documentElement.style.background =
          "url(' " + response.data.data + " ') no-repeat center center fixed"
        document.documentElement.style.backgroundSize = 'cover'
      })
    },
    getOverwatchEvents () {
      this.$axios.get('/api/v1/overwatch/events').then((response) => {
        this.overwatch.events = response.data.data

        this.$axios.get('/api/v1/overwatch/event').then((response) => {
          this.overwatch.event = this.overwatch.events.filter(function (item) {
            return item === response.data.data
          })
        })
      })
    },
    postOverwatchEvent () {
      this.$axios
        .post('/api/v1/overwatch/event/' + this.overwatch.event)
        .then(() => {
          this.$toasted.success("You've succesfully changed event, it might take up to 5 seconds to change").goAway(5000)
          this.$toasted.success("Don't forget to update the labels when it's the first daily of a new event :)").goAway(8000)
          this.getBackgroundImage()
        })
        .catch(() => {
          this.$toasted.error("Error - Couldn't change event").goAway(2500)
        })
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
