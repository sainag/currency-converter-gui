<script setup>
import { Form, Field } from "vee-validate";
import { Alert } from "@/components";
import * as Yup from "yup";

import { useAuthStore } from "@/stores";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid"),
  password: Yup.string().required("Password is required"),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { email, password } = values;
  await authStore.login(email, password);
}
</script>

<template>
  <div class="container">
    <header>
      <img
        alt="Currency Converter logo"
        class="logo"
        src="@/assets/logo.png"
        width="256"
      />
    </header>
    <h4 class="mt-5 mb-3">Login</h4>
    <Alert />
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="mb-3">
        <label>Email</label>
        <Field
          name="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Login
        </button>
      </div>
    </Form>
    <div class="mt-3">
      You don't have an account?
      <router-link to="register">Register</router-link>
    </div>
  </div>
</template>
