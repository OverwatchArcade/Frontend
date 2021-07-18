<template>
  <div>
    <h1>Logging in</h1>
    <h2>Please wait a moment..</h2>
  </div>
</template>
<script>
export default {
  mounted () {
    this.discordTokenRequest()
  },
  methods: {
    discordTokenRequest () {
      const code = this.$route.query.code

      if (code !== undefined) {
        this.login(code)
      }
    },
    login (code) {
      this.$auth
        .loginWith('local', {
          params: { code }
        })
        .then(this.$toasted.success('Succesfully logged in').goAway(2500))
        .catch((e) => {
          this.$toasted.error(e.response.data.message).goAway(5000)
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
