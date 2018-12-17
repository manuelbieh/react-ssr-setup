# Changelog

## 2.1.0 (2018-12-17)

-   Replaced deprecated `react-router-redux` with `connected-react-router`
-   Update all dependencies to their most recent version
-   Renamed `__CLIENT__` global to `__BROWSER__`
-   Added missing `__SERVER__` and `__BROWSER__` globals to ESLint config
-   Using `exportOnlyLocals: true` instead of `require('css-loader/locals')` in `loaders.js` since it was changed in css-loader
-   Fixed an incorrect babel-plugin ([182d46f](https://github.com/manuelbieh/react-ssr-setup/commit/182d46fc344c9687315acb06adf2aa209c6ba0dd) thanks [andriibyk](https://github.com/andriibyk))
-   Removed an unnecessary double `require.resolve` ([ea2dfdd](https://github.com/manuelbieh/react-ssr-setup/commit/ea2dfdd84acd2b005ccef40000708275f388b4e6) thanks [andriibyk](https://github.com/andriibyk))
-   Fixed [#26](https://github.com/manuelbieh/react-ssr-setup/issues/26) (thanks [gswirrl](https://github.com/gswirrl))

## 2.0.2 (2018-10-26)

-   Added eslint-plugin-react-hooks
-   Updated React + React DOM to 16.6.0
-   Updated all other dependencies to their most recent version
-   ESLint config has been cleaned up a bit

## 2.0.1 (2018-10-10)

-   Moved Husky config to its own .huskyrc file

## 2.0.0 (2018-10-10)

-   BREAKING: files containing css modules must now be named `.module.css` ([Tweet](https://twitter.com/ManuelBieh/status/1048186009178050560))
-   Added `.mjs` to the include list for `babel-loader`
-   Removed `.ejs` from the exclude list in the `file-loader` config (why was it even there?)
-   Removed the `externalCssLoader` as css files can now be loaded from everywhere
-   Added `OMIT_SOURCEMAP` environment variable to **disable** generation of source maps (no matter what env you are working in)
-   Updated all dependencies to their most recent versions
-   Configured `babel-loader` so SVGs can be imported as React component

## 1.8.0 (2018-10-01)

-   Added CaseSensitivePathsPlugin to Webpack config

## 1.7.0 (2018-09-10)

-   Added [Plop](https://plopjs.com/) as CLI tool to create new components and reducers.

## 1.6.0 (2018-08-28)

-   Updated Babel to v 7.0.0 final 🎉

## 1.5.1 (2018-08-17)

-   Added install-deps-postmerge as postmerge hook so changed dependencies get installed (or removed) automatically

## 1.5.0

-   Large dependency update. Everything should be up-to-date again. React 16.4.2, Webpack 4.16.5, ESlint 5.

## 1.4.1 (2018-05-24)

-   Updated React to 16.4.0

## 1.4.0 (2018-05-23)

-   Added a basic Webpack config to support [Storybook](https://storybook.js.org/) integration.

## 1.3.0 (2018-05-23)

-   Added opt-in solution for serving a client side only version
-   Writing client build files to `build/client/static` instead of `build/client`
-   Bugfix: added missing `<!doctype html>` to the server response

## 1.2.2 (2018-05-18)

-   Updated Webpack to 4.8.3
-   Updated React and ReactDOM to 16.3.2
-   Updated all other deps to their most recent version
-   Fixed some annoyances with HMR in combination with Redux and React Router

## 1.2.1 (2018-04-17)

-   Updated Webpack to 4.6.0
-   Updated Redux to 4.0.0

## 1.2.0 (2018-04-17)

-   Added Jest

## 1.1.0 (2018-04-01)

-   Replaced ExtractTextWebpackPlugin with (now working) MiniCSSExtractPlugin
-   Added script to generate production build and made some improvements to the development script
-   Added React-Helmet
-   Improved server side rendering by using a configurable HTML component
-   Webpack updated to ^4.4.1
-   React + React-DOM updated to ^16.3.0
-   Allowed configuration of webpack stats in `config/webpack.config.js`
-   Several minor improvements, cleanups and fixes

## 1.0.0 (2018-03-15)

Initial release
