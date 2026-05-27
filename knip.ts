import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: [
        '**/fpoversiktDtoGenerert.ts',
        '**/fpsoknadDtoGenerert.ts'
    ],
    ignoreIssues: {
        'packages/constants/src/attachmentType.ts': ['enumMembers'],
        'packages/constants/src/skjemanummer.ts': ['enumMembers'],
    },
    ignoreDependencies: [
        'lint-staged'
    ]
};

export default config;
