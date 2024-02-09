import {
    AnnenForelder as AnnenForelderType,
    BarnType,
    Dekningsgrad,
    EksisterendeSak,
    Periode,
    Periodetype,
    StønadskontoType,
} from '@navikt/fp-common';
import { Person, SøkersituasjonFp } from '@navikt/fp-types';
import { StoryFn } from '@storybook/react';
import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import Søker from 'app/context/types/Søker';
import dayjs from 'dayjs';
import withRouter from 'storybook/decorators/withRouter';
import InfoOmSøknaden from './InfoOmSøknaden';

const person = {
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
} as Person;

export default {
    title: 'components/InfoOmSøknaden',
    component: InfoOmSøknaden,
    decorators: [withRouter],
};

interface Props {
    erIUttaksplanenSteg: boolean;
    ekisterendeSak?: EksisterendeSak;
    annenForelder: AnnenForelderType;
    søker: Søker;
    søkersituasjon: SøkersituasjonFp;
}

const Template: StoryFn<Props> = ({
    annenForelder,
    søker,
    søkersituasjon,
    erIUttaksplanenSteg = true,
    ekisterendeSak,
}) => {
    return (
        <FpDataContext
            initialState={{
                [ContextDataType.OM_BARNET]: {
                    type: BarnType.FØDT,
                    fødselsdatoer: [new Date('2021-03-15')],
                    antallBarn: 1,
                    datoForAleneomsorg: undefined,
                    dokumentasjonAvAleneomsorg: [],
                },
                [ContextDataType.ANNEN_FORELDER]: annenForelder,
                [ContextDataType.SØKER]: søker,
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
                person={person}
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
    søker: {} as Søker,
};

export const AnnenForelder = Template.bind({});
AnnenForelder.args = {
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
};

export const InfoOmMorsSak = Template.bind({});
InfoOmMorsSak.args = {
    søker: {
        erAleneOmOmsorg: false,
        harHattAnnenInntektSiste10Mnd: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
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
