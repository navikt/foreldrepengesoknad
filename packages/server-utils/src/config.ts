const proxy = {
    apiScope: process.env.FORELDREPENGER_API_SCOPE,
    apiUrl: process.env.FORELDREPENGER_API_URL,
};

const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    innsyn: process.env.INNSYN,
    test1Juli2024Regler: process.env.FEATURE_TEST_1JULI2024_REGLER,
    logValidation: process.env.LOG_VALIDATION,
    publicPath: process.env.PUBLIC_PATH || '',
};

export default { proxy, app };
