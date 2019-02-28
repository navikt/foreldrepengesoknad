import moment from 'moment';
import * as getMessage from 'common/util/i18nUtils';
import { attenUkerPluss3Number, today } from '../values';
import { getTerminbekreftelseDatoRegler } from '../terminbekreftelsedato';
import * as commonRules from '../common';
import { InjectedIntl } from 'react-intl';
import { DateValue } from '../../../types/common';
const intl: Partial<InjectedIntl> = {};

const todaysDate = today.toDate();
const someString = '';

const callUtstedtUke26EllerSenere = (terminbekreftelseDato: DateValue, termindato: DateValue) => {
    return getTerminbekreftelseDatoRegler(terminbekreftelseDato, termindato, intl as InjectedIntl)[2].test();
};

describe('Terminbekreftelsedato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).dateIsNotInFutureRule = jest.fn();
        (commonRules as any).dateIs3YearsAgoOrLaterRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getTerminbekreftelseDatoRegler(todaysDate, moment().toDate(), intl as InjectedIntl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
    });

    describe('Specific rules', () => {
        it('should be invalid if termindato is too late for applicant to be in uke22+3', () => {
            const termindato = moment().toDate();
            const ugyldigTerminbekreftelse = moment()
                .subtract((attenUkerPluss3Number + 1) * 24, 'hours')
                .toDate();
            expect(callUtstedtUke26EllerSenere(ugyldigTerminbekreftelse, termindato)).toBe(false);
        });

        it('should be valid if termindato and terminbekreftelsedato cross-validation is valid', () => {
            const termindato = moment().toDate();
            const gyldigTerminbekreftelse = moment()
                .subtract(attenUkerPluss3Number * 24, 'hours')
                .toDate();
            expect(callUtstedtUke26EllerSenere(gyldigTerminbekreftelse, termindato)).toBe(true);
        });
    });
});
