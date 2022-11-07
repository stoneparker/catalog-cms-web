const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#0745FE",
              "border-radius-base": "8px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};