import { copyFileSync, cpSync, existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const DEPLOY_FOLDER = join(scriptDir, '../.storybook-static-build');
const BUILD_FOLDER = '.storybook-static-build';
const PACKAGE_JSON = 'package.json';
const CSS_FILE = 'storybook-monorepo-index.css';

const generateRow = (packageJson) => `
          <a href="${packageJson.name}" class="package" target="${packageJson.name}" rel="noopener">
            <code>${packageJson.name}</code>${packageJson.description ? `<p>${packageJson.description}</p>` : ''}
          </a>
`;

const generateHTML = (apps, packages) => `<!DOCTYPE html>
  <html lang="nb">
    <head>
      <meta charset="utf-8" />
      <title>Storybook - fp-selvbetjening</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="${CSS_FILE}">
    </head>
    <body>
      <h1>Storybook for fp-selvbetjening</h1>
      <section>
        <h2>Apps</h2>
        <div class="grid-container">
          ${apps.map(generateRow).join('')}
        </div>
      </section>
      <section>
        <h2>Packages</h2>
        <div class="grid-container">
          ${packages.map(generateRow).join('')}
        </div>
      </section>
    </body>
  </html>
`;

const kopierPakke = (subPackagePath) => {
    const storybookBuildPath = join(subPackagePath, BUILD_FOLDER);

    if (!existsSync(storybookBuildPath)) {
        return null;
    }

    const packageJson = JSON.parse(readFileSync(join(subPackagePath, PACKAGE_JSON), 'utf8'));
    cpSync(storybookBuildPath, join(DEPLOY_FOLDER, packageJson.name), { recursive: true });

    return packageJson;
};

const finnOgKopierPakker = (baseDir) => {
    return globSync(`${baseDir}/**/${PACKAGE_JSON}`, {
        exclude: [`**/{node_modules,dist,.turbo,${BUILD_FOLDER}}/**`],
    })
        .map(dirname)
        .map(kopierPakke)
        .filter(Boolean);
};

const startTime = performance.now();

console.log('Kopierer storybook-bygg fra pakkene...');
const apps = finnOgKopierPakker('apps');
const packages = finnOgKopierPakker('packages');

console.log(apps.length, packages.length);
console.log('Genererer index.html...');
writeFileSync(join(DEPLOY_FOLDER, 'index.html'), generateHTML(apps, packages));

console.log('Kopierer CSS...');
cpSync(join(scriptDir, CSS_FILE), join(DEPLOY_FOLDER, CSS_FILE));

const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
console.log(`\nFerdig med å kopiere filer (${elapsed}s)`);
