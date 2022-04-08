import { IntlShape } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { getTermindatoRegler, getTermindatoReglerForFødsel } from '../termindato';
import { date21DaysAgo, date22DaysAgo, attenUkerPluss3, attenUkerPluss4, today } from '../values';
import * as commonRules from '../common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

const intl: Partial<IntlShape> = {};
const callIkkeMerEnn3UkerSiden = (termindato: Date) => {
    return getTermindatoRegler(dateToISOString(termindato), intl as IntlShape)[2].test();
};
const callIUke22 = (termindato: Date) => {
    return getTermindatoRegler(dateToISOString(termindato), intl as IntlShape)[3].test();
};
const callWithSenTerminDato = (terminDato: Date) => {
    return getTermindatoReglerForFødsel(dateToISOString(terminDato), fødselsDato, intl as IntlShape)[2].test();
};

const callWithTidligTerminDato = (terminDato: Date) => {
    return getTermindatoReglerForFødsel(dateToISOString(terminDato), fødselsDato, intl as IntlShape)[3].test();
};
const someString = '';
const todaysDate = dateToISOString(today.toDate());
const fødselsDato = dateToISOString(new Date('05 June 2021'));
const validSenTerminDato = new Date('05 December 2021');
const forSenTerminDato = new Date('06 December 2021');
const validTidligTerminDato = new Date('05 May 2021');
const forTidligTerminDato = new Date('04 May 2021');

describe('Termindato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).erGyldigDato = jest.fn();
    });

    it('should call correct termindato without fødselsdato validators with given date and string', () => {
        getTermindatoRegler(todaysDate, intl as IntlShape);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, someString);
        expect(commonRules.erGyldigDato).toHaveBeenCalledWith(todaysDate, someString);
    });

    describe('Specific rules for termindato without fødselsdato', () => {
        it('should be invalid if it is more than 3 weeks ago', () => {
            expect(callIkkeMerEnn3UkerSiden(date22DaysAgo.toDate())).toBe(false);
        });

        it('should be invalid if it is too late for applicant to be in uke22', () => {
            expect(callIUke22(attenUkerPluss4.toDate())).toEqual(false);
        });

        it('should return true if date is valid', () => {
            expect(callIkkeMerEnn3UkerSiden(date21DaysAgo.toDate())).toEqual(true);
            expect(callIUke22(attenUkerPluss3.toDate())).toEqual(true);
        });
    });

    it('should call correct termindato with fødselsdato validators with given date, fødselsdato and string', () => {
        getTermindatoReglerForFødsel(todaysDate, fødselsDato, intl as IntlShape);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, someString);
        expect(commonRules.erGyldigDato).toHaveBeenCalledWith(todaysDate, someString);
    });

    describe('Specific rules termindato with fødselsdato', () => {
        it('should be invalid if termindato is less than 1 month before fødselsdato', () => {
            expect(callWithTidligTerminDato(forTidligTerminDato)).toEqual(false);
        });

        it('should be invalid if termindato is more than 6 months after fødselsdato', () => {
            expect(callWithSenTerminDato(forSenTerminDato)).toEqual(false);
        });

        it('should return true if termindato is valid against fødselsdato', () => {
            expect(callWithTidligTerminDato(validTidligTerminDato)).toEqual(true);
            expect(callWithSenTerminDato(validSenTerminDato)).toEqual(true);
        });
    });
});
