import {
    Periodetype,
    UtsettelseArsakType,
    Utsettelsesperiode,
    Stonadsperiode,
    StonadskontoType,
    Tidsperiode
} from '../../types';
import {
    leggTilUtsettelse,
    getPeriodeSluttdato,
    flyttTidsperiode
} from '../../utils/periodeUtils';
import { getPermisjonsregler } from '../../data/permisjonsregler';
import {
    leggUttaksdagerTilDato,
    getAntallUttaksdagerIPerioder,
    getAntallUttaksdagerITidsperiode
} from '../../utils/uttaksdagerUtils';
import {
    getAntallUkerFellesperiode,
    getAntallStonadsdagerForForelder,
    opprettStønadsperioder
} from '../../utils/permisjonUtils';
import { addDays } from 'date-fns';

const datoer = {
    termin: new Date(2018, 0, 24),
    mandag: new Date(2018, 0, 1),
    tirsdag: new Date(2018, 0, 2),
    onsdag: new Date(2018, 0, 3),
    torsdag: new Date(2018, 0, 4),
    fredag: new Date(2018, 0, 5),
    lordag: new Date(2018, 0, 6),
    sondag: new Date(2018, 0, 7),
    nesteMandag: new Date(2018, 0, 8),
    nesteTirsdag: new Date(2018, 0, 9),
    nesteFredag: new Date(2018, 0, 12),
    mandagNesteAr: new Date(2019, 0, 1)
};

const permisjonsregler = getPermisjonsregler(datoer.termin);

const periode: Stonadsperiode = {
    type: Periodetype.Stonadsperiode,
    konto: StonadskontoType.Fellesperiode,
    forelder: 'forelder1',
    tidsperiode: {
        startdato: new Date(2018, 0, 1),
        sluttdato: new Date(2018, 0, 12)
    }
};

const utsettelse: Utsettelsesperiode = {
    arsak: UtsettelseArsakType.Arbeid,
    forelder: 'forelder1',
    tidsperiode: {
        startdato: new Date(2018, 3, 16),
        sluttdato: new Date(2018, 3, 17)
    },
    type: Periodetype.Utsettelse
};

const lagUtsettelse = (dager: number): Utsettelsesperiode => ({
    ...utsettelse,
    tidsperiode: {
        startdato: utsettelse.tidsperiode.startdato,
        sluttdato: leggUttaksdagerTilDato(
            utsettelse.tidsperiode.startdato,
            dager - 1
        )
    }
});

