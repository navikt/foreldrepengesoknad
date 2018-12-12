const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                UTTAK_API_URL: '${process.env.FP_UTTAK_SERVICE_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                FEATURE_ENDRINGSSOKNAD: '${process.env.FEATURE_ENDRINGSSOKNAD}',
                FEATURE_NYNORSK: '${process.env.FEATURE_NYNORSK}',
                FEATURE_HENT_BARN: '${process.env.FEATURE_HENT_BARN}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;
