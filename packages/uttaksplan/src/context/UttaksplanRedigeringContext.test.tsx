import { act, renderHook } from '@testing-library/react';
import { PropsWithChildren, StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriodeDto } from '@navikt/fp-types';

import { UttaksplanDataProvider } from './UttaksplanDataContext';
import { UttaksplanRedigeringProvider, useUttaksplanRedigering } from './UttaksplanRedigeringContext';

const lagPlan = (fom: string, tom: string): UttakPeriodeDto[] => [
    { fom, tom, søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false } },
];

describe('UttaksplanRedigeringContext', () => {
    it('kaller oppdaterUttaksplan én gang med forrige versjon ved angring i StrictMode', () => {
        const oppdater = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => (
            <StrictMode>
                <UttaksplanDataProvider
                    barn={{ type: BarnType.FØDT, antallBarn: 1, fødselsdatoer: ['2024-06-17'] }}
                    foreldreInfo={{
                        søker: 'MOR',
                        rettighetType: 'BEGGE_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: { mor: 'Mor', farMedmor: 'Far' },
                    }}
                    valgtStønadskvote={{ kontoer: [], minsteretter: { farRundtFødsel: 10, toTette: 14 } }}
                    harAktivitetskravIPeriodeUtenUttak={false}
                    erPeriodeneTilAnnenPartLåst={false}
                    erEndringssøknad={false}
                    perioder={[]}
                >
                    <UttaksplanRedigeringProvider harEndretPlan oppdaterUttaksplan={oppdater}>
                        {children}
                    </UttaksplanRedigeringProvider>
                </UttaksplanDataProvider>
            </StrictMode>
        );
        const { result } = renderHook(() => useUttaksplanRedigering(), { wrapper });

        const førstePlan = lagPlan('2024-06-17', '2024-06-28');
        const andrePlan = lagPlan('2024-06-17', '2024-07-05');
        act(() => result.current?.oppdaterUttaksplan(førstePlan));
        act(() => result.current?.oppdaterUttaksplan(andrePlan));
        oppdater.mockClear();

        act(() => result.current?.angreSisteEndring());

        expect(oppdater).toHaveBeenCalledTimes(1);
        expect(oppdater).toHaveBeenCalledWith(førstePlan);
        expect(result.current?.uttaksplanVersjoner).toEqual([førstePlan]);
    });
});
