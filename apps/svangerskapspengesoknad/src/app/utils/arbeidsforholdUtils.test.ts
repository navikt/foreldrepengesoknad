import { Arbeidsforhold } from '@navikt/fp-types';
import { getTotalStillingsprosentPåSkjæringstidspunktet, getUnikeArbeidsforhold } from './arbeidsforholdUtils';

describe('getUnikeArbeidsforhold', () => {
    it('Skal finne to unike arbeidsforhold der første er avsluttet og andre pågående', () => {
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
        expect(unike[0].stillinger.length).toEqual(2);
        expect(unike[0].fom).toEqual('2020-08-26');
        expect(unike[0].tom).toEqual('2023-12-01');
        expect(unike[1].stillinger.length).toEqual(1);
        expect(unike[1].fom).toEqual('2020-02-01');
        expect(unike[1].tom).toBeUndefined();
    });
    it('Skal sette den tidliste fom fra stillingene og la det unike arbeidsforholdet være pågående (uten tom) hvis et av stillinene er uten tom', () => {
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
                fom: '2016-08-26',
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
        expect(unike[0].fom).toEqual('2016-08-26');
        expect(unike[0].tom).toBeUndefined();
    });
});

describe('getTotalStillingsprosentPåSkjæringstidspunktet', () => {
    const stillinger = [
        { fom: '2023-05-01', stillingsprosent: 10 },
        { fom: '2023-07-01', tom: '2023-11-01', stillingsprosent: 20 },
        { fom: '2023-09-01', stillingsprosent: 30 },
    ];
    it('Skal summere sammen stillingsprosent for 2 stillinger fordi den ene har ikke startet ennå', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, '2023-07-02');
        expect(summertProsent).toEqual(30);
    });
    it('Skal summere sammen stillingsprosent for 3 stillinger', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, '2023-09-02');
        expect(summertProsent).toEqual(60);
    });
    it('Skal summere sammen stillingsprosent for 2 stillinger fordi en er avsluttet', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillinger, '2023-11-02');
        expect(summertProsent).toEqual(40);
    });
    const stillingerMedNullProsent = [
        { fom: '2023-06-01', tom: '2023-12-01', stillingsprosent: 0 },
        { fom: '2023-08-01', tom: '2023-11-01', stillingsprosent: 0 },
        { fom: '2023-10-01', stillingsprosent: 30 },
    ];
    it('Skal returnere 100% fordi den ene stillingen som er aktiv da er på 0%', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillingerMedNullProsent, '2023-06-02');
        expect(summertProsent).toEqual(100);
    });
    it('Skal returnere 100% fordi begge de aktive stillingene er 0%', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillingerMedNullProsent, '2023-08-02');
        expect(summertProsent).toEqual(100);
    });
    it('Skal returnere 100% fordi noen av de aktive stillingene er 100%', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillingerMedNullProsent, '2023-10-30');
        expect(summertProsent).toEqual(100);
    });
    it('Skal returnere 30% fordi stillingene som er 0% er avsluttet', () => {
        const summertProsent = getTotalStillingsprosentPåSkjæringstidspunktet(stillingerMedNullProsent, '2023-12-02');
        expect(summertProsent).toEqual(30);
    });
});
