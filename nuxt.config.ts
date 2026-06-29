// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "https://everything-app-backend-p2by.onrender.com",
      // apiBase: "http://localhost:8080",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts"],
});
