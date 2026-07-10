<script setup lang="ts">
import {
  Sigma,
  Info,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  Plus,
  BarChart3,
  Repeat,
  Waves,
  Target,
  Component,
} from "lucide-vue-next";

const ACCENT = "#2563EB"; // blue-600 — analytics category accent

// form state — plain v-model target, no calculation wired up
const numbersInput = ref<string>("");

// result placeholders — would be populated once logic/backend is wired in
const stats = ref<{
  elements: number | null;
  mean: number | null;
  median: number | null;
  mode: string | null;
  min: number | null;
  max: number | null;
  sum: number | null;
  variance: number | null;
  stdDeviation: number | null;
}>({
  elements: null,
  mean: null,
  median: null,
  mode: null,
  min: null,
  max: null,
  sum: null,
  variance: null,
  stdDeviation: null,
});

const statCards = [
  { key: "elements", label: "Elements", icon: Component },
  { key: "mean", label: "Mean", icon: Target },
  { key: "median", label: "Median", icon: ArrowUpNarrowWide },
  { key: "mode", label: "Mode", icon: Repeat },
  { key: "min", label: "Min", icon: ArrowDownNarrowWide },
  { key: "max", label: "Max", icon: ArrowUpNarrowWide },
  { key: "sum", label: "Sum", icon: Plus },
  { key: "variance", label: "Variance", icon: BarChart3 },
  { key: "stdDeviation", label: "Std. Deviation", icon: Waves },
] as const;

const definitions = [
  {
    label: "Mean",
    description:
      "The average — sum of all numbers divided by how many there are.",
  },
  {
    label: "Median",
    description: "The middle value when all numbers are sorted in order.",
  },
  {
    label: "Mode",
    description: "The number that appears most often in the list.",
  },
  {
    label: "Min / Max",
    description: "The smallest and largest values in the list.",
  },
  { label: "Sum", description: "The total of all numbers added together." },
  {
    label: "Variance",
    description: "How spread out the numbers are from the mean, on average.",
  },
  {
    label: "Std. Deviation",
    description:
      "The square root of variance — spread expressed in the same unit as your data.",
  },
];

const isLoading = ref(false);
const config = useRuntimeConfig();
const result = ref();
const error = ref("");
const regex = ref(/^-?\d+(?:\.\d+)?(?:\s*,\s*-?\d+(?:\.\d+)?)*$/);

async function calculate() {
  isLoading.value = true;
  error.value = "";
  result.value = null;
  if (!numbersInput.value) {
    error.value =
      "You cannot generate report without providing a list of numbers.";
    return;
  }
  if (!regex.value.test(numbersInput.value)) {
    error.value = "You cannot use letters or ', .' at last character";
    isLoading.value = false;
    return;
  }

  const data = await $fetch(
    `${config.public.apiBase}/api/tools/statistic-calculator`,
    {
      method: "POST",
      body: {
        numbers: numbersInput.value,
      },
    },
  );

  result.value = data;

  stats.value.elements = result.value.elements;
  stats.value.mean = result.value.mean.toFixed(4);
  stats.value.median = result.value.median;

  stats.value.mode = result.value.mode.join(", ");
  stats.value.min = result.value.min;
  stats.value.max = result.value.max;
  stats.value.sum = result.value.sum.toFixed(4);
  stats.value.variance = result.value.variance.toFixed(4);
  stats.value.stdDeviation = result.value.stdDeviation.toFixed(4);

  isLoading.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FB] text-[#111827]">
    <div class="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2563EB]"
        >
          Analytics / Tools
        </p>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: ACCENT + '14' }"
          >
            <Sigma :size="20" :stroke-width="1.75" :style="{ color: ACCENT }" />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            Statistics Calculator
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Paste a list of numbers and get a full statistical report in one go.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        <!-- calculator card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- input -->
            <div>
              <label
                for="numbers"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Numbers
              </label>
              <textarea
                id="numbers"
                v-model="numbersInput"
                rows="5"
                placeholder="e.g. 12, 45.5, 33, 78.99, 21.2, 45, 60, 1010"
                class="w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-base leading-relaxed text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                :style="{ '--tw-ring-color': ACCENT }"
              />
              <p class="mt-2 text-xs text-[#9CA3AF]">
                Separate values with commas. If you want to use decimal numbers
                use .(dot) instead of ,(comma) Eg. 11, 12.5, 223
              </p>
            </div>

            <p class="text-red-400 mt-2">{{ error }}</p>

            <button
              type="button"
              @click="calculate"
              class="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
              :style="{ backgroundColor: ACCENT }"
            >
              Generate report
            </button>

            <!-- result grid -->
            <div
              class="mt-8 border-t border-[#F0F1F3] pt-6"
              v-if="result && !isLoading"
            >
              <p
                class="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#9CA3AF]"
              >
                Report
              </p>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div
                  v-for="card in statCards"
                  :key="card.key"
                  class="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4"
                >
                  <div class="flex items-center gap-1.5 text-[#9CA3AF]">
                    <component :is="card.icon" :size="13" :stroke-width="2" />
                    <span
                      class="text-[11px] font-medium uppercase tracking-[0.06em]"
                    >
                      {{ card.label }}
                    </span>
                  </div>
                  <p class="mt-2 text-lg font-bold tabular-nums text-[#111827]">
                    {{ stats[card.key] ?? "—" }}
                  </p>
                </div>
              </div>
            </div>
            <CommonLoader v-if="isLoading && !result && !error" />
          </div>
        </div>

        <!-- description sidebar -->
        <div class="md:col-span-2">
          <div
            class="sticky top-6 rounded-2xl border border-[#E5E7EB] bg-white p-6"
          >
            <div class="mb-3 flex items-center gap-2 text-[#111827]">
              <Info :size="16" :stroke-width="2" :style="{ color: ACCENT }" />
              <h2 class="text-sm font-semibold">
                What is this calculator for?
              </h2>
            </div>
            <p class="text-[13px] leading-relaxed text-[#6B7280]">
              The Statistics Calculator turns a raw list of numbers into a
              complete summary — useful for quickly understanding a dataset
              before diving into deeper analysis, checking survey results, or
              spotting outliers.
            </p>

            <div class="mt-5 space-y-4">
              <div v-for="def in definitions" :key="def.label">
                <div class="flex items-center gap-2">
                  <span
                    class="h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: ACCENT }"
                  />
                  <span class="text-[13px] font-semibold text-[#111827]">{{
                    def.label
                  }}</span>
                </div>
                <p
                  class="mt-1 pl-4 text-[12.5px] leading-relaxed text-[#6B7280]"
                >
                  {{ def.description }}
                </p>
              </div>
            </div>

            <p class="mt-5 text-[12px] leading-relaxed text-[#9CA3AF]">
              Works best with numeric lists of any size — no formatting required
              beyond separating values with commas and decimal numbers with dot.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
