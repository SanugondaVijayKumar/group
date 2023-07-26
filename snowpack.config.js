// snowpack.config.js
module.exports = {
    mount: {
      public: '/',
      src: '/dist',
    },
    plugins: [
      '@snowpack/plugin-dotenv',
      '@snowpack/plugin-sass',
    ],
    routes: [],
    optimize: {},
    packageOptions: {},
    devOptions: {},
    buildOptions: {},
  };
  