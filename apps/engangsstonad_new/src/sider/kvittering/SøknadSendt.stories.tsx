import { StoryFn } from '@storybook/react';
import SøknadSendt from './SøknadSendt';
import IntlProvider from 'intl/IntlProvider';

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
const kvittering = {
    journalId: '1',
    leveranseStatus: '',
    mottattDato: '2023-01-01',
    referanseId: '1',
    saksNr: '124',
    pdf: 'test',
};

export default {
    title: 'SøknadSendt',
    component: SøknadSendt,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <SøknadSendt person={person} kvittering={kvittering} />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
