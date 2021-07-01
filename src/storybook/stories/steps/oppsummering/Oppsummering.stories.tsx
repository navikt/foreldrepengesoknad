import React from 'react';
import { Story } from '@storybook/react';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Oppsummering from 'app/steps/oppsummering/Oppsummering';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';

export default {
    title: 'steps/Oppsummering',
    component: Oppsummering,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    return (
        <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <Oppsummering />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const MedAnnenForelder = Template.bind({});
MedAnnenForelder.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            annenForelder: {
                fornavn: 'Espen',
                etternavn: 'Utvikler',
                fnr: '1212121313',
                harRettPåForeldrepenger: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedAdoptertBarn = Template.bind({});
MedAdoptertBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                ...context.søknad.søkersituasjon,
                situasjon: 'adopsjon',
            },
            barn: {
                type: 'adoptertStebarn',
                antallBarn: 1,
                adopsjonsdato: '2021-10-01',
                fødselsdatoer: '2021-01-01',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const MedUtenlandsopphold = Template.bind({});
MedUtenlandsopphold.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            informasjonOmUtenlandsopphold: {
                iNorgeNeste12Mnd: false,
                iNorgeSiste12Mnd: false,
                senereOpphold: [
                    {
                        land: 'SE',
                        tidsperiode: {
                            fom: '2021-01-01',
                            tom: '2021-12-31',
                        },
                    },
                ],
                tidligereOpphold: [
                    {
                        land: 'SE',
                        tidsperiode: {
                            fom: '2020-01-01',
                            tom: '2020-12-31',
                        },
                    },
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};
