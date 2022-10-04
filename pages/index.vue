<template>
  <ul class="text-3xl uppercase space-y-2 font-bold italic">
    <li>
      <NuxtLink class="hover:text-orange-800" to="/overwatch"
        >Overwatch</NuxtLink
      >
    </li>
    <li>
      <NuxtLink class="hover:text-orange-800" to="/contributors"
        >Contributors</NuxtLink
      >
    </li>
    <li>API Docs</li>
    <li>
      <NuxtLink class="hover:text-orange-800" to="/about">About</NuxtLink>
    </li>
  </ul>
</template>
<script>
export default {
  name: "IndexPage",
};
</script>
