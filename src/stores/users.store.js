import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
    user: {},
  }),
  actions: {
    async register(user) {
      await fetchWrapper.post(`${baseUrl}/register`, user);
    },
  },
});
