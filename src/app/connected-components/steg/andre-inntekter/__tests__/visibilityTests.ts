import moment from 'moment';
import { default as fns } from './../visibility';
import { default as Søker } from '../../../../types/søknad/Søker';
import { FrilansInformasjon } from '../../../../types/søknad/FrilansInformasjon';
import frilansFns from './../../../../bolker/frilanser-bolk/visibility';
import SpyInstance = jest.SpyInstance;

const søkerUtenFrilans: Partial<Søker> = {
    harJobbetSomFrilansSiste10Mnd: false
};

const søkerMedFrilans: Partial<Søker> = {
    harJobbetSomFrilansSiste10Mnd: true
};

const fremdelesFrilans: FrilansInformasjon = {
    jobberFremdelesSomFrilans: true,
    harJobbetForNærVennEllerFamilieSiste10Mnd: false,
    oppstart: moment('12-25-1995', 'MM-DD-YYYY').toDate(),
    oppdragForNæreVennerEllerFamilieSiste10Mnd: []
};

const ferdigSomFrilans: FrilansInformasjon = {
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
        driverFosterhjemSpy = jest.spyOn(frilansFns, 'driverDuFosterhjemVisible');
        oppdragBolkSpy = jest.spyOn(frilansFns, 'oppdragBolkVisible');
        oppdragUtfyltSpy = jest.spyOn(frilansFns, 'frilansOppdragErUtfylt');
    });

    it('should be visible if !harJobbetSomFrilansSiste10Mnd', () => {
        const isVisible = fns.selvstendigNæringsdrivendeBolk(søkerUtenFrilans as Søker);
        expect(isVisible).toBe(true);
    });

    it('should be visible if harJobbetSomFrilansSiste10Mnd and has sufficient data in frilansInformasjon', () => {
        const søkerSomErFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: {
                ...fremdelesFrilans,
                driverFosterhjem: true
            }
        };
        expect(fns.selvstendigNæringsdrivendeBolk(søkerSomErFrilans as Søker)).toBe(true);
        expect(driverFosterhjemSpy).toHaveBeenCalledWith(søkerSomErFrilans);

        const søkerSomErFerdigSomFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: ferdigSomFrilans
        };
        expect(fns.selvstendigNæringsdrivendeBolk(søkerSomErFerdigSomFrilans as Søker)).toBe(true);
        expect(oppdragBolkSpy).toHaveBeenCalledWith(søkerSomErFerdigSomFrilans);
        expect(oppdragUtfyltSpy).toHaveBeenCalledWith(ferdigSomFrilans);
    });

    it('should not be visible if harJobbetSomFrilansSiste10Mnd and has insufficient data in frilansInformasjon', () => {
        const søkerSomErFrilans = {
            ...søkerMedFrilans,
            frilansInformasjon: fremdelesFrilans
        };
        expect(fns.selvstendigNæringsdrivendeBolk(søkerSomErFrilans as Søker)).toBe(false);
        expect(driverFosterhjemSpy).toHaveBeenCalledWith(søkerSomErFrilans);
    });
});
