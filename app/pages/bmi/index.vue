<template>
  <div class="min-h-screen bg-[#F8F9FB] text-[#111827]">
    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2563EB]"
        >
          Health / Tools
        </p>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: ACCENT + '14' }"
          >
            <Scale :size="20" :stroke-width="1.75" :style="{ color: ACCENT }" />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            BMI+ Calculator
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Calculate your Body Mass Index and see which weight category it falls
          into.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        <!-- form card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- weight -->
            <div>
              <label
                for="weight"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Weight
              </label>
              <div class="relative">
                <input
                  id="weight"
                  v-model="weightKg"
                  type="text"
                  inputmode="decimal"
                  placeholder="e.g. 72"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-2xl font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]"
                >
                  kg
                </span>
              </div>
            </div>

            <!-- height -->
            <div class="mt-6">
              <label
                for="height"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Height
              </label>
              <div class="relative">
                <input
                  id="height"
                  v-model="heightM"
                  type="text"
                  inputmode="decimal"
                  placeholder="e.g. 1.78"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-2xl font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF]"
                >
                  m
                </span>
              </div>
            </div>

            <!-- age range -->
            <div class="mt-6">
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                Age range
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="range in ageRanges"
                  :key="range.range"
                  type="button"
                  class="rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-150"
                  :class="
                    ageRange === range.value
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    ageRange === range.value
                      ? { backgroundColor: ACCENT }
                      : undefined
                  "
                  @click="ageRange = range.value"
                >
                  {{ range.range }}
                </button>
              </div>
            </div>

            <!-- region -->
            <div class="mt-6">
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                Region
              </label>
              <div class="flex gap-2">
                <button
                  v-for="r in regions"
                  :key="r.region"
                  type="button"
                  class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="
                    region === r.value
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    region === r.value ? { backgroundColor: ACCENT } : undefined
                  "
                  @click="region = r.value"
                >
                  {{ r.region }}
                </button>
              </div>
            </div>

            <!-- gender -->
            <div class="mt-6">
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                Gender
              </label>
              <div class="flex gap-2">
                <button
                  v-for="g in genders"
                  :key="g.type"
                  type="button"
                  class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="
                    gender === g.value
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    gender === g.value ? { backgroundColor: ACCENT } : undefined
                  "
                  @click="gender = g.value"
                >
                  {{ g.type }}
                </button>
              </div>
            </div>

            <p class="text-red-400 mt-5">{{ errMsg }}</p>

            <div class="mt-10">
              <button
                @click="calculate"
                class="px-4 py-2 rounded-lg shadow bg-blue-400 text-white"
              >
                Calculate
              </button>
            </div>

            <!-- result -->
            <div
              class="mt-8 border-t border-[#F0F1F3] pt-6"
              v-if="bmiResult && !isLoading"
            >
              <div
                v-if="bmiResult !== null"
                class="flex items-center justify-between rounded-xl px-4 py-3"
                :style="{ backgroundColor: ACCENT + '0D' }"
              >
                <span class="text-sm font-medium text-[#111827]">Your BMI</span>
                <div class="flex items-center gap-3">
                  <span class="text-lg font-bold tabular-nums text-[#111827]">
                    {{ bmiResult.bmi }}
                  </span>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    :style="{
                      backgroundColor: categoryInfo.find(
                        (c) => c.label === bmiResult.category,
                      )?.color,
                    }"
                  >
                    {{ bmiResult.category }}
                  </span>
                </div>
              </div>
              <div
                v-else
                class="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-5 text-center text-sm text-[#9CA3AF]"
              >
                Submit the form to see your result here
              </div>
            </div>
            <CommonLoader v-if="isLoading" />
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
              The BMI+ Calculator estimates your Body Mass Index from your
              weight and height, adjusted for factors like age range and region.
              It's a quick way to get a general sense of where your weight falls
              relative to common health guidelines — not a medical diagnosis.
            </p>

            <div class="mt-5 space-y-4">
              <div v-for="cat in categoryInfo" :key="cat.label">
                <div class="flex items-center gap-2">
                  <span
                    class="h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: cat.color }"
                  />
                  <span class="text-[13px] font-semibold text-[#111827]">{{
                    cat.label
                  }}</span>
                  <span class="text-[12px] text-[#9CA3AF]"
                    >· {{ cat.range }}</span
                  >
                </div>
                <p
                  class="mt-1 pl-4 text-[12.5px] leading-relaxed text-[#6B7280]"
                >
                  {{ cat.description }}
                </p>
              </div>
            </div>

            <p class="mt-5 text-[12px] leading-relaxed text-[#9CA3AF]">
              Results are for informational purposes only and don't replace
              advice from a healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Scale, Info } from "lucide-vue-next";

