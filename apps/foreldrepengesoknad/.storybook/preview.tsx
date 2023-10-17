import '../src/app/styles/app.less';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'test',
    LOGIN_URL: 'test',
    APP_VERSION: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
});
document.head.appendChild(scriptTag);

export const decorators = [
    (Story) => (
        <div id="app" style={{ padding: '40px' }}>
            <Story />
        </div>
    ),
];
