const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                FEATURE_REGISTRERT_BARN: '${process.env.FEATURE_REGISTRERT_BARN}',
                FEATURE_LOGGING:  '${process.env.FEATURE_LOGGING}',
            };`
        );
    });
}
module.exports = createEnvSettingsFile;
