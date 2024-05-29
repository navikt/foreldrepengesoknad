import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import {
    StønadskontoType,
    SøkersituasjonFp,
    TilgjengeligeStønadskontoer,
    TilgjengeligeStønadskontoerForDekningsgrad,
} from '@navikt/fp-types';

import Environment from 'app/Environment';
import { FpApiDataContext } from 'app/api/context/FpApiDataContext';
import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';

import PeriodeMedForeldrepengerSteg from './PeriodeMedForeldrepengerSteg';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `${Environment.REST_API_URL}/konto`;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const STØNADSKONTO_100 = {
    kontoer: [
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 80,
        },
        {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
} as TilgjengeligeStønadskontoerForDekningsgrad;

const STØNADSKONTO_80 = {
    kontoer: [
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 95,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 95,
        },
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 90,
        },
        {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
} as TilgjengeligeStønadskontoerForDekningsgrad;

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
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    stønadskonto: TilgjengeligeStønadskontoer;
    erAleneOmOmsorg?: boolean;
    annenPartVedtak?: AnnenPartVedtakDTO;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
    søkersituasjon,
    annenForelder,
    barnet,
    stønadskonto,
    annenPartVedtak,
}) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
        apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                            [ContextDataType.OM_BARNET]: barnet,
                            [ContextDataType.SØKER_DATA]: {
                                harJobbetSomFrilansSiste10Mnd: false,
                                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                                harHattAnnenInntektSiste10Mnd: false,
                            },
                            [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        }}
                    >
                        <PeriodeMedForeldrepengerSteg
                            arbeidsforhold={[]}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                        />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>
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
        fødselsdatoer: ['2022-03-01'],
        antallBarn: 1,
        termindato: '2022-03-24',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};

export const FarEllerMedmorFødselBeggeHarRett = Template.bind({});
FarEllerMedmorFødselBeggeHarRett.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: '2022-03-24',
    },
    annenForelder: {
        etternavn: 'Pettersen',
        fornavn: 'Helga',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: true,
        erInformertOmSøknaden: true,
        erAleneOmOmsorg: false,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};

export const FarEllerMedmorFødselOgMorHarIkkeRett = Template.bind({});
FarEllerMedmorFødselOgMorHarIkkeRett.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-03-01'],
        antallBarn: 1,
        termindato: '2022-03-24',
    },
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dfg',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        erInformertOmSøknaden: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 200,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 250,
                },
            ],
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
        adopsjonsdato: '2021-03-15',
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        adopsjonsdato: '2021-03-15',
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        adopsjonsdato: '2021-03-15',
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        fornavn: 'Helga',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        adopsjonsdato: '2021-03-15',
        adoptertIUtlandet: false,
        fødselsdatoer: [],
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2022-06-14'],
        termindato: '2022-08-14',
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
        erAleneOmOmsorg: false,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 1,
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 280,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2021-01-11'],
        termindato: '2021-03-11',
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
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
        fødselsdatoer: ['2021-01-11'],
        termindato: '2021-03-11',
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 273,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 323,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};

export const MorFødselMedTvillingFlerbarnsuker = Template.bind({});
MorFødselMedTvillingFlerbarnsuker.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 2,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Mødrekvote,
                    dager: 75,
                },
                {
                    konto: StønadskontoType.Fedrekvote,
                    dager: 75,
                },
                {
                    konto: StønadskontoType.Fellesperiode,
                    dager: 165,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Mødrekvote,
                    dager: 95,
                },
                {
                    konto: StønadskontoType.Fedrekvote,
                    dager: 95,
                },
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 195,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 3,
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },

    stønadskonto: {
        '100': {
            ...STØNADSKONTO_100,
            kontoer: [
                {
                    konto: StønadskontoType.Mødrekvote,
                    dager: 75,
                },
                {
                    konto: StønadskontoType.Fedrekvote,
                    dager: 75,
                },
                {
                    konto: StønadskontoType.Fellesperiode,
                    dager: 165,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
        },
        '80': {
            ...STØNADSKONTO_80,
            kontoer: [
                {
                    konto: StønadskontoType.Mødrekvote,
                    dager: 95,
                },
                {
                    konto: StønadskontoType.Fedrekvote,
                    dager: 95,
                },
                {
                    konto: StønadskontoType.Fellesperiode,
                    dager: 195,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
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
        fødselsdatoer: ['2021-03-15'],
        antallBarn: 2,
    },
    annenForelder: {
        fornavn: 'Helga',
        etternavn: 'Utvikler',
        fnr: '12117212090',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    annenPartVedtak: {
        perioder: [uttaksperiode],
        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};

export const FarMedMorMedTermin1Juli2024 = Template.bind({});
FarMedMorMedTermin1Juli2024.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barnet: {
        type: BarnType.UFØDT,
        termindato: '2024-07-01',
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Helga',
        etternavn: 'Utvikler',
        fnr: '12117212090',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};

export const MorMedTermin1Juli2024OgFarsSøknad = Template.bind({});
MorMedTermin1Juli2024OgFarsSøknad.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barnet: {
        type: BarnType.UFØDT,
        termindato: '2024-07-01',
        antallBarn: 1,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '12117212090',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
    },
    annenPartVedtak: {
        perioder: [uttaksperiode],
        dekningsgrad: DekningsgradDTO.ÅTTI_PROSENT,
    },
    stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
};
