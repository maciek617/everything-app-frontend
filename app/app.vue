<template>
  <NuxtLayout>
    <nav>
      <div class="p-4 bg-white fixed top-0 left-0 z-30 w-full shadow">
        <p class="text-4xl font-light">
          Everythin<span class="text-[#006AFF]">APP</span>
        </p>
      </div>
      <IconsMenu
        class="fixed top-0 right-0 z-50 lg:hidden"
        :class="!navOpen ? '' : 'hidden'"
        @click="navOpen = !navOpen"
      />
      <IconsXmark
        class="fixed top-0 right-0 z-50 lg:hidden"
        :class="navOpen ? '' : 'hidden'"
        @click="navOpen = !navOpen"
      />
      <ul
        class="bg-white h-screen fixed top-0 right-0 w-full z-40 flex items-center justify-center gap-10 flex-col text-4xl font-light transition-transform lg:translate-x-0 lg:flex-row lg:h-fit lg:text-2xl lg:py-4 lg:bg-transparent lg:gap-20"
        :class="navOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <li>Home</li>
        <li>Products</li>
        <li>Learn</li>
        <li>About</li>
      </ul>
    </nav>

    <NuxtPage class="mt-24 min-h-screen" />

    <footer class="p-4 border border-t-2">
      <p>
        &copy; {{ new Date().getFullYear() }} EverythinApp. All rights reserved.
      </p>
    </footer>
  </NuxtLayout>
</template>

<script setup lang="ts">
const navOpen = ref(false);
</script>
