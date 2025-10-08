import { Barn, BarnType } from '@navikt/fp-common';
import { BarnDto_fpoversikt } from '@navikt/fp-types';

import { getFamiliehendelsedato, getRegistrerteBarnOmDeFinnes } from './barnUtils';

describe('barnUtils', () => {
    it('skal returnere fødselsdato når barn er født', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-10-05', '2021-10-06'],
            termindato: '2021-09-05',
        } satisfies Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-10-05'));
    });

    it('skal returnere termindato når barn ikke er født', () => {
        const barn = {
            type: BarnType.UFØDT,
            termindato: '2021-09-05',
        } satisfies Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-09-05'));
    });

    it('skal returnere undefined når barn er adoptert', () => {
        const barn = {
            type: BarnType.ADOPTERT_STEBARN,
        } satisfies Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBeUndefined();
    });

    it('skal finne registrert barn når barn er født og er registrert fra før med samme fnr', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
            fnr: ['123'],
        } satisfies Barn;
        const registrerteBarn = [
            {
                fødselsdato: '2021-01-01',
                fnr: '123',
            },
        ] satisfies BarnDto_fpoversikt[];

        const registrert = getRegistrerteBarnOmDeFinnes(barn, registrerteBarn);

        expect(registrert).not.toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn er ufødt', () => {
        const barn = {
            type: BarnType.UFØDT,
        } satisfies Barn;
        const registrerteBarn = [
            {
                fødselsdato: '2021-01-01',
                fnr: '123',
            },
        ] satisfies BarnDto_fpoversikt[];

        const registrert = getRegistrerteBarnOmDeFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn har forskjellig fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } satisfies Barn;
        const registrerteBarn = [
            {
                fødselsdato: '2017-01-01',
                fnr: '123',
            },
        ] satisfies BarnDto_fpoversikt[];

        const registrert = getRegistrerteBarnOmDeFinnes(barn, registrerteBarn);

        expect(registrert!.length).toEqual(0);
    });

    it('skal ikke finne registrert barn når ingen barn er registrert fra før', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } satisfies Barn;
        const registrerteBarn = [] satisfies BarnDto_fpoversikt[];

        const registrert = getRegistrerteBarnOmDeFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });
});
