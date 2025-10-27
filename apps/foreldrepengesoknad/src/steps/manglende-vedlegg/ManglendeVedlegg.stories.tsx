import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { AndreInntektskilder, AnnenInntektType } from 'types/AndreInntektskilder';

import {
    AnnenForelder,
    Barn,
    BarnType,
    Forelder,
    MorsAktivitet,
    Periode,
    Periodetype,
    SivilstandType,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp, PersonFrontend, Situasjon, Søkerinfo } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { ManglendeVedlegg } from './ManglendeVedlegg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const defaultSøkerinfo = {
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
            {
                fnr: '31091981146',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'SNILT',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
            {
                fnr: '31091981147',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'LYST',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
    arbeidsforhold: [],
} as Søkerinfo;

const defaultAnnenForelder = {
    fornavn: 'Eline',
    etternavn: 'Hagen',
    kanIkkeOppgis: false,
    fnr: '21091981144',
} satisfies AnnenForelder;

const defaultBarn = {
    antallBarn: 1,
    type: BarnType.FØDT,
    fødselsdatoer: ['2024-01-01'],
} as Barn;

const defaultArbeidsforholdOgInntekt = {
    harHattAndreInntektskilder: false,
    harJobbetSomFrilans: false,
    harJobbetSomSelvstendigNæringsdrivende: false,
};

const defaultSøkerinfoFar = {
    søker: {
        fnr: '08099017784',
        fornavn: 'FAR',
        etternavn: 'MYGG',
        kjønn: 'M',
        fødselsdato: '1978-04-19',
        barn: [
            {
                fnr: '19047815714',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'K',
            },
        ],
        sivilstand: {
            type: SivilstandType.GIFT,
        },
    } as PersonFrontend,
    arbeidsforhold: [],
};

type StoryArgs = {
    rolle?: 'mor' | 'far' | 'medmor';
    situasjon?: Situasjon;
    annenForelder?: AnnenForelder;
    barn?: Barn;
    uttaksplan?: Periode[];
    arbeidsforholdOgInntekt?: ArbeidsforholdOgInntektFp;
    annenInntekt?: AndreInntektskilder[];
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof ManglendeVedlegg>;

// TODO: (KALLE) Legg til stillingsprosent som en kontrollbar storybook-parameter for relevante historier
// TODO: (KALLE) Gjør at datoene i stories er relative til dagens dato

const meta = {
    title: 'steps/ManglendeVedlegg',
    component: ManglendeVedlegg,
    decorators: [withQueryClient],
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.sendVedlegg,
                    () =>
                        new HttpResponse(JSON.stringify('uuid-test'), {
                            status: 200,
                        }),
                ),
            ],
        },
    },
    render: ({
        rolle = 'mor',
        situasjon = 'fødsel',
        uttaksplan = [],
        annenForelder = defaultAnnenForelder,
        barn = defaultBarn,
        arbeidsforholdOgInntekt = defaultArbeidsforholdOgInntekt,
        annenInntekt,
        gåTilNesteSide = action('button-click'),
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.UTTAKSPLAN]: uttaksplan,
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: arbeidsforholdOgInntekt,
                        [ContextDataType.ANDRE_INNTEKTSKILDER]: annenInntekt,
                        [ContextDataType.SØKERSITUASJON]: {
                            rolle,
                            situasjon,
                        },
                    }}
                >
                    <ManglendeVedlegg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

const arbeidsforholdMorJobber80Prosent = [
    {
        arbeidsgiverId: '1',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Mors Arbeidsplass AS',
        stillingsprosent: 80,
        fom: dayjs().subtract(5, 'year').format('YYYY-MM-DD'),
    },
];

