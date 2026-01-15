/// <reference types="vitest" />
import path from 'node:path';

import { createSharedPackagesConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

// eslint-disable-next-line import/no-default-export
export default createSharedPackagesConfig(setupFileDirName);
