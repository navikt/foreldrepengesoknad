import { Uttaksdagen } from '../Uttaksdagen';

describe('Uttaksdagen', () => {
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
});
