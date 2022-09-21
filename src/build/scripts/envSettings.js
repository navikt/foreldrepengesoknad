const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFilePath) {
    fsExtra.ensureFile(settingsFilePath).then(() => {
        fsExtra.writeFileSync(
            settingsFilePath,
            `window.appSettings = {
                APP_VERSION: '${process.env.APP_VERSION}',
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                FAMILIE: '${process.env.FAMILIE}',
                FEATURE_VIS_PERIODER_SOM_SENDES_INN:  '${process.env.FEATURE_VIS_PERIODER_SOM_SENDES_INN}',
                FEATURE_VIS_FEILSIDE:  '${process.env.FEATURE_VIS_FEILSIDE}',
                FEATURE_VIS_ALERTSTRIPE:  '${process.env.FEATURE_VIS_ALERTSTRIPE}',
                FEATURE_BRUK_SAKER_V2:  '${process.env.FEATURE_BRUK_SAKER_V2}',
                       };`
        );
    });
}
module.exports = createEnvSettingsFile;
