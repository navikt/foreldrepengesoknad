import moment from 'moment';
import { default as fns } from './../visibility';
import { default as Søker } from '../../../../types/søknad/Søker';
import { FrilansInformasjon } from '../../../../types/søknad/FrilansInformasjon';
import frilansFns from './../../../../bolker/frilanser-bolk/visibility';
import SpyInstance = jest.SpyInstance;

let søkerUtenFrilans: Søker = {
    harJobbetSomFrilansSiste10Mnd: false
} as Søker;

let søkerMedFrilans: Søker = {
    harJobbetSomFrilansSiste10Mnd: true
} as Søker;

let fremdelesFrilans: FrilansInformasjon = {
    jobberFremdelesSomFrilans: true,
    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
    oppstart: moment('12-25-1995', 'MM-DD-YYYY').toDate(),
    oppdragForNæreVennerEllerFamilieSiste10Mnd: []
};

let ferdigSomFrilans: FrilansInformasjon = {
    jobberFremdelesSomFrilans: false,
    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
    oppstart: moment('12-25-1995', 'MM-DD-YYYY').toDate(),
    oppdragForNæreVennerEllerFamilieSiste10Mnd: []
};

describe('Selvstendig næringsdrivende-bolk visibility', () => {
    let driverFosterhjemSpy: SpyInstance;
    let oppdragBolkSpy: SpyInstance;
    let oppdragUtfyltSpy: SpyInstance;

    beforeEach(() => {
        driverFosterhjemSpy = jest.spyOn(
            frilansFns,
            'driverDuFosterhjemVisible'
        );
        oppdragBolkSpy = jest.spyOn(frilansFns, 'oppdragBolkVisible');
        oppdragUtfyltSpy = jest.spyOn(frilansFns, 'frilansOppdragErUtfylt');
    });

    it('should be visible if !harJobbetSomFrilansSiste10Mnd', () => {
        const isVisible = fns.selvstendigNæringsdrivendeBolk(søkerUtenFrilans);
        expect(isVisible).toBe(true);
    });

    it('should be visible if harJobbetSomFrilansSiste10Mnd and has sufficient data in frilansInformasjon', () => {
        let søkerSomErFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: {
                ...fremdelesFrilans,
                driverFosterhjem: true
            }
        };
        expect(fns.selvstendigNæringsdrivendeBolk(søkerSomErFrilans)).toBe(
            true
        );
        expect(driverFosterhjemSpy).toHaveBeenCalledWith(søkerSomErFrilans);

        let søkerSomErFerdigSomFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: ferdigSomFrilans
        };
        expect(
            fns.selvstendigNæringsdrivendeBolk(søkerSomErFerdigSomFrilans)
        ).toBe(true);
        expect(oppdragBolkSpy).toHaveBeenCalledWith(søkerSomErFerdigSomFrilans);
        expect(oppdragUtfyltSpy).toHaveBeenCalledWith(ferdigSomFrilans);
    });

    it('should not be visible if harJobbetSomFrilansSiste10Mnd and has insufficient data in frilansInformasjon', () => {
        const søkerSomErFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: fremdelesFrilans
        };
        expect(fns.selvstendigNæringsdrivendeBolk(søkerSomErFrilans)).toBe(
            false
        );
        expect(driverFosterhjemSpy).toHaveBeenCalledWith(søkerSomErFrilans);
    });
});

describe('Andre inntekter-bolk visibility', () => {});
