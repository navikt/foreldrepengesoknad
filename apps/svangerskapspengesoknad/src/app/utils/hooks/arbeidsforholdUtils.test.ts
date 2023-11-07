import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getUnikeArbeidsforhold } from '../arbeidsforholdUtils';

describe('getUnikeArbeidsforhold', () => {
    it('Skal finne to unike arbeidsforhold', () => {
        const arbeidsforhold = [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 15,
                fom: '2020-08-26',
                tom: '2023-07-31',
            },
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 80,
                fom: '2023-08-01',
                tom: '2023-12-01',
            },
            {
                arbeidsgiverId: '3',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Bakeri',
                stillingsprosent: 100,
                fom: '2020-02-01',
            },
        ] as Arbeidsforhold[];

        const unike = getUnikeArbeidsforhold(arbeidsforhold, '2024-02-15');
        expect(unike.length).toEqual(2);
        expect(unike[0].stillingsprosent).toEqual(80);
        expect(unike[0].fom).toEqual('2020-08-26');
        expect(unike[0].tom).toEqual('2023-12-01');
        expect(unike[1].stillingsprosent).toEqual(100);
    });
    it('Skal summere sammen stillingsprosent på overlappende perioder og returnere den summerte prosenten siden den er størst', () => {
        const arbeidsforhold2 = [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 55,
                fom: '2019-01-31',
                tom: '2020-08-25',
            },
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 15,
                fom: '2020-08-26',
                tom: '2023-07-31',
            },
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 80,
                fom: '2023-07-31',
                tom: '2023-12-01',
            },
        ] as Arbeidsforhold[];

        const unike = getUnikeArbeidsforhold(arbeidsforhold2, '2024-02-15');
        expect(unike.length).toEqual(1);
        expect(unike[0].stillingsprosent).toEqual(95);
    });
    it('Skal summere sammen stillingsprosent på overlappende perioder og returnere stillingsprosenten fra den første perioden siden den er størst', () => {
        const arbeidsforhold3 = [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 99,
                fom: '2023-07-31',
                tom: '2023-08-25',
            },
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 15,
                fom: '2023-08-26',
                tom: '2023-09-31',
            },
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Sykehuset i Langfold',
                stillingsprosent: 80,
                fom: '2023-09-31',
                tom: '2023-12-01',
            },
        ] as Arbeidsforhold[];

        const unike = getUnikeArbeidsforhold(arbeidsforhold3, '2024-02-15');
        expect(unike.length).toEqual(1);
        expect(unike[0].stillingsprosent).toEqual(99);
    });
});
