<template>
  <div
    class="bg-gray-800 min-h-full"
    :style="{
      background: `url(${
        pending ? defaultBackground : backgroundUrl.data
      }) no-repeat center center fixed`,
      backgroundSize: `cover`,
    }"
  >
    <div class="container mx-auto px-4 py-12 min-h-screen text-white">
      <Header class="mb-12" />
      <slot />
      <Footer />
    </div>
  </div>
</template>
<script>
import Footer from "~~/components/footer.vue";
import Header from "../components/header.vue";
import defaultBackground from "~/assets/pattern.png";

export default {
  name: "defaultLayout",
  components: { Footer, Header },
  data() {
    return {
      defaultBackground,
    };
  },
};
</script>

<script setup>
const { pending, data: backgroundUrl } = await useLazyFetch(
  "https://api.overwatcharcade.today/api/v1/overwatch/event/wallpaper"
);
</script>
