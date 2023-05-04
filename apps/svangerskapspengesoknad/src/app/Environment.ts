const Environment = () => {
    return {
        REST_API_URL: (window as any).appSettings.REST_API_URL,
        LOGIN_URL: (window as any).appSettings.LOGIN_URL,
        LOG_VALIDATION: (window as any).appSettings.LOG_VALIDATION,
    };
};

export default Environment();
