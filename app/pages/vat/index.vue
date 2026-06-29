<template>
  <div class="container mx-auto py-10 px-5">
    <AppTitle text="Vat calculator" />
    <VatInfo />

    <div class="mt-5">
      <div>
        <p class="lg:text-xl">
          Check this box if you want to calculate from gross amount
        </p>
        <div class="flex mb-4 lg:mt-2">
          <input
            id="gross"
            type="checkbox"
            v-model="isNet"
            class="cursor-pointer lg:w-5"
          />
          <label for="gross" class="ml-2 text-md cursor-pointer lg:text-lg"
            >Gross</label
          >
        </div>
      </div>
      <div class="lg:mt-10">
        <label
          for="visitors"
          class="uppercase text-gray-900 font-medium lg:text-lg"
          >Insert your {{ isNet ? "gross" : "net" }} amount</label
        >
        <input
          type="text"
          class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs max-w-lg mt-2 drop-shadow placeholder:text-body"
          :class="errMsg ? 'border-2 border-red-400' : 'border-2'"
          placeholder="100.00"
          v-model="netAmount"
          required
        />
        <p class="text-red-400">{{ errMsg }}</p>
      </div>
      <div class="mt-10 my-5">
        <label class="uppercase text-gray-900 font-medium lg:text-lg">
          Choose your vat
        </label>
        <ul class="text-sm font-medium text-center text-body flex mt-3">
          <li
            v-for="vatOption in vatOptions"
            :key="vatOption.name"
            class="w-1/3 focus-within:z-10 rounded cursor-pointer shadow"
            :class="
              vatRate === vatOption.value
                ? 'border-4 border-red-400'
                : 'border-4'
            "
            @click="vatRate = vatOption.value"
          >
            <p class="p-2 text-lg lg:p-4 lg:text-xl">{{ vatOption.name }}</p>
          </li>
        </ul>
      </div>

      <CommonLoader v-if="isLoading" />

      <VatResult
        v-if="result && !isLoading"
        :netto="result.net"
        :brutto="result.gross"
        :vat="result.vat"
      />

      <Button text="Calculate" @click="calculate" />
    </div>

    <VatDescription />
  </div>
</template>

<script lang="ts" setup>
import AppTitle from "~/components/common/AppTitle.vue";
import Button from "~/components/common/Button.vue";

const result = ref<any>(null);
const errMsg = ref<string>("");
const vatOptions = ref([
  {
    name: "23%",
    value: 0.23,
  },
  {
    name: "8%",
    value: 0.08,
  },
  {
    name: "5%",
    value: 0.05,
  },
]);

const netAmount = ref(0);
const vatRate = ref(0.23);
const isNet = ref(false);
const isLoading = ref(false);
const config = useRuntimeConfig();

const validateUserInput = () => {
  if (+netAmount.value <= 0) {
    return (errMsg.value = "You need to insert amount that is higher than 0.");
  } else if (netAmount.value.toString().includes(",")) {
    return (errMsg.value = "You need to use ',' insted of '.'");
  }

  return (errMsg.value = "");
};

async function calculate() {
  isLoading.value = true;
  if (validateUserInput()) {
    isLoading.value = false;
    return;
  }
  const data = await $fetch(`${config.public.apiBase}/api/tools/vat`, {
    method: "POST",
    body: {
      netAmount: +netAmount.value,
      vatRate: +vatRate.value,
      isNet: !isNet.value,
    },
  });

  result.value = data;
  isLoading.value = false;
}
</script>

<style></style>
