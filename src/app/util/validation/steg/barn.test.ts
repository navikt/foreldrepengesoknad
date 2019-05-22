import { RegistrertAnnenForelder, RegistrertBarn } from '../../../types/Person';
import { getUniqueRegistrertAnnenForelderFromBarn } from './barn';
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
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([]);
            expect(forelder).toBeUndefined();
        });
        it('barn uten annen forelder har ikke registrertAnnenForelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barn]);
            expect(forelder).toBeUndefined();
        });
        it('barn med annen forelder har registrertAnnenForelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('registrertAnnenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedUlikForelder]);
            expect(forelder).toBeUndefined();
        });
    });
});
