<template>
  <div class="border-gray-400">
    <div
      class="shadow border flex-col lg:flex-row select-none cursor-pointer bg-white hover:bg-yellow-50 rounded-md flex flex-1 items-center p-4"
    >
      <div class="min-w-fit justify-center items-center py-2 lg:mr-4">
        <img
          :src="contributor.avatar"
          class="object-cover rounded-full h-14 w-auto"
        />
      </div>
      <div class="">
        <div class="font-medium text-gray-600">
          {{ contributor.username }}
        </div>
        <div class="text-gray-600 text-sm">
          <p class="leading-relaxed">
            Registered since
            <span>{{ $timeAgo(contributor.registeredAt) }}</span> with
            <span>{{ contributor.stats?.contributionCount || 0 }}</span>
            contribution(s)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContributorCard",
  props: {
    contributor: {
      type: Object,
      default() {
        return {
          username: null,
          avatar: null,
          group: null,
          stats: {
            contributionCount: 0,
          },
        };
      },
    },
  },
};
</script>
