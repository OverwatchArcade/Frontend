<template>
  <div>
    <div v-if="pending">
      <Simple />
    </div>
    <div v-if="contributor?.data">
      <div class="grid grid-cols-4 gap-2">
        <div class="col-span-4 md:col-span-1">
          <div class="bg-white rounded-lg border border-gray-200 shadow-md">
            <div class="flex flex-col items-center py-5">
              <img
                class="mb-3 w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg"
                :src="contributor.data.avatar"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900">
                {{ contributor.data.username }}
              </h5>
              <p class="text-center text-sm text-gray-900 leading-relaxed">
                Contributor since
                <span>{{ $formatDate(contributor.data.registeredAt) }}</span>
              </p>
              <div class="flex flex-row gap-4 pt-6">
                <div>
                  <Twitter
                    v-if="contributor?.data?.profile?.social?.twitter"
                    :link="contributor?.data?.profile?.social?.twitter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-4 md:col-span-3 space-y-2">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Personal information
              </h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">Country</dt>
                  <dd
                    class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center"
                  >
                    <country-flag
                      :country="
                        contributor.data.profile?.personal?.country.code
                      "
                      size="small"
                    />
                    {{
                      contributor.data.profile?.personal?.country.name || "-"
                    }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">About</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ contributor.data.profile?.personal?.text || "-" }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Contribution information
              </h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Contributions
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ contributor.data.stats?.contributionCount || 0 }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Favourite day
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{
                      contributor.data.stats?.favouriteContributionDay || "-"
                    }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Last contributed
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{
                      $timeAgo(contributor.data.stats?.lastContributedAt) || "-"
                    }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Overwatch
              </h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Arcade Modes
                  </dt>
                  <dd
                    class="sm:mt-0 flex flex-row flex-wrap gap-1 sm:col-span-2"
                  >
                    <img
                      v-for="arcadeMode in contributor.data.profile?.overwatch
                        .arcadeModes"
                      :key="arcadeMode.name"
                      :src="arcadeMode.url"
                      class="w-auto h-24 object-contain rounded-sm"
                    />
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Favourite heroes
                  </dt>
                  <dd
                    class="sm:mt-0 flex flex-row flex-wrap gap-1 sm:col-span-2"
                  >
                    <img
                      v-for="hero in contributor.data.profile?.overwatch.heroes"
                      :key="hero.name"
                      :src="hero.url"
                      class="w-auto h-24 object-contain rounded-sm"
                    />
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Favourite maps
                  </dt>
                  <dd
                    class="sm:mt-0 flex flex-row flex-wrap gap-1 sm:col-span-2"
                  >
                    <img
                      v-for="map in contributor.data.profile?.overwatch.maps"
                      :key="map.name"
                      :src="map.url"
                      class="w-auto h-24 object-contain rounded-sm"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Simple from "~/components/skeletons/simple.vue";
import Twitter from "~~/components/socialicons/twitter.vue";
const route = useRoute();

const {
  pending,
  data: contributor,
  error,
} = await useFetch(
  `https://api.overwatcharcade.today/api/v1/contributor/${route.params.username}`
);

if (error.value) {
  throwError("Not found");
}
</script>

<script>
import CountryFlag from "vue-country-flag-next";
export default {
  name: "ContributorProfilePage",
  components: {
    CountryFlag,
  },
};
</script>
