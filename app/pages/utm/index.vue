<template>
  <div class="min-h-screen bg-[#F8F9FB] text-[#111827]">
    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <!-- header -->
      <div class="mb-10">
        <p
          class="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#D97706]"
        >
          Marketing / Tools
        </p>
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            :style="{ backgroundColor: ACCENT + '14' }"
          >
            <Link2 :size="20" :stroke-width="1.75" :style="{ color: ACCENT }" />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
            UTM Builder
          </h1>
        </div>
        <p class="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
          Build trackable campaign URLs with UTM parameters in a few clicks.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-5">
        <!-- form card -->
        <div class="md:col-span-3">
          <div
            class="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
          >
            <!-- website url -->
            <div>
              <label
                for="url"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Website URL
              </label>
              <input
                id="url"
                v-model="websiteUrl"
                type="text"
                placeholder="https://example.com/landing-page"
                class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                :style="{ '--tw-ring-color': ACCENT }"
              />
              <p class="text-red-400">{{ errorWebsiteUrl }}</p>
            </div>

            <!-- source + medium -->
            <div class="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  for="source"
                  class="mb-2 block text-sm font-medium text-[#374151]"
                >
                  Campaign Source
                </label>
                <input
                  id="source"
                  v-model="campaignSource"
                  type="text"
                  placeholder="google"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <p class="text-red-400">{{ errorCampaignSource }}</p>
              </div>
              <div>
                <label
                  for="medium"
                  class="mb-2 block text-sm font-medium text-[#374151]"
                >
                  Campaign Medium
                </label>
                <input
                  id="medium"
                  v-model="campaignMedium"
                  type="text"
                  placeholder="cpc"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
                <p class="text-red-400">{{ errorCampaignMedium }}</p>
              </div>
            </div>

            <!-- campaign name -->
            <div class="mt-5">
              <label
                for="campaign"
                class="mb-2 block text-sm font-medium text-[#374151]"
              >
                Campaign Name
              </label>
              <input
                id="campaign"
                v-model="campaignName"
                type="text"
                placeholder="summer-sale-2026"
                class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                :style="{ '--tw-ring-color': ACCENT }"
              />
              <p class="text-red-400">{{ errorCampaignName }}</p>
            </div>

            <!-- term + content -->
            <div class="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  for="term"
                  class="mb-2 flex items-center gap-1.5 text-sm font-medium text-[#374151]"
                >
                  Campaign Term
                  <span class="text-xs font-normal text-[#9CA3AF]"
                    >(optional)</span
                  >
                </label>
                <input
                  id="term"
                  v-model="campaignTerm"
                  type="text"
                  placeholder="running-shoes"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
              </div>
              <div>
                <label
                  for="content"
                  class="mb-2 flex items-center gap-1.5 text-sm font-medium text-[#374151]"
                >
                  Campaign Content
                  <span class="text-xs font-normal text-[#9CA3AF]"
                    >(optional)</span
                  >
                </label>
                <input
                  id="content"
                  v-model="campaignContent"
                  type="text"
                  placeholder="header-link"
                  class="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#C4C8CE] focus:border-transparent focus:ring-2"
                  :style="{ '--tw-ring-color': ACCENT }"
                />
              </div>
            </div>

            <div>
              <button
                @click="calculate"
                class="bg-[#D97706] text-white px-4 py-2 rounded-lg mt-5"
              >
                Generate
              </button>
            </div>

            <!-- generated url -->
            <div
              class="mt-8 border-t border-[#F0F1F3] pt-6"
              v-if="result && !isLoading"
            >
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-[#374151]"
                  >Generated URL</span
                >
                <button
                  @click="copyUrl(result.url)"
                  type="button"
                  class="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#6B7280] transition-colors hover:border-[#D1D5DB] hover:text-[#111827]"
                >
                  <Copy :size="13" :stroke-width="2" />
                  Copy
                </button>
              </div>
              <div
                class="rounded-xl px-4 py-3.5 font-mono text-[13px] leading-relaxed break-all"
                :style="{ backgroundColor: ACCENT + '0D', color: '#111827' }"
              >
                {{ result.url }}
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
              <h2 class="text-sm font-semibold">What is a UTM Builder?</h2>
            </div>
            <p class="text-[13px] leading-relaxed text-[#6B7280]">
              UTM parameters are small tags added to a URL that let you track
              exactly where your traffic comes from in tools like Google
              Analytics. The UTM Builder puts those tags together for you, so
              every campaign link is consistent and easy to report on.
            </p>

            <div class="mt-5 space-y-4">
              <div v-for="p in parameters" :key="p.param">
                <div class="flex items-center gap-2">
                  <span
                    class="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                    :style="{ backgroundColor: ACCENT + '14', color: ACCENT }"
                  >
                    {{ p.param }}
                  </span>
                  <span v-if="!p.required" class="text-[11px] text-[#9CA3AF]"
                    >optional</span
                  >
                </div>
                <p class="mt-1.5 text-[12.5px] leading-relaxed text-[#6B7280]">
                  {{ p.description }}
                </p>
              </div>
            </div>

            <p class="mt-5 text-[12px] leading-relaxed text-[#9CA3AF]">
              Tip: keep source, medium and campaign names lowercase and
              consistent so reports don't split identical campaigns into
              separate rows.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validUrl } from "../../../helpers/validateUrl";
