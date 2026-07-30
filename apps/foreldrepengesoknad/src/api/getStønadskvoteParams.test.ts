import { AnnenForelder } from 'types/AnnenForelder';

import { BarnType } from '@navikt/fp-constants';
import { Barn, SøkersituasjonFp } from '@navikt/fp-types';

import { getStønadskvoteParams } from './getStønadskvoteParams';

const MOR_SØKERSITUASJON: SøkersituasjonFp = { situasjon: 'fødsel', rolle: 'mor' };

const ANNEN_FORELDER_OPPGITT: AnnenForelder = {
    kanIkkeOppgis: false,
    fornavn: 'Per',
    etternavn: 'Persen',
    fnr: '12345678910',
    erAleneOmOmsorg: false,
    harRettPåForeldrepengerINorge: true,
};

describe('getStønadskvoteParams', () => {
    it('skal sette fødselsdato for FødtBarn', () => {
        const barn = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-15'],
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined);

        expect(params.fødselsdato).toBe('2024-01-15');
        expect(params.termindato).toBeUndefined();
        expect(params.omsorgsovertakelseDato).toBeUndefined();
    });

    it('skal sette fødselsdato for IkkeUtfyltTypeBarn med fødselsdatoer', () => {
        const barn = {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: 1,
            fødselsdatoer: ['2024-03-10'],
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined);

        expect(params.fødselsdato).toBe('2024-03-10');
        expect(params.termindato).toBeUndefined();
        expect(params.omsorgsovertakelseDato).toBeUndefined();
    });

    it('skal returnere undefined fødselsdato for IkkeUtfyltTypeBarn uten fødselsdatoer', () => {
        const barn = {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: 1,
            fødselsdatoer: [],
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined);

        expect(params.fødselsdato).toBeUndefined();
        expect(params.termindato).toBeUndefined();
        expect(params.omsorgsovertakelseDato).toBeUndefined();
    });

    it('skal sette termindato for UfødtBarn', () => {
        const barn = {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-06-01',
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined);

        expect(params.fødselsdato).toBeUndefined();
        expect(params.termindato).toBe('2024-06-01');
        expect(params.omsorgsovertakelseDato).toBeUndefined();
    });

    it('skal bruke termindato fra saksgrunnlag fremfor barn.termindato for FødtBarn', () => {
        const barn = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-15'],
            termindato: '2024-01-20',
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined, '2024-01-18');

        expect(params.fødselsdato).toBe('2024-01-15');
        expect(params.termindato).toBe('2024-01-18');
    });

    it('skal sette omsorgsovertakelseDato for AdoptertBarn', () => {
        const barn = {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 1,
            adopsjonsdato: '2024-02-01',
            fødselsdatoer: ['2022-05-10'],
        } satisfies Barn;

        const params = getStønadskvoteParams(barn, ANNEN_FORELDER_OPPGITT, MOR_SØKERSITUASJON, undefined);

        expect(params.fødselsdato).toBeUndefined();
        expect(params.termindato).toBeUndefined();
        expect(params.omsorgsovertakelseDato).toBe('2024-02-01');
    });
});
