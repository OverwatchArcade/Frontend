<template>
  <div class="h-full w-full object-cover m-auto">
    <div class="h-max">
      <img v-if="maintile" :src="arcade.image" class="object-cover h-full" />
      <img v-else :src="arcade.image" class="object-cover" />
    </div>
    <div class="bg-white w-full p-4">
      <p class="text-gray-800 text-xl font-medium mb-2">
        {{ arcade.players }}
      </p>
      <p class="text-gray-400 font-light text-md">
        {{ arcade.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArcadeTile",
  props: {
    arcade: {
      type: Object,
      default() {
        return {
          name: null,
          players: null,
          description: null,
          image: null,
          label: null,
        };
      },
    },
    maintile: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
