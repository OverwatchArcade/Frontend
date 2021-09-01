<template>
  <section class="mt-5 mb-5">
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="align-items-center text-center">
              <img
                v-if="previewAvatar"
                :src="previewAvatar"
                :alt="$auth.user.username + '\'s avatar'"
                class="rounded-circle"
                width="150"
              >
              <img
                v-else
                :src="$auth.user.avatar"
                :alt="$auth.user.username + '\'s avatar'"
                class="rounded-circle"
                width="150"
              >
              <div class="mt-3">
                <input ref="avatar" type="file" accept="image/*" class="d-none" @change="previewImage">

                <h3>{{ $auth.user.username }}</h3>
                <h4 class="mb-4">
                  {{ $auth.user.group }}
                </h4>
                <p class="text-muted font-size-sm">
                  Member since {{ formatDate($auth.user.registeredAt) }}
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="button" class="btn btn-outline-dark" @click="$refs.avatar.click()">
              Browse
            </button>
            <button v-if="previewAvatar" type="button" class="btn btn-primary" @click="uploadAvatar">
              Upload
            </button>
          </div>
        </div>
        <form @submit.prevent>
          <div class="card mt-4">
            <div class="card-header">
              <h4>Social</h4>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <label for="text1">Discord</label>
                <input v-model="settings.social.discord" placeholder="bluedog#1234" type="text" class="form-control">
              </div>
              <div class="mb-2">
                <label for="text">Battlenet</label>
                <input v-model="settings.social.battlenet" placeholder="bluedog#1234" type="text" class="form-control">
              </div>
              <div class="mb-2">
                <label for="text2">Steam</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      /id/
                    </div>
                  </div>
                  <input v-model="settings.social.steam" type="text" class="form-control">
                </div>
              </div>
              <div class="mb-2">
                <label for="text2">Twitter</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      @
                    </div>
                  </div>
                  <input v-model="settings.social.twitter" name="twitter" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="card-footer text-end">
              <button class="btn btn-primary" @click="saveProfile">
                Save profile
              </button>
            </div>
          </div>
        </form>
        </formv-on:submit.prevent>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h4>About</h4>
          </div>
          <div class="card-body">
            <div class="mb-2">
              <label for="country">Country</label>
              <div>
                <multiselect
                  v-model="settings.personal.country"
                  :options="countries"
                  :searchable="true"
                  :close-on-select="true"
                  :multiple="false"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                />
              </div>
            </div>
            <div class="mb-2">
              <label for="textarea">About</label>
              <textarea v-model="settings.personal.about" cols="40" rows="5" class="form-control" />
            </div>
          </div>
          <div class="card-footer text-end">
            <button class="btn btn-primary" @click="saveProfile()">
              Save profile
            </button>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h4>Overwatch</h4>
          </div>
          <div class="card-body">
            <div class="mb-2">
              <label>Arcade modes</label>
              <div>
                <multiselect
                  v-model="settings.game.overwatch.arcadeModes"
                  :options="overwatch.arcadeModes"
                  :searchable="true"
                  :close-on-select="false"
                  :multiple="true"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                />
              </div>
            </div>
            <div class="mb-2">
              <label>Heroes</label>
              <div>
                <multiselect
                  v-model="settings.game.overwatch.heroes"
                  :options="overwatch.heroes"
                  :searchable="true"
                  :close-on-select="false"
                  :multiple="true"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                />
              </div>
            </div>
            <div class="mb-2">
              <label>Maps</label>
              <div>
                <multiselect
                  v-model="settings.game.overwatch.maps"
                  :options="overwatch.maps"
                  :searchable="true"
                  :close-on-select="false"
                  :multiple="true"
                  :show-labels="true"
                  label="name"
                  track-by="name"
                />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button class="btn btn-primary" @click="saveProfile()">
              Save profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'Settings',
  directives: {},
  components: {
    Multiselect
  },
  middleware: 'auth',
  data () {
    return {
      previewAvatar: null,
      uploadedAvatar: null,
      settings: {
        personal: {
          about: '',
          country: ''
        },
        social: {
          discord: '',
          twitter: '',
          steam: '',
          battlenet: ''
        },
        game: {
          overwatch: {
            maps: [],
            arcadeModes: [],
            heroes: []
          }
        }
      },
      countries: [],
      overwatch: {
        heroes: [],
        maps: [],
        arcadeModes: []
      }
    }
  },
  mounted () {
    this.$axios.setToken(this.$auth.strategy.token.get(), 'Bearer')
    this.getProfile()
    this.getSettingsOptions()
  },
  methods: {
    formatDate (val) {
      const date = new Date(val)
      return date.toDateString()
    },
    getProfile () {
      this.$axios
        .get('/api/v1/contributor/' + this.$auth.user.username)
        .then((response) => {
          if (response.data.data.profile) {
            this.settings = response.data.data.profile
          }
        })
        .catch(function (e) {
          this.$toasted.error('Couldn\'t load profile settings').goAway(2500)
        })
    },
    previewImage (e) {
      const image = e.target.files[0]
      this.uploadedAvatar = image
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.previewAvatar = e.target.result
      }
    },
    uploadAvatar () {
      const bodyFormData = new FormData()
      bodyFormData.append('Avatar', this.uploadedAvatar)

      this.$axios
        .post('/api/v1/contributor/auth/avatar', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
          this.$toasted.success('Avatar uploaded!').goAway(2500)
          this.$auth.fetchUser()
        })
        .catch((error) => {
          const messages = error.response.data.message.split(',')
          messages.forEach((e) => {
            this.$toasted.error(e).goAway(2500)
          })
        })
    },
    getSettingsOptions () {
      this.$axios.get('/api/v1/overwatch/arcademodes').then((response) => { this.overwatch.arcadeModes = response.data.data })
      this.$axios.get('/api/v1/contributor/config/countries').then((response) => { this.countries = response.data.data })
      this.$axios.get('/api/v1/contributor/config/overwatch/heroes').then((response) => { this.overwatch.heroes = response.data.data })
      this.$axios.get('/api/v1/contributor/config/overwatch/maps').then((response) => { this.overwatch.maps = response.data.data })
    },
    saveProfile () {
      this.$axios
        .post('/api/v1/contributor/auth/profile', this.settings)
        .then(() => {
          this.$toasted.success('Profile saved!').goAway(2500)
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$toasted.error('Bad request').goAway(2500)
          } else {
            const messages = error.response.data.message.split(',')
            messages.forEach((e) => {
              this.$toasted.error(e).goAway(2500)
            })
          }
        })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
