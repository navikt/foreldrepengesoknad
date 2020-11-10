import moment from 'moment';
import * as getMessage from 'common/util/i18nUtils';
import { attenUkerPluss3Number, today } from '../values';
import { getTerminbekreftelseDatoRegler } from '../terminbekreftelsedato';
import * as commonRules from '../common';
import { IntlShape } from 'react-intl';
import { DateValue } from '../../../types/common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
const intl: Partial<IntlShape> = {};

const todaysDate = dateToISOString(today.toDate());
const someString = '';

const callUtstedtUke22EllerSenere = (terminbekreftelseDato: string, termindato: DateValue) => {
    return getTerminbekreftelseDatoRegler(terminbekreftelseDato, termindato, intl as IntlShape)[3].test();
};

describe('Terminbekreftelsedato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).dateIsNotInFutureRule = jest.fn();
        (commonRules as any).dateIs3YearsAgoOrLaterRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getTerminbekreftelseDatoRegler(todaysDate, moment().toDate(), intl as IntlShape);
        expect(commonRules.hasValueRule).toHaveBeenCalled();
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalled();
    });

    describe('Specific rules', () => {
        it('should be invalid if termindato is too late for applicant to be in uke22', () => {
            const termindato = moment().toDate();
            const ugyldigTerminbekreftelse = dateToISOString(
                moment()
                    .subtract(attenUkerPluss3Number * 24, 'hours')
                    .toDate()
            );
            expect(callUtstedtUke22EllerSenere(ugyldigTerminbekreftelse, termindato)).toBe(false);
        });

        it('should be valid if termindato and terminbekreftelsedato cross-validation is valid', () => {
            const termindato = moment().toDate();
            const gyldigTerminbekreftelse = dateToISOString(
                moment()
                    .subtract((attenUkerPluss3Number - 1) * 24, 'hours')
                    .toDate()
            );
            expect(callUtstedtUke22EllerSenere(gyldigTerminbekreftelse, termindato)).toBe(true);
        });
    });
});
