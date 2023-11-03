
Nextspace is a workspace context provides abilities for a nextjs application to : 
* I18n label translation base on cookie/header/session (no /en/page, /zh/page in url) and load translation with lazy trunk only when reqired
* Asyn page loading and progress indication with lazy trunk only when reqired
* More...


## Directory
 * /src : The source code
 * /app : The test application code and data
 * /cypress : The auto test code and data

## Installation
 ```bash
yarn install
 ``` 

## Development
Run the test application

```bash
yarn dev
```

## Auto Test
Run the auto test by cypress test framework

```bash
yarn test
# or
yarn test:component
yarn test:e2e

# or open and run manually
yarn test:component:open
yarn test:e2e:open
```

## Build
Build the test application
```bash
yarn build
# then
yarn start

# or just
yarn build-start
```
## Distribution
Compile and copy resources to dist

```bash
yarn clean

yarn dist
# or watch for running nextspace in nextjs dev
yarn dist-watch
```

## Release
Update information before publish to repository

```bash
yarn release
```

## Demo
Yon can run the demo app (https://github.com/dennischen/nextspace-demo) on local