import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, SaksperiodeDTO } from '@navikt/fp-common';
import { ISO_DATE_FORMAT, StønadskontoType } from '@navikt/fp-constants';
import {
    Arbeidsforhold,
    PersonFrontend,
    SøkersituasjonFp,
    TilgjengeligeStønadskontoerForDekningsgrad,
} from '@navikt/fp-types';

import { FordelingSteg } from './FordelingSteg';

const UTTAKSPLAN_ANNEN_URL = `${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`;
const STØNADSKONTO_URL = `${import.meta.env.BASE_URL}/rest/konto`;

const vedtakFar = {
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2024-02-07',
            tom: '2024-02-19',
            kontoType: 'MØDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
        {
            fom: '2024-06-11',
            tom: '2024-06-30',
            kontoType: 'FELLESPERIODE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
    ] as SaksperiodeDTO[],
};

const vedtakMor = {
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2024-07-07',
            tom: '2024-07-24',
            kontoType: 'FEDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
        {
            fom: '2024-08-11',
            tom: '2024-08-12',
            kontoType: 'FELLESPERIODE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
    ] as SaksperiodeDTO[],
};

const søkerInfoKvinne = {
    fnr: '19047815714',
    fornavn: 'Hanne',
    etternavn: 'Mygg',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
} as PersonFrontend;

const søkerInfoMann = {
    fnr: '19047815715',
    fornavn: 'Hans',
    etternavn: 'Mygg',
    kjønn: 'M',
    fødselsdato: '1972-06-07',
} as PersonFrontend;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide?: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    erAleneOmOmsorg?: boolean;
    søker: PersonFrontend;
    dekningsgrad: Dekningsgrad;
    arbeidsforhold: Arbeidsforhold[];
} & ComponentProps<typeof FordelingSteg>;

const meta = {
    title: 'steps/FordelingSteg',
    component: FordelingSteg,
    render: ({ gåTilNesteSide, søkersituasjon, annenForelder, barnet, dekningsgrad, ...rest }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.FORDELING]}>
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
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: dekningsgrad,
                        }}
                    >
                        <FordelingSteg {...rest} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

//ALENEOMSORG

const DEFAULT_STØNADSKONTO = { kontoer: [{}], minsteretter: {} } as TilgjengeligeStønadskontoerForDekningsgrad;

export const MorAleneomsorgDekning80EttBarnFør1Okt2021: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': {
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
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-09-21'],
            antallBarn: 1,
            termindato: '2021-09-24',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2021-09-21',
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorAleneomsorgEttBarnPrematurFødsel: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 294,
                                },
                                {
                                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                            tillegg: {
                                prematur: 64,
                                flerbarn: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 1,
            termindato: '2023-12-20',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2023-09-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorAleneomsorgAdopsjonTrillinger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-02-21'],
            antallBarn: 3,
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgFødtTvillinger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 385,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 2,
            termindato: '2023-09-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2023-09-23',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgFødtFireBarnFør1Okt2021: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-09-21'],
            antallBarn: 4,
            termindato: '2021-09-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2021-09-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgFødtTreBarnFørWLB: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2022-07-21'],
            antallBarn: 3,
            termindato: '2022-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2022-09-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgEttBarnTerminEtterWLB: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 3,
            termindato: '2024-07-21',
        },
        annenForelder: {
            erAleneOmOmsorg: true,
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            datoForAleneomsorg: '2024-09-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgPrematurtFødtBarn: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 273,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                            tillegg: {
                                prematur: 64,
                                flerbarn: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-21'],
            termindato: '2024-04-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2024-01-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorAleneomsorgAdopsjonFireBarn: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2021-08-21'],
            antallBarn: 4,
            adopsjonsdato: '2021-08-23',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2024-01-21',
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

//DELT UTTAK
export const MorDeltUttakEttBarnPrematurFødsel: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(undefined, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                    dager: 100,
                                },
                                {
                                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                            tillegg: {
                                prematur: 65,
                                flerbarn: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 1,
            termindato: '2023-12-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': {
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
                                    dager: 101,
                                },
                                {
                                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                            tillegg: {
                                prematur: 0,
                                flerbarn: 0,
                            },
                        },
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-08-21',
        },
        annenForelder: {
            fornavn: 'Petter',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorDeltUttakEttBarnTermin: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-06-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorDeltUttakTvillingerFødt: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                            tillegg: {
                                prematur: 0,
                                flerbarn: 85,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 2,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorDeltUttakFarSøkteMorsKvoteOgFellesperiode: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json(vedtakFar)),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2021-07-21'],
            termindato: '2021-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorSøkerDeltUttakTrillingerFødtFørWLB: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                    dager: 370,
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
                            tillegg: {
                                prematur: 0,
                                flerbarn: 230,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 3,
            fødselsdatoer: ['2022-07-21'],
            termindato: '2022-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                    dager: 370,
                                },
                                {
                                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 4,
            termindato: dayjs().subtract(2, 'months').format(ISO_DATE_FORMAT),
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorSøkerDeltUttakEttBarnFødtPrematurt: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                    dager: 100,
                                },
                                {
                                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                            tillegg: {
                                flerbarn: 0,
                                prematur: 64,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-05-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json(vedtakMor)),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarSøkerAdopsjonToBarn: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 2,
            fødselsdatoer: ['2024-02-21'],
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': {
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
                                    dager: 370,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 3,
            fødselsdatoer: ['2021-02-21'],
            adopsjonsdato: '2021-02-21',
            ankomstdato: '2021-05-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

//DELT UTTAK EØS

export const MorSøkerFarHarRettIEØSTerminDekningsgrad80: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': {
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
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarMedmorSøkerMorHarRettIEØSAdopsjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
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
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2024-02-21',
            fødselsdatoer: ['2024-02-21'],
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

//KUN EN HAR RETT

export const BareMorHarRettTermin: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 15,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const BareMorHarRettAdopsjon: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 1,
            adopsjonsdato: '2022-08-21',
            fødselsdatoer: ['2022-01-01'],
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const BareFarHarRettOgMorErUførTermin4Barn: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 155,
                                },
                                {
                                    konto: StønadskontoType.AktivitetsfriKvote,
                                    dager: 375,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 4,
            termindato: dayjs().subtract(2, 'months').format(ISO_DATE_FORMAT),
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: true,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const BareFarHarRettOgMorErIkkeUførFødtBarn: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 210,
                                },
                                {
                                    konto: StønadskontoType.AktivitetsfriKvote,
                                    dager: 40,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-21'],
            termindato: '2024-01-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const BareFarHarRettTvillingerFødtFør1Okt2021: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 285,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 2,
            fødselsdatoer: ['2021-07-21'],
            termindato: '2021-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: true,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const BareFarHarRettAdopsjonMorErUfør: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, { status: 200 })),
                http.post(STØNADSKONTO_URL, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: StønadskontoType.Foreldrepenger,
                                    dager: 125,
                                },
                                {
                                    konto: StønadskontoType.AktivitetsfriKvote,
                                    dager: 75,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            erMorUfør: true,
            kanIkkeOppgis: false,
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};
