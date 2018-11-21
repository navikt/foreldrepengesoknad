import moment from 'moment';
import * as getMessage from 'common/util/i18nUtils';
import { fjortenUkerPluss3Number, today } from '../values';
import { getTerminbekreftelseDatoRegler } from '../terminbekreftelsedato';
import * as commonRules from '../common';
import { InjectedIntl } from 'react-intl';
import { DateValue } from '../../../types/common';
const intl = {} as InjectedIntl;

const todaysDate = today.toDate();
const someString = '';

const callUtstedtUke26EllerSenere = (terminbekreftelseDato: DateValue, termindato: DateValue) => {
    return getTerminbekreftelseDatoRegler(terminbekreftelseDato, termindato, intl)[2].test();
};

describe('Terminbekreftelsedato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).dateIsNotInFutureRule = jest.fn();
        (commonRules as any).dateIs3YearsAgoOrLaterRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getTerminbekreftelseDatoRegler(todaysDate, moment().toDate(), intl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
    });

    describe('Specific rules', () => {
        it('should be invalid if termindato is too late for applicant to be in uke26+3', () => {
            const termindato = moment().toDate();
            const ugyldigTerminbekreftelse = moment()
                .subtract((fjortenUkerPluss3Number + 1) * 24, 'hours')
                .toDate();
            expect(callUtstedtUke26EllerSenere(ugyldigTerminbekreftelse, termindato)).toBe(false);
        });

        it('should be valid if termindato and temrinbekreftelsedato cross-validation is valid', () => {
            const termindato = moment().toDate();
            const gyldigTerminbekreftelse = moment()
                .subtract(fjortenUkerPluss3Number * 24, 'hours')
                .toDate();
            expect(callUtstedtUke26EllerSenere(gyldigTerminbekreftelse, termindato)).toBe(true);
        });
    });
});
