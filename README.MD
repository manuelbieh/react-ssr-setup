# React + Express – SSR Setup

## Motivation

This is just another React Starter Project as there are literally [hundreds of others out there](https://www.javascriptstuff.com/react-starter-projects/). The reason I created this one was to have one central repo I can base my own future projects on, which contains most of the packages I usually use, is easily extendable, and uses all the (very opinionated) configs and settings how I like them.

Another reason I created my own starter project was because I am currently setting up two new potentially long term projects and I wanted to be able to use Webpack 4 and Babel 7 already. None of the bigger and well known starter projects are supporting both as of today. So the idea was born to create my very own starter project. And here we are 🎉

A few things might be familiar when you've worked with other starter projects before. I borrowed a few ideas (and will continue to do so) from Create-React-App and other great starter projects because my intention was to create an up-to-date and opinionated starter project for myself and not to completely reinvent the wheel in every possible way.

## Features

This project has out-of-the-box support for the following things:

*   General Setup
    *   Babel 7 (Beta)
    *   Webpack 4
    *   ESLint 4 (with a set of custom rules which may be mostly identical to AirBnB with some personal flavor added)
    *   Flow Type
    *   CSS Modules (see [Caveats](#caveats) <sup>[1]</sup>)
    *   PostCSS
    *   Prettier
    *   … with precommit hooks via lint-staged + Husky
    *   `webpack-serve` (as it is advertised as small and lightweight alternative to `webpack-dev-server`)

-   Libs and Dependencies
    *   Server side prerendering with Express
    *   React 16.2
    *   Redux + Thunk middleware
    *   Reselect
    *   React Router 4
    *   React i18next for multi language support

Basic setup for Jest will be added shortly.

## Installation

Pretty obvious: run `yarn` or `npm intall`.

## Usage

There are npm scripts for all the relevant things. The server will always be started on port 8500 unless otherwise specified in `process.env.PORT`.

Noteworthy npm scripts:

#### `yarn start:hot`

Creates a new client and server dev build (which is kind of hacky but necessary or otherwise the server task would fail because there is no server.js yet), starts the Express server to serve the server side app and starts a `webpack-serve` process which immediately rebuilds the app with HMR support which is not quite working yet (see [Caveats](#caveats) <sup>[2]</sup>).

#### `yarn start`

Creates a new client and server dev build then starts the Express server and Webpack in watchmode. Without HMR.

#### `yarn watch:server`

Start the server without building first. Restarts if any changes are detected.

#### `yarn build`

Creates a new build, optimized for production. Does **not** start a dev server anything else.

## Caveats

*   [1] MiniCSSExtractPlugin doesn't play nicely with consecutive builds in Webpack's watchmode yet ([Github issue here](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23)). So I'm using ExtractTextWebpackPlugin until this is fixed
*   [2] Hot Module Replacement is not quite working yet. `webpack-serve` logs that a Module Replacement has taken place but the still requires a manual browser refresh though. Needs some more investigation.

## Todo

*   [ ] Replace `ExtractTextWebpackPlugin` with `MiniCSSExtractPlugin` once it's working properly
*   [ ] Get HMR working
*   [ ] Add HMR for Redux
*   [ ] Add HMR for CSS Modules (depends a bit on MiniCSSExtractPlugin)
*   [ ] Add React Error Overlay from Create-React-App
*   [ ] Add `react-loadable` or `react-universal-component` (or both, still investigating what makes most sense)
*   [ ] Fine tuning different minor things

## License

MIT.
