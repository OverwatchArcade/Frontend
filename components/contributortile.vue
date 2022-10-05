<template>
  <div v-if="contributor.username" class="card contributortile">
    <img
      class="card-img-top"
      :src="contributor.avatar"
      :alt="contributor.username + '\'s avatar'"
    >
    <div class="card-body">
      <h4>{{ contributor.username }}</h4>
      <p>
        {{ $t('general.contributor listing.contributor since', {0: formatDate(contributor.registeredAt), 1: contributor.stats && contributor.stats.contributionCount || 0}) }}
      </p>
      <span
        class="small text-muted"
      >{{ $t('general.contributor listing.contributor last contributed', {0: formatDate(contributor.stats && contributor.stats.lastContributedAt || null)}) }}</span>
    </div>
    <div class="card-footer clearfix">
      <nuxt-link
        :to="{
          path: '/contributor/' + contributor.username.replace(/#/, '%23'),
          params: { contributor: contributor.username.replace(/#/, '%23') },
        }"
        class="float-end btn btn-warning"
      >
        {{ $t('general.contributor listing.view profile') }}
      </nuxt-link>
    </div>
  </div>
  <div v-else class="card">
    <content-loader
      :height="250"
      :width="400"
      :speed="1"
      primary-color="#DADADA"
      secondary-color="#C4C4C4"
    />
  </div>
</template>

<script>
import { format } from 'timeago.js'
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'ContributorTile',
  components: {
    ContentLoader
  },
  props: {
    contributor: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatDate (val) {
      if (val == null) {
        return '-'
      }
      return format(val + ' UTC')
    }
  }
}
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>
