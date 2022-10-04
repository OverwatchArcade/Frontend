<template>
  <div
    class="flex-col lg:flex-row select-none cursor-pointer bg-white flex flex-1 items-center"
  >
    <div class="justify-center items-center lg:mr-4">
      <img :src="contributor.avatar" class="object-cover h-14 w-auto" />
    </div>
    <div>
      <div class="font-medium text-gray-600">
        {{ contributor.username }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MiniContributorCard",
  props: {
    contributor: {
      type: Object,
      default() {
        return {
          username: null,
          avatar: null,
        };
      },
    },
  },
};
</script>
