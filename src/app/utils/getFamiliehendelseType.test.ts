import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { getFamiliehendelseType } from './getFamiliehendelseType';

describe('getFamiliehendelseType', () => {
    it('skal finne type FØDSEL når en har fødselsdato', () => {
        const fødselsdato = '2021-01-01';
        const termindato = '2021-01-01';
        const type = getFamiliehendelseType(fødselsdato, termindato, undefined);
        expect(type).toBe(FamiliehendelseType.FØDSEL);
    });

    it('skal finne type TERM når en har termindato men ikke fødselsdato', () => {
        const termindato = '2021-01-01';
        const type = getFamiliehendelseType(undefined, termindato, undefined);
        expect(type).toBe(FamiliehendelseType.TERM);
    });

    it('skal finne type ADOPSJON når en ikke har termindato eller fødselsdato', () => {
        const adopsjonsdato = '2021-01-01';
        const type = getFamiliehendelseType(undefined, undefined, adopsjonsdato);
        expect(type).toBe(FamiliehendelseType.ADOPSJON);
    });
    //TODO: Test error
});
