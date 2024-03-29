<template>
  <div>
    <div class="row gutters-sm">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="align-items-center text-center">
              <img
                :src="contributor.avatar"
                alt="Admin"
                class="rounded-circle"
                width="150"
              >
              <div class="mt-3">
                <h3>{{ contributor.username }}</h3>
                <h4 class="mb-4">
                  {{ contributor.group }}
                </h4>
                <p class="text-muted font-size-sm">
                  {{ $t('general.profile.member since', {0: formatDate(contributor.registeredAt)}) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <b-card
          v-if="Object.values(contributor.profile.social).some(v => v)"
          header-html="<h4>Social</h4>"
          header-tag="header"
          class="mt-3"
        >
          <ul class="list-group list-group-flush">
            <li
              v-if="contributor.profile.social.discord"
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
            >
              <h6 class="mb-0">
                <font-awesome-icon
                  :icon="['fab', 'discord']"
                  :style="{ color: '#7289DA', height: '24px' }"
                />
              </h6>
              <span v-if="contributor.profile.social" class="text-secondary">{{
                contributor.profile.social.discord
              }}</span>
            </li>
            <li
              v-if="contributor.profile.social.battlenet"
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
            >
              <h6 class="mb-0">
                <font-awesome-icon
                  :icon="['fab', 'battle-net']"
                  :style="{ color: '#0566b0', height: '24px' }"
                />
              </h6>
              <span v-if="contributor.profile.social" class="text-secondary">{{
                contributor.profile.social.battlenet
              }}</span>
            </li>
            <li
              v-if="contributor.profile.social.steam"
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
            >
              <h6 class="mb-0">
                <font-awesome-icon
                  :icon="['fab', 'steam']"
                  :style="{ color: '#000000', height: '24px' }"
                />
              </h6>
              <span
                class="text-secondary"
              ><a
                :href="
                  '//steamcommunity.com/id/' +
                    contributor.profile.social.steam
                "
              >{{ contributor.profile.social.steam }}</a></span>
            </li>
            <li
              v-if="contributor.profile.social.twitter"
              class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
            >
              <h6 class="mb-0">
                <font-awesome-icon
                  :icon="['fab', 'twitter']"
                  :style="{ color: '#1DA1F2', height: '24px' }"
                />
              </h6>
              <span
                class="text-secondary"
              ><a
                target="_blank"
                :href="'//twitter.com/' + contributor.profile.social.twitter"
              >@{{ contributor.profile.social.twitter }}</a></span>
            </li>
          </ul>
        </b-card>
      </div>

      <div class="col-md-8">
        <b-card header-html="<h4>Personal</h4>" header-tag="header">
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.nationality') }}
              </h6>
            </div>
            <div v-if="contributor.profile.personal.country.code" class="col-sm-9 text-secondary">
              <CountryFlag :country="contributor.profile.personal.country.code" size="small" />
              {{ contributor.profile.personal.country.name }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.about') }}
              </h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ contributor.profile.personal.text || '-' }}
            </div>
          </div>
        </b-card>

        <b-card
          header-html="<h4>Contribution statistics</h4>"
          header-tag="header"
          class="mt-3"
        >
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.contribution count') }}
              </h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ contributor.stats && contributor.stats.contributionCount || 0 }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.last contributed') }}
              </h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ formatDate(contributor.stats.lastContributedAt) }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.favourite day') }}
                <span
                  v-b-tooltip.hover
                  title="The most common day the user contributed at"
                ><font-awesome-icon
                  :icon="['fas', 'circle-question']"
                  style="height: 14px"
                /></span>
              </h6>
            </div>
            <div class="col-sm-9 text-secondary">
              {{ contributor.stats && contributor.stats.favouriteContributionDay || "-" }}
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-3">
              <h6 class="mb-0">
                {{ $t('general.profile.contribution history') }}
              </h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <div class="contributiontable">
                <div
                  v-for="item in data.contributeTable"
                  :key="item.value"
                  v-b-tooltip.hover
                  :title="item.value"
                  class="day"
                  :class="{ contributed: item.contributed }"
                />
              </div>
            </div>
          </div>
        </b-card>

        <b-card
          v-if="hasAnyOverwatchProfileSettings()"
          header-html="<h4>Overwatch</h4>"
          header-tag="header"
          class="mt-3"
        >
          <div v-if="contributor.profile.overwatch.arcadeModes.length">
            <h5 class="mb-2">
              {{ $t('general.profile.favourite gamemodes') }}
            </h5>
            <div class="d-flex flex-row">
              <div>
                <b-img
                  v-for="value in contributor.profile.overwatch.arcadeModes"
                  :key="value.name"
                  v-b-tooltip.hover
                  :title="value.name"
                  :src="value.url"
                  :alt="value.name"
                  class="owthumb"
                  height="128px"
                />
              </div>
            </div>
          </div>
          <div>
            <h5 v-if="contributor.profile.overwatch.heroes.length" class="mt-4 mb-2">
              {{ $t('general.profile.favourite heroes') }}
            </h5>
            <div class="d-flex flex-row">
              <div>
                <b-img
                  v-for="value in contributor.profile.overwatch.heroes"
                  :key="value.name"
                  v-b-tooltip.hover
                  :title="value.name"
                  :src="value.url"
                  :alt="value.name"
                  class="owthumb"
                  height="128px"
                />
              </div>
            </div>
          </div>
          <div>
            <h5 v-if="contributor.profile.overwatch.maps.length" class="mt-4 mb-2">
              {{ $t('general.profile.favourite maps') }}
            </h5>
            <div class="d-flex flex-row">
              <div>
                <b-img
                  v-for="value in contributor.profile.overwatch.maps"
                  :key="value.name"
                  v-b-tooltip.hover
                  :title="value.name"
                  :src="value.url"
                  :alt="value.name"
                  class="owthumb"
                  height="128px"
                />
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from 'timeago.js'
import CountryFlag from 'vue-country-flag'
export default {
  name: 'ContributorProfile',
  components: {
    CountryFlag
  },
  data () {
    return {
      data: {
        contributeTable: []
      },
      contributor: {
        username: null,
        group: null,
        contributions: null,
        last_submit: null,
        member_since: null,
        profile: {
          personal: {
            country: {
              code: null
            },
            text: null
          },
          overwatch: {
            arcadeModes: {},
            heroes: {},
            maps: {}
          },
          social: {
            steam: null,
            discord: null,
            twitter: null,
            battlenet: null
          }
        },
        stats: {
          contributionCount: null
        }
      },
      overwatch: {
        arcadeImages: {}
      }
    }
  },
  mounted () {
    const username = this.$route.params.index
    if (username === undefined) {
      return this.$nuxt.error({
        statusCode: 404,
        message: 'This user does not exist'
      })
    }
    this.$axios.get('/api/v1/contributor/' + username).then((response) => {
      // eslint-disable-next-line no-return-assign, no-sequences
      const contributor = Object.entries(response.data.data).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
      this.contributor = { ...this.contributor, ...contributor }
      this.data.contributeTable = this.calculateContributeTable(response.data.data.stats?.contributionDays ?? [])
    })
  },
  methods: {
    removeWhiteSpace (val) {
      return val.replace(' ', '').replace(':', '')
    },
    calculateContributeTable (contributorDays) {
      const contributedDays = []
      contributorDays.forEach((e) => {
        const date = new Date(e)
        contributedDays.push(date.toDateString())
      })

      const contributeTableHistoryDays = 365
      const today = new Date()
      const dates = []
      for (let i = 0; i < contributeTableHistoryDays; i++) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const isContributedDay = contributedDays.includes(date.toDateString())
        dates.push({ value: date.toDateString(), contributed: isContributedDay })
      }

      return dates
    },
    hasAnyOverwatchProfileSettings () {
      const hasArcadeModes = this.contributor.profile?.overwatch?.arcadeModes.length
      const hasHeroes = this.contributor.profile?.overwatch?.heroes.length
      const hasMaps = this.contributor.profile?.overwatch?.maps.length

      return hasArcadeModes || hasHeroes || hasMaps
    },
    formatDate (val) {
      if (val == null) {
        return '-'
      }
      return format(val + ' UTC')
    }
  }
}
</script>
<style>
th {
  text-align: right;
}
</style>
