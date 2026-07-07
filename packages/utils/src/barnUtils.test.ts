import { BarnType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';

import { getFamiliehendelsedato } from './barnUtils';

describe('barnUtils', () => {
    it('skal returnere fødselsdato når barn er født', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-10-05', '2021-10-06'],
            termindato: '2021-09-05',
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-10-05'));
    });

    it('skal kutte bort UTC-tidskomponent fra fødselsdato slik at datosammenligninger ikke bommer med én dag', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2026-06-18T00:00:00.000Z'],
            termindato: '2026-06-30',
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toEqual('2026-06-18');
    });

    it('skal returnere termindato når barn ikke er født', () => {
        const barn = {
            type: BarnType.UFØDT,
            termindato: '2021-09-05',
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-09-05'));
    });

    it('skal returnere undefined når barn er adoptert', () => {
        const barn = {
            type: BarnType.ADOPTERT_STEBARN,
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBeUndefined();
    });
});
