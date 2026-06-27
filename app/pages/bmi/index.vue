<template>
  <div style="padding: 20px" class="container mx-auto">
    <h1
      class="font-bold text-[#ce4651] uppercase text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl"
    >
      BMI Calculator
    </h1>

    <BmiInfo />

    <h2 class="mt-10 text-[#ce4651] uppercase text-xl font-bold">
      Calculate your BMI+
    </h2>

    <div class="mt-3">
      <label for="visitors" class="uppercase text-gray-900 font-medium"
        >insert your weight (kilos)</label
      >
      <input
        type="text"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs max-w-lg mt-2 drop-shadow placeholder:text-body"
        placeholder=""
        v-model="weight"
        required
      />
    </div>
    <div class="mt-3">
      <label for="visitors" class="uppercase text-gray-900 font-medium"
        >insert your height (meters)</label
      >
      <input
        type="text"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs max-w-lg mt-2 drop-shadow placeholder:text-body"
        placeholder=""
        v-model="height"
        required
      />
    </div>

    <div class="mt-3 max-w-lg">
      <label for="sex" class="uppercase text-gray-900 font-medium"
        >choose your age</label
      >
      <select
        v-model="age"
        id="sex"
        class="drop-shadow block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value="0.95">18-25</option>
        <option value="1.00">26-40</option>
        <option value="1.05">41-60</option>
        <option value="1.10">60+</option>
      </select>
    </div>

    <div class="mt-3 max-w-lg">
      <label for="sex" class="uppercase text-gray-900 font-medium"
        >choose your sex</label
      >
      <select
        v-model="sex"
        id="sex"
        class="drop-shadow block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value="0.95">Male</option>
        <option value="1.05">Female</option>
      </select>
    </div>

    <div class="mt-3 max-w-lg">
      <label for="region" class="uppercase text-gray-900 font-medium"
        >choose your region</label
      >
      <select
        v-model="region"
        id="region"
        class="drop-shadow block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value="1.00">Europe</option>
        <option value="1.05">United States</option>
        <option value="0.90">Asia</option>
      </select>
    </div>

    <CommonButton text="Calculate" @click="calculate" class="mt-5" />

    <div
      class="max-w-xl px-2 mt-10 py-2 rounded-md shadow-md bg-gray-50"
      v-if="result"
    >
      <h3 class="text-[#ce4651] uppercase text-xl font-bold">Your score is:</h3>
      <div class="mt-3 text-lg">
        <p>
          BMI: <span class="font-bold">{{ result.bmi }}</span>
        </p>

        <!-- Todo: change color based on output -->
        <p>
          Category: <span class="font-bold">{{ result.category }}</span>
        </p>
      </div>
    </div>

    <BmiResultInfo />
  </div>
</template>

<script setup lang="ts">
const weight = ref(80);
const height = ref(1.8);
const age = ref(0.95);
const sex = ref(0.95);
const region = ref(1.05);
const result = ref<any>(null);

const config = useRuntimeConfig();

async function calculate() {
  const data = await $fetch(`${config.public.apiBase}/api/tools/bmi`, {
    method: "POST",
    body: {
      weight: +weight.value,
      height: +height.value,
      sexFactor: +sex.value,
      yearFactor: +age.value,
      regionFactor: +region.value,
    },
  });

  result.value = data;
}
</script>
