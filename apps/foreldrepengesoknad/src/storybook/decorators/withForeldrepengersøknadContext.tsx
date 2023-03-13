import React from 'react';
import ForeldrepengesøknadContextProvider from '../../app/context/ForeldrepengesøknadContext';

const withForeldrepengersøknadContextProvider = (Story: any) => (
    <ForeldrepengesøknadContextProvider>
        <Story />
    </ForeldrepengesøknadContextProvider>
);

export default withForeldrepengersøknadContextProvider;
