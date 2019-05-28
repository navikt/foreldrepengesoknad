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
                FEATURE_HENT_EKSISTERENDE_SAK:  '${process.env.FEATURE_HENT_EKSISTERENDE_SAK}',
                FEATURE_VIS_AVSLATT_PERIODE:  '${process.env.FEATURE_VIS_AVSLATT_PERIODE}',
                FEATURE_MAP_OPPHOLD:  '${process.env.FEATURE_MAP_OPPHOLD}',
                FEATURE_MAP_ANNEN_PART_TIL_INFO:  '${process.env.FEATURE_MAP_ANNEN_PART_TIL_INFO}',
                FEATURE_VIS_INFOSKRIV:  '${process.env.FEATURE_VIS_INFOSKRIV}',
                FEATURE_MAP_FLERE_ARBEIDSFORHOLD: '${process.env.FEATURE_MAP_FLERE_ARBEIDSFORHOLD}'
            };`
        );
    });
}
module.exports = createEnvSettingsFile;
