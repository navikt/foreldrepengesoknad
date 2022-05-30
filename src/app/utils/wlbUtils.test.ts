import {
    getFørsteUttaksdag2UkerFørFødsel,
    starterTidsperiodeEtter2UkerFørFødsel,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
} from './wlbUtils';

describe('wlbUtils - getFørsteUttaksdag2UkerFørFødsel', () => {
    it('skal returnere mandagen 10 uttaksdager uker før hvis fødsel er på en søndag', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(new Date('2022-05-29T00:00:00.000Z'));
        expect(result).toEqual(new Date('2022-05-13T00:00:00.000Z'));
    });

    it('skal returnere mandagen 10 uttaksdager før hvis fødsel er på en fredag', () => {
        const result = getFørsteUttaksdag2UkerFørFødsel(new Date('2022-05-27T00:00:00.000Z'));
        expect(result).toEqual(new Date('2022-05-13T00:00:00.000Z'));
    });
});

describe('wlbUtils - starterTidsperiodeEtter2UkerFørFødsel', () => {
    it('skal returnere true for periode som starter mindre enn 2 uker før fødsel', () => {
        const tidsperiode = { fom: new Date('2022-05-13T00:00:00.000Z'), tom: new Date('2022-05-29T00:00:00.000Z') };
        const result = starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, new Date('2022-05-27T00:00:00.000Z'));
        expect(result).toEqual(true);
    });

    it('skal returnere false for periode som starter mer enn 2 uker før fødsel', () => {
        const tidsperiode = { fom: new Date('2022-05-12T00:00:00.000Z'), tom: new Date('2022-06-02T00:00:00.000Z') };
        const result = starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, new Date('2022-05-27T00:00:00.000Z'));
        expect(result).toEqual(false);
    });
});

describe('wlbUtils - starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel', () => {
    it('skal returnere true for periode som starter innen perioden rundt fødsel', () => {
        const tidsperiode = { fom: new Date('2022-07-07T00:00:00.000Z'), tom: new Date('2022-07-09T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(true);
    });

    it('skal returnere false for periode som ikke starter innen perioden rundt fødsel', () => {
        const tidsperiode = { fom: new Date('2022-07-08T00:00:00.000Z'), tom: new Date('2022-07-11T00:00:00.000Z') };
        const result = starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            tidsperiode,
            new Date('2022-05-27T00:00:00.000Z')
        );
        expect(result).toEqual(false);
    });
});
