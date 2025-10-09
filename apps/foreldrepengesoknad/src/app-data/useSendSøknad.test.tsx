import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { API_URLS } from 'api/queries';
import ky, { ResponsePromise } from 'ky';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AnnenInntektType, SluttpakkeInntekt } from 'types/AndreInntektskilder';
import { UttaksplanMetaData } from 'types/UttaksplanMetaData';
import { VedleggDataType } from 'types/VedleggDataType';

import {
    Barn,
    BarnType,
    FamiliehendelseType,
    Forelder,
    Periode,
    PeriodeInfoType,
    Periodetype,
    Saksgrunnlag,
    UtsettelseÅrsakType,
} from '@navikt/fp-common';
import { AttachmentType, Skjemanummer, StønadskontoType } from '@navikt/fp-constants';
import { Dekningsgrad, NæringDto, SøkersituasjonFp, UtenlandsoppholdPeriode } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataType, FpDataContext } from './FpDataContext';
import { useSendSøknad } from './useSendSøknad';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};

const SØKERSITUASJON = {
    situasjon: 'fødsel',
    rolle: 'mor',
} as SøkersituasjonFp;

const BARNET = {
    antallBarn: 1,
    fødselsdatoer: ['2024-01-01'],
    type: BarnType.FØDT,
} as Barn;

const ANNEN_FORELDER = {
    kanIkkeOppgis: false,
    fornavn: 'Espen',
    etternavn: 'Utvikler',
    fnr: '1223232',
};

const TIDLIGERE_UTENLANDSOPPHOLD: UtenlandsoppholdPeriode[] = [
    {
        fom: '2023-01-01',
        tom: '2023-10-01',
        landkode: 'SE',
    },
];
const SENERE_UTENLANDSOPPHOLD: UtenlandsoppholdPeriode[] = [
    {
        fom: '2025-01-01',
        tom: '2025-10-01',
        landkode: 'SE',
    },
];

const FRILANS = {
    jobberFremdelesSomFrilans: true,
    oppstart: '2024-01-01',
};

const EGEN_NÆRING = {
    næringstype: 'FISKE',
    fom: '2023-01-01',
    tom: '2023-10-01',
    næringsinntekt: 100000,
    navnPåNæringen: 'Fiskeriet',
    registrertINorge: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    varigEndringDato: '2024-01-01',
    varigEndringInntektEtterEndring: 10000,
    varigEndringBeskrivelse: 'Beskrivelse av endring',
} satisfies NæringDto;

const ANDRE_INNTEKTSKILDER = [
    {
        type: AnnenInntektType.SLUTTPAKKE,
        fom: '2023-01-01',
        tom: '2024-01-01',
    } as SluttpakkeInntekt,
];

const VEDLEGG = {
    [Skjemanummer.TERMINBEKREFTELSE]: [
        {
            id: '1',
            file: {} as File,
            filename: 'hello.png',
            filesize: 5,
            pending: false,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            type: AttachmentType.TERMINBEKREFTELSE,
            uploaded: true,
            url: 'test.com',
            uuid: 'uuid-test',
        },
    ],
} as VedleggDataType;

const PERIODE = {
    id: '1',
    årsak: UtsettelseÅrsakType.Arbeid,
    tidsperiode: {
        fom: new Date('2024-01-01'),
        tom: new Date('2024-10-10'),
    },
    type: Periodetype.Info,
    konto: StønadskontoType.Fedrekvote,
    forelder: Forelder.mor,
    infotype: PeriodeInfoType.utsettelseAnnenPart,
    overskrives: true,
    visPeriodeIPlan: false,
} as Periode;

const UTTAKSPLAN_METADATA = {
    ønskerJustertUttakVedFødsel: true,
    perioderSomSkalSendesInn: [PERIODE],
    endringstidspunkt: new Date('2024-01-02'),
} as UttaksplanMetaData;

const getWrapper =
    () =>
    ({ children }: { children: ReactNode }) => (
        <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <FpDataContext
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: SØKERSITUASJON,
                            [ContextDataType.OM_BARNET]: BARNET,
                            [ContextDataType.ANNEN_FORELDER]: ANNEN_FORELDER,
                            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                                harHattAndreInntektskilder: true,
                                harJobbetSomFrilans: true,
                                harJobbetSomSelvstendigNæringsdrivende: true,
                            },
                            [ContextDataType.FRILANS]: FRILANS,
                            [ContextDataType.EGEN_NÆRING]: EGEN_NÆRING,
                            [ContextDataType.ANDRE_INNTEKTSKILDER]: ANDRE_INNTEKTSKILDER,
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: Dekningsgrad.HUNDRE_PROSENT,
                            [ContextDataType.UTENLANDSOPPHOLD]: {
                                harBoddUtenforNorgeSiste12Mnd: true,
                                skalBoUtenforNorgeNeste12Mnd: true,
                            },
                            [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: TIDLIGERE_UTENLANDSOPPHOLD,
                            [ContextDataType.UTENLANDSOPPHOLD_SENERE]: SENERE_UTENLANDSOPPHOLD,
                            [ContextDataType.UTTAKSPLAN_METADATA]: UTTAKSPLAN_METADATA,
                            [ContextDataType.UTTAKSPLAN]: [PERIODE],
                            [ContextDataType.VEDLEGG]: VEDLEGG,
                            [ContextDataType.EKSISTERENDE_SAK]: {
                                saksnummer: '1',
                                erAnnenPartsSak: false,
                                grunnlag: {
                                    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
                                    antallBarn: 1,
                                    morErAleneOmOmsorg: false,
                                    morErUfør: false,
                                    morHarRett: true,
                                    farMedmorErAleneOmOmsorg: false,
                                    farMedmorHarRett: true,
                                    søkerErFarEllerMedmor: false,
                                    erDeltUttak: true,
                                    erBarnetFødt: true,
                                    familiehendelseDato: '2024-01-01',
                                    familiehendelseType: FamiliehendelseType.FØDSEL,
                                } as Saksgrunnlag,
                                saksperioder: [],
                                uttaksplan: [],
                            },
                        }}
                    >
                        {children}
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        </IntlProvider>
    );

