<script setup lang="ts">
import {
  ArrowRight,
  Layers,
  Zap,
  ShieldCheck,
  Users,
  Rocket,
  Compass,
} from "lucide-vue-next";

const values = [
  {
    title: "Simplicity first",
    description:
      "If a feature needs a manual, it's not done yet. Every tool should be obvious in ten seconds.",
    icon: Layers,
    accent: "#111827",
  },
  {
    title: "Built for speed",
    description:
      "No loading screens, no bloated setup. Open a tool, get your answer, move on.",
    icon: Zap,
    accent: "#D97706",
  },
  {
    title: "Data you control",
    description:
      "Your numbers stay yours. Encrypted end to end, with full control over what's shared.",
    icon: ShieldCheck,
    accent: "#2563EB",
  },
  {
    title: "One team, one mission",
    description:
      "Everyone here works on the same problem: replacing ten apps with one.",
    icon: Users,
    accent: "#059669",
  },
];

const timeline = [
  {
    year: "2026",
    title: "The idea",
    description: "Started as an impulse. Become as a product.",
    accent: "#059669",
  },
];

const team = [
  {
    name: "Maciej G.",
    role: "Founder",
    initials: "MG",
    accent: "#059669",
  },
];

const stats = [
  { value: "2026", label: "Founded" },
  { value: "5+", label: "Tools shipped now" },
  { value: "100+", label: "Calculations run" },
  { value: "20+", label: "Tools in the future" },
];
</script>

<template>
  <div class="min-h-screen bg-white text-[#111827]">
    <!-- hero -->
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute left-1/2 top-0 h-72 w-72 -translate-x-[140%] rounded-full bg-[#34D399] opacity-[0.14] blur-[100px]"
        />
        <div
          class="absolute left-1/2 top-10 h-72 w-72 -translate-x-[10%] rounded-full bg-[#60A5FA] opacity-[0.12] blur-[100px]"
        />
      </div>

      <div class="mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 sm:py-28">
        <div
          class="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8F9FB] px-4 py-1.5 text-xs font-medium text-[#6B7280]"
        >
          <Compass :size="13" :stroke-width="2" />
          About Everything
        </div>
        <h1
          class="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
        >
          Built by people who were
          <br class="hidden sm:block" />
          tired of switching tabs.
        </h1>
        <p
          class="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[#6B7280]"
        >
          Everything started as a shortcut for our own team, and grew into the
          toolbox we wished existed — one login, every calculation and dashboard
          you actually use.
        </p>
      </div>
    </section>

    <!-- stats -->
    <section class="border-y border-[#E5E7EB] bg-[#F8F9FB]">
      <div
        class="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 sm:px-10"
      >
        <div v-for="s in stats" :key="s.label" class="text-center">
          <p class="text-2xl font-bold tabular-nums text-[#111827]">
            {{ s.value }}
          </p>
          <p class="mt-1 text-xs text-[#9CA3AF]">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- mission -->
    <section class="mx-auto max-w-3xl px-6 py-20 text-center sm:px-10">
      <p
        class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
      >
        Our mission
      </p>
      <p
        class="text-2xl font-medium leading-relaxed tracking-tight text-[#111827] sm:text-3xl"
      >
        Make the everyday math of running a business or a day
        <span class="text-[#059669]">boring again</span> — fast, obvious, and
        available in one place.
      </p>
    </section>

    <!-- values -->
    <section class="border-t border-[#E5E7EB]">
      <div class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div class="mb-12 max-w-lg">
          <p
            class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
          >
            What we believe
          </p>
          <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            The values behind every tool
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div
            v-for="v in values"
            :key="v.title"
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl"
              :style="{ backgroundColor: v.accent + '14' }"
            >
              <component
                :is="v.icon"
                :size="18"
                :stroke-width="1.75"
                :style="{ color: v.accent }"
              />
            </div>
            <h3 class="mt-4 text-base font-semibold text-[#111827]">
              {{ v.title }}
            </h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-[#6B7280]">
              {{ v.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- story timeline -->
    <section class="border-t border-[#E5E7EB] bg-[#F8F9FB]">
      <div class="mx-auto max-w-3xl px-6 py-20 sm:px-10">
        <div class="mb-12 max-w-lg">
          <p
            class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
          >
            Our story
          </p>
          <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            From spreadsheet to toolbox
          </h2>
        </div>

        <div class="relative pl-8">
          <div class="absolute bottom-2 left-[7px] top-2 w-px bg-[#E5E7EB]" />
          <div
            v-for="(step, i) in timeline"
            :key="step.year"
            :class="i !== timeline.length - 1 ? 'mb-10' : ''"
            class="relative"
          >
            <span
              class="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-[#F8F9FB]"
              :style="{ backgroundColor: step.accent }"
            />
            <p
              class="text-xs font-semibold tabular-nums"
              :style="{ color: step.accent }"
            >
              {{ step.year }}
            </p>
            <h3 class="mt-1 text-base font-semibold text-[#111827]">
              {{ step.title }}
            </h3>
            <p
              class="mt-1.5 max-w-md text-[13px] leading-relaxed text-[#6B7280]"
            >
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- team -->
    <section class="border-t border-[#E5E7EB]">
      <div class="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div class="mb-12 max-w-lg">
          <p
            class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#9CA3AF]"
          >
            The team
          </p>
          <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            Small team, wide reach
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-sm font-semibold"
              :style="{
                backgroundColor: member.accent + '14',
                color: member.accent,
              }"
            >
              {{ member.initials }}
            </div>
            <h3 class="mt-3 text-sm font-semibold text-[#111827]">
              {{ member.name }}
            </h3>
            <p class="mt-0.5 text-[12px] text-[#9CA3AF]">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="border-t border-[#E5E7EB] bg-[#F8F9FB]">
      <div class="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10">
        <div
          class="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"
        >
          <Rocket :size="18" :stroke-width="1.75" class="text-[#111827]" />
        </div>
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          Want to see it in action?
        </h2>
        <p class="mx-auto mt-3 max-w-md text-[15px] text-[#6B7280]">
          Explore the full toolbox — no setup, no extra logins, just the tools
          you need.
        </p>
        <NuxtLink
          to="/products"
          class="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Explore all tools
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
