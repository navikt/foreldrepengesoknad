import { getFødselsdatoRegler } from '../fødselsdato';
import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { DateValue } from '../../../../types/common';
import { date3YearsAgo, dateMoreThan3YearsAgo, today, tomorrow } from '../../values';

const intl = {} as InjectedIntl;
const callMåOppgis = (fødselsdato: DateValue) => getFødselsdatoRegler(fødselsdato, intl)[0].test();
const callIdagEllerTidligere = (fødselsdato: DateValue) => getFødselsdatoRegler(fødselsdato, intl)[1].test();
const callIkkeMerEnn3ÅrSiden = (fødselsdato: DateValue) => getFødselsdatoRegler(fødselsdato, intl)[2].test();

describe('Fødselsdato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn();
    });

    it('should return false if date is undefined', () => {
        expect(callMåOppgis(undefined)).toEqual(false);
    });

    it('should return false if date is later than today', () => {
        expect(callIdagEllerTidligere(tomorrow.toDate())).toEqual(false);
    });

    it('should return false if date is more than 3 years back', () => {
        expect(callIkkeMerEnn3ÅrSiden(dateMoreThan3YearsAgo.toDate())).toEqual(false);
    });

    it('should return true if date is valid', () => {
        expect(callMåOppgis(today.toDate())).toEqual(true);
        expect(callIdagEllerTidligere(today.toDate())).toEqual(true);
        expect(callIkkeMerEnn3ÅrSiden(date3YearsAgo.toDate())).toEqual(true);
    });
});
