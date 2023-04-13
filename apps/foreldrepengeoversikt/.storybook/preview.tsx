import React from 'react';
import '@navikt/ds-css';
import '../src/app/styles/app.css';

const scriptTag = document.createElement('script');
scriptTag.type = "text/json";
scriptTag.id = "nav:appSettings";
scriptTag.innerHTML = JSON.stringify({
    FORELDREPENGESOKNAD_API_URL: 'test',
    LOGINSERVICE_URL: 'test',
    FP_UTTAK_SERVICE_URL: 'uttak-url',
    KLAGE_URL: 'klage-url'
});
document.head.appendChild(scriptTag);

export const decorators = [
    (Story) => (
        <div id="app" style={{ padding: '40px' }}>
            <Story />
        </div>
    ),
];
