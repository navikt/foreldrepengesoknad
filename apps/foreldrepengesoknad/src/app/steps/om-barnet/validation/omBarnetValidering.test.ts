import dayjs from 'dayjs';
import getIntlMock from 'utils-test/intl-test-helper';
import {
    validateAdopsjonsdato,
    validateAnkomstdato,
    validateFødselsdato,
    validateFødselsdatoAdopsjon,
    validateTerminbekreftelse,
    validateTermindato,
    validateTermindatoFødsel,
} from './omBarnetValidering';

describe('omBarnetValidering', () => {
    const intlMock = getIntlMock();

    it('skal feile validering når fødselsdato ikke er oppgitt', () => {
        const fødselsdato = undefined;
        const resultat = validateFødselsdato(intlMock)(fødselsdato!);
        expect(resultat).toBe('Du må oppgi fødselsdato');
    });

    it('skal feile validering når fødselsdato ikke er en gyldig dato', () => {
        const fødselsdato = '202-01-01';
        const resultat = validateFødselsdato(intlMock)(fødselsdato);
        expect(resultat).toBe('Fødselsdato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når fødselsdato er etter dagens dato', () => {
        const fødselsdato = '2060-01-01';
        const resultat = validateFødselsdato(intlMock)(fødselsdato);
        expect(resultat).toBe('Fødselsdato må være i dag eller tidligere');
    });

    it('skal ikke feile validering når fødselsdato er før dagens dato', () => {
        const fødselsdato = '2020-01-01';
        const resultat = validateFødselsdato(intlMock)(fødselsdato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile fødsel & adopsjonsvalidering når fødselsdato ikke er oppgitt', () => {
        const fødselsdato = undefined;
        const adopsjonsdato = undefined;
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato!, adopsjonsdato!);
        expect(resultat).toBe('Du må oppgi fødselsdato');
    });

    it('skal feile fødsel & adopsjonsvalidering når fødselsdato ikke er en gyldig dato', () => {
        const fødselsdato = '202-01-01';
        const adopsjonsdato = undefined;
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato, adopsjonsdato!);
        expect(resultat).toBe('Fødselsdato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile fødsel & adopsjonsvalidering når fødselsdato er etter dagens dato', () => {
        const fødselsdato = '2060-01-01';
        const adopsjonsdato = undefined;
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato, adopsjonsdato!);
        expect(resultat).toBe('Fødselsdato må være i dag eller tidligere');
    });

    it('skal feile fødsel & adopsjonsvalidering når adopsjonsdato er før fødselsdato', () => {
        const fødselsdato = '2021-01-01';
        const adopsjonsdato = '2020-12-12';
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato, adopsjonsdato!);
        expect(resultat).toBe('Fødselsdato må være før adopsjonsdato');
    });

    it('skal feile fødsel & adopsjonsvalidering når barnet er over 15 år på adopsjonsdato', () => {
        const fødselsdato = '2004-01-01';
        const adopsjonsdato = '2020-12-12';
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato, adopsjonsdato!);
        expect(resultat).toBe('Du kan ikke søke om foreldrepenger for barn som er eldre enn 15 år');
    });

    it('skal ikke feile fødsel & adopsjonsvalidering når fødselsdato og adopsjonsdato er gyldige', () => {
        const fødselsdato = '2020-01-01';
        const adopsjonsdato = '2020-01-01';
        const resultat = validateFødselsdatoAdopsjon(intlMock)(fødselsdato, adopsjonsdato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når termindato ikke er oppgitt', () => {
        const termindato = undefined;
        const resultat = validateTermindato(intlMock)(termindato!);
        expect(resultat).toBe('Du må oppgi termindato');
    });

    it('skal feile validering når termindato ikke er en gyldig dato', () => {
        const termindato = '202-01-01';
        const resultat = validateTermindato(intlMock)(termindato);
        expect(resultat).toBe('Termindato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når termindato er før tre uker siden', () => {
        const termindato = dayjs().subtract(22, 'days').format('YYYY-MM-DD');
        const resultat = validateTermindato(intlMock)(termindato);
        expect(resultat).toBe('Termindatoen kan ikke være tidligere enn 3 uker fra i dag');
    });

    it('skal feile validering når termindato indikerer at bruker er før uke 22 i svangerskapet', () => {
        const termindato = dayjs().add(7, 'months').format('YYYY-MM-DD');
        const resultat = validateTermindato(intlMock)(termindato);
        expect(resultat).toBe('Du kan tidligst søke når du er i 22. svangerskapsuke');
    });

    it('skal ikke feile validering når termindato er for fem dager siden', () => {
        const termindato = dayjs().subtract(5, 'days').format('YYYY-MM-DD');
        const resultat = validateTermindato(intlMock)(termindato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når termindato (fødsel) ikke er oppgitt', () => {
        const termindato = undefined;
        const resultat = validateTermindatoFødsel('2021-01-01', intlMock)(termindato!);
        expect(resultat).toBe('Du må oppgi termindato');
    });

    it('skal feile validering når termindato (fødsel) ikke er en gyldig dato', () => {
        const termindato = '202-01-01';
        const resultat = validateTermindatoFødsel('2021-01-01', intlMock)(termindato);
        expect(resultat).toBe('Termindato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når termindato (fødsel) er mer enn seks måneder etterfødselsdato', () => {
        const fødselsdato = '2022-01-01';
        const termindato = dayjs(fødselsdato).add(6, 'months').add(1, 'days').format('YYYY-MM-DD');
        const resultat = validateTermindatoFødsel(fødselsdato, intlMock)(termindato);
        expect(resultat).toBe('Termindatoen kan ikke være senere enn 6 måneder etter fødselsdatoen');
    });

    it('skal feile validering når termindato (fødsel) er tidligere enn 1 måned før fødselsdatoen', () => {
        const fødselsdato = '2022-02-01';
        const termindato = dayjs(fødselsdato).subtract(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
        const resultat = validateTermindatoFødsel(fødselsdato, intlMock)(termindato);
        expect(resultat).toBe('Termindatoen kan ikke være tidligere enn 1 måned før fødselsdatoen');
    });
    it('skal ikke feile validering når termindato (fødsel) er seks måneder etterfødselsdato', () => {
        const fødselsdato = '2022-03-01';
        const termindato = dayjs(fødselsdato).add(6, 'months').format('YYYY-MM-DD');
        const resultat = validateTermindatoFødsel(fødselsdato, intlMock)(termindato);
        expect(resultat).toBeUndefined();
    });

    it('skal ikke feile validering når termindato (fødsel) er 1 måned før fødselsdatoen', () => {
        const fødselsdato = '2022-04-01';
        const termindato = dayjs(fødselsdato).subtract(1, 'months').format('YYYY-MM-DD');
        const resultat = validateTermindatoFødsel(fødselsdato, intlMock)(termindato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når adopsjonsdato ikke er oppgitt', () => {
        const adopsjonsdato = undefined;
        const resultat = validateAdopsjonsdato(intlMock)(adopsjonsdato!);
        expect(resultat).toBe('Du må oppgi dato for overtagelse av omsorg');
    });

    it('skal feile validering når adopsjonsdato ikke er en gyldig dato', () => {
        const adopsjonsdato = '202-01-01';
        const resultat = validateAdopsjonsdato(intlMock)(adopsjonsdato);
        expect(resultat).toBe('Adopsjonsdato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal ikke feile validering når adopsjonsdato er før dagens dato', () => {
        const adopsjonsdato = '2020-01-01';
        const resultat = validateAdopsjonsdato(intlMock)(adopsjonsdato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile validering når ankomstdato ikke er oppgitt', () => {
        const ankomstdato = undefined;
        const fødselsdato = undefined;
        const resultat = validateAnkomstdato(intlMock)(ankomstdato!, fødselsdato!);
        expect(resultat).toBe('Du må oppgi ankomstdato');
    });

    it('skal feile validering når ankomstdato ikke er en gyldig dato', () => {
        const ankomstdato = '202-01-01';
        const fødselsdato = undefined;
        const resultat = validateAnkomstdato(intlMock)(ankomstdato, fødselsdato!);
        expect(resultat).toBe('Ankomstdato må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile validering når fødselsdato er etter ankomstdato', () => {
        const ankomstdato = '2021-01-01';
        const fødselsdato = '2021-01-02';
        const resultat = validateAnkomstdato(intlMock)(ankomstdato, fødselsdato);
        expect(resultat).toBe('Ankomstdato kan ikke være før fødsel');
    });

    it('skal ikke feile validering når fødselsdato er før ankomstdato', () => {
        const ankomstdato = '2021-01-02';
        const fødselsdato = '2021-01-01';
        const resultat = validateAnkomstdato(intlMock)(ankomstdato, fødselsdato);
        expect(resultat).toBeUndefined();
    });

    it('skal feile hvis terminbekreftelsedato ikke er satt', () => {
        const terminbekreftelseDato = '';

        const resultat = validateTerminbekreftelse(intlMock)(terminbekreftelseDato);
        expect(resultat).toBe('Dato på terminbekreftelsedato må fylles ut');
    });

    it('skal feile hvis terminbekreftelsedato er en ugyldig dato', () => {
        let terminbekreftelseDato = '12.01.202a'; // ugyldig dato blir ikke parset til formatet YYYY-MM-DD

        const resultat = validateTerminbekreftelse(intlMock)(terminbekreftelseDato);
        expect(resultat).toBe('Dato på terminbekreftelse må være en gyldig dato på formatet dd.mm.åååå');

        terminbekreftelseDato = '30.30.2021'; // ugyldig dato blir ikke parset til formatet YYYY-MM-DD

        const resultat2 = validateTerminbekreftelse(intlMock)(terminbekreftelseDato);
        expect(resultat2).toBe('Dato på terminbekreftelse må være en gyldig dato på formatet dd.mm.åååå');
    });

    it('skal feile hvis terminbekreftelsedato er i fremtiden', () => {
        const terminbekreftelseDato = dayjs().add(1, 'day').format('YYYY-MM-DD');

        const resultat = validateTerminbekreftelse(intlMock)(terminbekreftelseDato);
        expect(resultat).toBe('Dato på terminbekreftelse kan ikke være frem i tid');
    });

    it('skal ikke feile dersom terminbekreftelsedato er gyldig', () => {
        const terminbekreftelseDato = dayjs().format('YYYY-MM-DD');

        const resultat = validateTerminbekreftelse(intlMock)(terminbekreftelseDato);
        expect(resultat).toBe(undefined);
    });
});
