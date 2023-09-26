import { StoryFn } from '@storybook/react';
import SøknadSendt from './SøknadSendt';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import { Kjønn } from 'types/Person';

const person = {
    fnr: '11111111111',
    fornavn: 'Henrikke',
    etternavn: 'Ibsen',
    kjønn: Kjønn.KVINNE,
    fødselsdato: '1979-01-28',
    adresse: 'Gatenavn 1',
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
    decorators: [withRouterProvider],
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <SøknadSendt person={person} kvittering={kvittering} />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
