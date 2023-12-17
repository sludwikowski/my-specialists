## Installation

#### To install this application you need to run following commands

<br>

Clone the repository :

```bash
git clone https://github.com/sludwikowski/my-specialists/tree/master
```

<br>

Install dependencies using Yarn or NPM or PNPM :

```bash
# using pnpm
pnpm install

# or using yarn
yarn install

# or using npm
npm install
```

<br />

## Start : Development

To develop and run your web application, you need to run following command :

```bash
# using pnpm
pnpm start

# or using yarn
yarn start

# or using npm
npm run start
```

<br />

## Lint : Development

To lint application source code using ESLint via this command :

```bash
# using pnpm
pnpm lint

# or using yarn
yarn lint

# or using npm
npm run lint
```

<br />

## Build : Production

Distribution files output will be generated in `dist/` directory by default.

To build the production ready files for distribution, use the following command :

```bash
# using pnpm
pnpm build

# or using yarn
yarn build

# or using npm
npm run build
```

<br />

## Serve : Production

Serve helps you serve a static site, single page application or just a static file. It also provides a neat interface for listing the directory's contents. This command serves build files from `dist/` directory.

```bash
# using pnpm
pnpm serve

# or using yarn
yarn serve

# or using npm
npm run serve
```

<br />

## Webpack Configurations

To make it easier for managing environment based webpack configurations, i am using separated `development` and `production` configuration files, they are available in :

```bash
# Development webpack config
tools/webpack/webpack.config.dev.js

# Production webpack config
tools/webpack/webpack.config.prod.js
```

For further information, you can visit [Webpack Configuration](https://webpack.js.org/configuration/)

## Branch Name Convention

I am using specific branch naming conventions to organize our work and make it easier to understand the purpose of different branches:

- `development`: This branch is used for development. All the new features and bug fixes should be merged into this branch.

- `master`: This branch is used for production. Only fully tested code from the `development` branch should be merged into `master`.

- `MS-{id}/Name`: These branches are used for specific tasks or features. The `{id}` should be replaced with the task number or ID, and `Name` should be replaced with a short descriptive name for the task. For example, `MS-123/AddLoginFeature` could be a branch for adding a new login feature.