<script setup>
import { Form, Field } from "vee-validate";
import { Alert } from "@/components";
import * as Yup from "yup";

import { useUsersStore, useAlertStore } from "@/stores";
import { router } from "@/router";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();
  try {
    await usersStore.register(values);
    await router.push("/account/login");
    alertStore.success("Registration successful");
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <div class="content">
    <header>
      <img
        alt="Currency Converter logo"
        class="logo"
        src="@/assets/logo.png"
        width="256"
      />
    </header>
    <h4 class="mt-5 mb-3">Register</h4>
    <Alert />
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="mb-3">
        <label>Name</label>
        <Field
          name="name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
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
        <label>Confirm Password</label>
        <Field
          name="password_confirmation"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password_confirmation }"
        />
        <div class="invalid-feedback">{{ errors.password_confirmation }}</div>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Register
        </button>
      </div>
    </Form>
    <div class="mt-3">
      Already have an account? <router-link to="login">Login</router-link>
    </div>
  </div>
</template>
