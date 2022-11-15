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
import dayjs from 'dayjs';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { EksisterendeSak } from 'app/types/EksisterendeSak';

const context = {
    søknad: {
        saksnummer: undefined,
        type: 'foreldrepenger',
        harGodkjentVilkår: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            type: 'født',
            fødselsdatoer: [new Date('2021-03-15')],
            antallBarn: 1,
            datoForAleneomsorg: undefined,
            dokumentasjonAvAleneomsorg: [],
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        søker: {} as Søker,
        informasjonOmUtenlandsopphold: {} as InformasjonOmUtenlandsopphold,
        erEndringssøknad: false,
        dekningsgrad: '100',
        uttaksplan: [],
        harGodkjentOppsummering: false,
        vedlegg: [],
        tilleggsopplysninger: undefined!,
        ønskerJustertUttakVedFødsel: undefined,
    },
    version: 4,
    currentRoute: '/soknad/uttaksplan-info',
    søkerinfo: {} as Søkerinfo,
    saker: [],
    kvittering: undefined!,
    antallUkerIUttaksplan: undefined!,
    endringstidspunkt: undefined!,
    perioderSomSkalSendesInn: [],
    harUttaksplanBlittSlettet: false,
    brukerSvarteJaPåAutoJustering: undefined,
    søknadGjelderEtNyttBarn: undefined!,
    familieHendelseDatoNesteSak: undefined!,
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
    erIUttaksplanenSteg: boolean;
    ekisterendeSak?: EksisterendeSak;
}

const Template: Story<Props> = ({ context, søkerinfo, erIUttaksplanenSteg = true, ekisterendeSak }) => {
    return (
        <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <InfoOmSøknaden
                tilgjengeligeStønadskontoer={[
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 50,
                    },
                ]}
                eksisterendeSak={ekisterendeSak}
                erIUttaksplanenSteg={erIUttaksplanenSteg}
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
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const InfoOmMorsSak = Template.bind({});
InfoOmMorsSak.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                erAleneOmOmsorg: false,
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            annenForelder: {
                fornavn: 'Olga',
                etternavn: 'Utvikler',
                fnr: '1212121313',
                harRettPåForeldrepengerINorge: true,
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
    ekisterendeSak: {
        erAnnenPartsSak: true,
        uttaksplan: [
            {
                type: Periodetype.Uttak,
                gradert: true,
                stillingsprosent: '100',
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '50',
                tidsperiode: {
                    fom: dayjs('2021-01-01').toDate(),
                    tom: dayjs('2021-01-10').toDate(),
                },
            } as Periode,
        ],
    } as EksisterendeSak,
    erIUttaksplanenSteg: false,
};
