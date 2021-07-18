<template>
  <div>
    <ul class="owarcade-menu">
      <li>
        <nuxt-link to="/overwatch">
          Overwatch
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/contributors">
          {{ $t('general.menu.contributors') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/api_docs">
          {{ $t('general.menu.api docs') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">
          {{ $t('general.menu.about') }}
        </nuxt-link>
      </li>
      <client-only>
        <li>
          <nuxt-link v-if="$auth.loggedIn" to="/settings">
            Settings
          </nuxt-link>
        </li>
        <li v-if="$auth.loggedIn">
          <a href="#" @click="logout">Logout</a>
        </li>
      </client-only>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout('local')
      this.$toasted.success('You\'ve been logged out, seeya later!').goAway(2500)
    }
  }
}
</script>
