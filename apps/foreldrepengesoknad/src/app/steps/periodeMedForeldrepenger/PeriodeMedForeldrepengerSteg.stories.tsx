import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PeriodeMedForeldrepengerSteg from './PeriodeMedForeldrepengerSteg';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { AnnenForelder, Barn, BarnType, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import dayjs from 'dayjs';
import MockAdapter from 'axios-mock-adapter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { FpApiDataContext } from 'app/api/context/FpApiDataContext';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import Environment from 'app/Environment';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `${Environment.REST_API_URL}/konto`;

const STØNADSKONTO_100 = {
    kontoer: {
        MØDREKVOTE: 75,
        FEDREKVOTE: 75,
        FELLESPERIODE: 80,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};

const STØNADSKONTO_80 = {
    kontoer: {
        MØDREKVOTE: 95,
        FEDREKVOTE: 95,
        FELLESPERIODE: 90,
        FORELDREPENGER_FØR_FØDSEL: 15,
    },
    minsteretter: {
        farRundtFødsel: 0,
        generellMinsterett: 0,
        toTette: 0,
    },
};

const uttaksperiode = {
    fom: '2022-12-07',
    tom: '2022-12-07',
    kontoType: 'MØDREKVOTE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
    morsAktivitet: 'ARBEID',
    gradering: {
        arbeidstidprosent: 55,
        aktivitet: {
            type: 'FRILANS',
            arbeidsgiver: {
                id: 'string',
                type: 'PRIVAT',
            },
        },
    },
    samtidigUttak: 50,
    flerbarnsdager: true,
} as SaksperiodeDTO;

export default {
    title: 'steps/PeriodeMedForeldrepengerSteg',
    component: PeriodeMedForeldrepengerSteg,
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => void;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    stønadskonto100: TilgjengeligeStønadskontoerDTO;
    stønadskonto80: TilgjengeligeStønadskontoerDTO;
    erAleneOmOmsorg?: boolean;
    annenPartVedtak?: AnnenPartVedtakDTO;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = action('button-click'),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
    søkersituasjon,
    annenForelder,
    barnet,
    stønadskonto100,
    stønadskonto80,
    erAleneOmOmsorg = false,
    annenPartVedtak,
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskonto100);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barnet,
                        [ContextDataType.SØKER]: {
                            erAleneOmOmsorg,
                            språkkode: 'nb',
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                    }}
                >
                    <PeriodeMedForeldrepengerSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>
    );
};

export const FarEllerMedmorAleneomsorgFødsel = Template.bind({});
FarEllerMedmorAleneomsorgFødsel.args = {
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2022-03-24').toDate(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
};

export const FarEllerMedmorFødselBeggeHarRett = Template.bind({});
FarEllerMedmorFødselBeggeHarRett.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2022-03-24').toDate(),
    },
    annenForelder: {
        etternavn: 'Pettersen',
        fornavn: 'Helga',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: true,
        erInformertOmSøknaden: true,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
};

export const FarEllerMedmorFødselOgMorHarIkkeRett = Template.bind({});
FarEllerMedmorFødselOgMorHarIkkeRett.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2022-03-24').toDate(),
    },
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dfg',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        erInformertOmSøknaden: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 200,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 250,
        },
    },
};

export const MorSøkerAdopsjonMedAleneomsorg = Template.bind({});
MorSøkerAdopsjonMedAleneomsorg.args = {
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorSøkerAdopsjonMedDeltUttak = Template.bind({});
MorSøkerAdopsjonMedDeltUttak.args = {
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const FarSøkerAdopsjonMedDeltUttak = Template.bind({});
FarSøkerAdopsjonMedDeltUttak.args = {
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Helga',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorSøkerAdopsjonDerFarHarRettIEOS = Template.bind({});
MorSøkerAdopsjonDerFarHarRettIEOS.args = {
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        antallBarn: 1,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorSøkerFodselDerFarHarRettIEOS = Template.bind({});
MorSøkerFodselDerFarHarRettIEOS.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-06-14').toDate()],
        termindato: dayjs('2022-08-14').toDate(),
        antallBarn: 1,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
        type: BarnType.FØDT,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorAleneomsorgFødsel = Template.bind({});
MorAleneomsorgFødsel.args = {
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 230,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 280,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorFødselDeltUttakPrematurFødsel = Template.bind({});
MorFødselDeltUttakPrematurFødsel.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2021-01-11').toDate()],
        termindato: dayjs('2021-03-11').toDate(),
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
};

export const MorAleneomsorgPrematurFødsel = Template.bind({});
MorAleneomsorgPrematurFødsel.args = {
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2021-01-11').toDate()],
        termindato: dayjs('2021-03-11').toDate(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            FORELDREPENGER: 273,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            FORELDREPENGER: 323,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
    },
};

export const MorFødselDeltUttak = Template.bind({});
MorFødselDeltUttak.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
};

export const MorFødselMedTvillingFlerbarnsuker = Template.bind({});
MorFødselMedTvillingFlerbarnsuker.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 2,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
            FLERBARNSDAGER: 85,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 195,
            FORELDREPENGER_FØR_FØDSEL: 15,
            FLERBARNSDAGER: 105,
        },
    },
};

export const MorFødselAleneomsorgMedTrillingFlerbarnsuker = Template.bind({});
MorFødselAleneomsorgMedTrillingFlerbarnsuker.args = {
    erAleneOmOmsorg: true,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 3,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto100: {
        ...STØNADSKONTO_100,
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
            FLERBARNSDAGER: 85,
        },
    },
    stønadskonto80: {
        ...STØNADSKONTO_80,
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 195,
            FORELDREPENGER_FØR_FØDSEL: 15,
            FLERBARNSDAGER: 105,
        },
    },
};

export const FarEllerMedmorSøkerOgMorHarLagetUttaksplan = Template.bind({});
FarEllerMedmorSøkerOgMorHarLagetUttaksplan.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 2,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder: {
        fornavn: 'Helga',
        etternavn: 'Utvikler',
        fnr: '12117212090',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    annenPartVedtak: {
        perioder: [uttaksperiode],
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
    },
    stønadskonto100: STØNADSKONTO_100,
    stønadskonto80: STØNADSKONTO_80,
};
