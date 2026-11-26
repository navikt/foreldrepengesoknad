import { lagFeltId } from './feltId';

describe('lagFeltId', () => {
    it('skal gi ulike id-er for feltnavn som bare skiller seg på spesialtegn', () => {
        const control = {};

        expect(lagFeltId(control, 'barn.0.namn')).not.toBe(lagFeltId(control, 'barn_0_namn'));
        expect(lagFeltId(control, 'barn.0.namn')).toMatch(/^rhf\d+-[\w-]+$/);
    });

    it('skal gi ulike id-er for samme feltnavn i to skjema og samme id innen ett skjema', () => {
        const skjemaA = {};
        const skjemaB = {};

        expect(lagFeltId(skjemaA, 'fom')).toBe(lagFeltId(skjemaA, 'fom'));
        expect(lagFeltId(skjemaA, 'fom')).not.toBe(lagFeltId(skjemaB, 'fom'));
    });
});
