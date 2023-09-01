import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Oppsummering from './Oppsummering';
import IntlProvider from '../../../intl/IntlProvider';

import '@navikt/ds-css';
import 'fpcommon/styles/globals.less';

const person = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: 'K',
    fødselsdato: '1979-01-28',
    bankkonto: {
        kontonummer: '49875234987',
        banknavn: 'Storebank',
    },
};

const barnet = {
    erBarnetFødt: true,
    antallBarn: 1,
    fødselsdatoer: ['2023-01-01'],
};

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: false,
    utenlandsoppholdSiste12Mnd: [],
    utenlandsoppholdNeste12Mnd: [],
};

export default {
    title: 'Oppsummering',
    component: Oppsummering,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <Oppsummering
                person={person}
                omBarnet={barnet}
                utenlandsopphold={utenlandsopphold}
                avbrytSøknad={action('button-click')}
            />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
