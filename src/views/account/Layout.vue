<script setup>
import { useAuthStore } from "@/stores";
import { router } from "@/router";

// redirect home if already logged in
const authStore = useAuthStore();
if (authStore.user) {
  router.push("/");
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-5 offset-lg-4 col-md-8 offset-md-2 col-sm-8 offset-sm-2 mt-5"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>
