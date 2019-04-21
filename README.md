# Codete challenge

## Pre-requirements

This application is written in TypeScript + React + MobX and should be started by NodeJS and Yarn:

| App/Lib    | Version     |
| ---------- | ----------- |
| NodeJs     | LTS (10.15) |
| Typescript | >= 3.4      |
| Yarn       | >= 1.10.0   |

## How to start

Simply clone this repository with `git clone` or other preferable way and follow next steps:

- install dependencies

```bash
yarn
```

- start the app

```bash
yarn start:dev-server // for starting mock API server
yarn start
```

Wait until application starts (usually it takes around 5-10 seconds on first start) and it will be available on `http://localhost:3000`.

## Storybook

This repository contains `storybook` for developing/presenting components. To run it just hit

```bash
yarn storybook
```

Wait for it and it will be opened automatically in the new tab (in case of need it's available on `http://localhost:6006`)

## Testing

To test whole application just run

```bash
yarn test
```

It will run `jest`, `tslint` and `tsc` and print the results to the standard output.
