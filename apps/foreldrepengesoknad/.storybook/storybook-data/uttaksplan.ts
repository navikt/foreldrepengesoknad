import { FellesUttaksplanDto_fpoversikt } from '@navikt/fp-types';

const innvilget = { innvilget: true, trekkerMinsterett: true, trekkerDager: true, årsak: 'ANNET' } as const;

export const uttaksplanMedFarSomAnnenPart = {
    termindato: '2022-08-17',
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2022-12-12',
            tom: '2023-02-17',
            annenPart: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                resultat: innvilget,
                samtidigUttak: 100,
                flerbarnsdager: false,
            },
        },
        {
            fom: '2023-02-20',
            tom: '2023-03-05',
            annenPart: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                resultat: innvilget,
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        },
        {
            fom: '2023-03-20',
            tom: '2023-03-31',
            annenPart: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FellesUttaksplanDto_fpoversikt;

export const uttaksplanMedMorSomAnnenPart = {
    termindato: '2022-08-17',
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder: [
        {
            fom: '2022-12-12',
            tom: '2023-02-17',
            annenPart: {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                samtidigUttak: 100,
                flerbarnsdager: false,
            },
        },
        {
            fom: '2023-02-20',
            tom: '2023-03-05',
            annenPart: {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                resultat: innvilget,
                samtidigUttak: 50,
                flerbarnsdager: false,
            },
        },
        {
            fom: '2023-03-20',
            tom: '2023-03-31',
            annenPart: {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FellesUttaksplanDto_fpoversikt;
