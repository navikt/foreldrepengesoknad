import { AnnenPartSak_fpoversikt } from '@navikt/fp-types';

export const annenPartVedtak = {
    termindato: '2022-08-17',
    antallBarn: 1,
    perioder: [
        {
            fom: '2022-12-12',
            tom: '2023-02-17',
            kontoType: 'FEDREKVOTE',
            resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
            samtidigUttak: 100,
            flerbarnsdager: false,
        },
        {
            fom: '2023-02-20',
            tom: '2023-03-05',
            kontoType: 'FELLESPERIODE',
            resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
            samtidigUttak: 50,
            flerbarnsdager: false,
        },
        {
            fom: '2023-03-20',
            tom: '2023-03-31',
            kontoType: 'FEDREKVOTE',
            resultat: { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
            flerbarnsdager: false,
        },
    ],
    dekningsgrad: 'HUNDRE',
} satisfies AnnenPartSak_fpoversikt;

export const avslåttAnnenPartVedtak = {
    termindato: '2022-08-17',
    antallBarn: 1,
    perioder: [
        {
            fom: '2022-12-12',
            tom: '2023-02-17',
            kontoType: 'FEDREKVOTE',
            resultat: { innvilget: false, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' },
            samtidigUttak: 100,
            flerbarnsdager: false,
        },
    ],
    dekningsgrad: 'HUNDRE',
} satisfies AnnenPartSak_fpoversikt;
