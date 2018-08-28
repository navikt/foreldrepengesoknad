import {
    SøkerinfoDTO,
    SøkerinfoDTOBarn,
    SøkerinfoDTOAnnenForelder
} from '../types/sokerinfoDTO';
import { Kjønn } from '../../types/common';
import { getSøkerinfoFromDTO } from './søkerinfoUtils';

const søkerinfoDTO: SøkerinfoDTO = {
    søker: {
        fnr: '',
        fornavn: '',
        etternavn: '',
        fødselsdato: '2000.10.01',
        kjønn: Kjønn.MANN,
        barn: []
    }
};

const forelder1: SøkerinfoDTOAnnenForelder = {
    fnr: '1',
    fornavn: '',
    etternavn: '',
    fødselsdato: '2000.10.01',
    kjønn: Kjønn.MANN
};

const forelder2: SøkerinfoDTOAnnenForelder = {
    fnr: '2',
    fornavn: '',
    etternavn: '',
    fødselsdato: '2000.10.01',
    kjønn: Kjønn.MANN
};

const barn: SøkerinfoDTOBarn = {
    fnr: '1',
    fornavn: 'a',
    etternavn: 'b',
    fødselsdato: '2018.10.01',
    kjønn: Kjønn.MANN
};

const barnMedForelder: SøkerinfoDTOBarn = {
    ...barn,
    annenForelder: forelder1
};
const barnMedUlikForelder: SøkerinfoDTOBarn = {
    ...barn,
    annenForelder: forelder2
};

describe('SøkerinfoUtils', () => {
    describe('getRegistrertAnnenForelder', () => {
        it('registrerAnnenForelder er undefined ved ingen barn', () => {
            const søkerinfo = getSøkerinfoFromDTO(søkerinfoDTO);
            expect(søkerinfo!.registrertAnnenForelder).toBeUndefined();
        });
        it('barn uten annen forelder har ikke registrerAnnenForelder', () => {
            const søkerinfoMedBarn = {
                ...søkerinfoDTO
            };
            søkerinfoMedBarn.søker.barn = [barn];
            const søkerinfo = getSøkerinfoFromDTO(søkerinfoDTO);
            expect(søkerinfo!.registrertAnnenForelder).toBeUndefined();
        });
        it('barn med annen forelder har registrerAnnenForelder', () => {
            const info = {
                ...søkerinfoDTO,
                søker: {
                    ...søkerinfoDTO.søker,
                    barn: [barnMedForelder]
                }
            };
            const søkerinfo = getSøkerinfoFromDTO(info);
            expect(søkerinfo!.registrertAnnenForelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const info = {
                ...søkerinfoDTO,
                søker: {
                    ...søkerinfoDTO.søker,
                    barn: [barnMedForelder, barnMedForelder]
                }
            };
            const søkerinfo = getSøkerinfoFromDTO(info);
            expect(søkerinfo!.registrertAnnenForelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const info = {
                ...søkerinfoDTO,
                søker: {
                    ...søkerinfoDTO.søker,
                    barn: [barnMedForelder, barnMedUlikForelder]
                }
            };
            const søkerinfo = getSøkerinfoFromDTO(info);
            expect(søkerinfo!.registrertAnnenForelder).toBeUndefined();
        });
    });
});
