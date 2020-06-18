import cleanup from '../cleanupFrilansInformasjon';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import {
    FrilansInformasjon,
    FrilansInformasjonPartial,
    FrilansOppdrag,
} from '../../../types/søknad/FrilansInformasjon';
import visibility from '../../../steg/andreInntekter/frilanserBolk/visibility';

const oppdrag: FrilansOppdrag = {
    navnPåArbeidsgiver: 'asdf',
    pågående: true,
    tidsperiode: {
        fom: new Date(),
    },
};

const frilansInformasjon: FrilansInformasjonPartial = {
    oppdragForNæreVennerEllerFamilieSiste10Mnd: [oppdrag as FrilansOppdrag],
    harJobbetForNærVennEllerFamilieSiste10Mnd: true,
    driverFosterhjem: true,
    oppstart: new Date(),
    jobberFremdelesSomFrilans: true,
};

const søker: SøkerPartial = {
    frilansInformasjon: frilansInformasjon as FrilansInformasjon,
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

    describe('driverFosterhjem value', () => {
        it('should include the assigned value if field is visible', () => {
            visibility.driverDuFosterhjemVisible = jest.fn(() => true);
            const frilans = cleanup(søker as Søker);
            expect(frilans).toBeDefined();
            if (søker.frilansInformasjon && frilans) {
                expect(frilans.driverFosterhjem).toBe(søker.frilansInformasjon.driverFosterhjem);
            }
        });

        it('should set value to undefined if field is not visible', () => {
            visibility.driverDuFosterhjemVisible = jest.fn(() => true);
            const frilans = cleanup(søker as Søker);
            expect(frilans).toBeDefined();
            if (frilans) {
                expect(frilans.driverFosterhjem).toBeUndefined();
            }
        });
    });
});
