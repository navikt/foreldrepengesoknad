import { renderHook } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { useGyldigeKvotetyper } from './kvoteRegler';

const FAMILIEHENDELSESDATO = '2024-06-17';

const HAR_VALGT_SAMTIDIG_UTTAK = true;

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
    valgtStønadskvote: {
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
    erPeriodeneTilAnnenPartLåst: false,
    children: [],
    erEndringssøknad: false,
} satisfies ComponentProps<typeof UttaksplanDataProvider>;

const getWrapper =
    (customData?: Partial<ComponentProps<typeof UttaksplanDataProvider>>) =>
    ({ children }: { children: ReactNode }) => (
        <UttaksplanDataProvider {...DEFAULT_DATA} {...customData}>
            {children}
        </UttaksplanDataProvider>
    );

describe('useGyldigeKvotetyper - mors kvoter', () => {
    it('skal ikke ha gyldige kontotyper for mor når far er søker og har aleneomsorg', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-18', tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'ALENEOMSORG',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når far er søker og bare søker har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-18', tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for mor når adopsjon og valgte dager er før familiehendelsesdato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-14', tom: '2024-06-18' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    barn: {
                        type: BarnType.ADOPTERT_ANNET_BARN,
                        antallBarn: 1,
                        adopsjonsdato: FAMILIEHENDELSESDATO,
                        fødselsdatoer: [FAMILIEHENDELSESDATO],
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for mor når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: FAMILIEHENDELSESDATO, tom: '2024-08-18' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    barn: {
                        type: BarnType.ADOPTERT_ANNET_BARN,
                        antallBarn: 1,
                        adopsjonsdato: FAMILIEHENDELSESDATO,
                        fødselsdatoer: [FAMILIEHENDELSESDATO],
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
        ]);
    });

    it('skal som mor ved fødsel ikke kunne velge fedrekvote ved valg av samtidig uttak', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-08-13', tom: '2024-08-18' }],
                    harValgtSamtidigUttak: HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['MØDREKVOTE', 'FELLESPERIODE', 'FORELDREPENGER']);
    });

    it('skal ikke ha gyldige perioder for mor når det er fødsel og det er valgt perioder på begge sider av familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [
                        { fom: '2024-06-13', tom: '2024-06-14' },
                        { fom: '2024-06-20', tom: '2024-06-21' },
                    ],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal kun ha foreldrepenger før fødsel i treukersperioden før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-14' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['FORELDREPENGER_FØR_FØDSEL']);
    });

    it.each([
        { beskrivelse: 'foreldrepenger før fødsel når familiehendelsesdato er valgt', fom: '2024-05-27' },
        { beskrivelse: 'foreldrepenger når en har valgt dag før tre uker før fødsel', fom: '2024-05-24' },
        { beskrivelse: 'noen gyldige kontotyper for mor når en har valgt dag mer enn 60 dager før fødsel', fom: '2024-03-24' },
    ])('skal ikke ha $beskrivelse', ({ fom }) => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom, tom: FAMILIEHENDELSESDATO }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual([]);
    });

    it('skal kun ha mors kvote i seksukersperioden etter fødsel når begge har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: FAMILIEHENDELSESDATO, tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['MØDREKVOTE']);
    });

    it('skal ha mors kvote og foreldrepenger-kvote i seksukersperioden etter fødsel når kun mor har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: FAMILIEHENDELSESDATO, tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['MØDREKVOTE', 'FORELDREPENGER']);
    });

    it('skal ha foreldrepenger som gyldig kontotype for mor når kun mor har rett og perioden er mer enn tre uker før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-04-22', tom: '2024-05-24' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toContain('FORELDREPENGER');
    });

    it('skal ha foreldrepenger som gyldig kontotype for mor med aleneomsorg og perioden er mer enn tre uker før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-04-22', tom: '2024-05-24' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'ALENEOMSORG',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toContain('FORELDREPENGER');
    });

    it('skal ikke ha foreldrepenger som gyldig kontotype for mor når kun mor har rett i treukersperioden før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-14' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['FORELDREPENGER_FØR_FØDSEL']);
    });

    it('skal ikke ha foreldrepenger som gyldig kontotype for mor med aleneomsorg i treukersperioden før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-14' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'ALENEOMSORG',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).toEqual(['FORELDREPENGER_FØR_FØDSEL']);
    });

    it('skal ikke ha foreldrepenger som gyldig kontotype for mor når kun mor har rett og perioden er mer enn 60 dager før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-03-24', tom: '2024-05-24' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        erMedmorDelAvSøknaden: false,
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForMor).not.toContain('FORELDREPENGER');
    });
});

