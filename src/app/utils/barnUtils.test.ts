import { getFamiliehendelsedato, getRegistrertBarnOmDetFinnes } from './barnUtils';
import Barn, { BarnType } from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';

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

    it('skal finne registrert barn når barn er født og er registrert fra før med samme fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: dayjs('2021-01-01').toDate(),
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
                fødselsdato: dayjs('2021-01-01').toDate(),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn har forsjellig fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: dayjs('2017-01-01').toDate(),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når barn har forsjellig fødselsdato', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } as Barn;
        const registrerteBarn = [
            {
                fødselsdato: dayjs('2017-01-01').toDate(),
            },
        ] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });

    it('skal ikke finne registrert barn når ingen barn er registrert fra før', () => {
        const barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-01-01'],
        } as Barn;
        const registrerteBarn = [] as RegistrertBarn[];

        const registrert = getRegistrertBarnOmDetFinnes(barn, registrerteBarn);

        expect(registrert).toBeUndefined();
    });
});
