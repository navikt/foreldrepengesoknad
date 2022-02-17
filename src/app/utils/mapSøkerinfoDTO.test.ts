import { Kjønn } from '@navikt/fp-common';
import mapSøkerinfoDTOToSøkerinfo from './mapSøkerinfoDTO';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ISOStringToDate } from './dateUtils';

describe('mapSøkerinfoDTO', () => {
    it('skal konvertere dto til app-format', () => {
        const søkerinfoDTO: SøkerinfoDTO = {
            søker: {
                fødselsdato: '2000-01-01',
                fornavn: 'Espen',
                etternavn: 'Utvikler',
                fnr: '08088620241',
                ikkeNordiskEøsLand: false,
                kjønn: 'M' as Kjønn,
                bankkonto: {
                    kontonummer: '123',
                    banknavn: 'DNB',
                },
            },
            arbeidsforhold: [
                {
                    arbeidsgiverId: 'ID',
                    arbeidsgiverIdType: 'Type',
                    arbeidsgiverNavn: 'OBOS',
                    fom: '2021-01-02',
                    tom: '2021-01-05',
                    stillingsprosent: 100,
                },
            ],
        };

        const søkerinfo = mapSøkerinfoDTOToSøkerinfo(søkerinfoDTO);

        expect(søkerinfo).toStrictEqual({
            arbeidsforhold: [
                {
                    arbeidsgiverId: 'ID',
                    arbeidsgiverIdType: 'Type',
                    arbeidsgiverNavn: 'OBOS',
                    fom: ISOStringToDate('2021-01-02'),
                    tom: ISOStringToDate('2021-01-05'),
                    stillingsprosent: 100,
                },
            ],
            person: {
                erMyndig: true,
                etternavn: 'Utvikler',
                fornavn: 'Espen',
                fnr: '08088620241',
                fødselsdato: ISOStringToDate('2000-01-01'),
                ikkeNordiskEøsLand: false,
                kjønn: 'M' as Kjønn,
                bankkonto: {
                    kontonummer: '123',
                    banknavn: 'DNB',
                },
            },
            registrerteBarn: [],
        });
    });
});
