import React from 'react';
import { Story } from '@storybook/react';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import AnnenForelder from 'app/steps/annen-forelder/AnnenForelder';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';

export default {
    title: 'steps/AnnenForelder',
    component: AnnenForelder,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    return (
        <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <AnnenForelder />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const SkalOppgiPersonalia = Template.bind({});
SkalOppgiPersonalia.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const ForFar = Template.bind({});
ForFar.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        søker: {
            ...søkerinfo.søker,
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE',
            kjønn: 'M',
            barn: [
                {
                    fnr: '21091981146',
                    fødselsdato: '2021-03-15',
                    annenForelder: {
                        fnr: '12038517080',
                        fødselsdato: '1985-03-12',
                        fornavn: 'TALENTFULL',
                        etternavn: 'MYGG',
                    },
                    fornavn: 'KLØKTIG',
                    etternavn: 'MIDTPUNKT',
                    kjønn: 'K',
                },
            ],
        },
    } as SøkerinfoDTO,
};
