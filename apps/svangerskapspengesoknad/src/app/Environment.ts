const Environment = () => {
    return {
        // @ts-ignore Fiks
        REST_API_URL: window.appSettings.REST_API_URL,
        // @ts-ignore Fiks
        LOGIN_URL: window.appSettings.LOGIN_URL,
        // @ts-ignore Fiks
        LOG_VALIDATION: window.appSettings.LOG_VALIDATION,
    };
};

export default Environment();
