<script setup lang="ts">
import { Fingerprint, Check, Info, Copy, RefreshCw } from "lucide-vue-next";
//TODO: Założenia: 4 - V4, 7 - V7
const ACCENT = "#DB2777"; // pink-600 — operations category accent

const versions = ["4", "7"] as const;
const regex = ref(/^[1-9]$|^[1-9][0-9]$|^(100)$/);
const isLoading = ref(false);
const errorMsg = ref("");
const version = ref<(typeof versions)[number]>("4");
const quantity = ref<string>("5");
const hyphens = ref();
const braces = ref();

const generatedIds = ref<string[]>([]);
const config = useRuntimeConfig();
const versionInfo = [
  {
    label: "v4",
    description:
      "Fully random. The most common choice for general-purpose unique IDs.",
  },
  {
    label: "v7",
    description:
      "Timestamp-based like v1, but designed to be safely random and database-friendly.",
  },
];
function copyUuid(url: string) {
  navigator.clipboard.writeText(url);
}

async function calculate() {
  isLoading.value = true;
  errorMsg.value = "";
  generatedIds.value = [];
  if (!regex.value.test(quantity.value)) {
    isLoading.value = false;
    errorMsg.value = "You should insert a number between 1 and 100.";
    return;
  }
  const data = await $fetch(`${config.public.apiBase}/api/tools/uuid`, {
    method: "POST",
    body: {
      version: version.value,
      quantity: quantity.value,
      includeHyphens: hyphens.value,
      includeBrackets: braces.value,
    },
  });
  generatedIds.value = data.uuid;

  isLoading.value = false;
  errorMsg.value = "";
}
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FB] text-[#111827]">
    <!-- <button @click="validateQuantity">test</button> -->
    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#DB2777]"
        >
          Productivity / Tools
        </p>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: ACCENT + '14' }"
          >
            <Fingerprint
              :size="20"
              :stroke-width="1.75"
              :style="{ color: ACCENT }"
            />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            UUID Generator
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Generate unique identifiers in bulk, in the version and format you
          need.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-5">
        <!-- generator card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- version -->
            <div>
              <label class="mb-2 block text-sm font-medium text-[#374151]">
                Version
              </label>
              <div class="flex gap-2">
                <button
                  v-for="(v, idx) in versions"
                  :key="idx"
                  type="button"
                  class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="
                    version === v
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151]'
                  "
                  :style="
                    version === v ? { backgroundColor: ACCENT } : undefined
                  "
                  @click="version = v"
                >
                  v{{ v }}
                </button>
              </div>
            </div>

            <!-- quantity -->
            <div class="mt-6">
              <label
                for="quantity"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Quantity (max 100)
              </label>
              <input
                id="quantity"
                v-model="quantity"
                type="text"
                inputmode="numeric"
                placeholder="5"
                class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3.5 text-2xl font-semibold tabular-nums text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                :style="{ '--tw-ring-color': ACCENT }"
              />
              <p class="text-red-400">{{ errorMsg }}</p>
            </div>

            <!-- format options -->
            <div class="mt-6 space-y-3">
              <label class="mb-1 block text-sm font-medium text-[#374151]">
                Format
              </label>

              <label class="flex cursor-pointer items-center gap-3 select-none">
                <span
                  class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
                  :class="
                    hyphens ? 'border-transparent' : 'border-[#D1D5DB] bg-white'
                  "
                  :style="hyphens ? { backgroundColor: ACCENT } : undefined"
                >
                  <Check
                    v-if="hyphens"
                    :size="13"
                    :stroke-width="3"
                    class="text-white"
                  />
                </span>
                <input v-model="hyphens" type="checkbox" class="sr-only" />
                <span class="text-sm text-[#374151]">Include hyphens</span>
              </label>

              <label class="flex cursor-pointer items-center gap-3 select-none">
                <span
                  class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
                  :class="
                    braces ? 'border-transparent' : 'border-[#D1D5DB] bg-white'
                  "
                  :style="braces ? { backgroundColor: ACCENT } : undefined"
                >
                  <Check
                    v-if="braces"
                    :size="13"
                    :stroke-width="3"
                    class="text-white"
                  />
                </span>
                <input v-model="braces" type="checkbox" class="sr-only" />
                <span class="text-sm text-[#374151]">Wrap in braces {}</span>
              </label>
            </div>

            <button
              type="button"
              class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
              :style="{ backgroundColor: ACCENT }"
              @click="calculate"
            >
              <RefreshCw :size="15" :stroke-width="2.25" />
              Generate
            </button>

            <!-- result -->
            <div class="mt-8 border-t border-[#F0F1F3] pt-6">
              <div class="mb-3 flex items-center justify-between">
                <p
                  class="text-xs font-medium uppercase tracking-[0.15em] text-[#9CA3AF]"
                >
                  Result
                </p>
                <button
                  type="button"
                  class="flex items-center gap-1 text-xs font-medium transition-colors"
                  :style="{ color: ACCENT }"
                  @click="copyUuid(generatedIds.toString())"
                >
                  <Copy :size="12" :stroke-width="2.25" />
                  Copy all
                </button>
              </div>

              <div v-if="generatedIds.length > 0" class="space-y-2">
                <div
                  v-for="id in generatedIds"
                  :key="id"
                  class="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5"
                >
                  <span class="font-mono text-sm text-[#111827]">{{ id }}</span>
                  <button
                    type="button"
                    class="text-[#9CA3AF] transition-colors hover:text-[#374151]"
                    @click="copyUuid(id)"
                  >
                    <Copy :size="14" :stroke-width="2" />
                  </button>
                </div>
              </div>
              <div
                v-else
                class="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-5 text-center text-sm text-[#9CA3AF]"
              >
                Click "Generate" to see your UUIDs here
              </div>
              <CommonLoader v-if="isLoading && generatedIds.length < 0" />
            </div>
          </div>
        </div>

        <!-- description sidebar -->
        <div class="md:col-span-2">
          <div
            class="sticky top-6 rounded-2xl border border-[#E5E7EB] bg-white p-6"
          >
            <div class="mb-3 flex items-center gap-2 text-[#111827]">
              <Info :size="16" :stroke-width="2" :style="{ color: ACCENT }" />
              <h2 class="text-sm font-semibold">What is this tool for?</h2>
            </div>
            <p class="text-[13px] leading-relaxed text-[#6B7280]">
              A UUID (Universally Unique Identifier) is a 128-bit value used to
              identify records, sessions, or objects without relying on a
              central authority. This generator creates them in bulk, in the
              version and format your project needs.
            </p>

            <div class="mt-5 space-y-4">
              <div v-for="v in versionInfo" :key="v.label">
                <div class="flex items-center gap-2">
                  <span
                    class="h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: ACCENT }"
                  />
                  <span class="text-[13px] font-semibold text-[#111827]">{{
                    v.label
                  }}</span>
                </div>
                <p
                  class="mt-1 pl-4 text-[12.5px] leading-relaxed text-[#6B7280]"
                >
                  {{ v.description }}
                </p>
              </div>
            </div>

            <p class="mt-5 text-[12px] leading-relaxed text-[#9CA3AF]">
              Generated locally in your browser — nothing is sent to a server
              unless you choose to save it.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
