import { Uttaksdagen } from '../Uttaksdagen';

describe('Uttaksdagen', () => {
    describe('erUttaksdag', () => {
        it('Skal si at en ukedag er en uttaksdag', () => {
            const mandag = new Date('2019-01-07');
            const tirsdag = new Date('2019-01-08');
            const onsdag = new Date('2019-01-09');
            const torsdag = new Date('2019-01-10');
            const fredag = new Date('2019-01-11');

            const mandagResult = Uttaksdagen(mandag).erUttaksdag();
            expect(mandagResult).toBe(true);

            const tirsdagResult = Uttaksdagen(tirsdag).erUttaksdag();
            expect(tirsdagResult).toBe(true);

            const onsdagResult = Uttaksdagen(onsdag).erUttaksdag();
            expect(onsdagResult).toBe(true);

            const torsdagResult = Uttaksdagen(torsdag).erUttaksdag();
            expect(torsdagResult).toBe(true);

            const fredagResult = Uttaksdagen(fredag).erUttaksdag();
            expect(fredagResult).toBe(true);
        });

        it('Skal si at en helgedag ikke er en uttaksdag', () => {
            const lørdag = new Date('2019-01-12');
            const søndag = new Date('2019-01-13');

            const lørdagResult = Uttaksdagen(lørdag).erUttaksdag();
            expect(lørdagResult).toBe(false);

            const søndagResult = Uttaksdagen(søndag).erUttaksdag();
            expect(søndagResult).toBe(false);
        });
    });

    describe('forrige', () => {
        it('Skal returnere forrige uttaksdag', () => {
            const fredag = new Date('2019-01-11');

            const result = Uttaksdagen(fredag).forrige();
            expect(result).toEqual(new Date('2019-01-10'));
        });

        it('Skal returnere fredag om uttaksdagen er mandag', () => {
            const mandag = new Date('2019-01-07');

            const result = Uttaksdagen(mandag).forrige();
            expect(result).toEqual(new Date('2019-01-04'));
        });
    });

    describe('neste', () => {
        it('Skal returnere neste uttaksdag', () => {
            const mandag = new Date('2019-01-07');

            const result = Uttaksdagen(mandag).neste();
            expect(result).toEqual(new Date('2019-01-08'));
        });

        it('Skal returnere mandag om uttaksdagen er fredag', () => {
            const fredag = new Date('2019-01-11');

            const result = Uttaksdagen(fredag).neste();
            expect(result).toEqual(new Date('2019-01-14'));
        });
    });

    describe('denneEllerNeste', () => {
        it('Skal returnere samme dato om uttaksdagen er en ukedag', () => {
            const mandag = new Date('2019-01-07');

            const result = Uttaksdagen(mandag).denneEllerNeste();
            expect(result).toEqual(new Date('2019-01-07'));
        });

        it('Skal returnere mandag om uttaksdagen er lørdag eller søndag', () => {
            const lørdag = new Date('2019-01-12');
            const søndag = new Date('2019-01-13');

            const lørdagResult = Uttaksdagen(lørdag).denneEllerNeste();
            expect(lørdagResult).toEqual(new Date('2019-01-14'));

            const søndagResult = Uttaksdagen(søndag).denneEllerNeste();
            expect(søndagResult).toEqual(new Date('2019-01-14'));
        });
    });

    describe('denneEllerForrige', () => {
        it('Skal returnere samme dato om uttaksdagen er en ukedag', () => {
            const mandag = new Date('2019-01-07');

            const result = Uttaksdagen(mandag).denneEllerForrige();
            expect(result).toEqual(new Date('2019-01-07'));
        });

        it('Skal returnere fredag om uttaksdagen er lørdag eller søndag', () => {
            const lørdag = new Date('2019-01-12');
            const søndag = new Date('2019-01-13');

            const lørdagResult = Uttaksdagen(lørdag).denneEllerForrige();
            expect(lørdagResult).toEqual(new Date('2019-01-11'));

            const søndagResult = Uttaksdagen(søndag).denneEllerForrige();
            expect(søndagResult).toEqual(new Date('2019-01-11'));
        });
    });

    describe('leggTil', () => {
        it('Skal returnere samme dato om man legger til 0 dager', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.leggTil(0);
            expect(result).toEqual(dato.denneEllerNeste());
        });

        it('Skal legge til dager korrekt', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.leggTil(1);
            expect(result).toEqual(new Date('2019-01-02'));
        });

        it('Skal hoppe over helgedager', () => {
            const dato = Uttaksdagen(new Date('2019-01-04'));

            const result = dato.leggTil(1);
            expect(result).toEqual(new Date('2019-01-07'));
        });

        it('Skal gå bak i tid med negativ input', () => {
            const dato = Uttaksdagen(new Date('2019-01-04'));

            const result = dato.leggTil(-1);
            expect(result).toEqual(new Date('2019-01-03'));
        });
    });

    describe('getUttaksdagerFremTilDato', () => {
        it('Skal hente ut korrekt antall uttaksdager frem til dato', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.getUttaksdagerFremTilDato(new Date('2019-01-31'));
            expect(result).toBe(22);
        });

        it('Skal returnere 0 dager om samme dato er angitt', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.getUttaksdagerFremTilDato(new Date('2019-01-01'));
            expect(result).toBe(0);
        });

        it('Skal ikke regne med helgedager', () => {
            const mandag = Uttaksdagen(new Date('2019-01-07'));

            const result = mandag.getUttaksdagerFremTilDato(new Date('2019-01-13'));
            expect(result).toBe(4);
        });

        it('Skal ikke være inklusive startdato', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.getUttaksdagerFremTilDato(new Date('2019-01-02'));
            expect(result).toBe(1);
        });
    });

    describe('trekkFra', () => {
        it('Skal trekke fra dager korrekt', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.trekkFra(1);
            expect(result).toEqual(new Date('2018-12-31'));
        });

        it('Skal returnere samme dato om man trekker fra 0 dager', () => {
            const dato = Uttaksdagen(new Date('2019-01-01'));

            const result = dato.trekkFra(0);
            expect(result).toEqual(new Date('2019-01-01'));
        });

        it('Skal hoppe over helgedager', () => {
            const mandag = Uttaksdagen(new Date('2019-01-07'));

            const result = mandag.trekkFra(1);
            expect(result).toEqual(new Date('2019-01-04'));
        });
    });
});
