/**
 * Image navnet er på følgende format:
 * europe-north1-docker.pkg.dev/nais-management-233d/teamforeldrepenger/navikt/foreldrepengesoknad/svangerskapspengesoknad:2025.11.04.144040-5887ba6
 * Sentry støtter ikke "/". Stripper derfor alt frem til siste /
 */
const formatAppVersion = (appVersion: string) => {
    const lastSlashIndex = appVersion.lastIndexOf('/');
    return lastSlashIndex !== -1 ? appVersion.substring(lastSlashIndex + 1) : appVersion;
};

const initEnvironment = () => {
    const settingsNode = document.getElementById('nav:appSettings');

    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse((settingsNode as HTMLScriptElement).text) as Record<string, string>;

    return {
        APP_VERSION: formatAppVersion(appSettings.APP_VERSION!),
        INNSYN: appSettings.INNSYN,
        FEATURE_TEST_1JULI2024_REGLER: appSettings.FEATURE_TEST_1JULI2024_REGLER,
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
    };
};

export const Environment = initEnvironment();
