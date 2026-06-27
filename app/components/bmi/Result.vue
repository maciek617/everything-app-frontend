<template>
  <div class="max-w-xl px-2 mt-10 py-2 rounded-md shadow-md bg-gray-50">
    <h3 class="text-[#ce4651] uppercase text-xl font-bold">Your score is:</h3>
    <div class="mt-3 text-lg">
      <p>BMI: <span class="font-bold">23.98</span></p>

      <!-- Todo: change color based on output -->
      <p>Category: <span class="font-bold">Normal</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  bmi: string;
  category: string;
}>();
</script>

<style></style>
