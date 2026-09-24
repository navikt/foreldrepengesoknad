import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BarnType } from '@navikt/fp-constants';
import { KontoBeregningDto, KontoDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import { ForeldreInfo } from '../types/ForeldreInfo';
import {
    beregnKvoteFordeling,
    finnAntallDagerDerKunEnHarForeldrepenger,
    finnDinPlanKvoteRader,
    getUttaksKontoType,
    summerDagerIPerioder,
} from './kvoteBeregning';
import { useErAntallDagerOvertrukketIUttaksplan, useUbrukteDagerPerKontoKunEnHarRett } from './kvoteOppsummeringUtils';

const FAMILIEHENDELSESDATO = '2024-04-01'; // Mandag

const KONTOER: KontoBeregningDto = {
    kontoer: [
        { konto: 'MØDREKVOTE', dager: 75 },
        { konto: 'FEDREKVOTE', dager: 75 },
        { konto: 'FELLESPERIODE', dager: 80 },
        { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
    ],
    minsteretter: { farRundtFødsel: 0, toTette: 0 },
    tillegg: { flerbarn: 0, prematur: 0 },
};

const lagMorsMødrekvotePeriode = (fom: string, tom: string, arbeidstidprosent?: number): UttakPeriode_fpoversikt => ({
    fom,
    tom,
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    gradering: arbeidstidprosent ? { arbeidstidprosent, aktivitet: { type: 'ORDINÆRT_ARBEID' } } : undefined,
});

describe('summerDagerIPerioder – mors gradering i 3v før / 6v etter familiehendelse', () => {
    it('skal trekke 30 fulle dager (6 uker) når mor jobbar 50 % heile seksvekersperioden etter fødsel', () => {
        const seksUkerEtterFødsel = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10', 50);

        const dager = summerDagerIPerioder([seksUkerEtterFødsel], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(30);
    });

    it('skal trekke 15 fulle dager (3 uker) når mor jobbar 50 % heile treukersperioden før fødsel på FORELDREPENGER_FØR_FØDSEL', () => {
        const treUkerFørFødsel: UttakPeriode_fpoversikt = {
            fom: '2024-03-11',
            tom: '2024-03-29',
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            flerbarnsdager: false,
            gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
        };

        const dager = summerDagerIPerioder([treUkerFørFødsel], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });

    it('skal trekke gradert (halvparten av dagane) når mor jobbar 50 % utanfor vinduet', () => {
        // 4 uker (20 uttaksdager) startar etter 6 vekers-vinduet sluttar
        const utanforVindu = lagMorsMødrekvotePeriode('2024-05-13', '2024-06-07', 50);

        const dager = summerDagerIPerioder([utanforVindu], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(10);
    });

    it('skal splitte korrekt når perioden delvis overlappar vinduet', () => {
        // Periode startar 5 uker etter fødsel, varer i 4 uker (20 uttaksdager).
        // 5 uttaksdager fell innanfor 6v-vindauget, 15 utanfor.
        // Forventa: 5 fulle + 15 * 0.5 = 5 + 7.5 = 12.5 → floor = 12
        const delvisOverlapp = lagMorsMødrekvotePeriode('2024-05-06', '2024-05-31', 50);

        const dager = summerDagerIPerioder([delvisOverlapp], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(12);
    });

    it('skal IKKJE bruka spesialregel for adopsjon', () => {
        const seksUker = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10', 50);

        const dager = summerDagerIPerioder([seksUker], KONTOER.kontoer, 'adopsjon', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });

    it('skal IKKJE bruka spesialregel for far/medmor sin gradering', () => {
        const farsPeriode: UttakPeriode_fpoversikt = {
            fom: '2024-04-01',
            tom: '2024-05-10',
            forelder: 'FAR_MEDMOR',
            kontoType: 'MØDREKVOTE',
            flerbarnsdager: false,
            gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
        };

        const dager = summerDagerIPerioder([farsPeriode], KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(dager).toBe(15);
    });
});

describe('summerDagerIPerioder – summering av graderte dagar (ingen flyttalsfeil)', () => {
    const lagFellesperiodeEndag = (dato: string): UttakPeriode_fpoversikt => ({
        fom: dato,
        tom: dato,
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        flerbarnsdager: false,
        gradering: { arbeidstidprosent: 40, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
    });

    it('skal telje 6 dagar (ikkje 5) for ti graderte endagsperiodar à 0,6 dag', () => {
        // Kvar dag med 40 % arbeid trekkjer 0,6 dag. 10 × 0,6 = 6,0 dagar.
        // I flyttal blir summen 5,999999999999999, og ein naiv Math.floor på
        // summen ville (feilaktig) gitt 5 og late ein fellesperiodedag stå att.
        const enUkedagPerHverdag = [
            '2024-04-01',
            '2024-04-02',
            '2024-04-03',
            '2024-04-04',
            '2024-04-05',
            '2024-04-08',
            '2024-04-09',
            '2024-04-10',
            '2024-04-11',
            '2024-04-12',
        ];
        const perioder = enUkedagPerHverdag.map(lagFellesperiodeEndag);

        const dager = summerDagerIPerioder(perioder, KONTOER.kontoer, 'adopsjon', FAMILIEHENDELSESDATO);

        expect(dager).toBe(6);
    });
});

describe('useUbrukteDagerPerKontoKunEnHarRett – overtrekk når kun far/medmor har rett', () => {
    const FORELDRE_INFO: ForeldreInfo = {
        søker: 'FAR_MEDMOR',
        navnPåForeldre: { mor: 'Helga', farMedmor: 'Espen' },
        rettighetType: 'BARE_SØKER_RETT',
        erMedmorDelAvSøknaden: false,
    };

    const lagWrapper =
        (valgtStønadskvote: KontoBeregningDto, uttakPerioder: UttakPeriode_fpoversikt[], termindato = '2025-05-06') =>
        ({ children }: { children: React.ReactNode }) => (
            <UttaksplanDataProvider
                barn={{ type: BarnType.UFØDT, termindato, antallBarn: 1 }}
                foreldreInfo={FORELDRE_INFO}
                valgtStønadskvote={valgtStønadskvote}
                harAktivitetskravIPeriodeUtenUttak
                erPeriodeneTilAnnenPartLåst={false}
                uttakPerioder={uttakPerioder}
                erEndringssøknad={false}
            >
                {children}
            </UttaksplanDataProvider>
        );

    it('skal rekne ut overtrukketDagerAktivitetsfri når aktivitetsfri kvote er brukt opp og overtrukket', () => {
        const valgtStønadskvote: KontoBeregningDto = {
            kontoer: [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 10 }],
            minsteretter: { farRundtFødsel: 0, toTette: 0 },
            tillegg: { flerbarn: 0, prematur: 0 },
        };
        const uttakPerioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-05-06',
                tom: '2025-06-13', // 6 uker, mer enn dei 10 dagane kontoen har
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ];
        const brukteDager = summerDagerIPerioder(uttakPerioder, valgtStønadskvote.kontoer, 'termin', '2025-05-06');

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(valgtStønadskvote, uttakPerioder),
        });

        expect(result.current.ubrukteDagerAktivitetsfri).toBe(0);
        expect(result.current.overtrukketDagerAktivitetsfri).toBe(brukteDager - 10);
    });

    it('skal rekne ut overtrukketDagerMedAktivitetskrav når foreldrepengekvote (med aktivitetskrav) er overtrukket', () => {
        const valgtStønadskvote: KontoBeregningDto = {
            kontoer: [{ konto: 'FORELDREPENGER', dager: 10 }],
            minsteretter: { farRundtFødsel: 0, toTette: 0 },
            tillegg: { flerbarn: 0, prematur: 0 },
        };
        const uttakPerioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-05-06',
                tom: '2025-06-13', // 6 uker, morsAktivitet ikkje IKKE_OPPGITT
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ];
        const brukteDager = summerDagerIPerioder(uttakPerioder, valgtStønadskvote.kontoer, 'termin', '2025-05-06');

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(valgtStønadskvote, uttakPerioder),
        });

        expect(result.current.ubrukteDagerMedAktivitetskrav).toBe(0);
        expect(result.current.overtrukketDagerMedAktivitetskrav).toBe(brukteDager - 10);
    });

    it('skal ikkje vise overtrekk når det framleis er ubrukte dagar igjen på kontoen', () => {
        const valgtStønadskvote: KontoBeregningDto = {
            kontoer: [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 50 }],
            minsteretter: { farRundtFødsel: 0, toTette: 0 },
            tillegg: { flerbarn: 0, prematur: 0 },
        };
        const uttakPerioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-05-06',
                tom: '2025-06-13', // langt færre dagar enn dei 50 kontoen har
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ];
        const brukteDager = summerDagerIPerioder(uttakPerioder, valgtStønadskvote.kontoer, 'termin', '2025-05-06');

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(valgtStønadskvote, uttakPerioder),
        });

        expect(result.current.ubrukteDagerAktivitetsfri).toBe(50 - brukteDager);
        expect(result.current.overtrukketDagerAktivitetsfri).toBe(0);
    });

    it('skal ta med ubrukte "før fødsel"-dagar i overtrekksberekninga for aktivitetskrav-kontoen', () => {
        const valgtStønadskvote: KontoBeregningDto = {
            kontoer: [
                { konto: 'FORELDREPENGER', dager: 5 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: { farRundtFødsel: 0, toTette: 0 },
            tillegg: { flerbarn: 0, prematur: 0 },
        };
        // Barnet er ikkje født enno (familiesituasjon 'termin'), så alle 15 dagane
        // på FORELDREPENGER_FØR_FØDSEL-kontoen er framleis ubrukte og skal leggjast
        // til den ordinære foreldrepengekontoen (5 + 15 = 20) før overtrekket blir rekna ut.
        const uttakPerioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2025-05-06',
                tom: '2025-06-13', // meir enn 20 dagar brukt
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ];
        const brukteDager = summerDagerIPerioder(uttakPerioder, valgtStønadskvote.kontoer, 'termin', '2025-05-06');

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(valgtStønadskvote, uttakPerioder),
        });

        expect(result.current.ubrukteDagerMedAktivitetskrav).toBe(0);
        expect(result.current.overtrukketDagerMedAktivitetskrav).toBe(brukteDager - 20);
    });
});

