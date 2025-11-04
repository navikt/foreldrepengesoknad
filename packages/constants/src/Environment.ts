const initEnvironment = () => {
    const settingsNode = document.getElementById('nav:appSettings');

    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse((settingsNode as HTMLScriptElement).text);

    return {
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
        FEATURE_TEST_1JULI2024_REGLER: appSettings.FEATURE_TEST_1JULI2024_REGLER,
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
    };
};

export const Environment = initEnvironment();
