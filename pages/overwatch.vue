<template>
  <div>
    <div v-if="pending">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-4 grid grid-flow-col grid-cols-1">
          <Simple />
        </div>
        <div class="col-span-12 lg:col-span-8 grid gap-4 grid-cols-3">
          <Simple />
          <Simple />
          <Simple />

          <Simple />
          <Simple />
          <Simple />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid grid-flow-col columns-2 mb-4">
        <div>
          <h3 class="text-2xl uppercase font-bold py-2">Contributor</h3>
          <NuxtLink
            :to="`/contributor/` + daily.data.contributor.username"
            class="flex flex-row items-center hover:text-yellow-100"
          >
            <img
              :src="daily.data.contributor.avatar"
              class="h-8 w-8 rounded-md mr-2 object-contain"
            />
            <p class="text-xl">{{ daily.data.contributor.username }}</p>
          </NuxtLink>
        </div>
        <div class="text-right">
          <h3 class="text-2xl uppercase font-bold py-2">Day ends in</h3>
          <p>15:32</p>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-4 grid grid-flow-col grid-cols-1">
          <Arcadetile :arcade="daily.data.modes[0]" :maintile="true" />
        </div>
        <div class="col-span-12 lg:col-span-8 grid gap-4 grid-cols-3">
          <Arcadetile :arcade="daily.data.modes[1]" />
          <Arcadetile :arcade="daily.data.modes[2]" />
          <Arcadetile :arcade="daily.data.modes[3]" />

          <Arcadetile :arcade="daily.data.modes[4]" />
          <Arcadetile :arcade="daily.data.modes[5]" />
          <Arcadetile :arcade="daily.data.modes[6]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Arcadetile from "~~/components/arcadetile.vue";
import ContributorcardMini from "~~/components/contributorcard-mini.vue";

export default {
  name: "OverwatchPage",
  components: { Arcadetile, Simple },
};
</script>

<script setup>
import Simple from "../components/skeletons/simple.vue";
const { pending, data: daily } = useLazyAsyncData("daily", () =>
  $fetch("https://api.overwatcharcade.today/api/v1/overwatch/today")
);
</script>
