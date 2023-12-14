import { StoryFn } from '@storybook/react';
import dayjs from 'dayjs';
import {
    AnnenForelder as AnnenForelderType,
    BarnType,
    Dekningsgrad,
    EksisterendeSak,
    Periode,
    Periodetype,
    StønadskontoType,
} from '@navikt/fp-common';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import Søker from 'app/context/types/Søker';
import InfoOmSøknaden from './InfoOmSøknaden';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { SøkersituasjonFp } from '@navikt/fp-types';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';

const søkerinfo = {
    søker: {
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
    },
} as SøkerinfoDTO;

export default {
    title: 'components/InfoOmSøknaden',
    component: InfoOmSøknaden,
    decorators: [withRouter],
};

interface Props {
    søkerinfo: SøkerinfoDTO;
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
    søkerinfo,
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
                },
                [ContextDataType.ANNEN_FORELDER]: annenForelder,
                [ContextDataType.SØKER]: søker,
                [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                [ContextDataType.UTTAKSPLAN_METADATA]: { dekningsgrad: Dekningsgrad.HUNDRE_PROSENT },
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
                person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person}
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
    søkerinfo,
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
    søkerinfo,
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
    søkerinfo,
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
