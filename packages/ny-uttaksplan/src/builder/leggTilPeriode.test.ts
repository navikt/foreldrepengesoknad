import { Forelder, MorsAktivitet, StønadskontoType } from '@navikt/fp-constants';
import { OppholdÅrsakType, UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { leggTilPeriode, splittUttaksperiodePåFamiliehendelsesdato } from './leggTilPeriode';

const perioder: Planperiode[] = [
    {
        id: '1',
        fom: '2022-04-14',
        tom: '2022-05-04',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2022-05-05',
        tom: '2022-08-17',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-08-18',
        tom: '2022-10-12',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
];

const perioderMedHull: Planperiode[] = [
    {
        id: '2',
        fom: '2022-03-01',
        tom: '2022-03-31',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-04-01',
        tom: '2022-04-29',
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
        readOnly: false,
    },
    {
        id: '4',
        fom: '2022-05-02',
        tom: '2022-05-31',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
];

const periodeMedAnnenPartsUttak: Planperiode[] = [
    {
        id: '1',
        fom: '2024-04-01',
        tom: '2024-04-30',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2024-05-01',
        tom: '2024-05-31',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '3',
        fom: '2024-06-03',
        tom: '2024-06-28',
        forelder: Forelder.farMedmor,
        readOnly: true,
        oppholdÅrsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
    },
];

const perioderKunAnnenPartsUttak: Planperiode[] = [
    {
        id: '1',
        fom: '2022-10-04',
        tom: '2022-12-12',
        forelder: Forelder.mor,
        oppholdÅrsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
        readOnly: true,
    },
];

const toPerioder: Planperiode[] = [
    {
        id: '1',
        fom: '2024-05-01',
        tom: '2024-05-31',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        readOnly: false,
    },
    {
        id: '2',
        fom: '2024-06-03',
        tom: '2024-06-28',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        readOnly: false,
    },
];

describe('Test av legg til periode i uttaksplan', () => {
    it(
        'Burde legge til ny periode korrekt i midten av en gammel periode ved å erstatte deler av den gamle ' +
            ' perioden, og ikke forskyve noen andre perioder',
        () => {
            const nyPeriode: Planperiode = {
                id: '4',
                fom: '2022-07-11',
                tom: '2022-07-22',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
                readOnly: false,
            };

            const result = leggTilPeriode({
                perioder,
                nyPeriode,
                familiehendelsesdato: '2022-05-05',
                harAktivitetskravIPeriodeUtenUttak: false,
                erAdopsjon: false,
                bareFarHarRett: false,
                erFarEllerMedmor: false,
                førsteUttaksdagNesteBarnsSak: undefined,
            });

            expect(result.length).toEqual(5);
            expect(result[1].tom).toEqual('2022-07-08');
            expect(result[2]).toEqual(nyPeriode);
            expect(result[3].fom).toEqual('2022-07-25');
            expect(result[3].tom).toEqual(perioder[1].tom);
            expect(result[4].fom).toEqual(perioder[2].fom);
            expect(result[4].tom).toEqual(perioder[2].tom);
        },
    );

    it('Burde legge legge til ny periode korrekt som skal delvis overlappe et hull i starten', () => {
        const nyPeriode: Planperiode = {
            id: '7',
            fom: '2022-03-15',
            tom: '2022-04-15',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: '2022-01-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[0].fom).toEqual(perioderMedHull[0].fom);
        expect(result[0].tom).toEqual('2022-03-14');
        expect(result[1].fom).toEqual(nyPeriode.fom);
        expect(result[1].tom).toEqual('2022-03-31');
        expect(result[2].fom).toEqual('2022-04-01');
        expect(result[2].tom).toEqual(nyPeriode.tom);
        expect(result[3].fom).toEqual('2022-04-18');
        expect(result[3].tom).toEqual(perioderMedHull[1].tom);
        expect(result[4]).toEqual(perioderMedHull[2]);
        const nyPeriodeDel1 = result[1];
        expect(nyPeriodeDel1.kontoType).toEqual(StønadskontoType.Fellesperiode);
        const nyPeriodeDel2 = result[2];
        expect(nyPeriodeDel2.kontoType).toEqual(StønadskontoType.Fellesperiode);
    });

    it('Burde legge legge til ny periode korrekt som skal delvis overlappe et hull i slutten', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-04-15',
            tom: '2022-05-12',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: '2022-01-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(perioderMedHull[0]);
        expect(result[1].fom).toEqual(perioderMedHull[1].fom);
        expect(result[1].tom).toEqual('2022-04-14');
        expect(result[2].fom).toEqual(nyPeriode.fom);
        expect(result[2].tom).toEqual('2022-04-29');
        expect(result[3].fom).toEqual('2022-05-02');
        expect(result[3].tom).toEqual(nyPeriode.tom);
        expect(result[4].tom).toEqual(perioderMedHull[2].tom);
    });

    it('Burde legge legge til ny periode korrekt som skal helt overlappe et hull', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-04-01',
            tom: '2022-04-29',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: '2022-01-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(3);
        expect(result[0]).toEqual(perioderMedHull[0]);
        expect(result[1]).toEqual(nyPeriode);
        expect(result[2]).toEqual(perioderMedHull[2]);
    });

    it('Burde legge til søkerens periode korrekt midt i annen parts uttak og så kunne utvide denne perioden ved å legge til ny', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2024-05-15',
            tom: '2024-05-22',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: periodeMedAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: '2024-05-01',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(periodeMedAnnenPartsUttak[0]);
        expect(result[1].fom).toEqual(periodeMedAnnenPartsUttak[1].fom);
        expect(result[1].tom).toEqual('2024-05-14');
        expect(result[2]).toEqual(nyPeriode);
        expect(result[3].fom).toEqual('2024-05-23');
        expect(result[3].tom).toEqual(periodeMedAnnenPartsUttak[1].tom);
        expect(result[4]).toEqual(periodeMedAnnenPartsUttak[2]);

        const nyPeriode2: Planperiode = {
            id: '5',
            fom: '2024-05-23',
            tom: '2024-05-24',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result2 = leggTilPeriode({
            perioder: result,
            nyPeriode: nyPeriode2,
            familiehendelsesdato: '2024-05-01',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result2.length).toEqual(6);
        expect(result2[3]).toEqual(nyPeriode2);
    });

    it('Burde bare innehold ny periode om planen er tom', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-07-11',
            tom: '2022-07-22',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: [],
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-03-31',
            tom: '2022-04-13',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(4);
        expect(result[0]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt og legge til periode uten uttak mellom den nye perioden og de gamle periodene', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-03-31',
            tom: '2022-04-07',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            erAdopsjon: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(nyPeriode);
        expect(result[1].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
    });

    it('Burde legge til periode etter siste periode korrekt', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-10-13',
            tom: '2022-10-26',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(4);
        expect(result[3]).toEqual(nyPeriode);
    });

    it('Burde legge til periode etter siste periode korrekt med periode uten uttak mellom de gamle periodene og den nye', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-10-26',
            tom: '2022-11-08',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[4]).toEqual(nyPeriode);
        expect(result[3].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
    });

    it('Skal legge til utsettelse korrekt', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-05-05',
            tom: '2022-05-18',
            forelder: Forelder.mor,
            utsettelseÅrsak: UtsettelseÅrsakType.Arbeid,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(4);
        expect(result[1]).toEqual(nyPeriode);
        expect(result[2].fom).toEqual('2022-05-19');
        expect(result[2].tom).toEqual('2022-08-17');
    });

    it('Skal ignorere perioder hvis tidsperiode starter før famdato og ender etter', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-05-03',
            tom: '2022-05-06',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            erAdopsjon: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(3);
    });

    it('Skal overskrive annen parts uttak om periode overlapper', () => {
        const nyPeriode: Planperiode = {
            id: '4',
            fom: '2022-09-12',
            tom: '2022-10-14',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Mødrekvote,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: perioderKunAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(3);
        expect(result[0].fom).toEqual(nyPeriode.fom);
        expect(result[0].tom).toEqual('2022-10-03');
        expect(result[1].fom).toEqual(perioderKunAnnenPartsUttak[0].fom);
        expect(result[1].tom).toEqual(nyPeriode.tom);
        expect(result[2].fom).toEqual('2022-10-17');
        expect(result[2].tom).toEqual(perioderKunAnnenPartsUttak[0].tom);
    });

    it(
        'Hvis legger til ny periode en stund etter siste periode slik at det skapes' +
            ' periode uten uttak som overlapper med neste barns stønadsperiode start, skal periode uten uttak splittes.',
        () => {
            const nyPeriode: Planperiode = {
                id: '6',
                fom: '2023-05-12',
                tom: '2023-09-19',
                forelder: Forelder.mor,
                kontoType: StønadskontoType.Fellesperiode,
                readOnly: false,
            };

            const result = leggTilPeriode({
                perioder,
                nyPeriode,
                familiehendelsesdato: '2022-05-05',
                harAktivitetskravIPeriodeUtenUttak: false,
                erAdopsjon: false,
                bareFarHarRett: false,
                erFarEllerMedmor: false,
                førsteUttaksdagNesteBarnsSak: '2023-03-21',
            });

            expect(result.length).toEqual(6);
            expect(result[3].fom).toEqual('2022-10-13');
            expect(result[3].tom).toEqual('2023-03-20');
            expect(result[3].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
            expect(result[4].fom).toEqual('2023-03-21');
            expect(result[4].tom).toEqual('2023-05-11');
            expect(result[4].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
            expect(result[5]).toEqual(nyPeriode);
        },
    );

    it('Skal legge til ny periode som overlapper to gamle perioder.', () => {
        const nyPeriode: Planperiode = {
            id: '6',
            fom: '2024-04-15',
            tom: '2024-07-15',
            forelder: Forelder.mor,
            kontoType: StønadskontoType.Fellesperiode,
            readOnly: false,
        };

        const result = leggTilPeriode({
            perioder: toPerioder,
            nyPeriode,
            familiehendelsesdato: '2023-12-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: '2025-03-21',
        });

        expect(result.length).toEqual(4);
        expect(result[0].fom).toEqual(nyPeriode.fom);
        expect(result[0].tom).toEqual('2024-04-30');
        const periode1 = result[0];
        expect(periode1.kontoType).toEqual(StønadskontoType.Fellesperiode);
        expect(result[1].fom).toEqual(toPerioder[0].fom);
        expect(result[1].tom).toEqual(toPerioder[0].tom);
        const periode2 = result[1];
        expect(periode2.kontoType).toEqual(StønadskontoType.Fellesperiode);
        expect(result[2].fom).toEqual(toPerioder[1].fom);
        expect(result[2].tom).toEqual(toPerioder[1].tom);
        const periode3 = result[2];
        expect(periode3.kontoType).toEqual(StønadskontoType.Fellesperiode);
        expect(result[3].fom).toEqual('2024-07-01');
        expect(result[3].tom).toEqual(nyPeriode.tom);
        const periode4 = result[2];
        expect(periode4.kontoType).toEqual(StønadskontoType.Fellesperiode);
    });
});

describe('Test av split periode i uttaksplan', () => {
    const splitPeriodeFedrekvote: Planperiode = {
        id: '156',
        fom: '2022-04-14',
        tom: '2022-05-02',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.Fedrekvote,
        readOnly: false,
    };

    const splitPeriodeBFHRMedAktivitetskrav: Planperiode = {
        id: '157',
        fom: '2022-04-14',
        tom: '2022-05-02',
        forelder: Forelder.farMedmor,
        kontoType: StønadskontoType.Foreldrepenger,
        morsAktivitet: MorsAktivitet.Arbeid,
        readOnly: false,
    };

    it('Skal spitte periode med fedrekvote med familiehendelsesdato på en virkedag i to perioder der den andre periode skal starte på splittedato', () => {
        const splitteDato = '2022-05-02';
        const testPerioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeFedrekvote, splitteDato);
        expect(testPerioder.length).toEqual(2);
        expect(testPerioder[0].id).toEqual(splitPeriodeFedrekvote.id);
        expect(testPerioder[0].forelder).toEqual(splitPeriodeFedrekvote.forelder);
        expect(testPerioder[0].kontoType).toEqual(splitPeriodeFedrekvote.kontoType);
        expect(testPerioder[0].fom).toEqual(splitPeriodeFedrekvote.fom);
        expect(testPerioder[0].tom).toEqual('2022-04-29');
        expect(testPerioder[1].id).not.toEqual(splitPeriodeFedrekvote.id);
        expect(testPerioder[1].forelder).toEqual(splitPeriodeFedrekvote.forelder);
        expect(testPerioder[1].kontoType).toEqual(splitPeriodeFedrekvote.kontoType);
        expect(testPerioder[1].fom).toEqual(splitteDato);
        expect(testPerioder[1].tom).toEqual(splitPeriodeFedrekvote.tom);
    });

    it('Skal spitte periodeperiode med fedrekvote med familiehendelsesdato på en helgedag i to perioder med riktige datoer', () => {
        const splitteDato = '2022-05-01';
        const testPerioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeFedrekvote, splitteDato);
        expect(testPerioder.length).toEqual(2);
        expect(testPerioder[0].fom).toEqual(splitPeriodeFedrekvote.fom);
        expect(testPerioder[0].tom).toEqual('2022-04-29');
        expect(testPerioder[1].fom).toEqual(splitPeriodeFedrekvote.tom);
        expect(testPerioder[1].tom).toEqual(splitPeriodeFedrekvote.tom);
    });

    it('Skal spitte periode med aktivitetskrav der BFHR slik at perioden før familiehendelsesdato blir automatisk satt til uten aktivitetskrav', () => {
        const splitteDato = '2022-05-02';
        const testPerioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeBFHRMedAktivitetskrav, splitteDato);
        expect(testPerioder.length).toEqual(2);
        expect(testPerioder[0].fom).toEqual(splitPeriodeFedrekvote.fom);
        expect(testPerioder[0].tom).toEqual('2022-04-29');
        expect(testPerioder[0].morsAktivitet).toBeUndefined();
        expect(testPerioder[1].fom).toEqual(splitPeriodeFedrekvote.tom);
        expect(testPerioder[1].tom).toEqual(splitPeriodeFedrekvote.tom);
        expect(testPerioder[1].morsAktivitet).toEqual(splitPeriodeBFHRMedAktivitetskrav.morsAktivitet);
    });
});