describe('periodeUtils', () => {
    describe('legger til utsettelse', () => {
        const stonadsperioder = opprettStønadsperioder(
            datoer.termin,
            '100%',
            13,
            13,
            permisjonsregler
        );

        const testUtsettelse = (dager: number, forventetSluttdato: Date) => {
            const uttaksdagerUtenUtsettelse = getAntallUttaksdagerIPerioder(
                stonadsperioder
            );
            const perioderMedUtsettelse = leggTilUtsettelse(
                stonadsperioder,
                lagUtsettelse(dager)
            );
            const uttaksdagerMedUtsettelse = getAntallUttaksdagerIPerioder(
                perioderMedUtsettelse
            );
            it('antall uttaksdager er det samme', () => {
                expect(uttaksdagerUtenUtsettelse).toEqual(
                    uttaksdagerMedUtsettelse
                );
            });
            it(`forskyver sluttdato med ${dager} dager`, () => {
                const nySluttdato =
                    perioderMedUtsettelse[perioderMedUtsettelse.length - 1]
                        .tidsperiode.sluttdato;
                expect(nySluttdato).toEqual(forventetSluttdato);
            });
        };

        const opprinneligSluttdato =
            stonadsperioder[stonadsperioder.length - 1].tidsperiode.sluttdato;

        testUtsettelse(1, leggUttaksdagerTilDato(opprinneligSluttdato, 1));
        testUtsettelse(2, leggUttaksdagerTilDato(opprinneligSluttdato, 2));
        testUtsettelse(3, leggUttaksdagerTilDato(opprinneligSluttdato, 3));
    });

    it('finner riktig antall uker for fellesperioden 80%', () => {
        expect(getAntallUkerFellesperiode(permisjonsregler, '80%')).toBe(36);
    });

    it('finner riktig antall uker for fellesperioden 100%', () => {
        expect(getAntallUkerFellesperiode(permisjonsregler, '100%')).toBe(26);
    });

    it('finner riktig periodesluttdato', () => {
        const periodeEnUke: Tidsperiode = {
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 0, 5)
        };
        const periodeToUker: Tidsperiode = {
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 0, 12)
        };
        const periodeTreUkerForskyvet: Tidsperiode = {
            startdato: new Date(2018, 0, 4),
            sluttdato: new Date(2018, 0, 17)
        };
        expect(getPeriodeSluttdato(periodeEnUke.startdato, 1)).toEqual(
            periodeEnUke.sluttdato
        );
        expect(getPeriodeSluttdato(periodeToUker.startdato, 2)).toEqual(
            periodeToUker.sluttdato
        );
        expect(
            getPeriodeSluttdato(periodeTreUkerForskyvet.startdato, 2)
        ).toEqual(periodeTreUkerForskyvet.sluttdato);
    });

    it('henter ut riktig antall uttaksdager for en forelder', () => {
        const perioder: Stonadsperiode[] = [
            { ...periode },
            {
                ...periode,
                forelder: 'forelder2'
            }
        ];
        expect(getAntallStonadsdagerForForelder('forelder1', perioder)).toBe(
            10
        );
        expect(getAntallStonadsdagerForForelder('forelder2', perioder)).toBe(
            10
        );
    });

    describe('tidsperiode flytt', () => {
        const tidsperiodeEnDag: Tidsperiode = {
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 0, 1)
        };

        const tidsperiode: Tidsperiode = {
            startdato: new Date(2018, 0, 1),
            sluttdato: new Date(2018, 0, 4)
        };

        const tidsperiodeTorFre: Tidsperiode = {
            startdato: new Date(2018, 0, 4),
            sluttdato: new Date(2018, 0, 5)
        };

        const tidsperiodeFreMan: Tidsperiode = {
            startdato: new Date(2018, 0, 5),
            sluttdato: new Date(2018, 0, 8)
        };

        describe('flyttTidsperiode', () => {
            it('forskyver riktig en dag innenfor en uke', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiode,
                    new Date(2018, 0, 2)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 2)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 5)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('forskyver riktig to dager innenfor en uke', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeEnDag,
                    new Date(2018, 0, 3)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 3)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 3)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('forskyver riktig tre dager innenfor en uke', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeEnDag,
                    new Date(2018, 0, 4)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 4)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 4)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('forskyver riktig fire dager innenfor en uke', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeEnDag,
                    new Date(2018, 0, 5)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 5)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 5)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('forskyver riktig frem dager med overgant til neste uke', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeEnDag,
                    new Date(2018, 0, 8)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 8)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 8)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('forskyver riktig over en helg', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiode,
                    new Date(2018, 0, 3)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 3)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 8)
                );
                expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(
                    getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                );
            });
            it('sluttdato på fredag blir forskyvet til mandag', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeTorFre,
                    addDays(tidsperiodeTorFre.startdato, 1)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 5)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 8)
                );
                expect(
                    getAntallUttaksdagerITidsperiode(tidsperiodeTorFre)
                ).toBe(getAntallUttaksdagerITidsperiode(forskyvetPeriode));
            });
            it('startdato på fredag blir forskyvet til mandag', () => {
                const forskyvetPeriode = flyttTidsperiode(
                    tidsperiodeFreMan,
                    addDays(tidsperiodeTorFre.startdato, 4)
                );
                expect(forskyvetPeriode.startdato).toEqual(
                    new Date(2018, 0, 8)
                );
                expect(forskyvetPeriode.sluttdato).toEqual(
                    new Date(2018, 0, 9)
                );
                expect(
                    getAntallUttaksdagerITidsperiode(tidsperiodeFreMan)
                ).toBe(getAntallUttaksdagerITidsperiode(forskyvetPeriode));
            });

            const antallDager = getAntallUttaksdagerITidsperiode(tidsperiode);
            for (let i = 0; i < 10; i++) {
                it(`antall dager er den samme når en forskyver en tidsperiode ${i} dager`, () => {
                    const forskyvetPeriode = flyttTidsperiode(
                        tidsperiode,
                        addDays(tidsperiode.startdato, i)
                    );
                    expect(antallDager).toBe(
                        getAntallUttaksdagerITidsperiode(forskyvetPeriode)
                    );
                });
            }
        });
    });
});
