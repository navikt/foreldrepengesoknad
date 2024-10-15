import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
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
import { Dekningsgrad, Næringstype, SøkersituasjonFp } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataType, FpDataContext } from './FpDataContext';
import useSendSøknad from './useSendSøknad';

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
    erBarnetFødt: true,
    type: BarnType.FØDT,
} as Barn;

const ANNEN_FORELDER = {
    kanIkkeOppgis: false,
    fornavn: 'Espen',
    etternavn: 'Utvikler',
    fnr: '1223232',
};

const TIDLIGERE_UTENLANDSOPPHOLD = [
    {
        fom: '2023-01-01',
        tom: '2023-10-01',
        landkode: 'SE',
    },
];
const SENERE_UTENLANDSOPPHOLD = [
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
    næringstype: Næringstype.FISKER,
    fom: '2023-01-01',
    tom: '2023-10-01',
    næringsinntekt: 100000,
    pågående: false,
    navnPåNæringen: 'Fiskeriet',
    registrertINorge: true,
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    varigEndringDato: '2024-01-01',
    varigEndringInntektEtterEndring: '10000',
    varigEndringBeskrivelse: 'Beskrivelse av endring',
};

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

describe('useEsSendSøknad', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('skal sende inn korrekt søknad', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const erEndringssøknad = false;
        const { result } = renderHook(() => useSendSøknad('02343434', erEndringssøknad, setKvittering, 'nb'), {
            wrapper: getWrapper(),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            'https://fp/rest/soknad',
            expect.objectContaining({
                headers: {
                    fnr: '02343434',
                },
                json: {
                    type: 'foreldrepenger',
                    erEndringssøknad: false,
                    saksnummer: '1',
                    uttaksplan: [],
                    harGodkjentVilkår: true,
                    informasjonOmUtenlandsopphold: {
                        iNorgeNeste12Mnd: false,
                        iNorgeSiste12Mnd: false,
                        senereOpphold: [
                            {
                                land: 'SE',
                                tidsperiode: {
                                    fom: '2025-01-01',
                                    tom: '2025-10-01',
                                },
                            },
                        ],
                        tidligereOpphold: [
                            {
                                land: 'SE',
                                tidsperiode: {
                                    fom: '2023-01-01',
                                    tom: '2023-10-01',
                                },
                            },
                        ],
                    },
                    søker: {
                        andreInntekterSiste10Mnd: [
                            {
                                fom: '2023-01-01',
                                pågående: false,
                                tidsperiode: {
                                    fom: '2023-01-01',
                                    pågående: false,
                                    tom: '2024-01-01',
                                },
                                tom: '2024-01-01',
                                type: 'ETTERLØNN_SLUTTPAKKE',
                            },
                        ],
                        erAleneOmOmsorg: undefined,
                        frilansInformasjon: {
                            jobberFremdelesSomFrilans: true,
                            oppstart: '2024-01-01',
                        },
                        rolle: 'MOR',
                        selvstendigNæringsdrivendeInformasjon: [
                            {
                                ...EGEN_NÆRING,
                                næringstyper: [EGEN_NÆRING.næringstype],
                                tidsperiode: {
                                    fom: EGEN_NÆRING.fom,
                                    tom: EGEN_NÆRING.tom,
                                },
                                tom: EGEN_NÆRING.tom,
                                hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                                endringAvNæringsinntektInformasjon: {
                                    dato: '2024-01-01',
                                    forklaring: 'Beskrivelse av endring',
                                    næringsinntektEtterEndring: 10000,
                                },
                            },
                        ],
                        språkkode: 'nb',
                    },
                    annenForelder: {
                        ...ANNEN_FORELDER,
                        harAnnenForelderOppholdtSegIEØS: undefined,
                        harMorUføretrygd: undefined,
                        harRettPåForeldrepenger: undefined,
                    },
                    barn: {
                        antallBarn: 1,
                        fødselsdatoer: ['2024-01-01'],
                        erBarnetFødt: true,
                    },
                    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
                    situasjon: SØKERSITUASJON.situasjon,
                    ønskerJustertUttakVedFødsel: UTTAKSPLAN_METADATA.ønskerJustertUttakVedFødsel,
                    vedlegg: VEDLEGG[Skjemanummer.TERMINBEKREFTELSE],
                },
            }),
        );
    });

    it('skal sende inn korrekt endringssøknad', async () => {
        const setKvittering = vi.fn();
        const postMock = vi.mocked(ky.post);
        postMock.mockReturnValue({
            json: () => Promise.resolve(),
        } as ResponsePromise<any>);
        const deleteMock = vi.mocked(ky.delete);

        const erEndringssøknad = true;
        const { result } = renderHook(() => useSendSøknad('02343434', erEndringssøknad, setKvittering, 'nb'), {
            wrapper: getWrapper(),
        });

        result.current.sendSøknad();

        await waitFor(() => expect(setKvittering).toHaveBeenCalledOnce());
        expect(deleteMock).toHaveBeenCalledOnce();
        expect(postMock).toHaveBeenNthCalledWith(
            1,
            'https://fp/rest/soknad/endre',
            expect.objectContaining({
                headers: {
                    fnr: '02343434',
                },
                json: {
                    type: 'foreldrepenger',
                    erEndringssøknad: true,
                    saksnummer: '1',
                    uttaksplan: [
                        expect.objectContaining({
                            erArbeidstaker: false,
                            forelder: 'farMedmor',
                            type: 'utsettelse',
                            årsak: 'FRI',
                        }),
                    ],
                    søker: {
                        andreInntekterSiste10Mnd: [
                            {
                                fom: '2023-01-01',
                                pågående: false,
                                tidsperiode: {
                                    fom: '2023-01-01',
                                    pågående: false,
                                    tom: '2024-01-01',
                                },
                                tom: '2024-01-01',
                                type: 'ETTERLØNN_SLUTTPAKKE',
                            },
                        ],
                        erAleneOmOmsorg: undefined,
                        frilansInformasjon: FRILANS,
                        rolle: 'MOR',
                        selvstendigNæringsdrivendeInformasjon: [
                            {
                                ...EGEN_NÆRING,
                                næringstyper: [EGEN_NÆRING.næringstype],
                                tidsperiode: {
                                    fom: EGEN_NÆRING.fom,
                                    tom: EGEN_NÆRING.tom,
                                },
                                tom: EGEN_NÆRING.tom,
                                hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
                                endringAvNæringsinntektInformasjon: {
                                    dato: '2024-01-01',
                                    forklaring: 'Beskrivelse av endring',
                                    næringsinntektEtterEndring: 10000,
                                },
                            },
                        ],
                        språkkode: 'nb',
                    },
                    annenForelder: {
                        ...ANNEN_FORELDER,
                        harAnnenForelderTilsvarendeRettEØS: undefined,
                        harMorUføretrygd: undefined,
                        harRettPåForeldrepenger: undefined,
                    },
                    barn: {
                        ...BARNET,
                    },
                    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
                    situasjon: SØKERSITUASJON.situasjon,
                    ønskerJustertUttakVedFødsel: UTTAKSPLAN_METADATA.ønskerJustertUttakVedFødsel,
                    vedlegg: VEDLEGG[Skjemanummer.TERMINBEKREFTELSE],
                },
            }),
        );
    });
});
