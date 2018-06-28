import moment from 'moment';
import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { fjortenUkerPluss3, getTermindatoRegler } from '../termindato';

const date22DaysAgo = moment()
    .subtract(22, 'days')
    .startOf('day');
const fjortenUkerPluss3M = moment().add(fjortenUkerPluss3, 'days');
const fjortenUkerPluss4 = moment().add(fjortenUkerPluss3 + 1, 'days');

const intl = {} as InjectedIntl;
const callMåOppgis = (termindato: Date | undefined) =>
    getTermindatoRegler(termindato, intl)[0].test();
const callIkkeMerEnn3UkerSiden = (termindato: Date) =>
    getTermindatoRegler(termindato, intl)[1].test();
const callIUke26Pluss3 = (termindato: Date) =>
    getTermindatoRegler(termindato, intl)[2].test();

describe('Termindato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn();
    });

    it('should return false if date is undefined', () => {
        expect(callMåOppgis(undefined)).toEqual(false);
    });

    it('should return false if date is earlier than 3 weeks back', () => {
        expect(callIkkeMerEnn3UkerSiden(date22DaysAgo.toDate())).toEqual(false);
    });

    it('should return false if termindato is too late for applicant to be in uke26+3', () => {
        expect(callIUke26Pluss3(fjortenUkerPluss4.toDate())).toEqual(false);
    });

    it('should return true if date is valid', () => {
        expect(callIUke26Pluss3(fjortenUkerPluss3M.toDate())).toEqual(true);
    });
});
