import { copyFileSync, cpSync, existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';

const scriptDir = import.meta.dirname;
const DEPLOY_FOLDER = '../.storybook-static-build';

const generateRow = (packageJson) => `
  <a href="${packageJson.name}" class="package" target="${packageJson.name}" rel="noopener">
    <code>${packageJson.name}</code>
    ${packageJson.description ? `<p>${packageJson.description}</p>` : ''}
  </a>
`;

const generateHTML = (apps, packages) => `
  <!DOCTYPE html>
  <html lang="nb">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Storybook - fp-selvbetjening</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="monorepo-index.css">
  </head>
  <body>
    <h1>Storybook for fp-selvbetjening</h1>
    <section>
      <h2>Apps</h3>
      <div class="grid-container">
        ${apps.map(generateRow).join('')}
      </div>
    </section>
    <section>
      <h2>Packages</h3>
      <div class="grid-container">
        ${packages.map(generateRow).join('')}
      </div>
    </section>
  </body>
  </html>
`;

const copyFiles = (subPackage) => {
    if (!existsSync(join(subPackage, 'package.json')) || !existsSync(join(subPackage, '.storybook-static-build'))) {
        return null;
    }

    const packagesJson = JSON.parse(readFileSync(join(subPackage, 'package.json'), 'utf8'));

    const packageDestFolder = join(scriptDir, DEPLOY_FOLDER, packagesJson.name);
    mkdirSync(packageDestFolder, { recursive: true });
    cpSync(join(subPackage, '.storybook-static-build'), packageDestFolder, { recursive: true });

    return packagesJson;
};

// Lag folder-struktur for innholdet som skal deployes
mkdirSync(join(scriptDir, DEPLOY_FOLDER, '@navikt'), { recursive: true });

// Kopier storybook fra pakkene og inn i folder som skal deployes
const origDir = process.cwd();
const packagesApps = globSync(join(origDir, 'apps', '*', 'package.json').split(sep).join('/'))
    .map(dirname)
    .map(copyFiles)
    .filter(Boolean);

const packagesPackages = globSync(join(origDir, 'packages', '*', 'package.json').split(sep).join('/'))
    .map(dirname)
    .map(copyFiles)
    .filter(Boolean);

// Lag index-fil
writeFileSync(join(scriptDir, DEPLOY_FOLDER, 'index.html'), generateHTML(packagesApps, packagesPackages));

// Kopier css fil til folder som skal deployes
copyFileSync(join(scriptDir, 'storybook-monorepo-index.css'), join(scriptDir, DEPLOY_FOLDER, 'monorepo-index.css'));

console.log('Done copying files');
