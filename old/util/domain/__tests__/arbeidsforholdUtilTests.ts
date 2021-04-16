import { harAktivtArbeidsforhold } from '../arbeidsforhold';
import DateValues from '../../validation/values';
import Arbeidsforhold from '../../../types/Arbeidsforhold';

const mockedArbeidsforhold: Arbeidsforhold = {
    fom: DateValues.today.toDate(),
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80,
};

describe('harAktivtArbeidsforhold', () => {
    it('should return true if the specified list of arbeidsforhold contains an element with no tom-date', () => {
        const result = harAktivtArbeidsforhold([mockedArbeidsforhold]);
        expect(result).toBe(true);
    });

    it('should return false if the specified list of arbeidsforhold contains an element with tom-date before sisteDag', () => {
        const sisteDag = new Date(2019, 1, 1);
        const tom = new Date(2019, 0, 31);
        const result = harAktivtArbeidsforhold([{ ...mockedArbeidsforhold, tom }], sisteDag);
        expect(result).toBe(false);
    });

    it('should return true if the specified list of arbeidsforhold contains an element with tom-date, but tom-date is same', () => {
        const sisteDag = new Date(2019, 1, 1);
        const tom = new Date(2019, 1, 1);
        const result = harAktivtArbeidsforhold([{ ...mockedArbeidsforhold, tom }], sisteDag);
        expect(result).toBe(true);
    });

    it('should return true if the specified list of arbeidsforhold contains an element with tom-date and tom-date is after sisteDag', () => {
        const sisteDag = new Date(2019, 1, 1);
        const tom = new Date(2019, 1, 2);
        const result = harAktivtArbeidsforhold([{ ...mockedArbeidsforhold, tom }], sisteDag);
        expect(result).toBe(true);
    });

    it('should return false if specified list contain no arbeidsforhold without a tom-date', () => {
        expect(harAktivtArbeidsforhold([])).toBe(false);
        const aktivtArbeidsforhold = { ...mockedArbeidsforhold, tom: DateValues.today.toDate() };
        const result = harAktivtArbeidsforhold([aktivtArbeidsforhold]);
        expect(result).toBe(false);
    });
});
