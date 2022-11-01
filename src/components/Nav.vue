<script setup>
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <nav
    v-show="authStore.user"
    class="navbar navbar-expand navbar-dark bg-primary"
  >
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          alt="Currency Converter logo"
          class="logo"
          src="@/assets/logo.png"
          height="50"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/reports" class="nav-item nav-link"
            >Reports</router-link
          >
          <button
            @click="authStore.logout()"
            class="btn btn-link nav-item nav-link"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  </nav>
</template>
