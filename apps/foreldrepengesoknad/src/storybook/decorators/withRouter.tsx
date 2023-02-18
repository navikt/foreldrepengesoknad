import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const withRouterProvider = (Story: any) => (
    <BrowserRouter>
        <Story />
    </BrowserRouter>
);

export default withRouterProvider;
