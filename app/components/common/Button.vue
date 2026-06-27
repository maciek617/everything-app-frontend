<template>
  <button
    type="button"
    class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded text-lg px-4 py-2.5 text-center leading-5 block uppercase tracking-widest"
  >
    {{ props.text }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>

<style></style>
