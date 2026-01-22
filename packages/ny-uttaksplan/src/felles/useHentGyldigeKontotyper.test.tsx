import { renderHook } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { useHentGyldigeKontotyper } from './useHentGyldigeKontotyper';

const FAMILIEHENDELSESDATO = '2024-06-17';

const NAVN_PÅ_FORELDRE = {
    farMedmor: 'Far Medmor',
    mor: 'Mor',
};

const DEFAULT_DATA = {
    foreldreInfo: {
        søker: 'MOR',
        rettighetType: 'BEGGE_RETT',
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: NAVN_PÅ_FORELDRE,
    },
    valgtStønadskonto: {
        kontoer: [
            { konto: 'MØDREKVOTE', dager: 100 },
            { konto: 'FEDREKVOTE', dager: 100 },
            { konto: 'FELLESPERIODE', dager: 100 },
            { konto: 'FORELDREPENGER', dager: 100 },
            { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 100 },
            { konto: 'AKTIVITETSFRI_KVOTE', dager: 100 },
        ],
        minsteretter: {
            farRundtFødsel: 10,
            toTette: 14,
        },
    },
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: [FAMILIEHENDELSESDATO],
    },
    harAktivitetskravIPeriodeUtenUttak: false,
    uttakPerioder: [],
    children: [],
} satisfies ComponentProps<typeof UttaksplanDataProvider>;

const getWrapper =
    (customData?: Partial<ComponentProps<typeof UttaksplanDataProvider>>) =>
    ({ children }: { children: ReactNode }) => (
        <UttaksplanDataProvider {...DEFAULT_DATA} {...customData}>
            {children}
        </UttaksplanDataProvider>
    );

describe('useHentGyldigeKontotyper - mors kvoter', () => {
    it('skal ikke ha gyldige kontotyper for mor når far er søker og har aleneomsorg', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'ALENEOMSORG',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når far er søker og bare søker har rett', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BARE_SØKER_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når adopsjon og valgte dager er før familiehendelsesdato', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-14', tom: '2024-06-18' }]), {
            wrapper: getWrapper({
                barn: {
                    type: BarnType.ADOPTERT_ANNET_BARN,
                    antallBarn: 1,
                    adopsjonsdato: FAMILIEHENDELSESDATO,
                    fødselsdatoer: [FAMILIEHENDELSESDATO],
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for mor når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-17', tom: '2024-08-18' }]), {
            wrapper: getWrapper({
                barn: {
                    type: BarnType.ADOPTERT_ANNET_BARN,
                    antallBarn: 1,
                    adopsjonsdato: FAMILIEHENDELSESDATO,
                    fødselsdatoer: [FAMILIEHENDELSESDATO],
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
        ]);
    });

    it('skal ikke ha gyldige perioder for mor når det er fødsel og det er valgt perioder på begge sider av familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useHentGyldigeKontotyper([
                    { fom: '2024-06-13', tom: '2024-06-14' },
                    { fom: '2024-06-20', tom: '2024-06-21' },
                ]),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal kun ha foreldrepenger før fødsel i treukersperioden før fødsel', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-05-27', tom: '2024-06-14' }]), {
            wrapper: getWrapper(),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['FORELDREPENGER_FØR_FØDSEL']);
    });

    it('skal ikke ha foreldrepenger før fødsel når familiehendelsesdato er valgt', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-05-27', tom: '2024-06-17' }]), {
            wrapper: getWrapper(),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha foreldrepenger når en har valgt dag før tre uker før fødsel', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-05-24', tom: '2024-06-17' }]), {
            wrapper: getWrapper(),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha noen gyldige kontotyper for mor når en har valgt dag mer enn 60 dager før fødsel', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-03-24', tom: '2024-06-17' }]), {
            wrapper: getWrapper(),
        });

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });
});

describe('useHentGyldigeKontotyper - fars kvoter', () => {
    it('skal ikke ha gyldige kontotyper for far når mor er søker og har aleneomsorg', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'MOR',
                    rettighetType: 'ALENEOMSORG',
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                    erMedmorDelAvSøknaden: false,
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når mor er søker og bare søker har rett', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-18', tom: '2024-06-20' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'MOR',
                    rettighetType: 'BARE_SØKER_RETT',
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                    erMedmorDelAvSøknaden: false,
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når adopsjon og valgte dager er før familiehendelsesdato', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-14', tom: '2024-06-18' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                    erMedmorDelAvSøknaden: false,
                },
                barn: {
                    type: BarnType.ADOPTERT_ANNET_BARN,
                    antallBarn: 1,
                    adopsjonsdato: FAMILIEHENDELSESDATO,
                    fødselsdatoer: [FAMILIEHENDELSESDATO],
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for mor når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-06-17', tom: '2024-06-18' }]), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    navnPåForeldre: NAVN_PÅ_FORELDRE,
                    erMedmorDelAvSøknaden: false,
                },
                barn: {
                    type: BarnType.ADOPTERT_ANNET_BARN,
                    antallBarn: 1,
                    adopsjonsdato: FAMILIEHENDELSESDATO,
                    fødselsdatoer: [FAMILIEHENDELSESDATO],
                },
            }),
        });

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal ikke ha gyldige perioder for far når det er fødsel og det er valgt perioder før to uker før familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useHentGyldigeKontotyper([
                    { fom: '2024-05-31', tom: '2024-06-14' },
                    { fom: '2024-06-20', tom: '2024-06-21' },
                ]),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_ELLER_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ha gyldige perioder for far når det er fødsel og det er valgt perioder to uker før familiehendelsedato og periode etter', () => {
        const { result } = renderHook(
            () =>
                useHentGyldigeKontotyper([
                    { fom: '2024-06-03', tom: '2024-06-14' },
                    { fom: '2024-06-20', tom: '2024-06-21' },
                ]),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_ELLER_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal ikke ha noen gyldige kontotyper for far når en har valgt dag mer enn 60 dager før fødsel', () => {
        const { result } = renderHook(() => useHentGyldigeKontotyper([{ fom: '2024-03-24', tom: '2024-06-17' }]), {
            wrapper: getWrapper(),
        });

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });
});
