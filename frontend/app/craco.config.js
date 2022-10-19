/**
 * We use craco @see https://github.com/gsoft-inc/craco
 *   - to customize react-scripts (bundling configuration from Create React App)
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require(`path`)
const { getLoader, loaderByName } = require(`@craco/craco`)
const ModuleScopePlugin = require(`react-dev-utils/ModuleScopePlugin`)

const findIdxOfRuleWithOneOf = (rules) => {
  for (let i = 0; i < rules.length; i += 1) {
    if (rules[i].hasOwnProperty(`oneOf`)) return i
  }
}

module.exports = {
  babel: {
    plugins: [
      [
        require.resolve(`@emotion/babel-plugin`),
        { labelFormat: `[filename]--[local]` },
      ],
    ],
    presets: [require.resolve(`@emotion/babel-preset-css-prop`)],
  },
  eslint: {
    enable: false,
  },
  typescript: {
    /**
     * @todo in this project, there are conflicting typings with "brand-ui"
     */
    enableTypeChecking: false,
  },
  webpack: {
    configure(webpackConfig) {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        modules: [
          join(__dirname, `..`),
          join(__dirname, `node_modules`),
          join(__dirname, `..`, `brand-ui`, `node_modules`),
        ],
        alias: {
          ...webpackConfig.resolve.alias,
          "@emotion/core": require.resolve(`@emotion/react`),
          "emotion-theming": require.resolve(`@emotion/react`),
        },
      }

      /**
       * Add TS support for symlinks:
       * @see https://github.com/facebook/create-react-app/issues/6556
       */
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin),
      )
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName(`babel-loader`),
      )
      if (isFound) {
        const babelLoader = { ...match.loader, include: /.+(\/|\\)src/ } // RegEx for win & unix file systems resolution
        const unsafeIndexOfRule = findIdxOfRuleWithOneOf(
          webpackConfig.module.rules,
        )
        webpackConfig.module.rules[unsafeIndexOfRule].oneOf[0] = babelLoader
      }

      return webpackConfig
    },
  },
}
