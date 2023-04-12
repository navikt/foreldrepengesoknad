/* eslint-disable */
const getEnvVars = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = settingsNode ? JSON.parse(settingsNode.text) : undefined;

    return {
        REST_API_URL: appSettings?.FORELDREPENGESOKNAD_API_URL || '',
        LOGIN_URL: appSettings?.LOGINSERVICE_URL,
        UTTAK_API_URL: appSettings?.FP_UTTAK_SERVICE_URL || '',
        KLAGE_URL: appSettings?.KLAGE_URL,
    };
};

export default getEnvVars();
