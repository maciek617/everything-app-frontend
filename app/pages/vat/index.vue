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
            <Percent
              :size="20"
              :stroke-width="1.75"
              :style="{ color: ACCENT }"
            />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            VAT Calculator
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Calculate the net and gross amounts and the VAT value in a few
          seconds.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        <!-- calculator card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- rate selector -->
            <div>
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                VAT Rate
              </label>
              <div class="flex gap-2">
                <button
                  v-for="rate in rates"
                  :key="rate"
                  type="button"
                  class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="
                    selectedRate === rate
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    selectedRate === rate
                      ? { backgroundColor: ACCENT }
                      : undefined
                  "
                  @click="selectedRate = rate"
                >
                  {{ rate }}%
                </button>
              </div>
            </div>

            <!-- amount input -->
            <div class="mt-6">
              <label
                for="amount"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Amount
              </label>
              <div class="relative">
                <input
                  id="amount"
                  v-model="netAmount"
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

            <!-- gross checkbox -->
            <label
              class="mt-5 flex cursor-pointer items-center gap-3 select-none"
            >
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
                :class="
                  isGross ? 'border-transparent' : 'border-[#D1D5DB] bg-white'
                "
                :style="isGross ? { backgroundColor: ACCENT } : undefined"
              >
                <Check
                  v-if="isGross"
                  :size="13"
                  :stroke-width="3"
                  class="text-white"
                />
              </span>
              <input v-model="isGross" type="checkbox" class="sr-only" />
              <span class="text-sm text-[#374151]">
                The entered amount is the gross amount.
              </span>
            </label>

            <button
              class="mt-5 bg-[#059668] text-white px-3 py-2 rounded-xl"
              @click="calculate"
            >
              Calculate
            </button>

            <!-- result -->
            <div
              class="mt-8 space-y-3 border-t border-[#F0F1F3] pt-6"
              v-if="result && !isLoading && !errMsg"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#6B7280]">Net amount</span>
                <span
                  class="text-base font-semibold tabular-nums text-[#111827]"
                >
                  {{ result.net }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-[#6B7280]"
                  >VAT ({{ selectedRate }}%)</span
                >
                <span
                  class="text-base font-semibold tabular-nums"
                  :style="{ color: ACCENT }"
                >
                  {{ result.vat }}
                </span>
              </div>
              <div
                class="flex items-center justify-between rounded-xl px-4 py-3"
                :style="{ backgroundColor: ACCENT + '0D' }"
              >
                <span class="text-sm font-medium text-[#111827]"
                  >Gross amount</span
                >
                <span class="text-lg font-bold tabular-nums text-[#111827]">
                  {{ result.gross }}
                </span>
              </div>
            </div>
            <p class="text-red-400">{{ errMsg }}</p>
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
                What is this calculator used for?
              </h2>
            </div>
            <p class="text-[13px] leading-relaxed text-[#6B7280]">
              The VAT Calculator allows you to quickly convert a net amount to a
              gross amount—or vice versa—based on the VAT rate applicable in
              Poland. It is useful for issuing invoices, pricing services, and
              planning company budgets.
            </p>
            <ul class="mt-4 space-y-2.5 text-[13px] text-[#6B7280]">
              <li class="flex gap-2">
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  :style="{ backgroundColor: ACCENT }"
                />
                <span
                  >23% — standard rate, applies to most goods and
                  services.</span
                >
              </li>
              <li class="flex gap-2">
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  :style="{ backgroundColor: ACCENT }"
                />
                <span
                  >8% — reduced rate, including for certain construction and
                  catering services.</span
                >
              </li>
              <li class="flex gap-2">
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  :style="{ backgroundColor: ACCENT }"
                />
                <span
                  >5% — preferential rate, including for basic food products and
                  books.</span
                >
              </li>
            </ul>
            <p class="mt-4 text-[12px] leading-relaxed text-[#9CA3AF]">
              The result is for informational purposes only and does not replace
              a consultation with an accountant.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Percent, Check, Info } from "lucide-vue-next";

const ACCENT = "#059669";

const rates = [23, 8, 5] as const;
type Rate = (typeof rates)[number];

const selectedRate = ref<Rate>(23);
const isGross = ref(false);

const result = ref<any>(null);
const errMsg = ref<string>("");
const netAmount = ref(0);
const isLoading = ref(false);
const regex = ref(/[a-zA-Z]/);
const config = useRuntimeConfig();

const validateUserInput = () => {
  if (+netAmount.value <= 0) {
    return (errMsg.value = "You need to insert amount that is higher than 0.");
  } else if (netAmount.value.toString().includes(",")) {
    return (errMsg.value = "You need to use ',' insted of '.'");
  } else if (regex.value.test(netAmount.value.toString())) {
    return (errMsg.value = "You cannot use letters in the amount field.");
  }
  return (errMsg.value = "");
};

async function calculate() {
  isLoading.value = true;
  if (validateUserInput()) {
    isLoading.value = false;
    console.log("work2");
    return;
  }
  const data = await $fetch(`${config.public.apiBase}/api/tools/vat`, {
    method: "POST",
    body: {
      netAmount: +netAmount.value,
      vatRate: +selectedRate.value / 100,
      isNet: !isGross.value,
    },
  });

  result.value = data;
  isLoading.value = false;
}
</script>
