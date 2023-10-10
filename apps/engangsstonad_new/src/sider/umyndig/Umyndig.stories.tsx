import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import Umyndig from './Umyndig';
import { Kjønn } from 'types/Person';
import { initAmplitude } from 'fpcommon/amplitude/amplitude';

export default {
    title: 'Umyndig',
    component: Umyndig,
};

const Template: StoryFn<any> = () => {
    initAmplitude();
    return (
        <IntlProvider språkkode="nb">
            <Umyndig
                person={{
                    fnr: '11111111111',
                    fornavn: 'Henrikke',
                    etternavn: 'Ibsen',
                    mellomnavn: '',
                    kjønn: Kjønn.KVINNE,
                    fødselsdato: '1979-01-28',
                    bankkonto: {
                        kontonummer: '49875234987',
                        banknavn: 'Storebank',
                    },
                    adresse: '123 Oslo',
                }}
            />
        </IntlProvider>
    );
};

export const Default = Template.bind({});
