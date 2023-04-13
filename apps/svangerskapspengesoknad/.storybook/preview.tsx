import React from 'react';

//TODO Dette bør ikkje ligga her
window.appSettings = {
    REST_API_URL: '',
    UTTAK_API_URL: 'uttak-url',
};

export const decorators = [
    (Story) => (
        <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
            <Story />
        </div>
    ),
];