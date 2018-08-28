import { default as fns } from './../visibility';
import { default as Søker } from '../../../../types/søknad/Søker';
import { FrilansInformasjon } from '../../../../types/søknad/FrilansInformasjon';

let søkerUtenFrilans: Søker = {
    harJobbetSomFrilansSiste10Mnd: false
} as Søker;

let søkerMedFrilans: Søker = {
    harJobbetSomFrilansSiste10Mnd: true
} as Søker;

let fremdelesFrilans: FrilansInformasjon = {
    jobberFremdelesSomFrilans: true,
    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
    oppstart: new Date(),
    oppdragForNæreVennerEllerFamilieSiste10Mnd: []
};

let ferdigSomFrilans: FrilansInformasjon = {
    jobberFremdelesSomFrilans: false,
    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
    oppstart: new Date(),
    oppdragForNæreVennerEllerFamilieSiste10Mnd: []
};

describe('Selvstendig næringsdrivende-bolk visibility', () => {
    it('should be visible if !harJobbetSomFrilansSiste10Mnd', () => {
        const isVisible = fns.selvstendigNæringsdrivendeBolk(søkerUtenFrilans);
        expect(isVisible).toBe(true);
    });

    it('should be visible if harJobbetSomFrilansSiste10Mnd and has sufficient data in frilansInformasjon', () => {
        expect(
            fns.selvstendigNæringsdrivendeBolk({
                ...søkerMedFrilans,
                frilansInformasjon: {
                    ...fremdelesFrilans,
                    driverFosterhjem: true
                }
            })
        ).toBe(true);

        expect(
            fns.selvstendigNæringsdrivendeBolk({
                ...søkerMedFrilans,
                frilansInformasjon: ferdigSomFrilans
            })
        ).toBe(true);
    });

    it('should not be visible if harJobbetSomFrilansSiste10Mnd and has insufficient data in frilansInformasjon', () => {
        expect(
            fns.selvstendigNæringsdrivendeBolk({
                ...søkerMedFrilans,
                frilansInformasjon: fremdelesFrilans
            })
        ).toBe(false);
    });
});

describe('Andre inntekter-bolk visibility', () => {});
