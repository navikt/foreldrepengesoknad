import React from 'react';
import { Story } from '@storybook/react';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import withIntlProvider from '../../decorators/withIntl';
import withRouter from '../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
import Søker from 'app/context/types/Søker';
import InformasjonOmUtenlandsopphold from 'app/context/types/InformasjonOmUtenlandsopphold';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

const context = {
    søknad: {
        type: 'foreldrepenger',
        harGodkjentVilkår: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            type: 'født',
            fødselsdatoer: ['2021-03-15'],
            antallBarn: '1',
            datoForAleneomsorg: '',
            dokumentasjonAvAleneomsorg: [],
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        søker: {} as Søker,
        informasjonOmUtenlandsopphold: {} as InformasjonOmUtenlandsopphold,
        erEndringssøknad: false,
        dekningsgrad: '100',
        uttaksplan: {},
    },
    version: 2,
    currentRoute: '/soknad/uttaksplan-info',
    søkerinfo: {} as Søkerinfo,
    saker: [],
} as ForeldrepengesøknadContextState;
const søkerinfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        ikkeNordiskEøsLand: false,
        barn: [
            {
                fnr: '21091981146',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
} as SøkerinfoDTO;

export default {
    title: 'components/InfoOmSøknaden',
    component: InfoOmSøknaden,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    return (
        <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <InfoOmSøknaden
                tilgjengeligeStønadskontoer={[
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 50,
                    },
                ]}
                eksisterendeSak={undefined}
                erIUttaksplanenSteg
            />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const AnnenForelder = Template.bind({});
AnnenForelder.args = {
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
