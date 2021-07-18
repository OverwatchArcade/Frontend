<template>
  <div>
    <h3>Login</h3>
    <p />
  </div>
</template>
<script>
import DiscordOAuth2 from 'discord-oauth2'

export default {
  mounted () {
    this.discordRedirect()
  },
  methods: {
    makeid (length) {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
    discordRedirect () {
      const auth = new DiscordOAuth2()

      const url = auth.generateAuthUrl({
        clientId: this.$config.discord_clientid,
        redirectUri: this.$config.discord_redirecturi,
        state: this.makeid(12),
        scope: ['identify', 'email']
      })

      window.location.href = url
    }
  }
}
</script>
