import React from 'react';
import '../src/app/styles/app.css';

export const decorators = [
    (Story) => (
        <div id="app" style={{ padding: '40px' }}>
            <Story />
        </div>
    ),
];
