import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { Action, ContextDataMap, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { ReactNode } from 'react';
import { AnnenForelder } from 'types/AnnenForelder';
import { getUttaksplanParam } from 'utils/annenForelderUtils';

import { BarnType } from '@navikt/fp-constants';
import { Barn, FellesUttaksplanDto_fpoversikt, PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { useTidligereUttaksplan } from './useTidligereUttaksplan';

const SAKSNUMMER = '123456789';

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

const PERIODER: PeriodeDto_fpoversikt[] = [
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

const lagUttaksplan = (perioder: PeriodeDto_fpoversikt[]): FellesUttaksplanDto_fpoversikt => ({
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder,
});

const getWrapper = (
    uttaksplan: FellesUttaksplanDto_fpoversikt,
    initialState?: ContextDataMap,
    onDispatch?: (action: Action) => void,
) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    queryClient.setQueryData(['UTTAKSPLAN', getUttaksplanParam(ANNEN_FORELDER, BARN)], uttaksplan);

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
};

describe('useTidligereUttaksplan', () => {
    it('returnerer periodane frå uttaksplan-endepunktet', () => {
        const { result } = renderHook(() => useTidligereUttaksplan(), {
            wrapper: getWrapper(lagUttaksplan(PERIODER)),
        });

        expect(result.current.perioder).toEqual(PERIODER);
        expect(result.current.isLoading).toBe(false);
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

        renderHook(() => useTidligereUttaksplan(), {
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

        renderHook(() => useTidligereUttaksplan(), {
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
});
