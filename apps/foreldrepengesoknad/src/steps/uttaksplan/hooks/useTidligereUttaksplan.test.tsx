import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { act, renderHook, screen, waitFor } from '@testing-library/react';
import {
    Action,
    ContextDataMap,
    ContextDataType,
    FpDataContext,
    useContextComplete,
    useContextSaveData,
} from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useSamordneBarnMedAnnenPart } from 'appData/useSamordneBarnMedAnnenPart';
import { useStepConfig } from 'appData/useStepConfig';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { saker } from 'storybookData/saker';
import { AnnenForelder } from 'types/AnnenForelder';
import { FellesperiodeFordelingValg, OppstartValg } from 'types/Fordeling';
import { getUttaksplanParam } from 'utils/annenForelderUtils';

import { BarnType } from '@navikt/fp-constants';
import { Barn, FellesUttaksplanDto_fpoversikt, FpSak_fpoversikt, UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { DELT_UTTAK_100, MINSTERETTER } from '@navikt/fp-utils-test';

import messages from '../../../intl/nb_NO.json';
import { useTidligereUttaksplan } from './useTidligereUttaksplan';
import { useUttaksplanForslag } from './useUttaksplanForslag';

const SAKSNUMMER = '123456789';
const SAK_UTEN_VEDTAK: FpSak_fpoversikt = { ...saker.foreldrepenger[0]!, saksnummer: SAKSNUMMER };
const SAK_MED_VEDTAK: FpSak_fpoversikt = { ...SAK_UTEN_VEDTAK, gjeldendeVedtak: { perioder: [] } };

const BARN: Barn = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2025-01-01'],
    antallBarn: 1,
    termindato: '2025-01-01',
};

const ANNEN_FORELDER: AnnenForelder = {
    fnr: '31430574828',
    fornavn: 'Espen',
    etternavn: 'Utvikler',
    kanIkkeOppgis: false,
    erAleneOmOmsorg: false,
    harRettPåForeldrepengerINorge: true,
};

const PERIODER: UttakPeriodeDto_fpoversikt[] = [
    {
        fom: '2025-01-01',
        tom: '2025-01-10',
        søker: {
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
            flerbarnsdager: false,
        },
    },
    {
        fom: '2025-01-13',
        tom: '2025-01-24',
        annenPart: {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            flerbarnsdager: false,
        },
    },
];

const INNVILGET = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
} as const;

const lagUttaksplan = (perioder: UttakPeriodeDto_fpoversikt[]): FellesUttaksplanDto_fpoversikt => ({
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder,
});

const getWrapper = (
    uttaksplan: FellesUttaksplanDto_fpoversikt,
    initialState?: ContextDataMap,
    onDispatch?: (action: Action) => void,
    route = SøknadRoutes.PERIODE_MED_FORELDREPENGER,
    valgtSak: FpSak_fpoversikt | null = SAK_UTEN_VEDTAK,
) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    queryClient.setQueryData(['UTTAKSPLAN', getUttaksplanParam(ANNEN_FORELDER, BARN)], uttaksplan);
    if (valgtSak) {
        queryClient.setQueryData(['SAKER'], { ...saker, foreldrepenger: [valgtSak] });
    }

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: messages }}>
                <MemoryRouter initialEntries={[route]}>
                    <FpDataContext
                        initialState={{
                            [ContextDataType.OM_BARNET]: BARN,
                            [ContextDataType.ANNEN_FORELDER]: ANNEN_FORELDER,
                            ...initialState,
                        }}
                        onDispatch={onDispatch}
                    >
                        {children}
                    </FpDataContext>
                </MemoryRouter>
            </IntlProvider>
        </QueryClientProvider>
    );
};

