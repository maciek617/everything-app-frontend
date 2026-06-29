<template>
  <div class="my-5 lg:my-10">
    <p class="text-3xl font-bold">Result:</p>
    <p class="text-xl mt-5 lg:text-2xl">
      Netto: <span class="font-bold">{{ netto }}</span>
    </p>
    <p class="text-xl mt-2 lg:text-2xl">
      Brutto: <span class="font-bold">{{ brutto }}</span>
    </p>
    <p class="text-xl mt-2 lg:text-2xl">
      Vat: <span class="font-bold">{{ vat }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  netto: number;
  brutto: number;
  vat: number;
}>();
</script>

<style></style>
