// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
})
