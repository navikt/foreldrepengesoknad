const path = require('path');
const shell = require('shelljs');
const glob = require('glob');
const fs = require('fs');

const generateRow = (packageJson) => `
  <div class="box">
    <a href="${path.join(packageJson.name, 'index.html')}" class="package-row" target="blank">
      <div class="title">
        ${packageJson.name}
      </div>
    </a>
    <div class="description">
      Beskrivelse: ${packageJson.description || '-- Mangler --'}
    </div>
  </div>
`;

const generateHTML = (packages) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Storybook - fp-selvbetjening</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="monorepo-index.css">
  </head>
  <body>
    <h1 class="main-header">Storybook for fp-selvbetjening</h1>
    <div class="grid-container">
      ${packages.map(generateRow).join('')}
    </div>
  </body>
  </html>
`;

const DEPLOY_FOLDER = '../.storybook-static-build';

const creatIndexHtml = () => {
  // Lag folder-struktur for innholdet som skal deployes
  shell.mkdir(path.join(__dirname, DEPLOY_FOLDER));

  // Kopier storybook fra pakkene og inn i folder som skal deployes
  const origDir = process.cwd();
  const packages = glob
    .sync(path.join(origDir, 'apps', '**', 'package.json').split(path.sep).join("/"), {
      ignore: '**/node_modules/**',
    })
    .map(path.dirname)
    .map((subPackage) => {
      shell.cd(subPackage);
      if (!fs.existsSync('package.json') || !fs.existsSync('.storybook-static-build')) {
        return null;
      }

      const packagesJson = JSON.parse(
        fs.readFileSync(path.resolve('package.json'), 'utf8'),
      );

      const packageDestFolder = path.join(__dirname, DEPLOY_FOLDER, packagesJson.name);
      shell.mkdir(packageDestFolder);
      shell.cp('-r', path.join(subPackage, '.storybook-static-build', '*'), packageDestFolder);

      return packagesJson;
    })
    .filter((subPackage) => subPackage);

  // Lag index-fil
  const index = generateHTML(packages);
  fs.writeFileSync(path.join(__dirname, DEPLOY_FOLDER, 'index.html'), index);

  // Kopier css fil til folder som skal deployes
  shell.cp(
    path.join(__dirname, 'storybook-monorepo-index.css'),
    path.join(__dirname, DEPLOY_FOLDER, 'monorepo-index.css'),
  );

  console.log('Done copying files');
};

creatIndexHtml();