import { Link2, Info, Copy } from "lucide-vue-next";

const ACCENT = "#D97706"; // amber-600 — marketing category accent
const config = useRuntimeConfig();
const result = ref();
const isLoading = ref(false);

const websiteUrl = ref<string>("");
const errorWebsiteUrl = ref<string>("");
const campaignSource = ref<string>("");
const errorCampaignSource = ref<string>("");
const campaignMedium = ref<string>("");
const errorCampaignMedium = ref<string>("");
const campaignName = ref<string>("");
const errorCampaignName = ref<string>("");
const campaignTerm = ref<string>("");
const campaignContent = ref<string>("");

const parameters = [
  {
    param: "utm_source",
    label: "Campaign Source",
    description:
      "Identifies where the traffic comes from, e.g. google, newsletter, facebook.",
    required: true,
  },
  {
    param: "utm_medium",
    label: "Campaign Medium",
    description: "The marketing medium, e.g. cpc, email, social, banner.",
    required: true,
  },
  {
    param: "utm_campaign",
    label: "Campaign Name",
    description:
      "The specific campaign, promotion or product launch being tracked.",
    required: true,
  },
  {
    param: "utm_term",
    label: "Campaign Term",
    description:
      "Identifies paid search keywords, mainly used for tracking ads.",
    required: false,
  },
  {
    param: "utm_content",
    label: "Campaign Content",
    description:
      "Differentiates similar content or links within the same ad or email.",
    required: false,
  },
];

function copyUrl(url: string) {
  navigator.clipboard.writeText(url);
}

function validateUserInput() {
  errorWebsiteUrl.value = validUrl(websiteUrl.value)
    ? ""
    : "It looks like it's not a valid url.";

  errorCampaignSource.value = campaignSource.value ? "" : "It cannot be empty.";
  errorCampaignMedium.value = campaignMedium.value ? "" : "It cannot be empty.";
  errorCampaignName.value = campaignName.value ? "" : "It cannot be empty";

  return errorCampaignMedium.value ||
    errorCampaignName.value ||
    errorCampaignSource.value ||
    errorWebsiteUrl.value
    ? false
    : true;
}

async function calculate() {
  isLoading.value = true;
  if (!validateUserInput()) {
    isLoading.value = false;
    return;
  }
  const data = await $fetch(`${config.public.apiBase}/api/tools/utm`, {
    method: "POST",
    body: {
      url: websiteUrl.value,
      utmSource: campaignSource.value,
      utmMedium: campaignMedium.value,
      utmCampaign: campaignName.value,
      utmTerm: campaignTerm.value,
      utmContent: campaignContent.value,
    },
  });
  result.value = data;
  isLoading.value = false;
}
</script>
