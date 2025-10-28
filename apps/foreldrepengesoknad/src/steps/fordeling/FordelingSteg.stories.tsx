import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, SaksperiodeDTO } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    EksternArbeidsforholdDto_fpoversikt,
    KontoBeregningDto_fpoversikt,
    PersonDto_fpoversikt,
    SøkersituasjonFp,
} from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { FordelingSteg } from './FordelingSteg';

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
    navn: {
        fornavn: 'Hanne',
        etternavn: 'Mygg',
    },
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [],
} satisfies PersonDto_fpoversikt;

const søkerInfoMann = {
    fnr: '19047815715',
    navn: {
        fornavn: 'Hans',
        etternavn: 'Mygg',
    },
    kjønn: 'M',
    fødselsdato: '1972-06-07',
    barn: [],
} satisfies PersonDto_fpoversikt;

const promiseAction = () => () => {
    action('button-click')();
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
    person: PersonDto_fpoversikt;
    dekningsgrad: Dekningsgrad;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
} & ComponentProps<typeof FordelingSteg>;

const meta = {
    title: 'steps/FordelingSteg',
    component: FordelingSteg,
    decorators: [withQueryClient],
    render: ({ gåTilNesteSide, søkersituasjon, annenForelder, barnet, dekningsgrad, ...rest }) => {
        return (
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
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

//ALENEOMSORG

const DEFAULT_STØNADSKONTO = { kontoer: [{}], minsteretter: {} } as KontoBeregningDto_fpoversikt;

export const MorAleneomsorgDekning80EttBarnFør1Okt2021: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 280,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 294,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 385,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 460,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(undefined, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 100,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 101,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 80,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 165,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(vedtakFar)),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 80,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 80,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 370,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 370,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 100,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
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
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(vedtakMor)),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 75,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 80,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 90,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 370,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 90,
                                },
                                {
                                    konto: 'FORELDREPENGER_FØR_FØDSEL',
                                    dager: 15,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                        '100': DEFAULT_STØNADSKONTO,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'MØDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FEDREKVOTE',
                                    dager: 95,
                                },
                                {
                                    konto: 'FELLESPERIODE',
                                    dager: 90,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 15,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 230,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoKvinne,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 155,
                                },
                                {
                                    konto: 'AKTIVITETSFRI_KVOTE',
                                    dager: 375,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 210,
                                },
                                {
                                    konto: 'AKTIVITETSFRI_KVOTE',
                                    dager: 40,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 285,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 0,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': DEFAULT_STØNADSKONTO,
                        '100': {
                            kontoer: [
                                {
                                    konto: 'FORELDREPENGER',
                                    dager: 125,
                                },
                                {
                                    konto: 'AKTIVITETSFRI_KVOTE',
                                    dager: 75,
                                },
                            ],
                            minsteretter: {
                                farRundtFødsel: 10,
                                toTette: 0,
                            },
                        } satisfies KontoBeregningDto_fpoversikt,
                    }),
                ),
            ],
        },
    },
    args: {
        person: søkerInfoMann,
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
