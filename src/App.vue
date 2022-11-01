<script setup>
import { Nav, Alert } from "@/components";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <div class="app-container" :class="authStore.user && 'bg-light'">
    <Nav />
    <div class="container pt-4 pb-4">
      <router-view />
    </div>
  </div>
</template>

<style>
@import "@/assets/base.css";

header {
  line-height: 1.5;
  max-height: 100vh;
  justify-content: center;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
