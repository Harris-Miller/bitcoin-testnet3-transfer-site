# bitcoin-testnet3-transfer-site [![Build Status](https://travis-ci.org/Harris-Miller/bitcoin-testnet3-transfer-site.svg?branch=master)](https://travis-ci.org/Harris-Miller/bitcoin-testnet3-transfer-site)

A test project to do transfers of bitcoins between addresses on the testnet3 chain

By Harris Miller

## What this site is

This side is a simple site that is used to save bitcoin addresses on the testnet3 blockchain, and the transfers that have been made to them. You can save as many addresses as you would like to your account. You don't have to own the address to add it, you just have to know the address hash (or scan a QR code of it!).

When veiwing the address, new transactions with display automatically and will be updated through the first 6 confirmations of the transactions over the blockchain. Addresses can be removed at any time as well.

You must create an account and login to use these features. 

## Architecture

This site is built using an express server and a react front end.

## Server

The express server was started using [express-generator](https://expressjs.com/en/starter/generator.html).

Since the frontend is a React app, the view engine components were removed entirely. The express app serves up the express app statically to all routes, allowing the react app to handle 404s. The exception to the is the `/api` route. That servers up 404s as JSON. As well as being the endpoint to all data service calls. Any and all server errors are returned as a 500.

Websockets are also implemented using [socket.io](https://socket.io/).

Postgres is used as the database. The database driver I am using is [Knex](https://knexjs.org/), and the ORM is [Bookshelf](http://bookshelfjs.org/). The knex CLI is used to handle migrations.

### Build and Dev tools

I am not using babel for the server. Nor es6 imports. I did not want to have to go through a build process for the server-side code, and wanted to run it as is. I do believe you need at least Node version 6 or above to run the code though, due to the use of some ES6/7 features.

#### Linting

The codebase is fully linted using eslint. The rule set I'm using is my own personal one I have published to npm, [eslint-config-harris](https://www.npmjs.com/package/eslint-config-harris). That package is based on AirBnb's, but I've altered the rules a bit to fit my own style, as well as made the rule sets you import to be module depending on your environment (node, web, react-native, etc...). Learn more using the link above.

The npm script `lint` runs eslint for the project.

#### Testing

The code base is also unit tested using [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/), [Sinon](http://sinonjs.org/), and [Supertest](https://github.com/visionmedia/supertest). [Istanbul](https://istanbul.js.org/) is used for code coverage.

The npm scripts `test` and `test:watch` runs the test suite for the project. `test:watch` watches for code changes, but doesn't show coverage. `test` runs once and displays coverage.

#### Countinuous Integration

[Travis-CI](https://travis-ci.org/) is used for CI. Runs linting, tests, and builds for server and front-end. Deploys to Heroku on tags only. Use the badge at top of this readme to see if the current build is passing!

### Authentication

Json Web Tokens are used for user authentication. The tokens are passed as Bearer tokens via the Authorization header. I have not gone as far to put a lifetime on the tokens, so currently they don't expire. I may introduce that feature in the future. A front-end user will stay logged in until they specifically choose to logout.

### API

The API has 3 main endpints. `/auth`, `/users`, and `/callbacks`.

### `/auth`

#### `POST /auth`

This endpint is used for logging in and returns a json web token of authenticated user's info. 400 is returned if email or password credentials are missing, and a 401 is returned is either the email does not exist, or the password is incorrect.

### `/users`

#### `POST /users/`

Used to create new users. body params expected are `username`, `email`, and `password`. Missing any of these will result in a 400. The password field is not saved directly. Instead, using `bcrypt`, a hash is created and saved. It returns a 201 with all fields (excluding the password) back.

#### `GET /users/:id/addresses`

Gets the saved addresses of a user, including transactions for those addresses. This route is protected, you must be logged in as the user associated with `:id` to access this endpoint. Otherwise, a 401 is returned.

#### `POST /users/:id/addresses`

Saves a new address for a user. Route is protected, same as above. Expects body param `key`. Returns 400 is key is not present. If the key has already been added for the user, it just returns the data for it as a 201. New addresses return the full data about the address as a 201 as well.

Adding an address also sets up a webhook for this address, so information about new transactions for the address are send to the server. This is explained below in the `/callbacks` endpoint.

#### `DELETE /users/:id/addresses/:address`

Removes an address for a user. Route is protected, same as above. This endpoint also removes the webhook that was added when the address was added for the user. Returns a 204.

### `/callbacks`

#### `POST /callbacks/:address`

This endpoint is the callback endpoint for the webhooks created for user addresses. The endpoint passsed the data allow to the front-end via websockets. It returns a 204.

## Front End

This react app is a standard `create-react-app`. It has not been ejected. It exists in the `bitcoin-testnet3-front-end` folder.

I'm using [react-redux](https://github.com/reduxjs/react-redux), [immutablejs](https://facebook.github.io/immutable-js/), [react-router](https://reacttraining.com/react-router/web/guides/philosophy), and [MaterialUI](https://material-ui.com/) as the main components for the front-end.

The app is Material Design based, and is responsive to mobile.

### Build and Dev Tools

This is a standard `create-react-app` and the normal build process applies. The npm scripts includes `start`, `build`, and `test`

### Linting

Linting is a default part of the start (serve) and build process

### Testing

Standard testing applies using [Jest](https://jestjs.io/) and [Enzyme](http://airbnb.io/enzyme/).