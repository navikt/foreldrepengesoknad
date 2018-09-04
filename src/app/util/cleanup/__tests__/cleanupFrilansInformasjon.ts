import cleanup from '../cleanupFrilansInformasjon';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import {
    FrilansInformasjon,
    FrilansInformasjonPartial,
    FrilansOppdrag
} from '../../../types/søknad/FrilansInformasjon';

jest.mock('./../../../bolker/frilanser-bolk/visibility', () => ({
    driverDuFosterhjemVisible: () => false
}));

const oppdrag: FrilansOppdrag = {
    navnPåArbeidsgiver: 'asdf',
    pågående: true,
    tidsperiode: {
        fom: new Date()
    }
};

const frilansInformasjon: FrilansInformasjonPartial = {
    oppdragForNæreVennerEllerFamilieSiste10Mnd: [oppdrag as FrilansOppdrag],
    harJobbetForNærVennEllerFamilieSiste10Mnd: true,
    driverFosterhjem: true,
    oppstart: new Date(),
    jobberFremdelesSomFrilans: true
};

const søker: SøkerPartial = {
    frilansInformasjon: frilansInformasjon as FrilansInformasjon
};

describe('cleanupFrilansInformasjon', () => {
    it('should return list of FrilansOppdrag if harJobbetForNærVennEllerFamilieSiste10Mnd', () => {
        const frilans = cleanup(søker as Søker);
        expect(frilans).toBeDefined();
        if (frilans) {
            expect(frilans.oppdragForNæreVennerEllerFamilieSiste10Mnd[0]).toBe(oppdrag);
        }
    });

    it('should empty list of FrilansOppdrag if !harJobbetForNærVennEllerFamilieSiste10Mnd', () => {
        if (søker.frilansInformasjon) {
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = false;
            const frilans = cleanup(søker as Søker);
            expect(frilans).toBeDefined();
            if (frilans) {
                expect(frilans.oppdragForNæreVennerEllerFamilieSiste10Mnd.length).toBe(0);
            }
        }
    });

    it('should set driverDuFosterhjem to undefined if that field is not visible', () => {
        const frilans = cleanup(søker as Søker);
        if (frilans) {
            expect(frilans.driverFosterhjem).toBeUndefined();
        }
    });
});
