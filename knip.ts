import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: [
        '**/fpoversiktDtoGenerert.ts',
        '**/fpsoknadDtoGenerert.ts',

        // Disse kan fikses med å gå over til string enums
        'packages/constants/src/arbeidsform.ts',
        'packages/constants/src/attachmentType.ts',
        'packages/constants/src/opprinneligSøkt.ts',
        'packages/constants/src/periodeHullÅrsak.ts',
        'packages/constants/src/skjemanummer.ts',

        // Kan fjernes når gamle uttaksplanen er fjernet
        'apps/foreldrepengesoknad/src/steps/uttaksplan/**/*.ts*',
        'apps/foreldrepengesoknad/src/api/queries.ts',
        'apps/foreldrepengesoknad/src/app-data/FpDataContext.tsx',
        'apps/foreldrepengesoknad/src/utils/eksisterendeSakUtils.ts',
        'apps/foreldrepengesoknad/src/utils/stønadskontoerUtils.ts',
        'apps/foreldrepengesoknad/src/utils/submitUtils.ts',
        'apps/foreldrepengesoknad/src/utils/fordelingUtils.ts'
    ],
    ignoreDependencies: [
        'lint-staged',
        'formik' // avhengighet kan fjernes når gamle uttaksplanen er slettet
    ]
};

export default config;
