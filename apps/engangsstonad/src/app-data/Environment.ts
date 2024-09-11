const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        APP_VERSION: appSettings.APP_VERSION,
        INNSYN: appSettings.INNSYN,
    };
};

export default Environment();
