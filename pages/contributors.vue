<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <h1>{{ $t('overwatch.contributors') }}</h1>
      </div>
    </div>
    <div class="row">
      <div
        v-for="contributor in contributors"
        :key="contributor.username"
        class="col-sm-6 col-lg-3 mb-4"
      >
        <contributortile :contributor="contributor" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contributors',
  data () {
    return {
      contributors: [{}, {}, {}]
    }
  },
  mounted () {
    this.getContributors()
  },
  methods: {
    getContributors () {
      return this.$axios.get('/api/v1/contributor').then((response) => {
        this.contributors = response.data.data
      })
    }
  }
}
</script>
