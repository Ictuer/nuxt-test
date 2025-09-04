// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      "@nuxt/fonts",
      {
        families: [{ name: "Roboto", weights: [400, 500, 600, 700] }],
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-toast",
  ],
});
