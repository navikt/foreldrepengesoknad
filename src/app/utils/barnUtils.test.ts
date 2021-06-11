import { getFamiliehendelsedato } from './barnUtils';
import Barn, { BarnType } from 'app/context/types/Barn';

describe('barnUtils', () => {
    it('skal returnere fødselsdato når barn er født', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['10.05.2021', '10.06.2021'],
            termindato: '09.05.2021',
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBe('10.05.2021');
    });

    it('skal returnere termindato når barn ikke er født', () => {
        const barn = {
            type: BarnType.UFØDT,
            termindato: '09.05.2021',
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBe('09.05.2021');
    });

    it('skal returnere undefined når barn er adoptert', () => {
        const barn = {
            type: BarnType.ADOPTERT_STEBARN,
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBeUndefined;
    });
});
