<template>
  <h1
    class="font-bold text-[#ce4651] uppercase text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl"
  >
    {{ props.text }}
  </h1>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>
