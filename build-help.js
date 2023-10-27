'strict'


const { resolve, basename } = require('path')
const argv = require('yargs').argv
const fs = require('fs-extra')
const releasePackageJson = argv['release-package-json']

if (releasePackageJson) {
    const pkgJsonContent = require(resolve('package.json'))
    const releasePkgJson = resolve('dist', 'package.json')
    pkgJsonContent.scripts = {};
    delete pkgJsonContent.devDependencies;

    fs.writeFileSync(releasePkgJson, JSON.stringify(pkgJsonContent, null, '    '))
}