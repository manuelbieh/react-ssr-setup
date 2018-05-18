# ⚛ React + Express – SSR Setup

## Motivation

This is just another React Starter Project as there are literally [hundreds of others out there](https://www.javascriptstuff.com/react-starter-projects/). The reason I created this one was to have one central repo I can base my own future projects on, which contains most of the packages I usually use, is easily extendable, and uses all the (very opinionated) configs and settings how I like them.

Another reason I created my own starter project was because I am currently setting up two new potentially long term projects and I wanted to be able to use Webpack 4 and Babel 7 already. None of the bigger and well known starter projects are supporting both as of today. So the idea was born to create my very own starter project. And here we are 🎉

A few things might be familiar when you've worked with other starter projects before. I borrowed a few ideas (and will continue to do so) from Create-React-App and other great starter projects because my intention was to create an up-to-date and opinionated starter project for myself and not to completely reinvent the wheel in every possible way.

## Features

This project has out-of-the-box support for the following things:

*   General Setup
    *   🔥 Babel 7 (Beta)
    *   🔥 Webpack 4
    *   🔥 ESLint 4 (with a set of custom rules which may be mostly identical to AirBnB with some personal flavor added)
    *   🔥 Flow Type
    *   🔥 Prettier
    *   ✅ Jest 22
    *   ✅ CSS Modules
    *   ✅ PostCSS
    *   ✅ … with precommit hooks via lint-staged + Husky

-   Libs and Dependencies
    *   ⚛ React 16.3
    *   ✅ Server side prerendering with Express
    *   ✅ Redux + Thunk middleware
    *   ✅ Reselect
    *   ✅ React Router 4
    *   ✅ React i18next for multi language support
    *   ✅ React Helmet

## Installation

Pretty obvious: run `yarn` or `npm install`.

## Usage

There are npm scripts for all the relevant things. The server will always be started on port 8500 unless otherwise specified in `process.env.PORT`. You can use a `.env` file to specify env vars. If you want to use them in your client side code, don't forget to add them in [config/env.js](config/env.js#L37).

Noteworthy npm scripts:

#### `yarn start`

Starts the app in development mode: creates a new client and server dev build using webpack, starts the Express server build (for both file serving and server side pre-rendering) and keeps webpack open in watchmode. Updates the app (if possible) on change using HMR (see [Caveats](#caveats) <sup>[2]</sup>).

#### `yarn build`

Creates a new build, optimized for production. Does **not** start a dev server or anything else.

#### `yarn test`

Run all tests using jest.

#### `yarn test:update`

Update all Jest snapshots (if there are any)

## Caveats

*   ~~[1] MiniCSSExtractPlugin doesn't play nicely with consecutive builds in Webpack's watchmode yet ([Github issue here](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23)). So I'm using ExtractTextWebpackPlugin until this is fixed~~ Fixed! [490e6e9](https://github.com/manuelbieh/react-ssr-setup/commit/490e6e95fc811b0ce42d1bbc1252d3f26c4bd1ab)
*   ~~[2] Hot Module Replacement is still a bit buggy. Not all components have been configured and updated to play nicely with HMR (namely Redux and React-Router)~~ Seems to be fixed (still validating) [66875a1](https://github.com/manuelbieh/react-ssr-setup/commit/66875a108e6a23d704a117b0ef686db644832589)

## Todo

*   [x] Replace `ExtractTextWebpackPlugin` with `MiniCSSExtractPlugin` once it's working properly
*   [x] Get HMR working (done, mostly)
*   [x] Add HMR for Redux
*   [x] Add HMR for CSS Modules (depends a bit on MiniCSSExtractPlugin) (using ExtractTextWebpackPlugin)
*   [ ] Add React Error Overlay from Create-React-App
*   [ ] Add `react-loadable` or `react-universal-component` (or both, still investigating what makes most sense)
*   [x] Improve server side template
*   [x] Add (and use) `react-helmet`
*   [ ] Add/improve server side chunk loading
*   [x] Add test setup using Jest
*   [ ] Fine tuning different minor things

## Changelog

### 1.2.1 (2018-04-17)

*   Updated Webpack to 4.6.0
*   Updated Redux to 4.0.0

### 1.2.0 (2018-04-17)

*   Added Jest

### 1.1.0 (2018-04-01)

*   Replaced ExtractTextWebpackPlugin with (now working) MiniCSSExtractPlugin
*   Added script to generate production build and made some improvements to the development script
*   Added React-Helmet
*   Improved server side rendering by using a configurable HTML component
*   Webpack updated to ^4.4.1
*   React + React-DOM updated to ^16.3.0
*   Allowed configuration of webpack stats in `config/webpack.config.js`
*   Several minor improvements, cleanups and fixes

### 1.0.0 (2018-03-15)

Initial release

## License

MIT.
