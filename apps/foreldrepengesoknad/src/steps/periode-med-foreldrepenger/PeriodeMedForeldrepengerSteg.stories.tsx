import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AnnenForelder, Barn, BarnType, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { SøkersituasjonFp, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import PeriodeMedForeldrepengerSteg from './PeriodeMedForeldrepengerSteg';

const UTTAKSPLAN_ANNEN_URL = 'https://fp/rest/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `https://fp/rest/konto`;

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

const fellesProps = {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

type StoryArgs = {
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof PeriodeMedForeldrepengerSteg>;

const meta = {
    title: 'steps/PeriodeMedForeldrepengerSteg',
    component: PeriodeMedForeldrepengerSteg,
    render: ({ gåTilNesteSide, søkersituasjon, annenForelder, barnet, ...rest }) => {
        initAmplitude();
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                            [ContextDataType.OM_BARNET]: barnet,
                            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                                harHattAndreInntektskilder: false,
                                harJobbetSomFrilans: false,
                                harJobbetSomSelvstendigNæringsdrivende: false,
                            },
                            [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        }}
                    >
                        <PeriodeMedForeldrepengerSteg {...rest} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FarEllerMedmorAleneomsorgFødsel: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': STØNADSKONTO_80,
                        '100': STØNADSKONTO_100,
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const FarEllerMedmorFødselOgMorHarIkkeRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': {
                            ...STØNADSKONTO_80,
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 250,
                                },
                            ],
                        },
                        '100': {
                            ...STØNADSKONTO_100,
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 200,
                                },
                            ],
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...FarEllerMedmorAleneomsorgFødsel.args,
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
    },
};

export const FarEllerMedmorFødselBeggeHarRett: Story = {
    parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
    args: {
        ...FarEllerMedmorAleneomsorgFødsel.args,
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2022-03-24',
        },
        annenForelder: {
            etternavn: 'Pettersen',
            fornavn: 'Helga',
            fnr: '02458945678',
            utenlandskFnr: false,
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: true,
            erInformertOmSøknaden: true,
            erAleneOmOmsorg: false,
        },
    },
};

export const FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024: Story = {
    parameters: FarEllerMedmorFødselBeggeHarRett.parameters,
    args: {
        ...FarEllerMedmorFødselBeggeHarRett.args,
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-06-30',
        },
    },
};

export const MorFødselBeggeHarRettFødselFør1Juli2024: Story = {
    parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-06-30'],
            termindato: '2024-06-30',
        },
        annenForelder: {
            etternavn: 'Pettersen',
            fornavn: 'Hans',
            fnr: '02458945678',
            utenlandskFnr: false,
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: true,
            erInformertOmSøknaden: true,
            erAleneOmOmsorg: false,
        },
    },
};

export const MorBeggeHarRettAdopsjonEtter1Juli2024: Story = {
    parameters: MorFødselBeggeHarRettFødselFør1Juli2024.parameters,
    args: {
        ...MorFødselBeggeHarRettFødselFør1Juli2024.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
            fødselsdatoer: ['2024-07-01'],
        },
    },
};

export const MorSøkerAdopsjonMedAleneomsorg: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
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
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const MorSøkerAdopsjonMedDeltUttak: Story = {
    parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};

export const FarSøkerAdopsjonMedDeltUttak: Story = {
    parameters: MorSøkerAdopsjonMedDeltUttak.parameters,
    args: {
        ...MorSøkerAdopsjonMedDeltUttak.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
    },
};

export const MorSøkerAdopsjonDerFarHarRettIEOS: Story = {
    parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};

export const MorSøkerFodselDerFarHarRettIEOS: Story = {
    parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
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
    },
};

export const MorAleneomsorgFødsel: Story = {
    parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
        },
    },
};

export const MorFødselDeltUttakPrematurFødsel: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '100': { ...STØNADSKONTO_100, tillegg: { prematur: 43, flerbarn: 0 } },
                        '80': { ...STØNADSKONTO_80, tillegg: { prematur: 43, flerbarn: 0 } },
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const MorAleneomsorgPrematurFødsel: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
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
                            tillegg: { prematur: 43, flerbarn: 0 },
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
                            tillegg: { prematur: 43, flerbarn: 0 },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const MorFødselDeltUttak: Story = {
    parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
    args: {
        ...fellesProps,
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
    },
};

export const MorFødselMedTvillingFlerbarnsuker: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
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
                            tillegg: { prematur: 0, flerbarn: 85 },
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
                            tillegg: { prematur: 0, flerbarn: 105 },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const MorFødselAleneomsorgMedTrillingFlerbarnsuker: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
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
                            tillegg: { prematur: 0, flerbarn: 230 },
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
                            tillegg: { prematur: 0, flerbarn: 280 },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const FarEllerMedmorSøkerOgMorHarLagetUttaksplan: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () =>
                    HttpResponse.json({
                        perioder: [uttaksperiode],
                        dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
                    }),
                ),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': STØNADSKONTO_80,
                        '100': STØNADSKONTO_100,
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};

export const FarMedMorMedTermin1Juli2024: Story = {
    parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
    args: {
        ...fellesProps,
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
    },
};

export const MorMedTermin1Juli2024OgFarsSøknad: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () =>
                    HttpResponse.json({
                        perioder: [uttaksperiode],
                        dekningsgrad: DekningsgradDTO.ÅTTI_PROSENT,
                    }),
                ),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': STØNADSKONTO_80,
                        '100': STØNADSKONTO_100,
                    }),
                ),
            ],
        },
    },
    args: {
        ...fellesProps,
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
    },
};
