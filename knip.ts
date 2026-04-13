import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: [
        '**/fpoversiktDtoGenerert.ts',
        '**/fpsoknadDtoGenerert.ts',
        'packages/constants/src/attachmentType.ts',
        'packages/constants/src/skjemanummer.ts',
    ],
    ignoreDependencies: [
        'lint-staged'
    ]
};

export default config;
