/* eslint-disable */
const getEnvVars = () => {
    // if (import.meta.env.DEV) {
    //     return {
    //         REST_API_URL: import.meta.env.VITE_FORELDREPENGESOKNAD_API_URL,
    //         LOGIN_URL: import.meta.env.VITE_LOGINSERVICE_URL,
    //         UTTAK_API_URL: import.meta.env.VITE_FP_UTTAK_SERVICE_URL,
    //         KLAGE_URL: import.meta.env.VITE_KLAGE_URL,
    //     };
    // } else {
    debugger;
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        REST_API_URL: appSettings.FORELDREPENGESOKNAD_API_URL,
        LOGIN_URL: appSettings.LOGINSERVICE_URL,
        UTTAK_API_URL: appSettings.FP_UTTAK_SERVICE_URL,
        KLAGE_URL: appSettings.KLAGE_URL,
    };
    // }
};

export default getEnvVars();
