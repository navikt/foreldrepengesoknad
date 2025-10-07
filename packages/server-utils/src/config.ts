import logger from './logger.js';

const envVar = (name: string) => {
    if (!process.env[name]) {
        const errorMessage = `Missing required environment variable '${name}'`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
    return process.env[name];
};

const proxy = {
    FPOVERSIKT_API_URL: envVar('FPOVERSIKT_API_URL'),
    FPOVERSIKT_API_SCOPE: envVar('FPOVERSIKT_API_SCOPE'),
    API_URL: envVar('FORELDREPENGER_API_URL'),
    API_SCOPE: envVar('FORELDREPENGER_API_SCOPE'),
} as const;

const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    innsyn: process.env.INNSYN,
    test1Juli2024Regler: process.env.FEATURE_TEST_1JULI2024_REGLER,
    logValidation: process.env.LOG_VALIDATION,
    publicPath: process.env.PUBLIC_PATH ?? '',
};

// eslint-disable-next-line import/no-default-export
export default { proxy, app };
