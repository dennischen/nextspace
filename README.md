
Nextspace is a workspace context provides abilities for a nextjs application to : 
* I18n label translation base on cookie/header/session (no /en/page, /zh/page in url) and load translation with lazy trunk only when reqired
* Asyn page loading and progress indication with lazy trunk only when reqired
* More...



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