describe('finnDinPlanKvoteRader', () => {
    it('skal berre ta med rader for konti søkjaren faktisk har planlagt å bruke, i fast rekkefølgje', () => {
        const uttakPerioder: UttakPeriode_fpoversikt[] = [
            {
                fom: '2024-03-11', // 3 uker før fødsel (fom-tom = 15 dager)
                tom: '2024-03-29',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                flerbarnsdager: false,
            },
            {
                fom: '2024-04-01', // 20 uker mødrekvote (100 dager)
                tom: '2024-08-16',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
            },
            {
                fom: '2024-08-19', // 10 uker fellesperiode (50 dager)
                tom: '2024-10-25',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
            },
        ];

        const rader = finnDinPlanKvoteRader(uttakPerioder, 'MOR', KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(rader).toEqual([
            { kontoType: 'FORELDREPENGER_FØR_FØDSEL', bruktDager: 15, tilgjengeligDager: 15 },
            { kontoType: 'MØDREKVOTE', bruktDager: 100, tilgjengeligDager: 75 },
            { kontoType: 'FELLESPERIODE', bruktDager: 50, tilgjengeligDager: 80 },
        ]);
        // FEDREKVOTE finst på kontoen, men søkjar (mor) har ikkje planlagt noko der, og skal derfor ikkje vises.
        expect(rader.some((rad) => rad.kontoType === 'FEDREKVOTE')).toBe(false);
    });

    it('skal returnere rå dagtal (ikkje avrunda til uker) når søkjaren har planlagt mindre enn ei veke', () => {
        const toDagarFørFødsel: UttakPeriode_fpoversikt = {
            fom: '2024-03-28',
            tom: '2024-03-29', // 2 dager, mindre enn 5 dager (ei veke)
            forelder: 'MOR',
            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
            flerbarnsdager: false,
        };

        const rader = finnDinPlanKvoteRader([toDagarFørFødsel], 'MOR', KONTOER.kontoer, 'fødsel', FAMILIEHENDELSESDATO);

        expect(rader).toEqual([{ kontoType: 'FORELDREPENGER_FØR_FØDSEL', bruktDager: 2, tilgjengeligDager: 15 }]);
    });

    it('skal ikkje ta med periodar som tilhøyrer den andre forelderen', () => {
        const mødrekvotePeriodeTilMor = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10');
        const fedrekvotePeriodeTilFar: UttakPeriode_fpoversikt = {
            fom: '2024-05-13',
            tom: '2024-06-21',
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            flerbarnsdager: false,
        };

        const rader = finnDinPlanKvoteRader(
            [mødrekvotePeriodeTilMor, fedrekvotePeriodeTilFar],
            'MOR',
            KONTOER.kontoer,
            'fødsel',
            FAMILIEHENDELSESDATO,
        );

        // Kun mor sin eigen mødrekvoteperiode skal telje med – far sin fedrekvoteperiode skal ignorerast
        // sjølv om han ligg i den same uttaksplanen (delt uttak).
        expect(rader).toEqual([{ kontoType: 'MØDREKVOTE', bruktDager: 30, tilgjengeligDager: 75 }]);
    });

    it('skal ikkje ta med ein konto dersom han ikkje finst i kontoDto-lista, eller har 0 dagar tilgjengeleg', () => {
        const periode = lagMorsMødrekvotePeriode('2024-04-01', '2024-05-10');
        const kontoerUtenMødrekvote = KONTOER.kontoer.filter((k) => k.konto !== 'MØDREKVOTE');

        const rader = finnDinPlanKvoteRader([periode], 'MOR', kontoerUtenMødrekvote, 'fødsel', FAMILIEHENDELSESDATO);

        expect(rader).toEqual([]);
    });
});

describe('getUttaksKontoType – klassifisering av BFHR-periodar', () => {
    const BFHR_KONTOER: KontoDto[] = [
        { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
        { konto: 'FORELDREPENGER', dager: 150 },
    ];

    const lagFarsPeriode = (overstyr: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
        fom: '2025-05-05',
        tom: '2025-05-09',
        kontoType: 'FORELDREPENGER',
        flerbarnsdager: false,
        forelder: 'FAR_MEDMOR',
        ...overstyr,
    });

    it('skal bruke trekkerMinsterett framfor morsAktivitet for vedtatte periodar som trekker dagar', () => {
        // «Raud pølse»: avslegen fordi mor ikkje oppfylte aktivitetskravet, men
        // stønadsperioden reduserast løpande, jf. ftrl. § 14-14 fjerde ledd.
        const rødPølse = lagFarsPeriode({
            morsAktivitet: 'ARBEID',
            resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
        });

        expect(getUttaksKontoType(rødPølse, BFHR_KONTOER)).toBe('AKTIVITETSFRI_KVOTE');
    });

    it('skal klassifisere vedtatt periode med godkjent aktivitet som kvote med aktivitetskrav', () => {
        const medAktivitetskrav = lagFarsPeriode({
            morsAktivitet: 'ARBEID',
            resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
        });

        expect(getUttaksKontoType(medAktivitetskrav, BFHR_KONTOER)).toBe('FORELDREPENGER');
    });

    it('skal falle tilbake på morsAktivitet for planlagde periodar utan resultat', () => {
        const planlagtAktivitetsfri = lagFarsPeriode({ morsAktivitet: 'IKKE_OPPGITT' });
        const planlagtMedAktivitetskrav = lagFarsPeriode({ morsAktivitet: 'ARBEID' });

        expect(getUttaksKontoType(planlagtAktivitetsfri, BFHR_KONTOER)).toBe('AKTIVITETSFRI_KVOTE');
        expect(getUttaksKontoType(planlagtMedAktivitetskrav, BFHR_KONTOER)).toBe('FORELDREPENGER');
    });

    it('skal falle tilbake på morsAktivitet for vedtatte periodar som ikkje trekker dagar', () => {
        // fp-sak set alltid trekkerMinsterett=false når perioden ikkje trekker dagar.
        // Utan tilbakefallet ville ein avslegen aktivitetsfri periode skifta farge i kalenderen.
        const avslagUtanTrekk = lagFarsPeriode({
            morsAktivitet: 'IKKE_OPPGITT',
            resultat: { innvilget: false, trekkerDager: false, trekkerMinsterett: false, årsak: 'ANNET' },
        });

        expect(getUttaksKontoType(avslagUtanTrekk, BFHR_KONTOER)).toBe('AKTIVITETSFRI_KVOTE');
    });

    it('skal aldri bruke aktivitetsfri kvote når saka ikkje har ein slik konto (aleneomsorg)', () => {
        const aleneomsorgKontoer: KontoDto[] = [{ konto: 'FORELDREPENGER', dager: 230 }];
        const periode = lagFarsPeriode({
            morsAktivitet: 'IKKE_OPPGITT',
            resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
        });

        expect(getUttaksKontoType(periode, aleneomsorgKontoer)).toBe('FORELDREPENGER');
    });

    it('skal alltid bruke aktivitetsfri kvote når saka berre har den kontoen (far og far)', () => {
        const farOgFarKontoer: KontoDto[] = [{ konto: 'AKTIVITETSFRI_KVOTE', dager: 200 }];
        const periode = lagFarsPeriode({
            morsAktivitet: 'ARBEID',
            resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
        });

        expect(getUttaksKontoType(periode, farOgFarKontoer)).toBe('AKTIVITETSFRI_KVOTE');
    });

    it('skal la andre kontotypar stå urørt', () => {
        const mødrekvote = lagFarsPeriode({ kontoType: 'MØDREKVOTE', forelder: 'MOR' });

        expect(getUttaksKontoType(mødrekvote, BFHR_KONTOER)).toBe('MØDREKVOTE');
    });
});

describe('useUbrukteDagerPerKontoKunEnHarRett – omfordeling mellom aktivitetsfri kvote og kvote med aktivitetskrav', () => {
    const FORELDRE_INFO: ForeldreInfo = {
        søker: 'FAR_MEDMOR',
        navnPåForeldre: { mor: 'Helga', farMedmor: 'Espen' },
        rettighetType: 'BARE_SØKER_RETT',
        erMedmorDelAvSøknaden: false,
    };

    // BFHR, 100 % dekningsgrad: 50 aktivitetsfrie stønadsdagar etter ftrl. § 14-14
    // tredje ledd, 150 dagar med aktivitetskrav. Til saman den eine stønadsperioden
    // fp-sak opererer med.
    const BFHR_KVOTE: KontoBeregningDto = {
        kontoer: [
            { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
            { konto: 'FORELDREPENGER', dager: 150 },
        ],
        minsteretter: { farRundtFødsel: 0, toTette: 0 },
        tillegg: { flerbarn: 0, prematur: 0 },
    };

    const lagWrapper =
        (valgtStønadskvote: KontoBeregningDto, uttakPerioder: UttakPeriode_fpoversikt[]) =>
        ({ children }: { children: React.ReactNode }) => (
            <UttaksplanDataProvider
                barn={{ type: BarnType.UFØDT, termindato: '2025-05-05', antallBarn: 1 }}
                foreldreInfo={FORELDRE_INFO}
                valgtStønadskvote={valgtStønadskvote}
                harAktivitetskravIPeriodeUtenUttak
                erPeriodeneTilAnnenPartLåst={false}
                uttakPerioder={uttakPerioder}
                erEndringssøknad={false}
            >
                {children}
            </UttaksplanDataProvider>
        );

    // 50 uttaksdagar: måndag 2025-05-05 til fredag 2025-07-11
    const vedtattAktivitetsfri: UttakPeriode_fpoversikt = {
        fom: '2025-05-05',
        tom: '2025-07-11',
        kontoType: 'FORELDREPENGER',
        morsAktivitet: 'IKKE_OPPGITT',
        flerbarnsdager: false,
        forelder: 'FAR_MEDMOR',
        resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
    };

    // 3 uttaksdagar: måndag 2025-07-14 til onsdag 2025-07-16
    const vedtattRødPølse: UttakPeriode_fpoversikt = {
        fom: '2025-07-14',
        tom: '2025-07-16',
        kontoType: 'FORELDREPENGER',
        morsAktivitet: 'ARBEID',
        flerbarnsdager: false,
        forelder: 'FAR_MEDMOR',
        resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
    };

    it('skal la vedtatt overtrekk på aktivitetsfri kvote redusere kvoten med aktivitetskrav i staden for å melde overtrekk', () => {
        const uttakPerioder = [vedtattAktivitetsfri, vedtattRødPølse];

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(BFHR_KVOTE, uttakPerioder),
        });

        expect(result.current.overtrukketDagerAktivitetsfri).toBe(0);
        expect(result.current.ubrukteDagerAktivitetsfri).toBe(0);
        expect(result.current.overtrukketDagerMedAktivitetskrav).toBe(0);
        expect(result.current.ubrukteDagerMedAktivitetskrav).toBe(147);
    });

    describe('BFHR-beholdning med felles stønadsperiode', () => {
        const kontoer: KontoDto[] = [
            { konto: 'FORELDREPENGER', dager: 150 },
            { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
        ];
        const stønadskvote: KontoBeregningDto = { ...KONTOER, kontoer };
        const lagPeriode = (
            dager: number,
            overstyr: Partial<UttakPeriode_fpoversikt> = {},
            startdag = 0,
        ): UttakPeriode_fpoversikt => ({
            fom: Uttaksdagen.denne(FAMILIEHENDELSESDATO).getDatoAntallUttaksdagerSenere(startdag),
            tom: Uttaksdagen.denne(FAMILIEHENDELSESDATO).getDatoAntallUttaksdagerSenere(startdag + dager - 1),
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'ARBEID',
            forelder: 'FAR_MEDMOR',
            flerbarnsdager: false,
            ...overstyr,
        });
        const beregn = (perioder: UttakPeriode_fpoversikt[], aktuelleKontoer = kontoer) =>
            beregnKvoteFordeling(perioder, aktuelleKontoer, 'fødsel', FAMILIEHENDELSESDATO);

        it.each([false, true])('fordeler forbruk uten å endre perioder eller kontoer (vedtatt: %s)', (vedtatt) => {
            const perioder = [
                lagPeriode(168, {
                    resultat: vedtatt
                        ? { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' }
                        : undefined,
                }),
            ];
            const opprinneligePerioder = structuredClone(perioder);
            const opprinneligeKontoer = structuredClone(kontoer);

            expect(beregn(perioder)).toEqual([
                { konto: kontoer[0], brukteDager: 150, trekteDager: 0 },
                { konto: kontoer[1], brukteDager: 18, trekteDager: 0 },
            ]);
            expect(perioder).toEqual(opprinneligePerioder);
            expect(kontoer).toEqual(opprinneligeKontoer);
        });

        it.each([
            { med: 200, uten: 0, fordeltMed: 150, fordeltUten: 50, over: 0, igjen: 0 },
            { med: 201, uten: 0, fordeltMed: 151, fordeltUten: 50, over: 1, igjen: 0 },
            { med: 179, uten: 23, fordeltMed: 152, fordeltUten: 50, over: 2, igjen: 0 },
            { med: 170, uten: 30, fordeltMed: 150, fordeltUten: 50, over: 0, igjen: 0 },
            { med: 150, uten: 50, fordeltMed: 150, fordeltUten: 50, over: 0, igjen: 0 },
            { med: 149, uten: 51, fordeltMed: 149, fordeltUten: 51, over: 1, igjen: 1 },
            { med: 0, uten: 53, fordeltMed: 0, fordeltUten: 53, over: 3, igjen: 150 },
            { med: 0, uten: 0, fordeltMed: 0, fordeltUten: 0, over: 0, igjen: 200 },
        ])(
            'viser riktig beholdning for $med dager med og $uten uten aktivitetskrav',
            ({ med, uten, fordeltMed, fordeltUten, over, igjen }) => {
                const perioder = [
                    ...(med > 0 ? [lagPeriode(med)] : []),
                    ...(uten > 0 ? [lagPeriode(uten, { morsAktivitet: 'IKKE_OPPGITT' }, med)] : []),
                ];

                expect(beregn(perioder)).toEqual([
                    { konto: kontoer[0], brukteDager: fordeltMed, trekteDager: 0 },
                    { konto: kontoer[1], brukteDager: fordeltUten, trekteDager: 0 },
                ]);
                expect(
                    finnAntallDagerDerKunEnHarForeldrepenger(perioder, 'fødsel', stønadskvote, FAMILIEHENDELSESDATO),
                ).toEqual({
                    antallBrukteDager: med + uten,
                    antallOvertrukketDager: over,
                    antallUbrukteDager: igjen,
                });
            },
        );

        it('beholder 68 trekte dager på FPMAK og belaster FPUAK med 18 øvrige dager', () => {
            const perioder = [
                lagPeriode(68, {
                    resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                }),
                lagPeriode(
                    100,
                    { resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' } },
                    68,
                ),
            ];
            expect(beregn(perioder)).toEqual([
                { konto: kontoer[0], brukteDager: 150, trekteDager: 68 },
                { konto: kontoer[1], brukteDager: 18, trekteDager: 0 },
            ]);
        });

        it('omfordeler vedtatte trekte dager over minsteretten uten å øke aktivitetsfri grense', () => {
            const perioder = [
                lagPeriode(50, {
                    resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' },
                }),
                lagPeriode(
                    3,
                    { resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: true, årsak: 'ANNET' } },
                    50,
                ),
            ];
            expect(beregn(perioder)).toEqual([
                { konto: kontoer[0], brukteDager: 3, trekteDager: 3 },
                { konto: kontoer[1], brukteDager: 50, trekteDager: 0 },
            ]);

            perioder.push(lagPeriode(1, { morsAktivitet: 'IKKE_OPPGITT' }, 53));
            expect(
                finnAntallDagerDerKunEnHarForeldrepenger(perioder, 'fødsel', stønadskvote, FAMILIEHENDELSESDATO)
                    .antallOvertrukketDager,
            ).toBe(1);
        });

        it('skiller trekte dager også når disse overstiger FPMAK-beholdningen', () => {
            const perioder = [
                lagPeriode(168, {
                    resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                }),
            ];
            expect(beregn(perioder)).toEqual([
                { konto: kontoer[0], brukteDager: 150, trekteDager: 150 },
                { konto: kontoer[1], brukteDager: 18, trekteDager: 18 },
            ]);
        });

        it('bruker kontostørrelsene fra API og ikke faste grenser på 150 og 50 dager', () => {
            const andreKontoer: KontoDto[] = [
                { konto: 'FORELDREPENGER', dager: 188 },
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 62 },
            ];
            expect(beregn([lagPeriode(200)], andreKontoer)).toEqual([
                { konto: andreKontoer[0], brukteDager: 188, trekteDager: 0 },
                { konto: andreKontoer[1], brukteDager: 12, trekteDager: 0 },
            ]);
        });

        it('håndterer null dager på FPMAK uten å endre kontostørrelsene', () => {
            const andreKontoer: KontoDto[] = [
                { konto: 'FORELDREPENGER', dager: 0 },
                { konto: 'AKTIVITETSFRI_KVOTE', dager: 50 },
            ];
            expect(beregn([lagPeriode(18)], andreKontoer)).toEqual([
                { konto: andreKontoer[0], brukteDager: 0, trekteDager: 0 },
                { konto: andreKontoer[1], brukteDager: 18, trekteDager: 0 },
            ]);
        });

        it('utelater avslag uten trekk og fri utsettelse fra beholdningen', () => {
            const perioder = [
                lagPeriode(168),
                lagPeriode(
                    50,
                    { resultat: { innvilget: false, trekkerDager: false, trekkerMinsterett: false, årsak: 'ANNET' } },
                    168,
                ),
                lagPeriode(50, { utsettelseÅrsak: 'FRI' }, 218),
            ];
            expect(beregn(perioder)).toEqual(beregn([lagPeriode(168)]));
        });

        it('omfordeler graderte uttaksdager fremfor kalenderlengden', () => {
            const periode = lagPeriode(336, {
                gradering: { arbeidstidprosent: 50, aktivitet: { type: 'ORDINÆRT_ARBEID' } },
            });
            expect(beregn([periode])).toEqual(beregn([lagPeriode(168)]));
        });

        it('bruker samme fordeling i søknadens oppsummeringssteg', () => {
            expect(
                finnDinPlanKvoteRader([lagPeriode(168)], 'FAR_MEDMOR', kontoer, 'fødsel', FAMILIEHENDELSESDATO),
            ).toEqual([
                { kontoType: 'AKTIVITETSFRI_KVOTE', bruktDager: 18, tilgjengeligDager: 50 },
                { kontoType: 'FORELDREPENGER', bruktDager: 150, tilgjengeligDager: 150 },
            ]);
        });

        it.each([
            { med: 168, uten: 0, over: false, medIgjen: 0, utenIgjen: 32, medOver: 0, utenOver: 0 },
            { med: 179, uten: 23, over: true, medIgjen: 0, utenIgjen: 0, medOver: 2, utenOver: 0 },
            { med: 0, uten: 53, over: true, medIgjen: 150, utenIgjen: 0, medOver: 0, utenOver: 3 },
        ])('samordner panel og innsendingsvalidering for $med/$uten dager', (forventet) => {
            const perioder = [
                ...(forventet.med > 0 ? [lagPeriode(forventet.med)] : []),
                ...(forventet.uten > 0
                    ? [lagPeriode(forventet.uten, { morsAktivitet: 'IKKE_OPPGITT' }, forventet.med)]
                    : []),
            ];
            const { result } = renderHook(
                () => ({
                    beholdning: useUbrukteDagerPerKontoKunEnHarRett(),
                    overtrukket: useErAntallDagerOvertrukketIUttaksplan(),
                }),
                {
                    wrapper: ({ children }) => (
                        <UttaksplanDataProvider
                            barn={{ type: BarnType.UFØDT, termindato: FAMILIEHENDELSESDATO, antallBarn: 1 }}
                            foreldreInfo={{
                                søker: 'FAR_MEDMOR',
                                navnPåForeldre: { mor: 'Helga', farMedmor: 'Espen' },
                                rettighetType: 'BARE_SØKER_RETT',
                                erMedmorDelAvSøknaden: false,
                            }}
                            valgtStønadskvote={stønadskvote}
                            harAktivitetskravIPeriodeUtenUttak
                            erPeriodeneTilAnnenPartLåst={false}
                            uttakPerioder={perioder}
                            erEndringssøknad={false}
                        >
                            {children}
                        </UttaksplanDataProvider>
                    ),
                },
            );
            expect(result.current).toEqual({
                overtrukket: forventet.over,
                beholdning: {
                    ubrukteDagerAktivitetsfri: forventet.utenIgjen,
                    ubrukteDagerMedAktivitetskrav: forventet.medIgjen,
                    overtrukketDagerAktivitetsfri: forventet.utenOver,
                    overtrukketDagerMedAktivitetskrav: forventet.medOver,
                },
            });
        });
    });

    it('skal ikkje melde overtrekk totalt sett når berre aktivitetsfri kvote er overtrukken', () => {
        const { result } = renderHook(() => useErAntallDagerOvertrukketIUttaksplan(), {
            wrapper: lagWrapper(BFHR_KVOTE, [vedtattAktivitetsfri, vedtattRødPølse]),
        });

        expect(result.current).toBe(false);
    });

    it('skal framleis blokkere når planlagde dagar overstig taket i § 14-14 tredje ledd', () => {
        // Planlagd periode utan resultat: taket er ei materiell grense og skal
        // framleis gi «Du har lagt til for mange dager i planen».
        const planlagtAktivitetsfri: UttakPeriode_fpoversikt = {
            fom: '2025-07-14',
            tom: '2025-07-16',
            kontoType: 'FORELDREPENGER',
            morsAktivitet: 'IKKE_OPPGITT',
            flerbarnsdager: false,
            forelder: 'FAR_MEDMOR',
        };

        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(BFHR_KVOTE, [vedtattAktivitetsfri, planlagtAktivitetsfri]),
        });

        expect(result.current.overtrukketDagerAktivitetsfri).toBe(3);
        expect(result.current.ubrukteDagerMedAktivitetskrav).toBe(150);
    });

    it('skal ikkje omfordele når aktivitetsfri kvote ikkje er overtrukken', () => {
        const { result } = renderHook(() => useUbrukteDagerPerKontoKunEnHarRett(), {
            wrapper: lagWrapper(BFHR_KVOTE, [vedtattAktivitetsfri]),
        });

        expect(result.current.ubrukteDagerAktivitetsfri).toBe(0);
        expect(result.current.ubrukteDagerMedAktivitetskrav).toBe(150);
    });
});
