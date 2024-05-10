/* eslint-disable */
const getEnvVars = () => {
    const settingsNode = document.getElementById('nav:appSettings') as HTMLScriptElement;
    const appSettings = JSON.parse(settingsNode.text);

    return {
        REST_API_URL: appSettings.REST_API_URL,
        LOGIN_URL: appSettings.LOGIN_URL,
        PUBLIC_PATH: appSettings.PUBLIC_PATH,
    };
};

export default getEnvVars();
