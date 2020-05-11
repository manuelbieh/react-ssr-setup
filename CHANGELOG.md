# Changelog

## 6.0.0

- Changed format of `babel.config.js` from plain object export to function export (potentially breaking!)
- Modularized Babel config to use a slightly different config for `web` and `node` as target
- Added [React Fast Refresh](https://reactnative.dev/docs/fast-refresh) using [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) (Thanks to [@Ephem](https://github.com/Ephem)!)
- Added `typed-css-modules-plugin` to generate `.d.ts` files for CSS Modules on the fly
- Updated dependencies

## 5.1.0

- Added simple 404 route

## 5.0.0

- Test everything
- Updated all dependencies to their most recent major version
- Use [@werkzeugkiste](https://github.com/werkzeugkiste) lint/prettier configs instead of own custom configs
- Remove .mjs from the list of resolver extensions since that needs some more investigation first

## 5.0.0-beta.1 (2019-10-20)

- Going all in on TypeScript: all files including config files are now TypeScript (Webpack, i18next scanner, postcss, eslint)
- Cleanup several minor things
- Increase minimum Node and Yarn versions to 10.15.0 and 1.17.0 for no really obvious reason (try lower versions at your own risk)
- Increase minimum version for IE in .browserslistrc from IE 9 to IE 11

## 4.2.0 (2019-09-01)

- Added `i18n:pull`, `i18n:push` and `i18n:scan` npm run scripts
- Added `i18next-xhr-backend` to load translation files on demand
- Dropped remaining classes and replaced them with hooks

## 4.1.0 (2019-08-29)

- Updated dependencies
- Use `react-helmet-async` instead of `react-helmet` as it is maintained more actively and does not throw deprecation warnings. (fixes [#58](https://github.com/manuelbieh/react-ssr-setup/issues/58))
- Added aliases in webpack resolvers config for most common packages to avoid bundling it when working with locally linked packages

## 4.0.0 (2019-07-23)

- Added @babel/plugin-transform-runtime to allow async/await in tests ([more info](https://github.com/liferay/liferay-npm-tools/issues/105))
- BREAKING: Replaced Enzyme with @testing-library/react
- BREAKING: updated lint-staged to 9.x
- Removed [moduleRoots](https://github.com/AsaAyers/js-hyperclick#moduleroots) from package.json

## 3.2.0 (2019-06-12)

- Fixed bug when working with plain CSS files ([https://github.com/manuelbieh/react-ssr-setup/issues/69](#69))

## 3.1.0 (2019-06-12)

- Removed `connected-react-router` as it causes more trouble than anything else.
- Updated dependencies
- Added `delay` option to Nodemon to prevent unnecessary server restarts on file change

## 3.0.0 (2019-06-07)

TypeScript was used in production for over a month now and would consider it stable 🎉

- Updated dependencies
- Added TypesSript support for Storybook

## 3.0.0-beta.1 (2019-05-03)

- Fix #48. Create a single history for the store and pass initial request so SSR works for routes

## 3.0.0-beta.0 (2019-05-02)

- Dropped Flow Type in favor of TypeScript (sorry Flow, but the battle is lost)

## 2.9.0 (2019-04-28)

- Experimentally added dependency-cruiser
- Updated dependencies to their most recent versions

## 2.8.0 (2019-04-09)

- Regular depdency update (noteworthy: react-redux v7!)

## 2.7.0 (2019-04-03)

- Dropping @babel/polyfill in favor of core-js 3 since [@babel/polyfill is now deprecated](https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill)
- Regular dependency update

## 2.6.0 (2019-03-21)

- Updated dependencies. Noteworthy update: React Router v5!
- Using TerserPlugin for minification for more reliability
- Removed duplicate use of `postcss-custom-properties`
- Fixed a few issues with Plop and Plop templates
- Using `pretty-add` when adding new Plop generated files (still buggy)

## 2.5.1 (2019-02-06)

- Added a stylelint warning for css shorthand properties which override no-shorthand properties
- Re-added ejs to `file-loader` exclusion list because it otherwise breaks HTMLWebpackPlugin
- Added `HOST` and `DEVSERVER_HOST` to use a different host than `http://localhost`

## 2.5.0 (2019-02-06)

- Upgraded to React and ReactDOM 16.8.0 (with official Hooks support)

## 2.4.0 (2019-02-05)

- Upgraded to immer 2.0.0
- Increased minimum required version for Node (now: >=8.11.3) and Yarn (now: 1.12.3) since earlier versions _might_ cause problems under certain circumstances
- Added `concurrently` for script concurrency and `yarn-or-npm`
- Added `stylelint` and a (yet) minimalistic stylelint config

## 2.3.0 (2019-02-01)

- Temporarily(?) dropped express-manifest-helpers dependency due to [unresolved security issue](https://github.com/danethurber/express-manifest-helpers/pull/4)
- Changed case of translations from kebab-case to snake_case (en-US ➡ en_US)
- Added [`immer`](https://github.com/mweststrate/immer) as dependency
- Updated Jest to Jest 24 and dropped babel-core@7.0.0-bridge.0 as it is no longer needed in Jest 24

## 2.2.0 (2019-01-23)

- Added @babel/plugin-proposal-optional-chaining
- Switched to using a [project-wide Babel config](https://babeljs.io/docs/en/config-files#project-wide-configuration)

## 2.1.0 (2018-12-17)

- Replaced deprecated `react-router-redux` with `connected-react-router`
- Update all dependencies to their most recent version
- Renamed `__CLIENT__` global to `__BROWSER__`
- Added missing `__SERVER__` and `__BROWSER__` globals to ESLint config
- Using `exportOnlyLocals: true` instead of `require('css-loader/locals')` in `loaders.js` since it was changed in css-loader
- Fixed an incorrect babel-plugin ([182d46f](https://github.com/manuelbieh/react-ssr-setup/commit/182d46fc344c9687315acb06adf2aa209c6ba0dd) thanks [andriibyk](https://github.com/andriibyk))
- Removed an unnecessary double `require.resolve` ([ea2dfdd](https://github.com/manuelbieh/react-ssr-setup/commit/ea2dfdd84acd2b005ccef40000708275f388b4e6) thanks [andriibyk](https://github.com/andriibyk))
- Fixed [#26](https://github.com/manuelbieh/react-ssr-setup/issues/26) (thanks [gswirrl](https://github.com/gswirrl))

## 2.0.2 (2018-10-26)

- Added eslint-plugin-react-hooks
- Updated React + React DOM to 16.6.0
- Updated all other dependencies to their most recent version
- ESLint config has been cleaned up a bit

## 2.0.1 (2018-10-10)

- Moved Husky config to its own .huskyrc file

## 2.0.0 (2018-10-10)

- BREAKING: files containing css modules must now be named `.module.css` ([Tweet](https://twitter.com/ManuelBieh/status/1048186009178050560))
- Added `.mjs` to the include list for `babel-loader`
- Removed `.ejs` from the exclude list in the `file-loader` config (why was it even there?)
- Removed the `externalCssLoader` as css files can now be loaded from everywhere
- Added `OMIT_SOURCEMAP` environment variable to **disable** generation of source maps (no matter what env you are working in)
- Updated all dependencies to their most recent versions
- Configured `babel-loader` so SVGs can be imported as React component

## 1.8.0 (2018-10-01)

- Added CaseSensitivePathsPlugin to Webpack config

## 1.7.0 (2018-09-10)

- Added [Plop](https://plopjs.com/) as CLI tool to create new components and reducers.

## 1.6.0 (2018-08-28)

- Updated Babel to v 7.0.0 final 🎉

## 1.5.1 (2018-08-17)

- Added install-deps-postmerge as postmerge hook so changed dependencies get installed (or removed) automatically

## 1.5.0

- Large dependency update. Everything should be up-to-date again. React 16.4.2, Webpack 4.16.5, ESlint 5.

## 1.4.1 (2018-05-24)

- Updated React to 16.4.0

## 1.4.0 (2018-05-23)

- Added a basic Webpack config to support [Storybook](https://storybook.js.org/) integration.

## 1.3.0 (2018-05-23)

- Added opt-in solution for serving a client side only version
- Writing client build files to `build/client/static` instead of `build/client`
- Bugfix: added missing `<!doctype html>` to the server response

## 1.2.2 (2018-05-18)

- Updated Webpack to 4.8.3
- Updated React and ReactDOM to 16.3.2
- Updated all other deps to their most recent version
- Fixed some annoyances with HMR in combination with Redux and React Router

## 1.2.1 (2018-04-17)

- Updated Webpack to 4.6.0
- Updated Redux to 4.0.0

## 1.2.0 (2018-04-17)

- Added Jest

## 1.1.0 (2018-04-01)

- Replaced ExtractTextWebpackPlugin with (now working) MiniCSSExtractPlugin
- Added script to generate production build and made some improvements to the development script
- Added React-Helmet
- Improved server side rendering by using a configurable HTML component
- Webpack updated to ^4.4.1
- React + React-DOM updated to ^16.3.0
- Allowed configuration of webpack stats in `config/webpack.config.js`
- Several minor improvements, cleanups and fixes

## 1.0.0 (2018-03-15)

Initial release
