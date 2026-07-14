<template>
  <div class="min-h-screen bg-white text-[#111827]">
    <!-- hero -->
    <section class="relative overflow-hidden">
      <!-- glow orbs -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute left-1/2 top-0 h-72 w-72 -translate-x-[140%] rounded-full bg-[#34D399] opacity-[0.16] blur-[100px]"
        />
        <div
          class="absolute left-1/2 top-10 h-72 w-72 -translate-x-[10%] rounded-full bg-[#60A5FA] opacity-[0.14] blur-[100px]"
        />
        <div
          class="absolute left-1/2 top-40 h-72 w-72 translate-x-[60%] rounded-full bg-[#F472B6] opacity-[0.12] blur-[100px]"
        />
      </div>

      <div class="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10 sm:py-32">
        <div
          class="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8F9FB] px-4 py-1.5 text-xs font-medium text-[#6B7280]"
        >
          <Sparkles :size="13" :stroke-width="2" />
          One app for everything your business runs on
        </div>
        <h1
          class="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
        >
          Every tool you need,
          <br class="hidden sm:block" />
          in one place.
        </h1>
        <p
          class="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#6B7280]"
        >
          Financial calculators, health calculators, analytics dashboards and
          math operations workflows — no more switching between a dozen apps to
          run your day.
        </p>
        <div
          class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <NuxtLink
            to="/products"
            class="group flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Explore all tools
            <ArrowRight
              :size="15"
              :stroke-width="2.25"
              class="transition-transform group-hover:translate-x-0.5"
            />
          </NuxtLink>
          <a
            href="#features"
            class="rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#374151] transition-colors hover:border-[#D1D5DB] hover:text-[#111827]"
          >
            See how it works
          </a>
        </div>

        <!-- stats -->
        <div
          class="mx-auto mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-[#E5E7EB] pt-8"
        >
          <div>
            <p class="text-2xl font-bold tabular-nums">5+</p>
            <p class="mt-1 text-xs text-[#9CA3AF]">Tools available</p>
          </div>
          <div>
            <p class="text-2xl font-bold tabular-nums">5</p>
            <p class="mt-1 text-xs text-[#9CA3AF]">Categories</p>
          </div>
          <div>
            <p class="text-2xl font-bold tabular-nums">1</p>
            <p class="mt-1 text-xs text-[#9CA3AF]">APP</p>
          </div>
        </div>
      </div>
    </section>

    <!-- categories -->
    <section class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div class="mb-10 max-w-lg">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
        >
          Categories
        </p>
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          Organized the way you actually work
        </h2>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          to="/products"
          class="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:shadow-md"
        >
          <div
            class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
            :style="{ backgroundColor: cat.accent }"
          />
          <div class="flex items-start justify-between">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl"
              :style="{ backgroundColor: cat.accent + '14' }"
            >
              <component
                :is="cat.icon"
                :size="20"
                :stroke-width="1.75"
                :style="{ color: cat.accent }"
              />
            </div>
            <span class="text-xs font-medium text-[#9CA3AF]"
              >{{ cat.count }} tools</span
            >
          </div>
          <h3 class="mt-5 text-lg font-semibold text-[#111827]">
            {{ cat.label }}
          </h3>
          <p class="mt-1.5 text-[13px] leading-relaxed text-[#6B7280]">
            {{ cat.description }}
          </p>
          <div
            class="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            :style="{ color: cat.accent }"
          >
            Explore
            <ArrowRight :size="14" :stroke-width="2.25" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- features -->
    <section id="features" class="border-t border-[#E5E7EB] bg-[#F8F9FB]">
      <div class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div class="mb-12 max-w-lg">
          <p
            class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
          >
            Why Everything
          </p>
          <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built to replace your tab overload
          </h2>
        </div>

        <div class="grid gap-8 sm:grid-cols-3">
          <div v-for="f in features" :key="f.title">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white"
            >
              <component
                :is="f.icon"
                :size="18"
                :stroke-width="1.75"
                class="text-[#374151]"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold text-[#111827]">
              {{ f.title }}
            </h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-[#6B7280]">
              {{ f.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- popular tools -->
    <section id="tools" class="border-t border-[#E5E7EB]">
      <div class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div class="mb-10 flex items-end justify-between">
          <div>
            <p
              class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
            >
              Popular tools
            </p>
            <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
              Jump straight in
            </h2>
          </div>
          <NuxtLink
            to="/products"
            class="hidden items-center gap-1 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827] sm:flex"
          >
            View all
            <ArrowRight :size="14" :stroke-width="2.25" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NuxtLink
            v-for="tool in popularTools"
            :key="tool.name"
            :to="tool.to"
            class="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:shadow-md"
          >
            <div
              class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
              :style="{ backgroundColor: tool.accent }"
            />
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl"
              :style="{ backgroundColor: tool.accent + '14' }"
            >
              <component
                :is="tool.icon"
                :size="20"
                :stroke-width="1.75"
                :style="{ color: tool.accent }"
              />
            </div>
            <h3 class="text-[15px] font-semibold text-[#111827]">
              {{ tool.name }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="border-t border-[#E5E7EB] bg-[#F8F9FB]">
      <div class="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10">
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to simplify your toolkit?
        </h2>
        <p class="mx-auto mt-3 max-w-md text-[15px] text-[#6B7280]">
          Every tool, one place, no extra logins. Start with whatever you need
          first.
        </p>
        <NuxtLink
          to="/products"
          class="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Get started for free
          <ArrowRight
            :size="15"
            :stroke-width="2.25"
            class="transition-transform group-hover:translate-x-0.5"
          />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  LineChart,
  Megaphone,
  BarChart3,
  Settings2,
  Percent,
  Home,
  Scale,
  Target,
} from "lucide-vue-next";

const categories = [
  {
    id: "financial",
    label: "Financial",
    description:
      "VAT, mortgage, invoicing and every money calculation you run weekly.",
    accent: "#059669",
    icon: LineChart,
    count: 2,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Campaigns, budgets and newsletters. Without switching app.",
    accent: "#D97706",
    icon: Megaphone,
    count: 1,
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Dashboards, forecasts and retention — the numbers that matter, live.",
    accent: "#2563EB",
    icon: BarChart3,
    count: 1,
  },
  {
    id: "health",
    label: "Health",
    description: "Calculate your BMI+ and more... with our original formula.",
    accent: "#DB2777",
    icon: Settings2,
    count: 1,
  },
];

const popularTools = [
  {
    name: "VAT Calculator",
    icon: Percent,
    accent: "#059669",
    to: "/vat",
  },

  { name: "BMI+ Calculator", icon: Scale, accent: "#2563EB", to: "/bmi" },
  { name: "UTM Builder", icon: Target, accent: "#D97706", to: "/utm" },
  {
    name: "Profit Margin Calculator",
    icon: Home,
    accent: "#059669",
    to: "/profit-margin",
  },
];

const features = [
  {
    title: "One login, every tool",
    description:
      "No more juggling five different apps for five different jobs.",
    icon: Layers,
  },
  {
    title: "Built for speed",
    description:
      "Every calculator and dashboard loads instantly, no bloated setup.",
    icon: Zap,
  },
  {
    title: "Your data, protected",
    description: "Encrypted end to end, with full control over what you share.",
    icon: ShieldCheck,
  },
];
</script>
