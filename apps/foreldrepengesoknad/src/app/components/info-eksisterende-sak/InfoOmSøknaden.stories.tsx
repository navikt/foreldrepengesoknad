import { StoryFn } from '@storybook/react';
import dayjs from 'dayjs';
import withRouter from 'storybook/decorators/withRouter';

import {
    AnnenForelder as AnnenForelderType,
    BarnType,
    Dekningsgrad,
    EksisterendeSak,
    Periode,
    Periodetype,
    StønadskontoType,
} from '@navikt/fp-common';
import { Søker, SøkersituasjonFp } from '@navikt/fp-types';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøkerData from 'app/context/types/SøkerData';

import InfoOmSøknaden from './InfoOmSøknaden';

const søker = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
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
} as Søker;

export default {
    title: 'components/InfoOmSøknaden',
    component: InfoOmSøknaden,
    decorators: [withRouter],
};

interface Props {
    erIUttaksplanenSteg: boolean;
    ekisterendeSak?: EksisterendeSak;
    annenForelder: AnnenForelderType;
    søkerData: SøkerData;
    søkersituasjon: SøkersituasjonFp;
}

const Template: StoryFn<Props> = ({
    annenForelder,
    søkerData,
    søkersituasjon,
    erIUttaksplanenSteg = true,
    ekisterendeSak,
}) => {
    return (
        <FpDataContext
            initialState={{
                [ContextDataType.OM_BARNET]: {
                    type: BarnType.FØDT,
                    fødselsdatoer: ['2021-03-15'],
                    antallBarn: 1,
                },
                [ContextDataType.ANNEN_FORELDER]: annenForelder,
                [ContextDataType.SØKER_DATA]: søkerData,
                [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                [ContextDataType.PERIODE_MED_FORELDREPENGER]: { dekningsgrad: Dekningsgrad.HUNDRE_PROSENT },
            }}
        >
            <InfoOmSøknaden
                tilgjengeligeStønadskontoer={[
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 50,
                    },
                ]}
                eksisterendeSak={ekisterendeSak}
                erIUttaksplanenSteg={erIUttaksplanenSteg}
                søker={søker}
            />
        </FpDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søkerData: {} as SøkerData,
};

export const AnnenForelder = Template.bind({});
AnnenForelder.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        erAleneOmOmsorg: false,
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
};

export const InfoOmMorsSak = Template.bind({});
InfoOmMorsSak.args = {
    søkerData: {
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    annenForelder: {
        erAleneOmOmsorg: false,
        fornavn: 'Olga',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    ekisterendeSak: {
        erAnnenPartsSak: true,
        grunnlag: {
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
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
