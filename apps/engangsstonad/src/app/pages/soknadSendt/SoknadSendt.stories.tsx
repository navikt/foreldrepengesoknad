import React from 'react';
import { StoryFn } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import EngangsstønadContextProvider from '../../context/EngangsstønadContext';
import SøknadSendt from './SøknadSendt';
import IntlProvider from 'intl/IntlProvider';

import '@navikt/ds-css';
import '../../styles/globals.less';

export default {
    title: 'SøknadSendt',
    component: SøknadSendt,
    decorators: [withRouter],
};

const Template: StoryFn<any> = () => {
    return (
        <EngangsstønadContextProvider>
            <IntlProvider språkkode="nb">
                <SøknadSendt
                    person={{
                        fnr: '11111111111',
                        fornavn: 'Henrikke',
                        etternavn: 'Ibsen',
                        mellomnavn: '',
                        kjønn: 'K',
                        fødselsdato: '1979-01-28',
                        bankkonto: {
                            kontonummer: '49875234987',
                            banknavn: 'Storebank',
                        },
                        adresse: '123 Oslo',
                    }}
                />
            </IntlProvider>
        </EngangsstønadContextProvider>
    );
};

export const VisSide = Template.bind({});
