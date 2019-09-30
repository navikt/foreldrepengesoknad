import { getAktiveArbeidsforhold } from '../søkerinfoUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const mockedArbeidsforhold: Arbeidsforhold = {
    fom: new Date(),
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80
};

describe('søkerinfoUtils', () => {
    describe('getAktiveArbeidsforhold', () => {
        it('Skal gi en tom liste tilbake hvis det er ingen arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([], new Date())).toEqual([]);
        });

        it('Skal finne aktivt arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([mockedArbeidsforhold], new Date())).toEqual([mockedArbeidsforhold]);
        });

        it('Skal fjerne inaktivt arbeidsforhold', () => {
            const inaktivtArbeidsforhold: Arbeidsforhold = {
                ...mockedArbeidsforhold,
                fom: new Date('2016-01-01'),
                tom: new Date('2019-01-01')
            };

            expect(getAktiveArbeidsforhold([inaktivtArbeidsforhold], new Date('2019-06-01'))).toEqual([]);
        });
    });
});
