#!/usr/bin/env sh

yarn db:migrate
yarn lint
yarn test
cd bitcoin-testnet3-front-end
yarn test
yarn build
cd ..