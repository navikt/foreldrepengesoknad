import { default as Søker } from '../../../types/søknad/Søker';
import { default as fns } from '../visibility';
import { default as frilansFns } from '../frilanserBolk/visibility';
import { FrilansInformasjon, FrilansInformasjonPartial } from '../../../types/søknad/FrilansInformasjon';

const søkerUtenEgneVirksomheter = {
    harJobbetSomFrilansSiste10Mnd: false,
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
};

const søkerMedEgneVirksomheter = {
    harJobbetSomFrilansSiste10Mnd: true,
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true,
};

describe('Selvstendig næringsdrivende-bolk', () => {
    describe('when harJobbetSomFrilansSiste10Mnd === false', () => {
        it('should be visible', () => {
            expect(fns.selvstendigNæringsdrivendeBolk(søkerUtenEgneVirksomheter as Søker)).toBe(true);
        });
    });

    describe('when harJobbetSomFrilansSiste10Mnd === true', () => {
        let søker: Søker;

        beforeEach(() => {
            const frilansInformasjon: FrilansInformasjonPartial = {
                jobberFremdelesSomFrilans: true,
                driverFosterhjem: undefined,
            };

            søker = søkerMedEgneVirksomheter as Søker;
            søker.frilansInformasjon = frilansInformasjon as FrilansInformasjon;
        });

        it('should be visible if fosterhjem has value and is visible', () => {
            frilansFns.driverDuFosterhjemVisible = jest.fn(() => true);
            if (søker.frilansInformasjon) {
                frilansFns.driverDuFosterhjemVisible = jest.fn().mockReturnValue(true);
                frilansFns.oppdragBolkVisible = jest.fn().mockReturnValue(true);
                frilansFns.frilansOppdragErUtfylt = jest.fn().mockReturnValue(true);
                søker.frilansInformasjon.driverFosterhjem = true;
                expect(fns.selvstendigNæringsdrivendeBolk(søker)).toBe(true);
            }
        });

        it('should be hidden if fosterjem is undefined or !driverDuFosterhjemVisible', () => {
            frilansFns.driverDuFosterhjemVisible = jest.fn(() => true);
            expect(fns.selvstendigNæringsdrivendeBolk(søker as Søker)).toBe(false);
            if (søker.frilansInformasjon) {
                frilansFns.driverDuFosterhjemVisible = jest.fn(() => false);
                søker.frilansInformasjon.driverFosterhjem = true;
                expect(fns.selvstendigNæringsdrivendeBolk(søker as Søker)).toBe(false);
            }
        });
    });
});

describe('Andre inntekter-bolk', () => {
    describe('when selvstendigNæringsdrivendeBolk is visible', () => {
        beforeEach(() => {
            fns.selvstendigNæringsdrivendeBolk = jest.fn(() => true);
        });

        it('should be visible if !harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', () => {
            expect(fns.andreInntekterBolk(søkerUtenEgneVirksomheter as Søker)).toBe(true);
        });

        it('should be hidden if harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd and has insufficient data about selvstendigNæringsdrivende', () => {
            expect(fns.andreInntekterBolk(søkerMedEgneVirksomheter as Søker)).toBe(false);
        });
    });

    describe('when selvstendigNæringsdrivendeBolk is hidden', () => {
        beforeEach(() => {
            fns.selvstendigNæringsdrivendeBolk = jest.fn(() => false);
        });

        it('should be hidden regardless of Søker-objects property values', () => {
            expect(fns.andreInntekterBolk(søkerMedEgneVirksomheter as Søker)).toEqual(false);
            expect(fns.andreInntekterBolk(søkerUtenEgneVirksomheter as Søker)).toEqual(false);
        });
    });
});
