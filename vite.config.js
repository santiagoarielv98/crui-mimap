/**
 * @type {import('vite').UserConfig}
 */
export default {
  base: "/crui-prueba_mapa/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        mapa: "./mapa.html",
      },
    },
  },
};
