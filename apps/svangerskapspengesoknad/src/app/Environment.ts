const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        REST_API_URL: appSettings.REST_API_URL,
        LOGIN_URL: appSettings.LOGIN_URL,
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
    };
};

export default Environment();
