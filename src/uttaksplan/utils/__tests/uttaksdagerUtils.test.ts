import { Tidsperiode } from '../../types';
import {
    erUttaksdag,
    getForsteUttaksdagForDato,
    getForsteUttaksdagPaEllerEtterDato,
    getForsteUttaksdagEtterDato,
    getAntallUttaksdagerITidsperiode,
    leggUttaksdagerTilDato,
    trekkUttaksdagerFraDato,
    getUkerOgDagerFromDager
} from '../../utils/uttaksdagerUtils';

describe('uttaksdagerUtils', () => {
    const mandag = new Date(2018, 0, 1);
    const tirsdag = new Date(2018, 0, 2);
    const onsdag = new Date(2018, 0, 3);
    const torsdag = new Date(2018, 0, 4);
    const fredag = new Date(2018, 0, 5);
    const lordag = new Date(2018, 0, 6);
    const sondag = new Date(2018, 0, 7);
    const nesteMandag = new Date(2018, 0, 8);
    const nesteTirsdag = new Date(2018, 0, 9);
    const mandagNesteAr = new Date(2019, 0, 1);

    const tidsperiodeEnDag: Tidsperiode = {
        startdato: mandag,
        sluttdato: mandag
    };

    const tidsperiodeToDager: Tidsperiode = {
        startdato: mandag,
        sluttdato: tirsdag
    };

    const tidsperiodeTreDager: Tidsperiode = {
        startdato: mandag,
        sluttdato: onsdag
    };

    const tidsperiodeFireDager: Tidsperiode = {
        startdato: mandag,
        sluttdato: torsdag
    };

    const tidsperiodeFemDager: Tidsperiode = {
        startdato: tirsdag,
        sluttdato: nesteMandag
    };

    const tidsperiodeOverHelg: Tidsperiode = {
        startdato: mandag,
        sluttdato: nesteMandag
    };

    const tidsperiodeOverHelg2: Tidsperiode = {
        startdato: fredag,
        sluttdato: nesteMandag
    };

    const tidsperiodeOverEttAr: Tidsperiode = {
        startdato: mandag,
        sluttdato: mandagNesteAr
    };

    describe('getUkedag', () => {
        it('mandag er uttaksdag', () => {
            expect(erUttaksdag(mandag)).toBeTruthy();
        });
        it('tirsdag er uttaksdag', () => {
            expect(erUttaksdag(tirsdag)).toBeTruthy();
        });
        it('onsdag er uttaksdag', () => {
            expect(erUttaksdag(onsdag)).toBeTruthy();
        });
        it('torsdag er uttaksdag', () => {
            expect(erUttaksdag(torsdag)).toBeTruthy();
        });
        it('fredag er uttaksdag', () => {
            expect(erUttaksdag(fredag)).toBeTruthy();
        });
        it('lørdag er ikke uttaksdag', () => {
            expect(erUttaksdag(lordag)).toBeFalsy();
        });
        it('søndag er ikke uttaksdag', () => {
            expect(erUttaksdag(sondag)).toBeFalsy();
        });
    });

    describe('trekkUttaksdagerFraDato', () => {
        it('trekker fra 1 dag riktig', () => {
            expect(trekkUttaksdagerFraDato(onsdag, 1)).toEqual(tirsdag);
        });
        it('trekker fra 4 dager riktig', () => {
            expect(trekkUttaksdagerFraDato(fredag, 4)).toEqual(mandag);
        });
        it('trekker fra 5 dager riktig', () => {
            expect(trekkUttaksdagerFraDato(nesteMandag, 5)).toEqual(mandag);
        });
        it('trekker fra 6 dager riktig', () => {
            expect(trekkUttaksdagerFraDato(nesteTirsdag, 6)).toEqual(mandag);
        });
    });

    describe('getForsteUttaksdagForDato', () => {
        expect(getForsteUttaksdagForDato(tirsdag)).toEqual(mandag);
        expect(getForsteUttaksdagForDato(lordag)).toEqual(fredag);
        expect(getForsteUttaksdagForDato(sondag)).toEqual(fredag);
    });

    describe('getForsteUttaksdagPaEllerEtterDato', () => {
        expect(getForsteUttaksdagPaEllerEtterDato(mandag)).toEqual(mandag);
        expect(getForsteUttaksdagPaEllerEtterDato(lordag)).toEqual(nesteMandag);
        expect(getForsteUttaksdagPaEllerEtterDato(sondag)).toEqual(nesteMandag);
    });

    describe('getForsteUttaksdagEtterDato', () => {
        expect(getForsteUttaksdagEtterDato(mandag)).toEqual(tirsdag);
        expect(getForsteUttaksdagEtterDato(tirsdag)).toEqual(onsdag);
        expect(getForsteUttaksdagEtterDato(fredag)).toEqual(nesteMandag);
        expect(getForsteUttaksdagEtterDato(sondag)).toEqual(nesteMandag);
    });

    describe('getAntallUttaksdagerITidsperiode', () => {
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(1);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeToDager)).toBe(2);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeTreDager)).toBe(3);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeFireDager)).toBe(4);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeFemDager)).toBe(5);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeOverHelg)).toBe(6);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeOverHelg2)).toBe(2);
        expect(getAntallUttaksdagerITidsperiode(tidsperiodeOverEttAr)).toBe(
            262
        );
    });

    describe('leggUttaksdagerTilDato', () => {
        it('legger til en uttaksdag på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 1)).toEqual(tirsdag);
        });
        it('legger til to uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 2)).toEqual(onsdag);
        });
        it('legger til to uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(torsdag, 2)).toEqual(nesteMandag);
        });
        it('legger til to uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(fredag, 2)).toEqual(nesteTirsdag);
        });
        it('legger til tre uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 3)).toEqual(torsdag);
        });
        it('legger til fire uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 4)).toEqual(fredag);
        });
        it('legger til fem uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 5)).toEqual(nesteMandag);
        });
        it('legger til sekls uttaksdager på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(mandag, 6)).toEqual(nesteTirsdag);
        });
        it('legger til fem uttaksdag på en dato riktig', () => {
            expect(leggUttaksdagerTilDato(fredag, 1)).toEqual(nesteMandag);
        });
    });

    describe('konvertere dager til uker', () => {
        it('beregner 1 dag til 0 uker og 1 dag', () => {
            const result = getUkerOgDagerFromDager(1);
            expect(result.dager).toBe(1);
            expect(result.uker).toBe(0);
        });
        it('beregner 4 dager til 0 uker og 4 dager', () => {
            const result = getUkerOgDagerFromDager(4);
            expect(result.dager).toBe(4);
            expect(result.uker).toBe(0);
        });
        it('beregner 5 dager til 1 uke', () => {
            const result = getUkerOgDagerFromDager(5);
            expect(result.dager).toBe(0);
            expect(result.uker).toBe(1);
        });
        it('beregner 12 dager til 2 uke og 2 dager', () => {
            const result = getUkerOgDagerFromDager(12);
            expect(result.dager).toBe(2);
            expect(result.uker).toBe(2);
        });
    });
});
