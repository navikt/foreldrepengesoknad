import logger from './logger';

const påkrevMiljøVariabel = (name: string) => {
    if (!process.env[name]) {
        const errorMessage = `Missing required environment variable '${name}'`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
    return process.env[name];
};

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
export default { app, påkrevMiljøVariabel };
