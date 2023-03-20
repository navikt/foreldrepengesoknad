const Environment = () => {
    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Fiks
        REST_API_URL: window.appSettings.REST_API_URL,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Fiks
        LOGIN_URL: window.appSettings.LOGIN_URL,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Fiks
        LOG_VALIDATION: window.appSettings.LOG_VALIDATION,
    };
};

export default Environment();
