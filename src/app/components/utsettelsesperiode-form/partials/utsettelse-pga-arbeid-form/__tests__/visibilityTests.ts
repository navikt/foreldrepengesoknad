import fns from './../visibility';
import * as stillingsprosentUtils from './../../../../../util/validation/fields/stillingsprosent';
import Søknad from '../../../../../types/søknad/Søknad';
import { StønadskontoType } from '../../../../../types/uttaksplan/periodetyper';

const dummySøknad = {
    annenForelder: {},
    søker: {}
};

describe('UtsettelsePgaArbeidForm visibility', () => {
    describe('hvilkenKvoteSkalBenyttesSynlig', () => {
        beforeEach(() => {
            (stillingsprosentUtils as any).isStillingsprosentAbove0AndLessThan100 = jest.fn(() => true);
        });

        it('should be visible if stillingsprosent is defined and above 0 & less than 100', () => {
            expect(fns.hvilkenKvoteSkalBenyttes({ stillingsprosent: '100' })).toBe(true);
        });

        it('should be hidden if stillingsprosent is undefined or is not between 1 and 99', () => {
            expect(fns.hvilkenKvoteSkalBenyttes({})).toBe(false);
            (stillingsprosentUtils as any).isStillingsprosentAbove0AndLessThan100 = jest.fn(() => false);
            expect(fns.hvilkenKvoteSkalBenyttes({ stillingsprosent: '100' })).toBe(false);
        });
    });

    describe('skalDereHaGradertUttakSamtidigSynlig', () => {
        describe('hvilkenKvoteSkalBenyttes is visible', () => {
            beforeEach(() => {
                fns.hvilkenKvoteSkalBenyttes = jest.fn(() => true);
            });

            it('should be visible if konto is defined', () => {
                expect(
                    fns.skalDereHaGradertUttakSamtidig({ konto: StønadskontoType.Mødrekvote }, dummySøknad as Søknad)
                ).toBe(true);
            });

            it('should be hidden if konto is undefined', () => {
                fns.hvilkenKvoteSkalBenyttes = jest.fn(() => true);
                expect(fns.skalDereHaGradertUttakSamtidig({}, dummySøknad as Søknad)).toBe(false);
            });
        });

        describe('hvilkenKvoteSkalBenyttes is not visible', () => {
            beforeEach(() => {
                fns.hvilkenKvoteSkalBenyttes = jest.fn(() => false);
            });

            it('it should be visible if stillingsprosent is defined, erAleneOmOmsorg is falsy, and annenForelder skalHaForeldrepenger and harRettPåForelderpenger', () => {
                dummySøknad.annenForelder = {
                    skalHaForeldrepenger: true,
                    harRettPåForeldrepenger: true
                };
                dummySøknad.søker = {
                    erAleneOmOmsorg: false
                };
                expect(fns.skalDereHaGradertUttakSamtidig({ stillingsprosent: '100' }, dummySøknad as Søknad)).toBe(
                    true
                );
            });

            it('should be hidden if stillingsprosent is undefined', () => {
                expect(fns.skalDereHaGradertUttakSamtidig({}, dummySøknad as Søknad)).toBe(false);
            });
        });
    });

    describe('hvorSkalDuJobbeSynlig', () => {
        describe('stillingsprosent is 100', () => {
            beforeEach(() => {
                (stillingsprosentUtils as any).isStillingsprosent100 = jest.fn(() => true);
            });

            it('should be visible if stillingsprosent is 100', () => {
                expect(fns.hvorSkalDuJobbe({ stillingsprosent: '100' }, dummySøknad as Søknad)).toBe(true);
            });

            it('should be visible if skalDereHaGradertUttakSamtidig is visible and answered', () => {
                fns.skalDereHaGradertUttakSamtidig = jest.fn(() => true);
                expect(fns.hvorSkalDuJobbe({ samtidigGradertUttak: true }, dummySøknad as Søknad)).toBe(true);
            });
        });

        describe('stillingsprosent is not 100', () => {
            beforeEach(() => {
                (stillingsprosentUtils as any).isStillingsprosent100 = jest.fn(() => false);
            });

            it('should be hidden if skalDereHaGradertUttakSamtidig is visible but unanswered', () => {
                fns.skalDereHaGradertUttakSamtidig = jest.fn(() => true);
                expect(fns.hvorSkalDuJobbe({}, dummySøknad as Søknad)).toBe(false);
            });
        });
    });
});
