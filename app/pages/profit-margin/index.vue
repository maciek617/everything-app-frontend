<script setup lang="ts">
import { TrendingUp, Check, Info } from "lucide-vue-next";

const ACCENT = "#059669"; // emerald-600 — financial category accent

const marginTypes = ["Gross", "Operating"] as const;

const revenue = ref<string>("");
const cost = ref<string>("");
const expenses = ref<string>("");
const includeExpenses = ref(false);
const marginType = ref<(typeof marginTypes)[number]>("Gross");

const marginResult = ref<number | null>(null);
const profitResult = ref<number | null>(null);

const marginTypeInfo = [
  {
    label: "Gross",
    description:
      "Revenue minus cost of goods sold, divided by revenue. Shows how efficiently you produce what you sell.",
  },
  {
    label: "Operating",
    description:
      "Gross profit minus operating expenses, divided by revenue. Reflects core business performance before interest and tax.",
  },
];
const config = useRuntimeConfig();
const result = ref();
const regex = ref(/[a-zA-Z]/);
const error = ref("");
const isLoading = ref(false);

function validateUserInput() {
  if (+revenue.value <= 0) {
    return (error.value = "Revenue must be bigger than 0.");
  }
  if (+cost.value <= 0) {
    return (error.value = "Cost of goods sold must be bigger than 0.");
  }

  if (marginType.value === "Operating" && +expenses.value <= 0) {
    return (error.value = "Operating expenses must be bigger than 0");
  }

  if (
    regex.value.test(revenue.value.toString()) ||
    regex.value.test(expenses.value.toString()) ||
    regex.value.test(cost.value.toString())
  ) {
    return (error.value = "You cannot use letters in the amount field.");
  }

  return (error.value = "");
}

async function calculate() {
  isLoading.value = true;
  if (validateUserInput()) {
    isLoading.value = false;
    return;
  }
  const data = await $fetch(
    `${config.public.apiBase}/api/tools/profit-margin`,
    {
      method: "POST",
      body: {
        revenue: +revenue.value,
        cogs: +cost.value,
        operatingExpenses: +expenses.value,
        includeOperatingExpenses: includeExpenses.value,
      },
    },
  );

  result.value = data;

  if (includeExpenses.value) {
    marginResult.value = result.value.operating.margin;
    profitResult.value = result.value.operating.profit;
  } else {
    marginResult.value = result.value.gross.margin;
    profitResult.value = result.value.gross.profit;
  }

  isLoading.value = false;
}

watch(
  () => marginType.value,
  (type) => {
    includeExpenses.value = type === "Operating";
  },
);
watch(
  () => includeExpenses.value,
  (expenses) => {
    marginType.value = expenses ? "Operating" : "Gross";
  },
);
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FB] text-[#111827]">
    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#059669]"
        >
          Financial / Tools
        </p>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: ACCENT + '14' }"
          >
            <TrendingUp
              :size="20"
              :stroke-width="1.75"
              :style="{ color: ACCENT }"
            />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            Profit Margin Calculator
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Work out how much of your revenue turns into actual profit.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        <!-- calculator card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- margin type -->
            <div>
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                Margin type
              </label>
              <div class="flex gap-2">
                <button
                  v-for="type in marginTypes"
                  :key="type"
                  type="button"
                  class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="
                    marginType === type
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    marginType === type
                      ? { backgroundColor: ACCENT }
                      : undefined
                  "
                  @click="marginType = type"
                >
                  {{ type }}
                </button>
              </div>
            </div>

            <!-- revenue -->
            <div class="mt-6">
              <label
                for="revenue"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Revenue
              </label>
              <div class="relative">
                <input
                  id="revenue"
                  v-model="revenue"
                  type="text"
                  inputmode="decimal"
                  placeholder="0.00"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-2xl font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]"
                >
                  USD
                </span>
              </div>
            </div>

            <!-- cost -->
            <div class="mt-6">
              <label
                for="cost"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Cost of goods sold
              </label>
              <div class="relative">
                <input
                  id="cost"
                  v-model="cost"
                  type="text"
                  inputmode="decimal"
                  placeholder="0.00"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-2xl font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]"
                >
                  USD
                </span>
              </div>
            </div>

            <!-- include expenses checkbox -->
            <label
              class="mt-5 flex cursor-pointer items-center gap-3 select-none"
            >
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
                :class="
                  includeExpenses
                    ? 'border-transparent'
                    : 'border-[#D1D5DB] bg-white'
                "
                :style="
                  includeExpenses ? { backgroundColor: ACCENT } : undefined
                "
              >
                <Check
                  v-if="includeExpenses"
                  :size="13"
                  :stroke-width="3"
                  class="text-white"
                />
              </span>
              <input
                v-model="includeExpenses"
                type="checkbox"
                class="sr-only"
              />
              <span class="text-sm text-[#374151]">
                Include additional operating expenses
              </span>
            </label>

            <!-- expenses (shown alongside the checkbox, purely visual) -->
            <div v-if="includeExpenses" class="mt-4">
              <label
                for="expenses"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Operating expenses
              </label>
              <div class="relative">
                <input
                  id="expenses"
                  v-model="expenses"
                  type="text"
                  inputmode="decimal"
                  placeholder="0.00"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-lg font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]"
                >
                  USD
                </span>
              </div>
            </div>

            <p class="text-red-400">{{ error }}</p>
            <div>
              <button
                @click="calculate"
                class="bg-[#059669] text-white px-4 py-2 rounded-lg mt-5"
              >
                Calculate
              </button>
            </div>

            <!-- result -->
            <div class="mt-8 border-t border-[#F0F1F3] pt-6">
              <div v-if="marginResult !== null" class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[#6B7280]">Profit</span>
                  <span
                    class="text-base font-semibold tabular-nums text-[#111827]"
                  >
                    {{ profitResult }}
                  </span>
                </div>
                <div
                  class="flex items-center justify-between rounded-xl px-4 py-3"
                  :style="{ backgroundColor: ACCENT + '0D' }"
                >
                  <span class="text-sm font-medium text-[#111827]"
                    >{{ marginType }} margin</span
                  >
                  <span class="text-lg font-bold tabular-nums text-[#111827]">
                    {{ marginResult }}%
                  </span>
                </div>
              </div>
              <div
                v-if="!isLoading && !result"
                class="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-5 text-center text-sm text-[#9CA3AF]"
              >
                Fill in the numbers to see your margin here
              </div>
            </div>

            <CommonLoader v-if="isLoading && !result" />
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
              The Profit Margin Calculator shows what share of your revenue
              actually becomes profit, once costs are accounted for. It's a
              quick way to check pricing, compare products, or track how a
              business performs over time.
            </p>

            <div class="mt-5 space-y-4">
              <div v-for="type in marginTypeInfo" :key="type.label">
                <div class="flex items-center gap-2">
                  <span
                    class="h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: ACCENT }"
                  />
                  <span class="text-[13px] font-semibold text-[#111827]"
                    >{{ type.label }} margin</span
                  >
                </div>
                <p
                  class="mt-1 pl-4 text-[12.5px] leading-relaxed text-[#6B7280]"
                >
                  {{ type.description }}
                </p>
              </div>
            </div>

            <p class="mt-5 text-[12px] leading-relaxed text-[#9CA3AF]">
              Results are for informational purposes only and don't replace
              advice from an accountant.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
