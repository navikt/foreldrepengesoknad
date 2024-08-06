const Environment = () => {
    const settingsNode = document.getElementById('nav:appSettings');

    if (!settingsNode) {
        return {};
    }

    const appSettings = JSON.parse(settingsNode.text);

    return {
        LOG_VALIDATION: appSettings.LOG_VALIDATION,
        INNSYN: appSettings.INNSYN,
    };
};

export default Environment();
