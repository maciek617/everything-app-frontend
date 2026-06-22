<script setup lang="ts">
const weight = ref(80);
const height = ref(1.8);
const result = ref<any>(null);

const config = useRuntimeConfig();

async function calculate() {
  const data = await $fetch(`${config.public.apiBase}/api/tools/bmi`, {
    method: "POST",
    body: {
      weight: weight.value,
      height: height.value,
    },
  });

  result.value = data;
}
</script>

<template>
  <div style="padding: 20px">
    <h1>BMI Calculator</h1>

    <input v-model="weight" placeholder="Weight" />
    <input v-model="height" placeholder="Height" />

    <button @click="calculate">Calculate</button>

    <div v-if="result">
      <p>BMI: {{ result.bmi }}</p>
      <p>Category: {{ result.category }}</p>
    </div>
  </div>
</template>
