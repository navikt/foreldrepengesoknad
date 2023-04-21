import '../src/app/styles/app.less';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    FORELDREPENGESOKNAD_API_URL: 'test',
    FP_UTTAK_SERVICE_URL: 'uttak-url',
    LOGINSERVICE_URL: 'test',
    APP_VERSION: 'test',
    FAMILIE: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
    FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
    FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'off',
});
document.head.appendChild(scriptTag);

export const decorators = [
    (Story) => (
        <div id="app" style={{ padding: '40px' }}>
            <Story />
        </div>
    ),
];
