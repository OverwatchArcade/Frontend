<template>
  <div v-if="pending">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <Simple />
      <Simple />
      <Simple />
      <Simple />
      <Simple />
      <Simple />
    </div>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
    <NuxtLink
      v-for="contributor in contributors.data"
      :key="contributor.username"
      :to="'/contributor/' + contributor.username"
    >
      <Contributorcard :contributor="contributor" />
    </NuxtLink>
  </div>
</template>
<script>
import Contributorcard from "~~/components/contributorcard.vue";
export default {
  name: "ContributorsPage",
  components: { Contributorcard },
};
</script>

<script setup>
import Simple from "../components/skeletons/simple.vue";
const { pending, data: contributors } = useLazyAsyncData("contributors", () =>
  $fetch("https://api.overwatcharcade.today/api/v1/contributor")
);
</script>