describe('useGyldigeKvotetyper - fars kvoter', () => {
    it('skal ikke ha gyldige kontotyper for far når mor er søker og har aleneomsorg', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-18', tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'ALENEOMSORG',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når mor er søker og bare søker har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-18', tom: '2024-06-20' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'MOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige kontotyper for far når adopsjon og valgte dager er før familiehendelsesdato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-14', tom: '2024-06-18' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
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
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ha gyldige kontotyper for far når adopsjon og valgte dager er lik eller etter familiehendelsesdato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: FAMILIEHENDELSESDATO, tom: '2024-06-18' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
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
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([
            'MØDREKVOTE',
            'FEDREKVOTE',
            'FELLESPERIODE',
            'FORELDREPENGER',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal som far ved fødsel ikke kunne velge mødrekvote ved valg av samtidig uttak', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: FAMILIEHENDELSESDATO, tom: '2024-08-18' }],
                    harValgtSamtidigUttak: HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([
            'FEDREKVOTE',
            'FORELDREPENGER',
            'AKTIVITETSFRI_KVOTE',
        ]);
    });

    it('skal ikke ha gyldige perioder for far når det er fødsel og det er valgt perioder før to uker før familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [
                        { fom: '2024-05-31', tom: '2024-06-14' },
                        { fom: '2024-06-20', tom: '2024-06-21' },
                    ],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha gyldige perioder for far når det er valgt perioder både før og etter familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [
                        { fom: '2024-06-03', tom: '2024-06-14' },
                        { fom: '2024-06-20', tom: '2024-06-21' },
                    ],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal tillate periode som krysser familiehendelsedato for far når kun far har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-13', tom: '2024-06-21' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor.length).toBeGreaterThan(0);
    });

    it('skal tillate perioder både før og etter familiehendelsedato for far når kun far har rett', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [
                        { fom: '2024-06-03', tom: '2024-06-14' },
                        { fom: '2024-06-20', tom: '2024-06-21' },
                    ],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BARE_SØKER_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor.length).toBeGreaterThan(0);
    });

    it('skal ikke ha gyldige perioder for far når én periode krysser familiehendelsedato', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-06-13', tom: '2024-06-21' }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper({
                    foreldreInfo: {
                        søker: 'FAR_MEDMOR',
                        rettighetType: 'BEGGE_RETT',
                        navnPåForeldre: NAVN_PÅ_FORELDRE,
                        erMedmorDelAvSøknaden: false,
                    },
                }),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    it('skal ikke ha noen gyldige kontotyper for far når en har valgt dag mer enn 60 dager før fødsel', () => {
        const { result } = renderHook(
            () =>
                useGyldigeKvotetyper({
                    valgtePerioder: [{ fom: '2024-03-24', tom: FAMILIEHENDELSESDATO }],
                    harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                    ønskerFlerbarnsdager: false,
                }),
            {
                wrapper: getWrapper(),
            },
        );

        expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
    });

    // Barn født etter termin: far skal kunne starte 2 uker før termindato, ikke fødselsdato
    describe('barn født etter termin', () => {
        const TERMINDATO = '2024-06-10'; // Termin mandag 10. juni
        // familiehendelsedato = 2024-06-17 (1 uke etter termin)
        // termindato - 10 uttaksdager = mandag 27. mai = tidligst tillatt startdato for far

        const barnMedTermindato = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: [FAMILIEHENDELSESDATO],
            termindato: TERMINDATO,
        } satisfies ComponentProps<typeof UttaksplanDataProvider>['barn'];

        it('skal ha gyldige kontotyper for far (begge rett) når perioden starter nøyaktig 2 uker før termindato', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-09' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BEGGE_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toContain('FEDREKVOTE');
        });

        it('skal ha gyldige kontotyper for far (bare far rett) når perioden starter nøyaktig 2 uker før termindato', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-21' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BARE_SØKER_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toContain('FEDREKVOTE');
        });

        it('skal ikke ha gyldige kontotyper for far (begge rett) når perioden starter før 2 uker før termindato', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-24', tom: '2024-06-09' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BEGGE_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
        });
    });

    // Barn født før termin: grensen skal følge den tidligste datoen (fødsel), altså
    // 2 uker før fødsel. Vi bruker den tidligste av fødsel og termin, og regner 2 uker
    // (10 uttaksdager) før den.
    describe('barn født før termin', () => {
        const FØDSELSDATO = '2024-06-10'; // Født mandag 10. juni
        const TERMINDATO = '2024-06-17'; // Termin mandag 17. juni (1 uke etter fødsel)
        // fødsel − 2 uker = mandag 27. mai = tidligst tillatt startdato for far

        const barnFødtFørTermin = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: [FØDSELSDATO],
            termindato: TERMINDATO,
        } satisfies ComponentProps<typeof UttaksplanDataProvider>['barn'];

        it('skal ha gyldige kontotyper for far når perioden starter nøyaktig 2 uker før fødsel', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-07' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnFødtFørTermin,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BEGGE_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toContain('FEDREKVOTE');
        });

        it('skal ikke ha gyldige kontotyper for far når perioden starter før 2 uker før fødsel', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-24', tom: '2024-06-07' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnFødtFørTermin,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BEGGE_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toEqual([]);
        });
    });

    // Regresjonstest for far med aleneomsorg (eller bare søker rett): FORELDREPENGER
    // må følge samme to-ukers-grense som fedrekvote/mødrekvote/aktivitetsfri kvote,
    // siden det ikke finnes noen annen forelder som kan dekke dagene før fødsel/termin.
    describe('far med aleneomsorg — foreldrepenger før termin/fødsel', () => {
        const TERMINDATO = '2024-06-10'; // Termin mandag 10. juni
        // familiehendelsedato = 2024-06-17 (1 uke etter termin, barnet født etter termin)
        // termindato - 2 uker (10 uttaksdager) = mandag 27. mai = tidligst tillatt startdato

        const barnMedTermindato = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: [FAMILIEHENDELSESDATO],
            termindato: TERMINDATO,
        } satisfies ComponentProps<typeof UttaksplanDataProvider>['barn'];

        it('skal ha foreldrepenger som gyldig kontotype for far med aleneomsorg når perioden starter nøyaktig 2 uker før termin', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-21' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'ALENEOMSORG',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).toContain('FORELDREPENGER');
        });

        it('skal ikke ha foreldrepenger som gyldig kontotype for far med aleneomsorg når perioden starter før 2 uker før termin', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-24', tom: '2024-06-21' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'ALENEOMSORG',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).not.toContain('FORELDREPENGER');
        });

        it('skal fortsatt ikke ha foreldrepenger som gyldig kontotype for far med begge rett før familiehendelsesdato', () => {
            const { result } = renderHook(
                () =>
                    useGyldigeKvotetyper({
                        valgtePerioder: [{ fom: '2024-05-27', tom: '2024-06-21' }],
                        harValgtSamtidigUttak: !HAR_VALGT_SAMTIDIG_UTTAK,
                        ønskerFlerbarnsdager: false,
                    }),
                {
                    wrapper: getWrapper({
                        barn: barnMedTermindato,
                        foreldreInfo: {
                            søker: 'FAR_MEDMOR',
                            rettighetType: 'BEGGE_RETT',
                            navnPåForeldre: NAVN_PÅ_FORELDRE,
                            erMedmorDelAvSøknaden: false,
                        },
                    }),
                },
            );

            expect(result.current.gyldigeStønadskontoerForFarMedmor).not.toContain('FORELDREPENGER');
        });
    });
});
