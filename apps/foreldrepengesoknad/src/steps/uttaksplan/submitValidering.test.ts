import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import {
    erSammePeriodeInkludertDatoer,
    harBrukerKunSlettetPerioder,
    harMinstEnUttaksEllerOverføringsperiode,
} from './submitValidering';

const innvilget: UttakPeriode_fpoversikt['resultat'] = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};

const lagPeriode = (overrides: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2024-07-01',
    tom: '2024-07-31',
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    resultat: innvilget,
    ...overrides,
});

const lagEøsPeriode = (
    overrides: Partial<UttakPeriodeAnnenpartEøs_fpoversikt> = {},
): UttakPeriodeAnnenpartEøs_fpoversikt => ({
    fom: '2024-10-01',
    tom: '2024-10-31',
    kontoType: 'FELLESPERIODE',
    trekkdager: 23,
    ...overrides,
});

const A = lagPeriode({ fom: '2024-07-01', tom: '2024-07-31', kontoType: 'MØDREKVOTE' });
const B = lagPeriode({ fom: '2024-08-01', tom: '2024-09-30', kontoType: 'MØDREKVOTE' });
const C = lagPeriode({ fom: '2024-10-01', tom: '2024-12-31', kontoType: 'FELLESPERIODE' });

describe('harBrukerKunSlettetPerioder', () => {
    describe('ingen opprinnelig plan', () => {
        it('returnerer false når opprinneligPlan er undefined', () => {
            expect(harBrukerKunSlettetPerioder([A, B], undefined)).toBe(false);
        });
    });

    describe('bruker har kun slettet perioder', () => {
        it('returnerer true når siste periode er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, B];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når første periode er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [B, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når en periode fra midten er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når alle perioder er slettet og perioder er tom liste', () => {
            const opprinneligPlan = [A, B, C];
            // Tom liste – ingen saksperioder å sjekke, erKunSaksperioder = true (every på tom liste)
            expect(harBrukerKunSlettetPerioder([], opprinneligPlan)).toBe(true);
        });

        it('returnerer true når to av tre perioder er slettet', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [B];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('fungerer med EØS-perioder i listen', () => {
            const eøs = lagEøsPeriode();
            const opprinneligPlan = [A, B, eøs];
            const perioder = [A, eøs];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });

        it('returnerer true når gjenværende perioder er verdilike, men ikke referanselike (regresjon: TFP-6971)', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [{ ...A }, { ...B }];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(true);
        });
    });

    describe('bruker har lagt til eller endret perioder', () => {
        it('returnerer false når bruker har lagt til en ny periode', () => {
            const opprinneligPlan = [A, B];
            const nyPeriode = lagPeriode({ fom: '2025-01-01', tom: '2025-01-31' });
            const perioder = [A, B, nyPeriode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når bruker har slettet en periode og lagt til en ny', () => {
            const opprinneligPlan = [A, B, C];
            const nyPeriode = lagPeriode({ fom: '2025-01-01', tom: '2025-01-31' });
            // Totalt kortere enn opprinnelig (2 < 3), men nyPeriode finnes ikke i original
            const perioder = [A, nyPeriode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når en periode er endret (ikke referanselik)', () => {
            const opprinneligPlan = [A, B, C];
            const endretB = lagPeriode({ fom: '2024-08-01', tom: '2024-09-30', kontoType: 'FELLESPERIODE' }); // ny instans
            const perioder = [A, endretB]; // kortere, men endretB er ikke samme referanse som B
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });

        it('returnerer false når planene er identiske', () => {
            const opprinneligPlan = [A, B, C];
            const perioder = [A, B, C];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });
    });

    describe('perioder inneholder ikke-saksperioder (brukerendringer)', () => {
        it('returnerer false når en periode mangler resultat', () => {
            const brukerperiode = lagPeriode({ resultat: undefined });
            const opprinneligPlan = [A, B, C];
            // perioder inneholder en brukerendret periode (ingen resultat)
            const perioder = [A, brukerperiode];
            expect(harBrukerKunSlettetPerioder(perioder, opprinneligPlan)).toBe(false);
        });
    });

    describe('perioder er undefined', () => {
        it('returnerer false når perioder er undefined', () => {
            expect(harBrukerKunSlettetPerioder(undefined, [A, B])).toBe(false);
        });
    });
});

/**
 * harMinstEnUttaksEllerOverføringsperiode brukes i submitvalideringa for å avgjere om
 * ein ny søknad har minst eitt reelt uttak. Far som overtek mødrekvote (overføring fordi
 * mor er for sjuk) skal kunne søkje utan å måtte leggje inn ei ekstra uttaksperiode
 * (regresjon: TFP-7048).
 */
describe('harMinstEnUttaksEllerOverføringsperiode', () => {
    it('returnerer true for en vanlig uttaksperiode', () => {
        expect(harMinstEnUttaksEllerOverføringsperiode([lagPeriode()])).toBe(true);
    });

    it('returnerer true når far kun har lagt inn overtakelse av mødrekvote (SYKDOM_ANNEN_FORELDER)', () => {
        const overføring = lagPeriode({
            forelder: 'FAR_MEDMOR',
            kontoType: 'MØDREKVOTE',
            overføringÅrsak: 'SYKDOM_ANNEN_FORELDER',
        });
        expect(harMinstEnUttaksEllerOverføringsperiode([overføring])).toBe(true);
    });

    it('returnerer true når far kun har lagt inn overtakelse (INSTITUSJONSOPPHOLD_ANNEN_FORELDER)', () => {
        const overføring = lagPeriode({
            forelder: 'FAR_MEDMOR',
            kontoType: 'MØDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        });
        expect(harMinstEnUttaksEllerOverføringsperiode([overføring])).toBe(true);
    });

    it('returnerer false når planen kun inneholder utsettelser', () => {
        const utsettelse = lagPeriode({ utsettelseÅrsak: 'ARBEID', resultat: undefined });
        expect(harMinstEnUttaksEllerOverføringsperiode([utsettelse])).toBe(false);
    });

    it('returnerer false for tom plan', () => {
        expect(harMinstEnUttaksEllerOverføringsperiode([])).toBe(false);
    });

    it('returnerer false når planen kun inneholder EØS-perioder', () => {
        expect(harMinstEnUttaksEllerOverføringsperiode([lagEøsPeriode()])).toBe(false);
    });
});

/**
 * erSammePeriodeInkludertDatoer brukes i UttaksplanForm til å avgjøre om en saksperiode
 * er uendret (og da skal filtreres ut fra planForValidering), eller endret (og da skal
 * inkluderes). Dette er fiksen for at forkortelse av en periode ikke lenger gir
 * "ingen endringer"-feilmeldingen i endringssøknad.
 */
describe('erSammePeriodeInkludertDatoer', () => {
    describe('uendrede perioder skal ekskluderes fra planForValidering', () => {
        it('returnerer true når perioden er identisk (samme fom, tom og kontoType)', () => {
            const kopi = { ...A };
            expect(erSammePeriodeInkludertDatoer(kopi, A)).toBe(true);
        });

        it('returnerer true for identisk EØS-periode', () => {
            const eøs = lagEøsPeriode();
            const kopi = { ...eøs };
            expect(erSammePeriodeInkludertDatoer(kopi, eøs)).toBe(true);
        });
    });

    describe('endrede perioder skal inkluderes i planForValidering', () => {
        it('returnerer false når tom er forkortet med én dag (bruker har slettet en dag)', () => {
            const forkortet = lagPeriode({ fom: C.fom, tom: '2024-12-30', kontoType: C.kontoType });
            expect(erSammePeriodeInkludertDatoer(forkortet, C)).toBe(false);
        });

        it('returnerer false når fom er flyttet fremover (bruker har kortet inn starten)', () => {
            const forkortet = lagPeriode({ fom: '2024-10-02', tom: C.tom, kontoType: C.kontoType });
            expect(erSammePeriodeInkludertDatoer(forkortet, C)).toBe(false);
        });

        it('returnerer false når kontoType er byttet selv om datoene er like', () => {
            const annenKonto = lagPeriode({ fom: A.fom, tom: A.tom, kontoType: 'FELLESPERIODE' });
            expect(erSammePeriodeInkludertDatoer(annenKonto, A)).toBe(false);
        });

        it('returnerer false når forelder er byttet selv om datoene er like', () => {
            const annenForelder = lagPeriode({ fom: A.fom, tom: A.tom, forelder: 'FAR_MEDMOR' });
            expect(erSammePeriodeInkludertDatoer(annenForelder, A)).toBe(false);
        });
    });

    describe('filterlogikken i endringssøknad (regresjon: forkortet periode skal ikke gi ingen-endringer-feil)', () => {
        it('en forkortet saksperiode finnes ikke i opprinneligPlan via erSammePeriodeInkludertDatoer', () => {
            const opprinneligPlan = [A, B, C];
            const cForkortet = lagPeriode({ fom: C.fom, tom: '2024-12-30', kontoType: C.kontoType });
            const uttaksplan = [A, B, cForkortet];

            // Simulerer filteret i UttaksplanForm: inkluder saksperioder som IKKE finnes i opprinneligPlan
            const uttaksplanMedKunNyeEllerEndredePerioder = uttaksplan.filter(
                (p) => p.resultat === undefined || !opprinneligPlan.some((o) => erSammePeriodeInkludertDatoer(p, o)),
            );

            expect(uttaksplanMedKunNyeEllerEndredePerioder).toHaveLength(1);
            expect(uttaksplanMedKunNyeEllerEndredePerioder[0]).toMatchObject({ fom: C.fom, tom: '2024-12-30' });
        });

        it('uendrede perioder filtreres ut slik at planForValidering ikke inneholder unødvendige perioder', () => {
            const opprinneligPlan = [A, B, C];
            const uttaksplan = [A, B, C]; // ingenting endret

            const uttaksplanMedKunNyeEllerEndredePerioder = uttaksplan.filter(
                (p) => p.resultat === undefined || !opprinneligPlan.some((o) => erSammePeriodeInkludertDatoer(p, o)),
            );

            expect(uttaksplanMedKunNyeEllerEndredePerioder).toHaveLength(0);
        });

        it('ny brukerperiode (uten resultat) inkluderes alltid uavhengig av opprinneligPlan', () => {
            const opprinneligPlan = [A, B, C];
            const nyPeriode = lagPeriode({ fom: '2025-01-01', tom: '2025-01-31', resultat: undefined });
            const uttaksplan = [A, B, C, nyPeriode];

            const uttaksplanMedKunNyeEllerEndredePerioder = uttaksplan.filter(
                (p) => p.resultat === undefined || !opprinneligPlan.some((o) => erSammePeriodeInkludertDatoer(p, o)),
            );

            expect(uttaksplanMedKunNyeEllerEndredePerioder).toHaveLength(1);
            expect(uttaksplanMedKunNyeEllerEndredePerioder[0]).toMatchObject({ fom: '2025-01-01', tom: '2025-01-31' });
        });
    });
});