describe('useTidligereUttaksplan', () => {
    it('beholder tidligere fallback når valgt saksnummer ikke finnes i sakslisten', () => {
        const { result } = renderHook(
            () => ({ tidligere: useTidligereUttaksplan(), state: useContextComplete() }),
            {
                wrapper: getWrapper(lagUttaksplan(PERIODER), {
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: 'annen-sak',
                }),
            },
        );
        expect(result.current.tidligere.perioder).toEqual(PERIODER);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual({
            saksnummer: 'annen-sak',
            perioder: PERIODER,
        });
    });

    it.each([false, true])(
        'beholder hele planen og snapshot for vedtak, kan søke om endring: %s',
        (kanSøkeOmEndring) => {
            const perioder: UttakPeriodeDto_fpoversikt[] = [
                ...PERIODER,
                { fom: '2025-02-03', tom: '2025-02-14', annenPartEøs: { kontoType: 'FELLESPERIODE', trekkdager: 10 } },
            ];
            const snapshot = { saksnummer: SAKSNUMMER, perioder };
            const { result } = renderHook(
                () => ({
                    tidligere: useTidligereUttaksplan(),
                    reset: useResetUttaksplanData(),
                    state: useContextComplete(),
                    steps: useStepConfig({ arbeidsforhold: [], harRegistrertNæring: false }),
                }),
                {
                    wrapper: getWrapper(
                        lagUttaksplan(perioder),
                        { [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER, [ContextDataType.UTTAKSPLAN]: [] },
                        undefined,
                        SøknadRoutes.UTTAKSPLAN,
                        { ...SAK_MED_VEDTAK, kanSøkeOmEndring },
                    ),
                },
            );
            expect(result.current.tidligere.perioder).toEqual(perioder);
            expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(snapshot);
            expect(result.current.steps.some((step) => step.id === SøknadRoutes.FORDELING)).toBe(true);
            act(() => result.current.reset());
            expect(result.current.state.UTTAKSPLAN).toBeUndefined();
            expect(result.current.tidligere.perioder).toEqual(perioder);
            expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(snapshot);
        },
    );

    it('venter på sak før en mellomlagret plan tolkes som en søknad uten vedtak', async () => {
        const snapshot = { saksnummer: SAKSNUMMER, perioder: PERIODER };
        const { result } = renderHook(
            () => ({
                tidligere: useTidligereUttaksplan(),
                state: useContextComplete(),
                client: useQueryClient(),
                steps: useStepConfig({ arbeidsforhold: [], harRegistrertNæring: false }),
            }),
            {
                wrapper: getWrapper(
                    lagUttaksplan(PERIODER),
                    {
                        [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                        [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: snapshot,
                    },
                    undefined,
                    SøknadRoutes.UTTAKSPLAN,
                    null,
                ),
            },
        );
        expect(result.current.tidligere.isLoading).toBe(true);
        expect(result.current.tidligere.perioder).toBeUndefined();
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(snapshot);
        expect(result.current.steps.some((step) => step.id === SøknadRoutes.FORDELING)).toBe(true);

        act(() => {
            result.current.client.setQueryData(['SAKER'], { ...saker, foreldrepenger: [SAK_MED_VEDTAK] });
        });
        await waitFor(() => expect(result.current.tidligere.perioder).toEqual(PERIODER));
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(snapshot);
    });

    it('viser bakgrunnsfeil og beholder backendplanen i cache for en sak med vedtak', async () => {
        const onDispatch = vi.fn();
        const Wrapper = getWrapper(
            lagUttaksplan(PERIODER),
            { [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER },
            onDispatch,
            SøknadRoutes.UTTAKSPLAN,
            SAK_MED_VEDTAK,
        );
        const { result } = renderHook(
            () => ({ tidligere: useTidligereUttaksplan(), client: useQueryClient(), state: useContextComplete() }),
            {
                wrapper: ({ children }) => (
                    <Wrapper>
                        <ErrorBoundary appName="foreldrepengesoknad">{children}</ErrorBoundary>
                    </Wrapper>
                ),
            },
        );
        expect(result.current.tidligere.perioder).toEqual(PERIODER);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN?.perioder).toEqual(PERIODER);
        const client = result.current.client;
        const queryKey = ['UTTAKSPLAN', getUttaksplanParam(ANNEN_FORELDER, BARN)];
        await act(async () => {
            await expect(
                client.fetchQuery({
                    queryKey,
                    queryFn: () => Promise.reject(new Error('Bakgrunnsfeil')),
                    staleTime: 0,
                }),
            ).rejects.toThrow('Bakgrunnsfeil');
        });
        expect(await screen.findByText('Bakgrunnsfeil')).toBeInTheDocument();
        expect(client.getQueryData(queryKey)).toEqual(lagUttaksplan(PERIODER));
        expect(onDispatch.mock.calls).toEqual([
            [
                {
                    type: 'update',
                    key: ContextDataType.OPPRINNELIG_UTTAKSPLAN,
                    data: { saksnummer: SAKSNUMMER, perioder: PERIODER },
                },
            ],
        ]);
    });

    it('returnerer berre annan part sitt vedtak når ingen eksisterande sak er valt', () => {
        const samtidig: UttakPeriodeDto_fpoversikt = {
            fom: '2025-02-03',
            tom: '2025-02-14',
            søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false, samtidigUttak: 50 },
            annenPart: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                samtidigUttak: 50,
                resultat: INNVILGET,
            },
        };
        const eøs: UttakPeriodeDto_fpoversikt = {
            fom: '2025-03-03',
            tom: '2025-03-14',
            annenPartEøs: { kontoType: 'FELLESPERIODE', trekkdager: 10 },
        };

        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan([PERIODER[0]!, samtidig, eøs])),
        });

        expect(result.current.perioder).toEqual([
            { fom: samtidig.fom, tom: samtidig.tom, annenPart: samtidig.annenPart },
        ]);
        expect(result.current.isLoading).toBe(false);
    });

    it('ignorerer annan part sine periodar utan resultat når ingen eksisterande sak er valt', () => {
        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan(PERIODER)),
        });

        expect(result.current.perioder).toBeUndefined();
    });

    it('returnerer alle periodane når ei eksisterande sak er valt', () => {
        const { result } = renderHook(() => useTidligereUttaksplan(false, SAK_MED_VEDTAK), {
            wrapper: getWrapper(lagUttaksplan(PERIODER), { [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER }),
        });

        expect(result.current.perioder).toEqual(PERIODER);
    });

    it('returnerer undefined når uttaksplanen ikkje har periodar', () => {
        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan([])),
        });

        expect(result.current.perioder).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });

    it('lagrar snapshot av opprinneleg uttaksplan når ei eksisterande sak er valt', async () => {
        const onDispatch = vi.fn();

        renderHook(() => useTidligereUttaksplan(false, SAK_MED_VEDTAK), {
            wrapper: getWrapper(
                lagUttaksplan(PERIODER),
                { [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER },
                onDispatch,
            ),
        });

        await waitFor(() =>
            expect(onDispatch).toHaveBeenCalledWith({
                type: 'update',
                key: ContextDataType.OPPRINNELIG_UTTAKSPLAN,
                data: {
                    saksnummer: SAKSNUMMER,
                    perioder: PERIODER,
                },
            }),
        );
    });

    it('lagrar ikkje snapshot når ingen eksisterande sak er valt', () => {
        const onDispatch = vi.fn();

        renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan(PERIODER), undefined, onDispatch),
        });

        expect(onDispatch).not.toHaveBeenCalled();
    });

    it('overskriv ikkje eit eksisterande snapshot ved refetch', () => {
        const onDispatch = vi.fn();

        renderHook(() => useTidligereUttaksplan(false, SAK_MED_VEDTAK), {
            wrapper: getWrapper(
                lagUttaksplan(PERIODER),
                {
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: [] },
                },
                onDispatch,
            ),
        });

        expect(onDispatch).not.toHaveBeenCalled();
    });

    it.each([undefined, []])('henter ikke tilbake egen plan fra en eldre lagring med uttaksplan %j', (plan) => {
        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan(PERIODER), {
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                [ContextDataType.UTTAKSPLAN]: plan,
            }),
        });

        expect(result.current.perioder).toBeUndefined();
    });

    it('beholder opprinnelig plan etter manuell tømming, men ikke etter endret grunnlag', () => {
        const { result, rerender } = renderHook(
            () => ({
                tidligere: useTidligereUttaksplan(),
                reset: useResetUttaksplanData(),
                lagre: useContextSaveData(ContextDataType.UTTAKSPLAN),
                state: useContextComplete(),
            }),
            {
                wrapper: getWrapper(lagUttaksplan(PERIODER), {
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
                    [ContextDataType.UTTAKSPLAN]: PERIODER,
                }),
            },
        );
        act(() => result.current.lagre([]));
        rerender();
        expect(result.current.tidligere.perioder).toEqual(PERIODER);
        expect(result.current.state.UTTAKSPLAN).toEqual([]);

        act(() => result.current.reset());
        expect(result.current.tidligere.perioder).toBeUndefined();
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toBeUndefined();

        act(() => result.current.lagre([{ ...PERIODER[0]!, fom: '2025-02-01' }]));
        rerender();
        expect(result.current.tidligere.perioder).toBeUndefined();
    });

    it('beholder bare annen parts vedtak etter at egen plan er forkastet', () => {
        const annenPart = { ...PERIODER[1]!.annenPart!, resultat: INNVILGET };
        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan([PERIODER[0]!, { ...PERIODER[1]!, annenPart }]), {
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
            }),
        });
        expect(result.current.perioder).toEqual([{ ...PERIODER[1]!, annenPart }]);
    });

    it('forkaster snapshot fra en eldre lagring når gjeldende plan er undefined', () => {
        const { result } = renderHook(() => ({ tidligere: useTidligereUttaksplan(), state: useContextComplete() }), {
            wrapper: getWrapper(lagUttaksplan(PERIODER), {
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
            }),
        });
        expect(result.current.tidligere.perioder).toBeUndefined();
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toBeUndefined();
    });

    it('hopper over fordeling med gjenbrukt plan, men går til fordeling etter endret grunnlag', () => {
        const { result } = renderHook(
            () => ({
                navigator: useFpNavigator({
                    arbeidsforhold: [],
                    harRegistrertNæring: false,
                    mellomlagreOgNaviger: vi.fn(),
                }),
                state: useContextComplete(),
                reset: useResetUttaksplanData(),
            }),
            {
                wrapper: getWrapper(lagUttaksplan(PERIODER), {
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
                    [ContextDataType.UTTAKSPLAN]: PERIODER,
                }),
            },
        );
        act(() => result.current.navigator.goToNextStep());
        expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.UTTAKSPLAN);

        act(() => {
            result.current.reset();
            result.current.navigator.goToNextStep();
        });
        expect(result.current.state.APP_ROUTE).toBe(SøknadRoutes.FORDELING);
    });

    it.each([
        { plan: [], snapshot: true, forventet: SøknadRoutes.PERIODE_MED_FORELDREPENGER },
        { plan: PERIODER, snapshot: true, forventet: SøknadRoutes.PERIODE_MED_FORELDREPENGER },
        { plan: PERIODER, snapshot: false, forventet: SøknadRoutes.FORDELING },
    ])('går tilbake til $forventet med plan $plan og snapshot $snapshot', ({ plan, snapshot, forventet }) => {
        const { result } = renderHook(
            () => ({
                navigator: useFpNavigator({
                    arbeidsforhold: [],
                    harRegistrertNæring: false,
                    mellomlagreOgNaviger: vi.fn(),
                }),
                state: useContextComplete(),
            }),
            {
                wrapper: getWrapper(
                    lagUttaksplan(PERIODER),
                    {
                        [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: snapshot ? SAKSNUMMER : undefined,
                        [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: snapshot
                            ? { saksnummer: SAKSNUMMER, perioder: PERIODER }
                            : undefined,
                        [ContextDataType.UTTAKSPLAN]: plan,
                    },
                    undefined,
                    SøknadRoutes.UTTAKSPLAN,
                ),
            },
        );
        act(() => result.current.navigator.goToPreviousDefaultStep());
        expect(result.current.state.APP_ROUTE).toBe(forventet);
    });

    it('genererer fra oppdaterte svar uten å bruke den gamle planen igjen', () => {
        const { result } = renderHook(
            () => {
                const tidligere = useTidligereUttaksplan();
                return {
                    forslag: useUttaksplanForslag(
                        { kontoer: DELT_UTTAK_100, minsteretter: MINSTERETTER },
                        tidligere.perioder,
                        tidligere.isLoading,
                    ),
                    reset: useResetUttaksplanData(),
                    lagre: useContextSaveData(ContextDataType.UTTAKSPLAN),
                    steps: useStepConfig({ arbeidsforhold: [], harRegistrertNæring: false }),
                    state: useContextComplete(),
                };
            },
            {
                wrapper: getWrapper(lagUttaksplan(PERIODER), {
                    [ContextDataType.SØKERSITUASJON]: { rolle: 'mor', situasjon: 'fødsel' },
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
                    [ContextDataType.UTTAKSPLAN]: PERIODER,
                    [ContextDataType.FORDELING]: {
                        oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO,
                        oppstartDato: '2024-12-11',
                        fordelingValg: FellesperiodeFordelingValg.ALT,
                    },
                }),
            },
        );
        expect(result.current.forslag).toEqual([]);
        act(() => result.current.reset());
        expect(result.current.forslag[0]?.fom).toBe('2024-12-11');
        expect(result.current.forslag).not.toEqual(PERIODER);
        act(() => result.current.lagre(result.current.forslag));
        expect(result.current.steps.some((step) => step.id === SøknadRoutes.FORDELING)).toBe(true);
    });

    it('overskriver ikke redigert plan ved refetch eller gjenopptak', () => {
        const redigertPlan = [{ ...PERIODER[0]!, fom: '2025-02-01' }];
        const state: ContextDataMap = {
            [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
            [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
            [ContextDataType.UTTAKSPLAN]: redigertPlan,
        };
        const { result, unmount } = renderHook(
            () => ({
                tidligere: useTidligereUttaksplan(),
                state: useContextComplete(),
                client: useQueryClient(),
            }),
            { wrapper: getWrapper(lagUttaksplan(PERIODER), state) },
        );
        act(() => {
            result.current.client.setQueryData(
                ['UTTAKSPLAN', getUttaksplanParam(ANNEN_FORELDER, BARN)],
                lagUttaksplan([]),
            );
        });
        expect(result.current.state.UTTAKSPLAN).toEqual(redigertPlan);
        expect(result.current.tidligere.perioder).toEqual(PERIODER);
        unmount();
        const gjenopptatt = renderHook(() => ({ tidligere: useTidligereUttaksplan(), state: useContextComplete() }), {
            wrapper: getWrapper(lagUttaksplan([]), state),
        });
        expect(gjenopptatt.result.current.state.UTTAKSPLAN).toEqual(redigertPlan);
        expect(gjenopptatt.result.current.tidligere.perioder).toEqual(PERIODER);
    });

    it.each([
        { enabled: true, kommerFraPlanlegger: false },
        { enabled: false, kommerFraPlanlegger: false },
        { enabled: true, kommerFraPlanlegger: true },
    ])('samordner barn uten å endre planleggerimport: %j', ({ enabled, kommerFraPlanlegger }) => {
        const skalSamordne = enabled && !kommerFraPlanlegger;
        const vedtak = {
            ...lagUttaksplan(PERIODER),
            antallBarn: 2,
            termindato: '2025-01-02',
            perioder: [
                {
                    ...PERIODER[1]!,
                    annenPart: { ...PERIODER[1]!.annenPart!, resultat: INNVILGET },
                },
            ],
        };
        const { result } = renderHook(
            () => ({
                venter: useSamordneBarnMedAnnenPart(enabled),
                state: useContextComplete(),
            }),
            {
                wrapper: getWrapper(vedtak, {
                    [ContextDataType.KOMMER_FRA_PLANLEGGER]: kommerFraPlanlegger,
                    [ContextDataType.SØKERSITUASJON]: { rolle: 'far', situasjon: 'fødsel' },
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: { saksnummer: SAKSNUMMER, perioder: PERIODER },
                    [ContextDataType.UTTAKSPLAN]: PERIODER,
                }),
            },
        );
        expect(result.current.state.OM_BARNET).toEqual(
            skalSamordne ? { ...BARN, antallBarn: 2, termindato: '2025-01-02' } : BARN,
        );
        expect(result.current.state.UTTAKSPLAN).toEqual(skalSamordne ? undefined : PERIODER);
        expect(result.current.state.OPPRINNELIG_UTTAKSPLAN).toEqual(
            skalSamordne ? undefined : { saksnummer: SAKSNUMMER, perioder: PERIODER },
        );
        expect(result.current.venter).toBe(false);
    });
});