export const Termindatodokumentasjon: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        barn: {
            antallBarn: 1,
            type: BarnType.UFØDT,
            termindato: '2024-01-01',
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const Omsorgsovertakelsedokumentasjon: Story = {
    args: {
        ...Termindatodokumentasjon.args,
        situasjon: 'adopsjon',
        barn: {
            antallBarn: 1,
            type: BarnType.ADOPTERT_ANNET_BARN,
            adopsjonsdato: '2023-01-01',
            adoptertIUtlandet: false,
            fødselsdatoer: ['2022-01-01'],
        },
    },
};

export const Aleneomsorgdokumentasjon: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        annenForelder: {
            ...defaultAnnenForelder,
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2024-01-01',
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const HarAndreInntektskilderMilitærtjeneste: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        arbeidsforholdOgInntekt: {
            harHattAndreInntektskilder: true,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        annenInntekt: [
            {
                fom: '2024-01-01',
                tom: '2024-04-01',
                pågående: false,
                type: AnnenInntektType.MILITÆRTJENESTE,
            },
            {
                fom: '2024-05-01',
                pågående: true,
                type: AnnenInntektType.MILITÆRTJENESTE,
            },
        ],
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const HarAndreInntektskilderEtterlønn: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        arbeidsforholdOgInntekt: {
            harHattAndreInntektskilder: true,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        annenInntekt: [
            {
                fom: '2024-01-01',
                tom: '2024-04-01',
                type: AnnenInntektType.SLUTTPAKKE,
            },
            {
                fom: '2024-05-01',
                tom: '2024-07-01',
                type: AnnenInntektType.SLUTTPAKKE,
            },
        ],
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid: Story = {
    args: {
        søkerInfo: {
            ...defaultSøkerinfoFar,
            arbeidsforhold: arbeidsforholdMorJobber80Prosent,
        },
        rolle: 'far',
        barn: {
            antallBarn: 1,
            type: BarnType.FØDT,
            termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
            fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')],
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        uttaksplan: [
            {
                id: '08499121-6620-16419-3321-0027063089154',
                forelder: Forelder.farMedmor,
                konto: 'FEDREKVOTE',
                tidsperiode: {
                    fom: new Date(dayjs().add(10, 'month').startOf('month').add(3, 'day').format('YYYY-MM-DD')),
                    tom: new Date(dayjs().add(10, 'month').startOf('month').add(16, 'day').format('YYYY-MM-DD')),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                id: '0700701673-1838-30857-30810-219862607326',
                forelder: Forelder.farMedmor,
                konto: 'FELLESPERIODE',
                tidsperiode: {
                    fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
                    tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD')),
                },
                type: Periodetype.Uttak,
                morsAktivitetIPerioden: MorsAktivitet.Arbeid,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
        ],
    },
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.trengerDokumentereMorsArbeid,
                    () => new HttpResponse(JSON.stringify(false), { status: 200 }),
                ),
            ],
        },
    },
};

export const FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid: Story = {
    args: {
        søkerInfo: {
            ...defaultSøkerinfoFar,
            arbeidsforhold: [
                {
                    ...arbeidsforholdMorJobber80Prosent[0],
                    stillingsprosent: 70,
                },
            ],
        },
        rolle: 'far',
        barn: {
            antallBarn: 1,
            type: BarnType.FØDT,
            termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
            fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')],
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        uttaksplan: [
            {
                id: '08499121-6620-16419-3321-0027063089154',
                forelder: Forelder.farMedmor,
                konto: 'FEDREKVOTE',
                tidsperiode: {
                    fom: new Date(dayjs().add(10, 'month').startOf('month').add(3, 'day').format('YYYY-MM-DD')),
                    tom: new Date(dayjs().add(10, 'month').startOf('month').add(16, 'day').format('YYYY-MM-DD')),
                },
                type: Periodetype.Uttak,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: true,
                samtidigUttakProsent: '100',
            },
            {
                id: '0700701673-1838-30857-30810-219862607326',
                forelder: Forelder.farMedmor,
                konto: 'FELLESPERIODE',
                tidsperiode: {
                    fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
                    tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD')),
                },
                type: Periodetype.Uttak,
                morsAktivitetIPerioden: MorsAktivitet.Arbeid,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
        ],
    },
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.trengerDokumentereMorsArbeid,
                    () => new HttpResponse(JSON.stringify(true), { status: 200 }),
                ),
            ],
        },
    },
};

export const FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning: Story = {
    args: {
        søkerInfo: defaultSøkerinfoFar,
        rolle: 'far',
        barn: {
            antallBarn: 1,
            type: BarnType.FØDT,
            termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
            fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')],
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        uttaksplan: [
            {
                id: '0700701673-1838-30857-30810-219862607326',
                forelder: Forelder.mor,
                konto: 'FELLESPERIODE',
                tidsperiode: {
                    fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
                    tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD')),
                },
                type: Periodetype.Uttak,
                morsAktivitetIPerioden: MorsAktivitet.Utdanning,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
        ],
    },

    parameters: {
        msw: {
            handlers: [
                http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
                    return HttpResponse.json(true);
                }),
            ],
        },
    },
};

export const BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid: Story = {
    args: {
        søkerInfo: {
            ...defaultSøkerinfoFar,
        },
        rolle: 'far',
        barn: {
            antallBarn: 1,
            type: BarnType.FØDT,
            termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
            fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')],
        },
        erEndringssøknad: false,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        uttaksplan: [
            {
                id: '0700701673-1838-30857-30810-219862607326',
                forelder: Forelder.farMedmor,
                konto: 'FORELDREPENGER',
                tidsperiode: {
                    fom: new Date('2025-01-01'),
                    tom: new Date('2025-02-01'),
                },
                type: Periodetype.Uttak,
                morsAktivitetIPerioden: MorsAktivitet.Arbeid,
                erArbeidstaker: false,
                gradert: false,
                orgnumre: [],
                ønskerSamtidigUttak: false,
            },
            {
                id: '0700701673-1838-30857-30810-219862607326',
                forelder: Forelder.farMedmor,
                tidsperiode: {
                    fom: new Date('2026-01-01'),
                    tom: new Date('2026-02-01'),
                },
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Fri,
                morsAktivitetIPerioden: MorsAktivitet.Arbeid,
                erArbeidstaker: false,
            },
        ],
    },
    parameters: {
        msw: {
            handlers: [
                http.post(
                    API_URLS.trengerDokumentereMorsArbeid,
                    () => new HttpResponse(JSON.stringify(false), { status: 200 }),
                ),
            ],
        },
    },
};
