import React from 'react';
import '../src/app/styles/app.less';

window.appSettings = {
    REST_API_URL: '',
    UTTAK_API_URL: 'uttak-url',
};

export const decorators = [
    (Story) => (
        <div id="app" style={{ padding: '40px' }}>
            <Story />
        </div>
    ),
];
