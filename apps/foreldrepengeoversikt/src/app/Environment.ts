/* eslint-disable */

let environment;

if (import.meta.env.DEV) {
    environment = {
        REST_API_URL: import.meta.env.VITE_FORELDREPENGESOKNAD_API_URL,
        LOGIN_URL: import.meta.env.VITE_LOGINSERVICE_URL,
        UTTAK_API_URL: import.meta.env.VITE_FP_UTTAK_SERVICE_URL,
        KLAGE_URL: import.meta.env.VITE_KLAGE_URL,
    };
} else {
    environment = {
        REST_API_URL: (window as any).appSettings.FORELDREPENGESOKNAD_API_URL,
        LOGIN_URL: (window as any).appSettings.LOGINSERVICE_URL,
        UTTAK_API_URL: (window as any).appSettings.FP_UTTAK_SERVICE_URL,
        KLAGE_URL: (window as any).appSettings.KLAGE_URL,
    };
}

export default environment;
