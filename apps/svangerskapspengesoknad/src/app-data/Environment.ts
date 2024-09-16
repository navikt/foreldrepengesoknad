const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings');

    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse((settingsNode as HTMLScriptElement).text);

    return {
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
        INNSYN: appSettings.INNSYN,
        PUBLIC_PATH: appSettings.PUBLIC_PATH,
    };
};

export default Environment();
