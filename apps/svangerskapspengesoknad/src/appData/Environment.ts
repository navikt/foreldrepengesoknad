const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
        INNSYN: appSettings.INNSYN,
    };
};

export default Environment();