const ACCENT = "#2563EB"; // blue-600 — health category accent

const ageRanges = ref([
  { range: "18-25", value: 0.95 },
  { range: "26-40", value: 1.0 },
  { range: "41-60", value: 1.05 },
  { range: "60+", value: 1.1 },
]);
const regions = ref([
  {
    region: "Europe",
    value: 1.0,
  },
  {
    region: "USA",
    value: 1.05,
  },
  {
    region: "Asia",
    value: 0.9,
  },
]);
const genders = ref([
  {
    type: "Male",
    value: 0.95,
  },
  {
    type: "Female",
    value: 1.05,
  },
]);

// form state — plain v-model targets, submitted to the backend as-is
const weightKg = ref<string>("");
const heightM = ref<string>("");
const ageRange = ref<number>(0.95);
const region = ref<number>(1.0);
const gender = ref<number>(0.95);

// result placeholder — populated by the backend response after submit
const bmiResult = ref<any>();
const bmiCategory = ref<
  "Underweight" | "Normal" | "Overweight" | "Obese" | null
>(null);

const categoryInfo = [
  {
    label: "Underweight",
    range: "BMI below 18.5",
    color: "#60A5FA",
    description:
      "May indicate insufficient body weight relative to height. Often worth reviewing nutrition and overall health.",
  },
  {
    label: "Normal",
    range: "BMI 18.5 – 24.9",
    color: "#22C55E",
    description:
      "Generally associated with the lowest risk of weight-related health issues.",
  },
  {
    label: "Overweight",
    range: "BMI 25 – 29.9",
    color: "#F59E0B",
    description:
      "Body weight above the typical range for height, which may increase certain health risks over time.",
  },
  {
    label: "Obese",
    range: "BMI 30 and above",
    color: "#EF4444",
    description:
      "Significantly higher body weight relative to height, associated with increased health risks.",
  },
];

const config = useRuntimeConfig();
const regex = ref(/[a-zA-Z]/);
const isLoading = ref(false);
const errMsg = ref("");

const validateUserInput = () => {
  if (+heightM.value <= 0 || +weightKg.value <= 0) {
    return (errMsg.value = "You need to insert amount that is higher than 0.");
  } else if (
    heightM.value.toString().includes(",") ||
    weightKg.value.toString().includes(",")
  ) {
    return (errMsg.value = "You need to use ',' insted of '.'");
  } else if (
    regex.value.test(heightM.value.toString()) ||
    regex.value.test(weightKg.value.toString())
  ) {
    return (errMsg.value = "You cannot use letters in the amount field.");
  }
  return (errMsg.value = "");
};

async function calculate() {
  isLoading.value = true;
  if (validateUserInput()) {
    isLoading.value = false;
    return;
  }
  const data = await $fetch(`${config.public.apiBase}/api/tools/bmi`, {
    method: "POST",
    body: {
      weight: +weightKg.value,
      height: +heightM.value,
      sexFactor: +gender.value,
      yearFactor: +ageRange.value,
      regionFactor: +region.value,
    },
  });

  bmiResult.value = data;
  isLoading.value = false;
}
</script>
