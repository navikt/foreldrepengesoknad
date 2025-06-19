/// <reference types="vitest" />
import path from 'path';

import { createSharedPackagesConfig } from '@navikt/fp-config-vite';

const setupFileDirName = path.resolve(__dirname, './vitest/setupTests.ts');

export default createSharedPackagesConfig(setupFileDirName);
