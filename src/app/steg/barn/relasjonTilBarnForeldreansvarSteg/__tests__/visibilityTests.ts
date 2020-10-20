import fns from '../visibility';
import * as dateUtils from '../../../../util/dates/dates';
import { createDatoInputVerdiFromDate } from '../../../../../common/components/skjema/elements/dato-input/datoInputUtils';

describe('RelasjonTilBarnForeldreansvar visibility', () => {
    describe('antallBarnVisible', () => {
        it('should return true if foreldreansvarsdato has value', () => {
            expect(fns.antallBarn({ foreldreansvarsdato: createDatoInputVerdiFromDate(new Date()) })).toBe(true);
        });

        it('should return false if foreldreansvarsdato is undefined', () => {
            expect(fns.antallBarn({})).toBe(false);
        });
    });

    describe('fødselsdatoerVisible', () => {
        it('should return true if antallBarn is defined and visible', () => {
            fns.antallBarn = jest.fn(() => true);
            expect(fns.fødselsdatoer({ antallBarn: 1 })).toBe(true);
        });

        it('should return false if antallBarn is undefined', () => {
            expect(fns.fødselsdatoer({})).toBe(false);
        });

        it('should return false if antallBarn-field is not visible', () => {
            fns.antallBarn = jest.fn(() => false);
            expect(fns.fødselsdatoer({ antallBarn: 1 })).toBe(false);
        });
    });

    describe('harBarnOver15ÅrMeldingVisible', () => {
        it('should return true if fødselsdatoer is visible and doesnt contain undefined, and has children older than 15 years old', () => {
            (dateUtils.getAlderFraDato as any) = jest.fn(() => ({ år: 16 }));
            fns.fødselsdatoer = jest.fn(() => true);
            expect(fns.harBarnOver15ÅrMelding({ fødselsdatoer: [createDatoInputVerdiFromDate(new Date())] })).toBe(
                true
            );
        });

        it('should return false if fødselsdatoer is not visible', () => {
            (dateUtils.getAlderFraDato as any) = jest.fn(() => ({ år: 16 }));
            fns.fødselsdatoer = jest.fn(() => false);
            expect(fns.harBarnOver15ÅrMelding({ fødselsdatoer: [createDatoInputVerdiFromDate(new Date())] })).toBe(
                false
            );
        });

        it('should return false if has no children older than 15 years old', () => {
            (dateUtils.getAlderFraDato as any) = jest.fn(() => ({ år: 15 }));
            fns.fødselsdatoer = jest.fn(() => true);
            expect(fns.harBarnOver15ÅrMelding({ fødselsdatoer: [createDatoInputVerdiFromDate(new Date())] })).toBe(
                false
            );
        });
    });

    describe('vedleggVisible', () => {
        it('should return true if fødselsdatoer is visible and doesnt contain undefined', () => {
            fns.fødselsdatoer = jest.fn(() => true);
            expect(
                fns.vedlegg({
                    fødselsdatoer: [createDatoInputVerdiFromDate(new Date()), createDatoInputVerdiFromDate(new Date())],
                })
            ).toBe(true);
        });

        it('should return false if fødselsdatoer is empty or contains undefined-values', () => {
            fns.fødselsdatoer = jest.fn(() => true);
            expect(fns.vedlegg({ fødselsdatoer: [] })).toBe(false);
            expect(fns.vedlegg({ fødselsdatoer: [createDatoInputVerdiFromDate(new Date()), undefined as any] })).toBe(
                false
            );
        });

        it('should return false if fødselsdatoer field is not visible', () => {
            fns.fødselsdatoer = jest.fn(() => false);
            expect(fns.vedlegg({ fødselsdatoer: [createDatoInputVerdiFromDate(new Date())] })).toBe(false);
        });
    });
});
