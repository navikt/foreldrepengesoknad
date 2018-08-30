import { default as Søker } from '../../../../types/søknad/Søker';
import { default as fns } from './../visibility';
import { default as frilansFns } from './../../../../bolker/frilanser-bolk/visibility';
import { FrilansInformasjon } from '../../../../types/søknad/FrilansInformasjon';

let søkerUtenEgneVirksomheter: Søker = {
    harJobbetSomFrilansSiste10Mnd: false,
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false
} as Søker;

let søkerMedEgneVirksomheter: Søker = {
    harJobbetSomFrilansSiste10Mnd: true,
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: true
} as Søker;

describe('Selvstendig næringsdrivende-bolk', () => {
    describe('when harJobbetSomFrilansSiste10Mnd === false', () => {
        it('should be visible', () => {
            expect(fns.selvstendigNæringsdrivendeBolk(søkerUtenEgneVirksomheter)).toBe(true);
        });
    });

    describe('when harJobbetSomFrilansSiste10Mnd === true', () => {
        describe('and jobberFremdelesSomFrilans === true', () => {
            let søker: Søker;

            beforeEach(() => {
                const frilansInformasjon = {
                    jobberFremdelesSomFrilans: true,
                    driverFosterhjem: undefined
                };

                søker = {
                    ...søkerMedEgneVirksomheter,
                    frilansInformasjon: frilansInformasjon as FrilansInformasjon
                } as Søker;
            });

            it('should be visible if fosterhjem has value and is visible', () => {
                frilansFns.driverDuFosterhjemVisible = jest.fn(() => true);
                if (søker.frilansInformasjon) {
                    søker.frilansInformasjon.driverFosterhjem = true;
                    expect(fns.selvstendigNæringsdrivendeBolk(søker as Søker)).toBe(true);
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

        describe('and jobberFremdelesSomFrilans === false', () => {
            let søker: Søker;

            beforeEach(() => {
                const frilansInformasjon = {
                    jobberFremdelesSomFrilans: false
                };

                søker = {
                    ...søkerMedEgneVirksomheter,
                    frilansInformasjon: frilansInformasjon as FrilansInformasjon
                } as Søker;

                frilansFns.frilansOppdragErUtfylt = jest
                    .fn()
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(true)
                    .mockReturnValue(true);

                frilansFns.oppdragBolkVisible = jest
                    .fn()
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(false)
                    .mockReturnValue(true);
            });

            it('should be visible only when frilansOppdragErUtfylt && oppdragBolkVisible evaluates to true', () => {
                expect(fns.selvstendigNæringsdrivendeBolk(søker)).toBe(false);
                expect(fns.selvstendigNæringsdrivendeBolk(søker)).toBe(false);
                expect(fns.selvstendigNæringsdrivendeBolk(søker)).toBe(false);
                expect(fns.selvstendigNæringsdrivendeBolk(søker)).toBe(true);
            });
        });
    });
});

describe('Andre inntekter-bolk', () => {
    describe('when selvstendigNæringsdrivendeBolk is visible', () => {
        beforeEach(() => {
            fns.selvstendigNæringsdrivendeBolk = jest.fn(() => true);
        });

        it('should be visible if !harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd', () => {
            expect(fns.andreInntekterBolk(søkerUtenEgneVirksomheter)).toBe(true);
        });

        it('should be hidden if harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd and has insufficient data about selvstendigNæringsdrivende', () => {
            expect(fns.andreInntekterBolk(søkerMedEgneVirksomheter)).toBe(false);
        });
    });

    describe('when selvstendigNæringsdrivendeBolk is hidden', () => {
        beforeEach(() => {
            fns.selvstendigNæringsdrivendeBolk = jest.fn(() => false);
        });

        it('should be hidden regardless of Søker-objects property values', () => {
            expect(fns.andreInntekterBolk(søkerMedEgneVirksomheter)).toEqual(false);
            expect(fns.andreInntekterBolk(søkerUtenEgneVirksomheter)).toEqual(false);
        });
    });
});
