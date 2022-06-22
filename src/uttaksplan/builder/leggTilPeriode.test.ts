import { Forelder } from 'app/types/Forelder';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { Periode, Periodetype, Uttaksperiode } from 'uttaksplan/types/Periode';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
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
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Hull,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const periodeMedPeriodeUtenUttak: Periode[] = [
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
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.PeriodeUtenUttak,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
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
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-08-17'),
        },
        forelder: Forelder.farMedmor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        overskrives: true,
        visPeriodeIPlan: true,
        resultatType: PeriodeResultatType.INNVILGET,
        årsak: OppholdÅrsakType.UttakFedrekvoteAnnenForelder,
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioderMedFarsUttak: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-10-04'),
            tom: new Date('2022-12-12'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
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
        resultatType: PeriodeResultatType.INNVILGET,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
    },
];

describe('Test av legg til periode i uttaksplan', () => {
    it('Burde legge til periode korrekt', () => {
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
        });

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);
    });

    it('Burde legge til periode korrekt når planen inneholder hull', () => {
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
            perioder: perioderMedHull,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode({
            perioder: perioderMedHull,
            nyPeriode: nyPeriode2,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });

    it('Burde legge til periode korrekt når planen inneholder annen parts uttak', () => {
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
            perioder: periodeMedAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode({
            perioder: periodeMedAnnenPartsUttak,
            nyPeriode: nyPeriode2,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
    });

    it('Burde legge til periode korrekt når planen inneholder perioder uten uttak', () => {
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
            perioder: periodeMedPeriodeUtenUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(5);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-07-18'),
                tom: new Date('2022-07-22'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result2 = leggTilPeriode({
            perioder: periodeMedPeriodeUtenUttak,
            nyPeriode: nyPeriode2,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result2.length).toEqual(6);
        expect(result2[2]).toEqual(nyPeriode2);
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
        });

        expect(result.length).toEqual(4);
        expect(result[0]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt med periode uten uttak', () => {
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
        });

        expect(result.length).toEqual(4);
        expect(result[3]).toEqual(nyPeriode);
    });

    it('Burde legge til periode før første periode korrekt med periode uten uttak', () => {
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
        });

        expect(result.length).toEqual(4);
        expect(result[1]).toEqual(nyPeriode);
        expect(result[2].tidsperiode.fom).toEqual(new Date('2022-05-19'));
        expect(result[2].tidsperiode.tom).toEqual(new Date('2022-08-31'));
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
        });

        expect(result.length).toEqual(3);
    });

    it('Skal ta hensyn til overlappende dager og forskyve når ny periode legges inn i starten med overlapp', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-09-12'),
                tom: new Date('2022-10-14'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fedrekvote,
        };

        const result = leggTilPeriode({
            perioder: perioderMedFarsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(2);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[1].tidsperiode.fom).toEqual(new Date('2022-10-17'));
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-12-23'));
    });

    it('Skal ta hensyn til overlappende dager og forskyve når ny periode legges inn i starten med overlapp', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-09-12'),
                tom: new Date('2022-10-14'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fedrekvote,
        };

        const result = leggTilPeriode({
            perioder: perioderMedFarsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(2);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[1].tidsperiode.fom).toEqual(new Date('2022-10-17'));
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-12-23'));
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
            konto: StønadskontoType.Fedrekvote,
        };

        const result = leggTilPeriode({
            perioder: perioderKunAnnenPartsUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(2);
        expect(result[0].tidsperiode.fom).toEqual(nyPeriode.tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toEqual(nyPeriode.tidsperiode.tom);
        expect(result[1].tidsperiode.fom).toEqual(new Date('2022-10-17'));
        expect(result[1].tidsperiode.tom).toEqual(new Date('2022-12-12'));
    });

    it('Skal overskrive og ikke forskyve annen parts uttak hvis ny periode legger seg over annen parts uttak', () => {
        const nyPeriode: Periode = {
            id: '5',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-08-05'),
                tom: new Date('2022-08-10'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
        };

        const result = leggTilPeriode({
            perioder: periodeMedPeriodeUtenUttak,
            nyPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
        });

        expect(result.length).toEqual(6);
        expect(result[3]).toEqual(nyPeriode);
        expect(result[4].tidsperiode).toEqual({ fom: new Date('2022-08-11'), tom: new Date('2022-08-17') });
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
