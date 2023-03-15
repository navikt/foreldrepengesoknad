const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        UTTAK_API_URL: window.appSettings.UTTAK_API_URL,
        KLAGE_URL: window.appSettings.KLAGE_URL,
    };
};

export default Environment();
