import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Periodene } from '../Periodene';
import { Perioden } from '../Perioden';
import { Uttaksdagen } from '../Uttaksdagen';

const startdato = Uttaksdagen(new Date('2019-01-01'));

const perioder: Partial<Periode>[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: startdato.denneEllerNeste(),
            tom: startdato.leggTil(9),
        },
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: startdato.leggTil(10),
            tom: startdato.leggTil(19),
        },
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: startdato.leggTil(20),
            tom: startdato.leggTil(29),
        },
    },
];

describe('Periodene', () => {
    describe('finnOverlappendePerioder', () => {
        it('Skal finne overlappende perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.denneEllerNeste(),
                    tom: startdato.leggTil(13),
                },
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(2);
        });

        it('Skal finne overlapp om perioden dekkes av en annen periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.leggTil(1),
                    tom: startdato.leggTil(7),
                },
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(1);
        });

        it('Skal finne overlapp om perioden dekkes eksakt av en annen periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.denneEllerNeste(),
                    tom: startdato.leggTil(9),
                },
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(1);
        });

        it('Skal ikke finne overlapp dersom det ikke er overlapp', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.leggTil(30),
                    tom: startdato.leggTil(35),
                },
            };

            const result = Periodene(perioder as Periode[]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(0);
        });

        it('Skal ikke finne overlapp dersom det ikke er noen andre perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date(),
                    tom: new Date(),
                },
            };

            const result = Periodene([]).finnOverlappendePerioder(nyPeriode as Periode);
            expect(result.length).toEqual(0);
        });
    });

    describe('finnPeriodeMedDato', () => {
        it('Skal finne periode dersom startdato overlapper med en annen periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.denneEllerNeste(),
                    tom: startdato.leggTil(15),
                },
            };

            const result = Periodene(perioder as Periode[]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(perioder[0]);
        });

        it('Skal ikke finne periode dersom startdato ikke overlapper med en annen periode', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: startdato.leggTil(30),
                    tom: startdato.leggTil(35),
                },
            };

            const result = Periodene(perioder as Periode[]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(undefined);
        });

        it('Skal ikke finne en periode dersom det ikke er noen perioder', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date(),
                    tom: new Date(),
                },
            };

            const result = Periodene([]).finnPeriodeMedDato((nyPeriode as Periode).tidsperiode.fom);
            expect(result).toBe(undefined);
        });
    });

    describe('forskyvPerioder', () => {
        it('Skal ikke forskyve perioder hvis det ikke er perioder', () => {
            const result = Periodene([]).forskyvPerioder(10);
            expect(result).toEqual([]);
        });

        it('Skal forskyve perioder med antall uttaksdager angitt', () => {
            const result = Periodene(perioder as Periode[]).forskyvPerioder(10);

            expect(result[0].tidsperiode.fom).toEqual(startdato.leggTil(10));
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(20));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(30));
        });

        it('Skal ikke forskyve perioder hvis det er angitt 0 uttaksdager', () => {
            const result = Periodene(perioder as Periode[]).forskyvPerioder(0);

            expect(result[0].tidsperiode.fom).toEqual(startdato.denneEllerNeste());
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(10));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(20));
        });

        it('Skal ikke forskyve infoperioder, men overskrive', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Info,
                tidsperiode: {
                    fom: startdato.leggTil(30),
                    tom: startdato.leggTil(44),
                },
                overskrives: true,
            };
            const nyePerioder = [...perioder, nyPeriode];
            const antallDagerForskyvelse = 10;

            expect(Perioden(nyPeriode as Periode).getAntallUttaksdager()).toEqual(15);

            const result = Periodene(nyePerioder as Periode[]).forskyvPerioder(antallDagerForskyvelse);

            expect(result[0].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse));
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 10));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 20));
            expect(result[3].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 30));
            expect(Perioden(result[3]).getAntallUttaksdager()).toEqual(5);
        });

        it('Skal ikke forskyve oppholdsperioder, men overskrive', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Opphold,
                tidsperiode: {
                    fom: new Date('2019-02-12'),
                    tom: new Date('2019-03-04'),
                },
            };
            const antallDagerForskyvelse = 10;
            const nyePerioder = [...perioder, nyPeriode];

            expect(Perioden(nyPeriode as Periode).getAntallUttaksdager()).toEqual(15);

            const result = Periodene(nyePerioder as Periode[]).forskyvPerioder(antallDagerForskyvelse);

            expect(result[0].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse));
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 10));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 20));
            expect(result[3].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 30));
            expect(Perioden(result[3]).getAntallUttaksdager()).toEqual(5);
        });

        it('Skal fjerne infoperioder om den forskyves like mange dager som perioden er lang', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Info,
                tidsperiode: {
                    fom: new Date('2019-02-12'),
                    tom: new Date('2019-02-25'),
                },
                overskrives: true,
            };
            const nyePerioder = [...perioder, nyPeriode];
            const antallDagerForskyvelse = 10;
            const result = Periodene(nyePerioder as Periode[]).forskyvPerioder(antallDagerForskyvelse);

            expect(result[0].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse));
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 10));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 20));
            expect(result.length).toEqual(3);
        });

        it('Skal fjerne oppholdsperioder om den forskyves like mange dager som perioden er lang', () => {
            const nyPeriode: Partial<Periode> = {
                id: '4',
                type: Periodetype.Opphold,
                tidsperiode: {
                    fom: new Date('2019-02-12'),
                    tom: new Date('2019-02-25'),
                },
            };
            const nyePerioder = [...perioder, nyPeriode];
            const antallDagerForskyvelse = 10;
            const result = Periodene(nyePerioder as Periode[]).forskyvPerioder(10);

            expect(result[0].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse));
            expect(result[1].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 10));
            expect(result[2].tidsperiode.fom).toEqual(startdato.leggTil(antallDagerForskyvelse + 20));
            expect(result.length).toEqual(3);
        });
    });
});
