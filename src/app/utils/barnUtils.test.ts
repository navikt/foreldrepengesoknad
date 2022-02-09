import { getFamiliehendelsedato, getRegistrertBarnOmDetFinnes } from './barnUtils';
import Barn, { BarnType } from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';

describe('barnUtils', () => {
    it('skal returnere fødselsdato når barn er født', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: [new Date('2021-10-05'), new Date('2021-10-06')],
            termindato: new Date('2021-09-05'),
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-10-05'));
    });

    it('skal returnere termindato når barn ikke er født', () => {
        const barn = {
            type: BarnType.UFØDT,
            termindato: new Date('2021-09-05'),
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(new Date(dato)).toEqual(new Date('2021-09-05'));
    });

    it('skal returnere undefined når barn er adoptert', () => {
        const barn = {
            type: BarnType.ADOPTERT_STEBARN,
        } as Barn;

        const dato = getFamiliehendelsedato(barn);

        expect(dato).toBeUndefined;
    });

    it('skal finne registrert barn når barn er født og er registrert fra før med samme fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: [new Date('2021-01-01')],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: new Date('2021-01-01'),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toEqual(registrerteBarn[0]);
    });

    it('skal ikke finne registrert barn når barn er ufødt', () => {
        const barn = {
            type: BarnType.UFØDT,
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: new Date('2021-01-01'),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn har forsjellig fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: [new Date('2021-01-01')],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: new Date('2017-01-01'),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn har forsjellig fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: [new Date('2021-01-01')],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: new Date('2017-01-01'),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når ingen barn er registrert fra før', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: [new Date('2021-01-01')],
        } as Barn;
        const registrerteBarn = [] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });
});
