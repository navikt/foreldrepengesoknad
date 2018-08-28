import { Kjønn } from '../../types/common';
import { RegistrertAnnenForelder, RegistrertBarn } from '../../../types/Person';
import { getUniqeRegistrertAnnenForelderFromBarn } from './barn';

const forelder1: RegistrertAnnenForelder = {
    fnr: '1',
    fornavn: '',
    etternavn: '',
    fødselsdato: new Date(),
    kjønn: Kjønn.MANN
};

const forelder2: RegistrertAnnenForelder = {
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
    annenForelder: forelder1
};

const barnMedUlikForelder: RegistrertBarn = {
    ...barn,
    annenForelder: forelder2
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
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([
                barnMedForelder
            ]);
            expect(forelder).toBeDefined();
        });
        it('registrertAnnenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([
                barnMedForelder,
                barnMedForelder
            ]);
            expect(forelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqeRegistrertAnnenForelderFromBarn([
                barnMedForelder,
                barnMedUlikForelder
            ]);
            expect(forelder).toBeUndefined();
        });
    });
});
