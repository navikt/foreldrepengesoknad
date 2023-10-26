import '../src/app/styles/app.css';
import '@navikt/ds-css';
const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    FORELDREPENGESOKNAD_API_URL: 'test',
    REST_API_URL: 'rest-api',
    LOGIN_URL: '',
    INNSYN: 'test',
});
document.head.appendChild(scriptTag);

export const decorators = [
    (Story) => (
        <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
            <Story />
        </div>
    ),
];
