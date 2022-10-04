<template>
  <footer>
    <div class="py-16">
      <p class="mt-6 leading-relaxe">
        Game content and materials are trademarks and copyrights of their
        respective publisher and its licensors. all rights reserved<br />
        This site is licensed under a
        <a
          rel="license"
          target="_blank"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          >Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License</a
        >
      </p>

      <ul class="flex gap-6 mt-12 md:gap-8">
        <li>
          <twitter :link="'owarcade'" />
        </li>
      </ul>
    </div>
  </footer>
</template>
<script>
import Twitter from "./socialicons/twitter.vue";
export default {
  name: "FooterComponent",
  components: { Twitter },
};
</script>
