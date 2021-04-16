import { dateToISOString } from '@navikt/sif-common-formik/lib';
import {
    FrilansInformasjon,
    FrilansInformasjonPartial,
    FrilansOppdrag,
} from '../../../../types/søknad/FrilansInformasjon';
import Søker from '../../../../types/søknad/Søker';
import fns from '../visibility';

const frilansInformasjon: FrilansInformasjonPartial = {};

const søker = {
    harJobbetSomFrilansSiste10Mnd: true,
    frilansInformasjon,
};

describe('Frilanser-bolk', () => {
    describe('startdatoVisible', () => {
        it('should be visible if harJobbetSomFrilansSiste10Mnd===true', () => {
            expect(fns.startdatoVisible(søker as Søker)).toBe(true);
        });

        it('should be hidden if harJobbetSomFrilansSiste10Mnd!==true', () => {
            søker.harJobbetSomFrilansSiste10Mnd = false;
            expect(fns.startdatoVisible(søker as Søker)).toBe(false);
        });
    });

    describe('fremdelesFrilansVisible', () => {
        it('should be visible if oppstart !== undefined and startdatoVisible evaluates to true', () => {
            fns.startdatoVisible = jest.fn(() => true);
            søker.frilansInformasjon.oppstart = dateToISOString(new Date());
            expect(fns.fremdelesFrilansVisible(søker as Søker)).toBe(true);
        });

        it('should be hidden if either oppstart is undefined or !startdatoVisible', () => {
            fns.startdatoVisible = jest.fn().mockReturnValueOnce(false).mockReturnValue(true);
            søker.frilansInformasjon.oppstart = dateToISOString(new Date());
            expect(fns.fremdelesFrilansVisible(søker as Søker)).toBe(false);
            søker.frilansInformasjon.oppstart = undefined;
            expect(fns.fremdelesFrilansVisible(søker as Søker)).toBe(false);
        });
    });

    describe('oppdragBolkVisible', () => {
        it('should be visible if jobberFremdelesSomFrilans !== undefined and jobberFremdelesSomFrilansVisible evaluates to true', () => {
            fns.fremdelesFrilansVisible = jest.fn(() => true);
            søker.frilansInformasjon.jobberFremdelesSomFrilans = true;
            expect(fns.oppdragBolkVisible(søker as Søker)).toBe(true);
        });

        it('should be hidden if either oppstart is undefined or !startdatoVisible', () => {
            fns.fremdelesFrilansVisible = jest.fn().mockReturnValueOnce(false).mockReturnValue(true);
            søker.frilansInformasjon.jobberFremdelesSomFrilans = true;
            expect(fns.oppdragBolkVisible(søker as Søker)).toBe(false);
            søker.frilansInformasjon.jobberFremdelesSomFrilans = undefined;
            expect(fns.oppdragBolkVisible(søker as Søker)).toBe(false);
        });
    });

    describe('oppdragPerioderVisible', () => {
        it('should be visible if harJobbetForNærVennEllerFamilieSiste10Mnd === true and oppdragBolkVisible evaluates to true', () => {
            fns.oppdragBolkVisible = jest.fn(() => true);
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = true;
            expect(fns.oppdragPerioderVisible(søker as Søker)).toBe(true);
        });

        it('should be hidden if either harJobbetForNærVennEllerFamilieSiste10Mnd !== true or oppdragBolkVisible evaluates to false', () => {
            fns.oppdragBolkVisible = jest.fn().mockReturnValueOnce(false).mockReturnValue(true);
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = true;
            expect(fns.oppdragPerioderVisible(søker as Søker)).toBe(false);
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = false;
            expect(fns.oppdragPerioderVisible(søker as Søker)).toBe(false);
        });
    });

    describe('frilansOppdragErUtfylt', () => {
        beforeEach(() => {
            søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [];
        });

        it('should be true if harJobbetForNærVennEllerFamilieSiste10Mnd === false', () => {
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = false;
            expect(fns.frilansOppdragErUtfylt(søker.frilansInformasjon as FrilansInformasjon)).toBe(true);
        });

        it('should be true if harJobbetForNærVennEllerFamilieSiste10Mnd === true and has data about oppdrag', () => {
            const oppdrag: FrilansOppdrag = { navnPåArbeidsgiver: 'a', tidsperiode: {}, pågående: true };
            søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [oppdrag];
            expect(fns.frilansOppdragErUtfylt(søker.frilansInformasjon as FrilansInformasjon)).toBe(true);
        });

        it('should be false if harJobbetForNærVennEllerFamilieSiste10Mnd === true and is missing data about oppdrag', () => {
            søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd = true;
            expect(fns.frilansOppdragErUtfylt(søker.frilansInformasjon as FrilansInformasjon)).toBe(false);
            søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd = [];
            expect(fns.frilansOppdragErUtfylt(søker.frilansInformasjon as FrilansInformasjon)).toBe(false);
        });
    });

    describe('driverDuFosterjemVisible', () => {
        it('should be visible if jobberFremdelesSomFrilans and both frilansOppdragErUtfylt and oppdragBolkVisible evaluate to true', () => {
            fns.frilansOppdragErUtfylt = jest.fn(() => true);
            fns.oppdragBolkVisible = jest.fn(() => true);
            søker.frilansInformasjon.jobberFremdelesSomFrilans = true;
            expect(fns.driverDuFosterhjemVisible(søker as Søker)).toBe(true);
        });

        it('should be hidden if oppdragBolkVisible is false', () => {
            fns.oppdragBolkVisible = jest.fn(() => false);
            expect(fns.driverDuFosterhjemVisible(søker as Søker)).toBe(false);
        });

        it('should be hidden if frilansOppdragErUtfylt is false', () => {
            fns.frilansOppdragErUtfylt = jest.fn(() => false);
            expect(fns.driverDuFosterhjemVisible(søker as Søker)).toBe(false);
        });
    });
});
