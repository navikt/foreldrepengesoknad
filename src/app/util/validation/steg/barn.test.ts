import { RegistrertAnnenForelder, RegistrertBarn } from '../../../types/Person';
import { getUniqeRegistrertAnnenForelderFromBarn } from './barn';
import { Kjønn } from '../../../types/common';

const mor: RegistrertAnnenForelder = {
    fnr: '1',
    fornavn: '',
    etternavn: '',
    fødselsdato: new Date(),
    kjønn: Kjønn.MANN
};

const farMedmor: RegistrertAnnenForelder = {
    fnr: '2',
    fornavn: '',
    etternavn: '',
    fødselsdato: new Date(),
    kjønn: Kjønn.MANN
};

const barn: RegistrertBarn = {
    constructedId: 'abc',
    fnr: '1',
    fornavn: 'a',
    etternavn: 'b',
    fødselsdato: new Date(),
    kjønn: Kjønn.MANN
};

const barnMedForelder: RegistrertBarn = {
    ...barn,
    annenForelder: mor
};

const barnMedUlikForelder: RegistrertBarn = {
    ...barn,
    annenForelder: farMedmor
};

describe('barn.steg.validation', () => {
    describe('getUniqeRegistrertAnnenForelderFromBarn', () => {
        it('registrertAnnenForelder er undefined ved ingen barn', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([]);
            expect(forelder).toBeUndefined();
        });
        it('barn uten annen forelder har ikke registrertAnnenForelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([barn]);
            expect(forelder).toBeUndefined();
        });
        it('barn med annen forelder har registrertAnnenForelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('registrertAnnenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedUlikForelder]);
            expect(forelder).toBeUndefined();
        });
    });
});
