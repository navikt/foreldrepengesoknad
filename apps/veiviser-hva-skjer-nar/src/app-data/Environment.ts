const getEnvVars = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        PUBLIC_PATH: appSettings.PUBLIC_PATH,
    };
};

export default getEnvVars();
