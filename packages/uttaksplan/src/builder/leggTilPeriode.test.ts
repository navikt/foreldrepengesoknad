import {
    Forelder,
    MorsAktivitet,
    OppholdÅrsakType,
    Periode,
    PeriodeInfoType,
    Periodetype,
    StønadskontoType,
    UtsettelseÅrsakType,
    Uttaksperiode,
} from '@navikt/fp-common';

import { leggTilPeriode, splittUttaksperiodePåFamiliehendelsesdato } from './leggTilPeriode';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-17'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedHull: Periode[] = [
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-03-01'),
            tom: new Date('2022-03-31'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Hull,
        tidsperiode: {
            fom: new Date('2022-04-01'),
            tom: new Date('2022-04-29'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-02'),
            tom: new Date('2022-05-31'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const periodeMedAnnenPartsUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2024-04-01'),
            tom: new Date('2024-04-30'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2024-05-01'),
            tom: new Date('2024-05-31'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2024-06-03'),
            tom: new Date('2024-06-28'),
        },
        forelder: Forelder.farMedmor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        overskrives: true,
        visPeriodeIPlan: true,
        årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
    },
];

const perioderKunAnnenPartsUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-10-04'),
            tom: new Date('2022-12-12'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        overskrives: true,
        visPeriodeIPlan: true,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
    },
];

const toPerioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2024-05-01'),
            tom: new Date('2024-05-31'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2024-06-03'),
            tom: new Date('2024-06-28'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

describe('Test av legg til periode i uttaksplan', () => {
    it('Burde legge til ny periode korrekt i midten av en gammel periode ved å erstatte deler av den gamle perioden, og ikke forskyve noen andre perioder', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-07-08'));
        expect(result[2]).toEqual(nyPeriode);
        expect(result[3].tidsperiode.fom).toEqual(new Date('2022-07-25'));
        expect(result[3].tidsperiode.tom).toEqual(perioder[1].tidsperiode.tom);
        expect(result[4].tidsperiode.fom).toEqual(perioder[2].tidsperiode.fom);
        expect(result[4].tidsperiode.tom).toEqual(perioder[2].tidsperiode.tom);
    });
    it('Burde legge legge til ny periode korrekt som skal delvis overlappe et hull i starten', () => {
        const nyPeriode: Periode = {
            id: '7',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-03-15'),
                tom: new Date('2022-04-15'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: new Date('2022-01-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[0].tidsperiode.fom).toEqual(perioderMedHull[0].tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(new Date('2022-03-14'));
        expect(result[1].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-03-31'));
        expect(result[1].type).toEqual(Periodetype.Uttak);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2022-04-01'));
        expect(result[2].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[2].type).toEqual(Periodetype.Uttak);
        expect(result[3].tidsperiode.fom).toEqual(new Date('2022-04-18'));
        expect(result[3].tidsperiode.tom).toEqual(perioderMedHull[1].tidsperiode.tom);
        expect(result[4]).toEqual(perioderMedHull[2]);
        const nyPeriodeDel1 = result[1] as Uttaksperiode;
        expect(nyPeriodeDel1.konto).toEqual(StønadskontoType.Fellesperiode);
        const nyPeriodeDel2 = result[2] as Uttaksperiode;
        expect(nyPeriodeDel2.konto).toEqual(StønadskontoType.Fellesperiode);
    });
    it('Burde legge legge til ny periode korrekt som skal delvis overlappe et hull i slutten', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-04-15'),
                tom: new Date('2022-05-12'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: new Date('2022-01-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(perioderMedHull[0]);
        expect(result[1].tidsperiode.fom).toEqual(perioderMedHull[1].tidsperiode.fom);
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-04-14'));
        expect(result[2].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[2].tidsperiode.tom).toEqual(new Date('2022-04-29'));
        expect(result[3].tidsperiode.fom).toEqual(new Date('2022-05-02'));
        expect(result[3].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[4].tidsperiode.tom).toEqual(perioderMedHull[2].tidsperiode.tom);
    });
    it('Burde legge legge til ny periode korrekt som skal helt overlappe et hull', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-04-01'),
                tom: new Date('2022-04-29'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: new Date('2022-01-05'),
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
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2024-05-15'),
                tom: new Date('2024-05-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: periodeMedAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2024-05-01'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(periodeMedAnnenPartsUttak[0]);
        expect(result[1].tidsperiode.fom).toEqual(periodeMedAnnenPartsUttak[1].tidsperiode.fom);
        expect(result[1].tidsperiode.tom).toEqual(new Date('2024-05-14'));
        expect(result[2]).toEqual(nyPeriode);
        expect(result[3].tidsperiode.fom).toEqual(new Date('2024-05-23'));
        expect(result[3].tidsperiode.tom).toEqual(periodeMedAnnenPartsUttak[1].tidsperiode.tom);
        expect(result[4]).toEqual(periodeMedAnnenPartsUttak[2]);
        const nyPeriode2: Periode = {
            id: '5',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2024-05-23'),
                tom: new Date('2024-05-24'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result2 = leggTilPeriode({
            perioder: result,
            nyPeriode: nyPeriode2,
            familiehendelsesdato: new Date('2024-05-01'),
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
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-11'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: [],
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
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
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-03-31'),
                tom: new Date('2022-04-13'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
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
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-03-31'),
                tom: new Date('2022-04-07'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            erAdopsjon: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[0]).toEqual(nyPeriode);
        expect(result[1].type).toEqual(Periodetype.PeriodeUtenUttak);
    });
    it('Burde legge til periode etter siste periode korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-13'),
                tom: new Date('2022-10-26'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
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
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-10-26'),
                tom: new Date('2022-11-08'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(5);
        expect(result[4]).toEqual(nyPeriode);
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
    });
    it('Skal legge til utsettelse korrekt', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-05-05'),
                tom: new Date('2022-05-18'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(4);
        expect(result[1]).toEqual(nyPeriode);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2022-05-19'));
        expect(result[2].tidsperiode.tom).toEqual(new Date('2022-08-17'));
    });
    it('Skal ignorere perioder hvis tidsperiode starter før famdato og ender etter', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-05-03'),
                tom: new Date('2022-05-06'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            erAdopsjon: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(3);
    });
    it('Skal overskrive annen parts uttak om periode overlapper', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-09-12'),
                tom: new Date('2022-10-14'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
        };
        const result = leggTilPeriode({
            perioder: perioderKunAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });
        expect(result.length).toEqual(3);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(new Date('2022-10-03'));
        expect(result[1].tidsperiode.fom).toEqual(perioderKunAnnenPartsUttak[0].tidsperiode.fom);
        expect(result[1].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2022-10-17'));
        expect(result[2].tidsperiode.tom).toEqual(perioderKunAnnenPartsUttak[0].tidsperiode.tom);
    });
    it('Hvis legger til ny periode en stund etter siste periode slik at det skapes periode uten uttak som overlapper med neste barns stønadsperiode start, skal periode uten uttak splittes.', () => {
        const nyPeriode: Periode = {
            id: '6',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2023-05-12'),
                tom: new Date('2023-09-19'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: new Date('2023-03-21'),
        });
        expect(result.length).toEqual(6);
        expect(result[3].tidsperiode).toEqual({ fom: new Date('2022-10-13'), tom: new Date('2023-03-20') });
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
        expect(result[4].tidsperiode).toEqual({ fom: new Date('2023-03-21'), tom: new Date('2023-05-11') });
        expect(result[4].type).toEqual(Periodetype.PeriodeUtenUttak);
        expect(result[5]).toEqual(nyPeriode);
    });
    it('Skal legge til ny periode som overlapper to gamle perioder.', () => {
        const nyPeriode: Periode = {
            id: '6',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2024-04-15'),
                tom: new Date('2024-07-15'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };
        const result = leggTilPeriode({
            perioder: toPerioder,
            nyPeriode,
            familiehendelsesdato: new Date('2023-12-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: new Date('2025-03-21'),
        });
        console.log('RES: ', result);
        expect(result.length).toEqual(4);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(new Date('2024-04-30'));
        expect(result[0].type).toEqual(Periodetype.Uttak);
        const periode1 = result[0] as Uttaksperiode;
        expect(periode1.konto).toEqual(StønadskontoType.Fellesperiode);
        expect(result[1].tidsperiode.fom).toEqual(toPerioder[0].tidsperiode.fom);
        expect(result[1].tidsperiode.tom).toEqual(toPerioder[0].tidsperiode.tom);
        expect(result[1].type).toEqual(Periodetype.Uttak);
        const periode2 = result[1] as Uttaksperiode;
        expect(periode2.konto).toEqual(StønadskontoType.Fellesperiode);
        expect(result[2].tidsperiode.fom).toEqual(toPerioder[1].tidsperiode.fom);
        expect(result[2].tidsperiode.tom).toEqual(toPerioder[1].tidsperiode.tom);
        expect(result[2].type).toEqual(Periodetype.Uttak);
        const periode3 = result[2] as Uttaksperiode;
        expect(periode3.konto).toEqual(StønadskontoType.Fellesperiode);
        expect(result[3].tidsperiode.fom).toEqual(new Date('2024-07-01'));
        expect(result[3].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[3].type).toEqual(Periodetype.Uttak);
        const periode4 = result[2] as Uttaksperiode;
        expect(periode4.konto).toEqual(StønadskontoType.Fellesperiode);
    });
});
describe('Test av split periode i uttaksplan', () => {
    const splitPeriodeFedrekvote = {
        id: '156',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-02'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    } as Uttaksperiode;
    const splitPeriodeBFHRMedAktivitetskrav = {
        id: '157',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-02'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Foreldrepenger,
        morsAktivitetIPerioden: MorsAktivitet.Arbeid,
        erMorForSyk: false,
    } as Uttaksperiode;
    it('Skal spitte periode med fedrekvote med familiehendelsesdato på en virkedag i to perioder der den andre periode skal starte på splittedato', () => {
        const splitteDato = new Date('2022-05-02');
        const perioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeFedrekvote, splitteDato);
        expect(perioder.length).toEqual(2);
        expect(perioder[0].id).toEqual(splitPeriodeFedrekvote.id);
        expect(perioder[0].type).toEqual(splitPeriodeFedrekvote.type);
        expect(perioder[0].forelder).toEqual(splitPeriodeFedrekvote.forelder);
        expect(perioder[0].konto).toEqual(splitPeriodeFedrekvote.konto);
        expect(perioder[0].tidsperiode.fom).toEqual(splitPeriodeFedrekvote.tidsperiode.fom);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-04-29'));
        expect(perioder[1].id).not.toEqual(splitPeriodeFedrekvote.id);
        expect(perioder[1].type).toEqual(splitPeriodeFedrekvote.type);
        expect(perioder[1].forelder).toEqual(splitPeriodeFedrekvote.forelder);
        expect(perioder[1].konto).toEqual(splitPeriodeFedrekvote.konto);
        expect(perioder[1].tidsperiode.fom).toEqual(splitteDato);
        expect(perioder[1].tidsperiode.tom).toEqual(splitPeriodeFedrekvote.tidsperiode.tom);
    });
    it('Skal spitte periodeperiode med fedrekvote med familiehendelsesdato på en helgedag i to perioder med riktige datoer', () => {
        const splitteDato = new Date('2022-05-01');
        const perioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeFedrekvote, splitteDato);
        expect(perioder.length).toEqual(2);
        expect(perioder[0].tidsperiode.fom).toEqual(splitPeriodeFedrekvote.tidsperiode.fom);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-04-29'));
        expect(perioder[1].tidsperiode.fom).toEqual(splitPeriodeFedrekvote.tidsperiode.tom);
        expect(perioder[1].tidsperiode.tom).toEqual(splitPeriodeFedrekvote.tidsperiode.tom);
    });
    it('Skal spitte periode med aktivitetskrav der BFHR slik at perioden før familiehendelsesdato blir automatisk satt til uten aktivitetskrav', () => {
        const splitteDato = new Date('2022-05-02');
        const perioder = splittUttaksperiodePåFamiliehendelsesdato(splitPeriodeBFHRMedAktivitetskrav, splitteDato);
        expect(perioder.length).toEqual(2);
        expect(perioder[0].tidsperiode.fom).toEqual(splitPeriodeFedrekvote.tidsperiode.fom);
        expect(perioder[0].tidsperiode.tom).toEqual(new Date('2022-04-29'));
        expect(perioder[0].morsAktivitetIPerioden).toBeUndefined();
        expect(perioder[0].erMorForSyk).toBeUndefined();
        expect(perioder[1].tidsperiode.fom).toEqual(splitPeriodeFedrekvote.tidsperiode.tom);
        expect(perioder[1].tidsperiode.tom).toEqual(splitPeriodeFedrekvote.tidsperiode.tom);
        expect(perioder[1].morsAktivitetIPerioden).toEqual(splitPeriodeBFHRMedAktivitetskrav.morsAktivitetIPerioden);
        expect(perioder[1].erMorForSyk).toEqual(splitPeriodeBFHRMedAktivitetskrav.erMorForSyk);
    });
});