vi.mock('ky');

describe('useFpSendSøknad', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TODO: sjekk navigering
    it('skal sende inn korrekt søknad', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const erEndringssøknad = false;
        const { result } = renderHook(() => useSendSøknad('02343434', erEndringssøknad), {
            wrapper: getWrapper(),
        });

        result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                headers: {
                    fnr: '02343434',
                },
                json: {
                    rolle: 'MOR',
                    språkkode: 'NB',
                    andreInntekterSiste10Mnd: [
                        {
                            fom: '2023-01-01',
                            tom: '2024-01-01',
                            type: 'ETTERLØNN_SLUTTPAKKE',
                        },
                    ],
                    frilans: {
                        jobberFremdelesSomFrilans: true,
                        oppstart: '2024-01-01',
                    },
                    egenNæring: {
                        ...EGEN_NÆRING,
                        næringstype: EGEN_NÆRING.næringstype,
                        fom: EGEN_NÆRING.fom,
                        tom: EGEN_NÆRING.tom,
                        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                        varigEndringDato: '2024-01-01',
                        varigEndringBeskrivelse: 'Beskrivelse av endring',
                        varigEndringInntektEtterEndring: 10000,
                    },
                    annenForelder: {
                        type: 'norsk',
                        fnr: ANNEN_FORELDER.fnr,
                        fornavn: ANNEN_FORELDER.fornavn,
                        etternavn: ANNEN_FORELDER.etternavn,
                        rettigheter: {
                            harRettPåForeldrepenger: false,
                            erInformertOmSøknaden: undefined,
                            erAleneOmOmsorg: undefined,
                            harAnnenForelderOppholdtSegIEØS: undefined,
                            harAnnenForelderTilsvarendeRettEØS: undefined,
                            harMorUføretrygd: undefined,
                        },
                    },
                    barn: {
                        type: 'fødsel',
                        antallBarn: 1,
                        fødselsdato: '2024-01-01',
                    },
                    utenlandsopphold: [
                        {
                            landkode: 'SE',
                            fom: '2023-01-01',
                            tom: '2023-10-01',
                        },
                        {
                            landkode: 'SE',
                            fom: '2025-01-01',
                            tom: '2025-10-01',
                        },
                    ],
                    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
                    uttaksplan: {
                        ønskerJustertUttakVedFødsel: UTTAKSPLAN_METADATA.ønskerJustertUttakVedFødsel,
                        uttaksperioder: [],
                    },
                    vedlegg: VEDLEGG[Skjemanummer.TERMINBEKREFTELSE],
                },
            }),
        );
    });

    it('skal sende inn korrekt endringssøknad', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const erEndringssøknad = true;
        const { result } = renderHook(() => useSendSøknad('02343434', erEndringssøknad), {
            wrapper: getWrapper(),
        });

        result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.endreSøknad,
            expect.objectContaining({
                headers: {
                    fnr: '02343434',
                },
                json: {
                    saksnummer: '1',
                    rolle: 'MOR',
                    språkkode: 'NB',
                    annenForelder: {
                        type: 'norsk',
                        fnr: ANNEN_FORELDER.fnr,
                        fornavn: ANNEN_FORELDER.fornavn,
                        etternavn: ANNEN_FORELDER.etternavn,
                        rettigheter: {
                            harRettPåForeldrepenger: false,
                            erInformertOmSøknaden: undefined,
                            erAleneOmOmsorg: undefined,
                            harAnnenForelderOppholdtSegIEØS: undefined,
                            harAnnenForelderTilsvarendeRettEØS: undefined,
                            harMorUføretrygd: undefined,
                        },
                    },
                    barn: {
                        type: 'fødsel',
                        antallBarn: 1,
                        fødselsdato: '2024-01-01',
                    },
                    uttaksplan: {
                        ønskerJustertUttakVedFødsel: UTTAKSPLAN_METADATA.ønskerJustertUttakVedFødsel,
                        uttaksperioder: [
                            expect.objectContaining({
                                erArbeidstaker: false,
                                type: 'utsettelse',
                                årsak: 'FRI',
                                fom: '2024-01-02', // Endringsstidspunkt
                                tom: '2024-01-02', // Endringsstidspunkt
                            }),
                        ],
                    },
                    vedlegg: VEDLEGG[Skjemanummer.TERMINBEKREFTELSE],
                },
            }),
        );
    });
});
