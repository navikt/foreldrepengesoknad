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
    AnnenForelder,
    Barn,
    BarnType,
    EksisterendeSak,
    FamiliehendelseType,
    Periode,
    PeriodeInfoType,
    Periodetype,
} from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import {
    EndringssøknadForeldrepengerDto,
    ForeldrepengesøknadDto,
    FpSak_fpoversikt,
    Frilans,
    NæringDto,
    PersonMedArbeidsforholdDto_fpoversikt,
    SøkersituasjonFp,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';
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

const DEFAULT_SØKER_INFO = {
    arbeidsforhold: [
        {
            arbeidsgiverId: '9903232324',
            arbeidsgiverIdType: 'ikke-orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            fom: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
    ],
    person: {
        navn: {
            etternavn: 'Oravakangas',
            fornavn: 'Erlinga-Mask',
        },
        fnr: '02343434',
        fødselsdato: '1989-08-30',
        kjønn: 'K',
        barn: [],
    },
} satisfies PersonMedArbeidsforholdDto_fpoversikt;

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: nbMessages,
};

const SØKERSITUASJON = {
    situasjon: 'fødsel',
    rolle: 'mor',
} satisfies SøkersituasjonFp;

const BARNET = {
    antallBarn: 1,
    fødselsdatoer: ['2024-01-01'],
    type: BarnType.FØDT,
} satisfies Barn;

const ANNEN_FORELDER = {
    kanIkkeOppgis: false,
    fornavn: 'Espen',
    etternavn: 'Utvikler',
    fnr: '1223232',
    erAleneOmOmsorg: false,
} satisfies AnnenForelder;

const TIDLIGERE_UTENLANDSOPPHOLD = [
    {
        fom: '2023-01-01',
        tom: '2023-10-01',
        landkode: 'SE',
    },
] satisfies UtenlandsoppholdPeriode[];
const SENERE_UTENLANDSOPPHOLD = [
    {
        fom: '2025-01-01',
        tom: '2025-10-01',
        landkode: 'SE',
    },
] satisfies UtenlandsoppholdPeriode[];

const FRILANS = {
    jobberFremdelesSomFrilans: true,
    oppstart: '2024-01-01',
} satisfies Frilans;

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
    } satisfies SluttpakkeInntekt,
];

const VEDLEGG = {
    [Skjemanummer.TERMINBEKREFTELSE]: [
        {
            id: '1',
            file: {} as File,
            filename: 'hello.png',
            filesize: 5,
            innsendingsType: 'LASTET_OPP',
            pending: false,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
            type: AttachmentType.TERMINBEKREFTELSE,
            uploaded: true,
            uuid: 'uuid-test',
        },
    ],
} satisfies VedleggDataType;

const PERIODE = {
    id: '1',
    årsak: 'ARBEID',
    tidsperiode: {
        fom: new Date('2024-01-01'),
        tom: new Date('2024-10-10'),
    },
    type: Periodetype.Info,
    forelder: 'MOR',
    infotype: PeriodeInfoType.utsettelseAnnenPart,
    overskrives: true,
    visPeriodeIPlan: false,
} satisfies Periode;

const UTTAKSPLAN_METADATA = {
    ønskerJustertUttakVedFødsel: true,
    perioderSomSkalSendesInn: [PERIODE],
    endringstidspunkt: new Date('2024-01-02'),
} satisfies UttaksplanMetaData;

const EXPECTED_SØKER_INFO = {
    fnr: DEFAULT_SØKER_INFO.person.fnr,
    navn: DEFAULT_SØKER_INFO.person.navn,
    arbeidsforhold: DEFAULT_SØKER_INFO.arbeidsforhold.map((af) => ({
        navn: af.arbeidsgiverNavn,
        orgnummer: af.arbeidsgiverId,
        stillingsprosent: af.stillingsprosent,
        fom: af.fom,
    })),
};

const saker = [
    {
        dekningsgrad: 'HUNDRE',
        familiehendelse: {
            fødselsdato: '2024-01-01',
            antallBarn: 1,
        },
        gjeldendeVedtak: { perioder: [] },
        harAnnenForelderTilsvarendeRettEØS: false,
        gjelderAdopsjon: false,
        kanSøkeOmEndring: true,
        morUføretrygd: false,
        rettighetType: 'BEGGE_RETT',
        sakAvsluttet: false,
        sakTilhørerMor: true,
        saksnummer: '123456',
        ønskerJustertUttakVedFødsel: false,
        oppdatertTidspunkt: '2022-05-06',
        åpenBehandling: undefined,
        annenPart: { fnr: '123456789' },
        barn: [{ fnr: '987654321' }],
        forelder: 'MOR',
    },
] satisfies FpSak_fpoversikt[];

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
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: '100',
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
                                    dekningsgrad: '100',
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
                                    ønskerJustertUttakVedFødsel: undefined,
                                },
                                saksperioder: [],
                                uttaksplan: [],
                            } satisfies EksisterendeSak,
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
        vi.clearAllMocks();
    });

    it('skal sende inn korrekt søknad', async () => {
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<void>);
        const deleteMock = vi.mocked(ky.delete);

        const erEndringssøknad = false;
        const { result } = renderHook(() => useSendSøknad(DEFAULT_SØKER_INFO, erEndringssøknad, saker), {
            wrapper: getWrapper(),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.sendSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: EXPECTED_SØKER_INFO,
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
                            erAleneOmOmsorg: false,
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
                    dekningsgrad: '100',
                    uttaksplan: {
                        ønskerJustertUttakVedFødsel: UTTAKSPLAN_METADATA.ønskerJustertUttakVedFødsel,
                        uttaksperioder: [],
                    },
                    vedlegg: VEDLEGG[Skjemanummer.TERMINBEKREFTELSE],
                } satisfies ForeldrepengesøknadDto,
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
        const { result } = renderHook(() => useSendSøknad(DEFAULT_SØKER_INFO, erEndringssøknad, saker), {
            wrapper: getWrapper(),
        });

        await result.current.sendSøknad();

        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            API_URLS.endreSøknad,
            expect.objectContaining({
                json: {
                    søkerinfo: EXPECTED_SØKER_INFO,
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
                            erAleneOmOmsorg: false,
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
                } satisfies EndringssøknadForeldrepengerDto,
            }),
        );
    });
});
