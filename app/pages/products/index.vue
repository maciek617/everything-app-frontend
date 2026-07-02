<script setup lang="ts">
import {
  Percent,
  Home,
  Wallet,
  Receipt,
  PiggyBank,
  Megaphone,
  ArrowRight,
  Target,
  Mail,
  BarChart3,
  LineChart,
  Activity,
  Settings2,
  Truck,
  ClipboardList,
  type LucideIcon,
} from "lucide-vue-next";

interface Category {
  id: string;
  label: string;
  accent: string; // tailwind-safe hex, injected via inline style
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  to: string;
}

const categories: Category[] = [
  { id: "financial", label: "Financial", accent: "#34D399" },
  { id: "marketing", label: "Marketing", accent: "#F59E0B" },
  { id: "analytics", label: "Analytics", accent: "#60A5FA" },
  { id: "health", label: "Health", accent: "#FF0000" },
  { id: "math", label: "Math", accent: "#F472B6" },
];

const tools: Tool[] = [
  {
    id: "vat",
    name: "VAT Calculator",
    description: "Calculate the net amount, the gross amount, and the VAT.",
    category: "financial",
    icon: Percent,
    to: "/vat",
  },
  {
    id: "bmi",
    name: "BMI+ Calculator",
    description: "Calculate your BMI",
    category: "health",
    icon: Home,
    to: "/bmi",
  },
];

const active = ref<string>("financial");

const activeCategory = computed(
  () => categories.find((c) => c.id === active.value)!,
);

const filteredTools = computed(() =>
  tools.filter((t) => t.category === active.value),
);
</script>

<template>
  <div class="min-h-screen text-[#0B0D10]">
    <div class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/40"
        >
          Toolbox
        </p>
        <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
          Products
        </h1>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-black/50">
          Choose category to show related tools.
        </p>
      </div>

      <!-- tabs -->
      <div
        class="-mx-6 mb-8 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div class="px-2 flex gap-5 md:hidden">
          <p>Scroll right</p>
          <ArrowRight />
        </div>
        <div
          role="tablist"
          aria-label="Kategorie produktów"
          class="mt-4 flex w-max gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1 sm:w-fit md:mt-0"
        >
          <button
            v-for="cat in categories"
            :key="cat.id"
            role="tab"
            :aria-selected="active === cat.id"
            class="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="
              active === cat.id
                ? 'text-[#0B0D10]'
                : 'text-black/55 hover:text-black/85'
            "
            @click="active = cat.id"
          >
            <span
              v-if="active === cat.id"
              class="absolute inset-0 rounded-full transition-colors"
              :style="{ backgroundColor: cat.accent }"
            />
            <span class="relative">{{ cat.label }}</span>
          </button>
        </div>
      </div>

      <!-- tile grid -->
      <TransitionGroup
        tag="div"
        name="tile"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <NuxtLink
          v-for="tool in filteredTools"
          :key="tool.id"
          :to="tool.to"
          class="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.05]"
        >
          <!-- glow -->
          <div
            class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
            :style="{ backgroundColor: activeCategory.accent }"
          />

          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: activeCategory.accent + '1A' }"
          >
            <component
              :is="tool.icon"
              :size="20"
              :stroke-width="1.75"
              :style="{ color: activeCategory.accent }"
            />
          </div>

          <div>
            <h3 class="text-[15px] font-semibold text-black">
              {{ tool.name }}
            </h3>
            <p class="mt-1 text-[13px] leading-snug text-black/45">
              {{ tool.description }}
            </p>
          </div>
        </NuxtLink>
      </TransitionGroup>

      <p
        v-if="filteredTools.length === 0"
        class="py-16 text-center text-sm text-black/40"
      >
        No tools here yet...
      </p>
    </div>
  </div>
</template>

<style scoped>
.tile-enter-active,
.tile-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.tile-enter-from,
.tile-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.tile-leave-active {
  position: absolute;
}
</style>
