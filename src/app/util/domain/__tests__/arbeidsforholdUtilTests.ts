import { harAktivtArbeidsforhold } from '../arbeidsforhold';
import DateValues from '../../validation/values';
import Arbeidsforhold from '../../../types/Arbeidsforhold';

const mockedArbeidsforhold: Arbeidsforhold = {
    fom: DateValues.today.toDate(),
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80
};

describe('harAktivtArbeidsforhold', () => {
    it('should return true if the specified list of arbeidsforhold contains an element with no tom-date', () => {
        const result = harAktivtArbeidsforhold([mockedArbeidsforhold]);
        expect(result).toBe(true);
    });

    it('should return false if specified list contain no arbeidsforhold without a tom-date', () => {
        expect(harAktivtArbeidsforhold([])).toBe(false);
        const aktivtArbeidsforhold = { ...mockedArbeidsforhold, tom: DateValues.today.toDate() };
        const result = harAktivtArbeidsforhold([aktivtArbeidsforhold]);
        expect(result).toBe(false);
    });
});
