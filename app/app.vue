<template>
  <NuxtLayout>
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10"
    >
      <div class="flex items-center gap-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827]"
        >
          <Sparkles :size="16" :stroke-width="2" class="text-white" />
        </div>
        <span class="text-sm font-semibold tracking-tight">Everything</span>
      </div>
      <div class="hidden items-center gap-8 text-sm text-[#6B7280] sm:flex">
        <NuxtLink to="/" class="transition-colors hover:text-[#111827]"
          >Home</NuxtLink
        >
        <NuxtLink to="/products" class="transition-colors hover:text-[#111827]"
          >Products</NuxtLink
        >
        <NuxtLink to="/learn" class="transition-colors hover:text-[#111827]"
          >Learn</NuxtLink
        >
      </div>
      <NuxtLink
        to="/products"
        class="rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        Get started
      </NuxtLink>
    </nav>

    <NuxtPage class="min-h-screen" />

    <!-- footer -->
    <footer class="border-t border-[#E5E7EB]">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-[#9CA3AF] sm:flex-row sm:px-10"
      >
        <span
          >© {{ new Date().getFullYear() }} Everything. All rights
          reserved.</span
        >
        <div class="flex gap-6">
          <NuxtLink
            to="/products"
            class="transition-colors hover:text-[#374151]"
            >Products</NuxtLink
          >
          <a href="#features" class="transition-colors hover:text-[#374151]"
            >Features</a
          >
        </div>
      </div>
    </footer>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>
