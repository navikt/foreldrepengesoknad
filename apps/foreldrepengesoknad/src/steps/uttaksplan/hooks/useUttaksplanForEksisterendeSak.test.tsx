import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { sakerOptions } from 'api/queries';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { ReactNode } from 'react';

import { Saker_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanForEksisterendeSak } from './useUttaksplanForEksisterendeSak';

vi.mock('./useLoggOverlappIVedtak', () => ({
    useLoggOverlappIVedtak: vi.fn(),
}));

const SAKSNUMMER = '123456789';

const getWrapper = (saker: Saker_fpoversikt) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    queryClient.setQueryData(sakerOptions().queryKey, saker);

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <FpDataContext initialState={{ [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: SAKSNUMMER }}>
                {children}
            </FpDataContext>
        </QueryClientProvider>
    );
};

describe('useUttaksplanForEksisterendeSak', () => {
    it('testcase 0 - mor har samtidigattak, søkar (far) sine periodar skal justerast', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-10-01',
                tom: '2025-10-14',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-12-11',
                tom: '2026-01-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-09-22',
                tom: '2025-09-30',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-10-01', tom: '2025-12-10', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            { fom: '2025-12-11', tom: '2026-01-13', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2026-01-14',
                tom: '2026-01-30',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-02-02',
                tom: '2026-05-05',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2025-10-01' },
                    forelder: 'MOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: true,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        expect(result.current).toEqual([
            {
                fom: '2025-09-22',
                tom: '2025-09-30',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            {
                fom: '2025-10-01',
                tom: '2025-10-14',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-10-01',
                tom: '2025-10-14',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            { fom: '2025-10-15', tom: '2025-12-10', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-12-11',
                tom: '2026-01-13',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2026-01-14',
                tom: '2026-01-30',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-12-11',
                tom: '2026-01-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2026-02-02',
                tom: '2026-05-05',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('testcase 1 - far har samtidigattak, annenpart (mor) sine periodar skal justerast', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-01-23',
                tom: '2025-01-27',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-01-28',
                tom: '2025-02-17',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-02-18', tom: '2025-06-02', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-06-03',
                tom: '2025-08-01',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-02-17',
                tom: '2025-02-28',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-08-04',
                tom: '2025-09-17',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-09-18',
                tom: '2025-10-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-03-30',
                tom: '2026-04-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-04-07',
                tom: '2026-04-07',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2025-02-18' },
                    forelder: 'FAR_MEDMOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: false,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        expect(result.current).toEqual([
            {
                fom: '2025-01-23',
                tom: '2025-01-27',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-01-28',
                tom: '2025-02-14',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            {
                fom: '2025-02-17',
                tom: '2025-02-28',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-02-17',
                tom: '2025-02-17',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2025-02-18',
                tom: '2025-02-28',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            { fom: '2025-03-03', tom: '2025-06-02', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-06-03',
                tom: '2025-08-01',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-08-04',
                tom: '2025-09-17',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-09-18',
                tom: '2025-10-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-03-30',
                tom: '2026-04-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-04-07',
                tom: '2026-04-07',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('testcase 2 - annenpart har overlappande periode utan samtidigattak som skal kastast', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-03-24',
                tom: '2025-04-03',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-04-04', tom: '2025-05-29', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            { fom: '2025-07-07', tom: '2025-09-19', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-09-22',
                tom: '2026-02-09',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-02-10',
                tom: '2026-02-17',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-02-10',
                tom: '2026-06-22',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2025-04-04' },
                    forelder: 'FAR_MEDMOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: false,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        expect(result.current).toEqual([
            {
                fom: '2025-03-24',
                tom: '2025-04-03',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-04-04', tom: '2025-05-29', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            { fom: '2025-07-07', tom: '2025-09-19', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-09-22',
                tom: '2026-02-09',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-02-10',
                tom: '2026-06-22',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('testcase 3 - same som testcase 2, men søker er mor', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-02-10',
                tom: '2026-06-22',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-03-24',
                tom: '2025-04-03',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-04-04', tom: '2025-05-29', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            { fom: '2025-07-07', tom: '2025-09-19', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-09-22',
                tom: '2026-02-09',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-02-10',
                tom: '2026-02-17',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2025-04-04' },
                    forelder: 'MOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: true,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        expect(result.current).toEqual([
            {
                fom: '2025-03-24',
                tom: '2025-04-03',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2025-04-04', tom: '2025-05-29', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            { fom: '2025-07-07', tom: '2025-09-19', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2025-09-22',
                tom: '2026-02-17',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-02-18',
                tom: '2026-06-22',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('testcase 4 - søker sin periode med utsettelseÅrsak skal ikkje kaste annenpart sin periode', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-02-27',
                tom: '2026-04-24',
                forelder: 'FAR_MEDMOR',
                kontoType: 'MØDREKVOTE',
                overføringÅrsak: 'SYKDOM_ANNEN_FORELDER',
                flerbarnsdager: false,
            },
            {
                fom: '2026-11-20',
                tom: '2027-04-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-02-09',
                tom: '2026-02-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2026-02-19', tom: '2026-02-26', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2026-03-30',
                tom: '2026-04-01',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                utsettelseÅrsak: 'FRI',
                flerbarnsdager: false,
            },
            {
                fom: '2026-07-02',
                tom: '2026-11-19',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2026-02-27' },
                    forelder: 'MOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: true,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        expect(result.current).toEqual([
            {
                fom: '2026-02-09',
                tom: '2026-02-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            { fom: '2026-02-19', tom: '2026-02-26', forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            {
                fom: '2026-02-27',
                tom: '2026-04-24',
                forelder: 'FAR_MEDMOR',
                kontoType: 'MØDREKVOTE',
                overføringÅrsak: 'SYKDOM_ANNEN_FORELDER',
                flerbarnsdager: false,
            },
            {
                fom: '2026-07-02',
                tom: '2026-11-19',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-11-20',
                tom: '2027-04-01',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });
    it('testcase 5 - regel 1: søkar sin ARBEID-utsettelse vert trimma der den overlappar annenPart, resten vert beholdt', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-03-15',
                tom: '2026-04-15',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-03-01',
                tom: '2026-03-31',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                utsettelseÅrsak: 'ARBEID',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2026-01-01' },
                    forelder: 'FAR_MEDMOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: false,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        // Søkar sin ARBEID-utsettelse [03-01 til 03-14] overlappar ikkje annenPart og skal overleve.
        // Den overlappande delen [03-15 til 03-31] vert kasta av regel 1.
        // ARBEID er ikkje FRI, så fjernFrieUtsettelser fjernar den ikkje.
        expect(result.current).toEqual([
            {
                fom: '2026-03-01',
                tom: '2026-03-13',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                utsettelseÅrsak: 'ARBEID',
                flerbarnsdager: false,
            },
            {
                fom: '2026-03-15',
                tom: '2026-04-15',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('testcase 6 - regel 2: kun annenPart har samtidigattak, søkar vert markert for den overlappande delen', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-15',
                tom: '2026-06-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-05-01',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2026-01-01' },
                    forelder: 'MOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: true,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        // Søkar [05-01 til 05-14] overlappar ikkje annenPart, inga endring.
        // Søkar [05-15 til 05-31] overlappar annenPart med samtidigattak → markert med samtidigattak: 100.
        // AnnenPart [05-15 til 06-20] vert slått saman frå to split-segment sidan dei er tilstøytande og like.
        expect(result.current).toEqual([
            {
                fom: '2026-05-01',
                tom: '2026-05-14',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-05-15',
                tom: '2026-05-31',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2026-05-15',
                tom: '2026-06-20',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ]);
    });

    it('testcase 7 - regel 1 har prioritet over regel 2: utsettelse+samtidigattak markerer ikkje søkar med samtidigattak', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-07-01',
                tom: '2026-07-31',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-07-10',
                tom: '2026-07-20',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2026-01-01' },
                    forelder: 'MOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: true,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        // Annen part sin utsettelse [07-10 til 07-20] overlappar søkar → vert kasta av regel 1.
        // Utan regel 1 ville søkar vorte markert med samtidigattak av regel 2.
        // Søkar [07-10 til 07-20] skal IKKJE ha samtidigattak.
        // Annen part sin ikke-overlappande del [07-01 til 07-09] og [07-21 til 07-31] overlever.
        expect(result.current).toEqual([
            {
                fom: '2026-07-01',
                tom: '2026-07-09',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
            {
                fom: '2026-07-10',
                tom: '2026-07-20',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2026-07-21',
                tom: '2026-07-31',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
                samtidigUttak: 100,
            },
        ]);
    });

    it('testcase 8 - regel 4: annenPart heilt omslutta av søkar sin periode, heile annenPart-perioden fjernast', () => {
        const perioderAnnenPart: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-09-10',
                tom: '2026-09-20',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const perioderSøker: UttakPeriode_fpoversikt[] = [
            {
                fom: '2026-09-01',
                tom: '2026-09-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ];

        const saker: Saker_fpoversikt = {
            engangsstønad: [],
            svangerskapspenger: [],
            foreldrepenger: [
                {
                    saksnummer: SAKSNUMMER,
                    familiehendelse: { antallBarn: 1, fødselsdato: '2026-01-01' },
                    forelder: 'FAR_MEDMOR',
                    gjelderAdopsjon: false,
                    kanSøkeOmEndring: true,
                    morUføretrygd: false,
                    oppdatertTidspunkt: '2025-01-01T00:00:00',
                    rettighetType: 'BEGGE_RETT',
                    sakAvsluttet: false,
                    sakTilhørerMor: false,
                    gjeldendeVedtak: { perioder: perioderSøker },
                },
            ],
        };

        const { result } = renderHook(() => useUttaksplanForEksisterendeSak(perioderAnnenPart), {
            wrapper: getWrapper(saker),
        });

        // AnnenPart [09-10 til 09-20] er heilt omslutta av søkar [09-01 til 09-30].
        // Regel 4 fjernar heile annenPart-perioden.
        // Søkar sine tre split-segment vert slått saman att til éin periode.
        expect(result.current).toEqual([
            {
                fom: '2026-09-01',
                tom: '2026-09-30',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                flerbarnsdager: false,
            },
        ]);
    });
});
