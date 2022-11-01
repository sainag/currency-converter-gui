<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import CurrencyConverter from "@/components/CurrencyConverter.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user" class="text-center">
    <h1>Currency Converter</h1>
    <h5>Check Live Exchange Rates in USD</h5>
    <CurrencyConverter />
  </div>
</template>
