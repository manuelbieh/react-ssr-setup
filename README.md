# ⚛ React + Express – SSR Setup

## Motivation

This is just another React Starter Project as there are literally [hundreds of others out there](https://www.javascriptstuff.com/react-starter-projects/). The reason I created this one was to have one central repo I can base my own future projects on, which contains most of the packages I usually use, is easily extendable, easy to understand, and uses all the configs and settings I made good experiences with in the past.

Another reason I created my own starter project was because I was setting up two new long term projects and I wanted to be able to use Webpack 4 and Babel 7 already. None of the bigger and well known starter projects were supporting both by the time I created this starter project. So the idea was born to create my very own. And here we are 🎉

A few things might be familiar when you've worked with other starter projects before. I borrowed many ideas (and will continue to do so) from Create React App, React Starter Kit and other great starter projects because my intention was to create an up-to-date starter project for myself based on best practices and not to completely reinvent the wheel in every possible way just for the sake of it.

## Goals

My goal is to provide a well-tested, easily configurable and adjustable React Starter Project that gives you a good basis to start your own project on. As minimal as possible with as much functionality as necessary.

I use this Starter Project in several real-word projects already so it is battle-tested already and everytime I fix a bug or add a feature I find useful I will also update this Starter Project. I will also keep the dependencies up-to-date on a regular basis and will also stay updated with all the latest and greatest best practices in the React world and integrate them if possible and useful!

If you have any questions you can always [open an issue on Github](https://github.com/manuelbieh/react-ssr-setup/issues) or reach out to me on [https://www.twitter.com/manuelbieh](Twitter)!

## Features

This project has out-of-the-box support for the following things:

-   General Setup
    -   🔥 Babel 7
    -   🔥 Webpack 4
    -   🔥 ESLint 5 (with a set of custom rules which may be mostly identical to AirBnB with some personal flavor added)
    -   🔥 Flow Type
    -   🔥 Prettier
    -   ✅ Server side prerendering with Express
    -   ✅ Hot Module Reloading (HMR)
    -   ✅ Jest 23
    -   ✅ CSS Modules
    -   ✅ PostCSS
    -   ✅ Precommit hooks via lint-staged + Husky
    -   ✅ Optional static deployment without the need for Node.js on the server
    -   📕 Support for [Storybook](https://storybook.js.org/) (>= 4.0.0)

*   Libs and Dependencies
    -   ⚛ React 16.5
    -   ✅ Redux + Thunk middleware
    -   ✅ Reselect
    -   ✅ React Router 4
    -   ✅ React i18next for multi language support
    -   ✅ React Helmet

Since it's only using standard APIs so far it is ready to be used with the new React Suspense feature coming in React 17!

## Installation

Pretty obvious: run `yarn` or `npm install` on your command line.

## Usage

There are npm scripts for all the relevant things. The server will always be started on port 8500 unless otherwise specified in `process.env.PORT`. You can use a `.env` file to specify env vars. If you want to use them in your client side code, don't forget to add them in [config/env.js](config/env.js#L37).

Noteworthy npm scripts:

#### `yarn start`

Starts the app in development mode: creates a new client and server dev build using webpack, starts the Express server build (for both file serving and server side pre-rendering) and keeps webpack open in watchmode. Updates the app (if possible) on change using HMR.

#### `yarn build`

Creates a new build, optimized for production. Does **not** start a dev server or anything else.

#### `yarn test`

Run all tests using jest.

#### `yarn test:update`

Update all Jest snapshots (if there are any)

#### `yarn plop`

Run plop to create new React components or Redux reducers via CLI

## Client side version (opt-in)

Beginning with v1.3.0, a **static** `index.html` is also generated and written to your `clientBuild` directory. You are now able to deploy the `build/client` directory to a static webhost (such as Netlify or AWS S3) and serve your application from there!

For the generation of the `index.html` the server side build gets started right after building, a headless Chrome then visits the site and writes the content of the server side response to your client directory. So you still need the `src/server` directory and the server side build but you're now flexible and can decide on your own whether you want to have the full server side experience or only deploy your completely static app somewhere.

## Component scaffolding using plop

Along with this starter kit comes `plop` - a great command line tool to keep the structure of your Redux components and Redux reducers consistent. Run `yarn plop` (or `npm run plop`) to have components and Redux reducers created for you automatically! Just enter a name, answer a few questions and you're ready to go! You can of course adjust everything to your needs. All Plop templates can be found in the `config/plop` directory.

## 📕 Storybook support

I've successfully tested Storybook and it integrates seamlessly and without any issues into this setup. If you want to add Storybook to your project, install the most recent version (which by the time of writing is `4.0.0-alpha.16` and can be done via `npm i -g @storybook/cli@4.0.0-alpha.16`) and run `getstorybook` to have the basic setup created for you. You must then replace all the content in `.storybook/webpack.config.js` with the following line:

```js
module.exports = require('../config/webpack.config.js/storybook');
```

Afterwards you should be able to run `yarn storybook` to start the Storybook Dev Server.

## Caveats

-   ~~[1] MiniCSSExtractPlugin doesn't play nicely with consecutive builds in Webpack's watchmode yet ([Github issue here](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23)). So I'm using ExtractTextWebpackPlugin until this is fixed~~ Fixed! [490e6e9](https://github.com/manuelbieh/react-ssr-setup/commit/490e6e95fc811b0ce42d1bbc1252d3f26c4bd1ab)
-   ~~[2] Hot Module Replacement is still a bit buggy. Not all components have been configured and updated to play nicely with HMR (namely Redux and React-Router)~~ Seems to be fixed (still validating) [66875a1](https://github.com/manuelbieh/react-ssr-setup/commit/66875a108e6a23d704a117b0ef686db644832589)
-   Running the build in production: I **strongly** recommend to serve your static assets using **Nginx** or **Apache** instead of the `Express.static` middleware. That's how I usually do it and that's why you won't see any assets when starting the production server build with Node. If you still want to use `Express.static` in production despite the warning, have a look at the first few lines of `./src/server/index.js`. There's a short comment with a description what you need to do.

## Todo

-   [x] Replace `ExtractTextWebpackPlugin` with `MiniCSSExtractPlugin` once it's working properly
-   [x] Get HMR working (done, mostly)
-   [x] Add HMR for Redux
-   [x] Add HMR for CSS Modules (depends a bit on MiniCSSExtractPlugin) (using ExtractTextWebpackPlugin)
-   [ ] Add React Error Overlay from Create-React-App
-   [ ] Add ~~`react-loadable` or~~ `react-universal-component` (or both, still investigating what makes most sense). **Update:** `react-loadable` is out due to [questionable license change](https://github.com/jamiebuilds/react-loadable/commit/c3272b3132e4fe25937c3610b7cd0dd2da48c5e9)
-   [x] Improve server side template
-   [x] Add (and use) `react-helmet`
-   [ ] Add/improve server side chunk loading
-   [x] Add test setup using Jest
-   [ ] Fine tuning different minor things (ongoing task)

## Changelog

Moved to its own file: [CHANGELOG.md](CHANGELOG.md)

## License

MIT.
