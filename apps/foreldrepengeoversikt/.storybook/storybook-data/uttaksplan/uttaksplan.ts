import { FellesUttaksplanDto_fpoversikt } from '@navikt/fp-types';

const innvilget = {
    innvilget: true,
    trekkerMinsterett: true,
    trekkerDager: true,
    årsak: 'ANNET',
} as const;

export const uttaksplan = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    termindato: '2022-07-01',
    perioder: [
        {
            fom: '2022-06-10',
            tom: '2022-06-30',
            søker: {
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-07-01',
            tom: '2022-08-11',
            søker: {
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-08-12',
            tom: '2022-10-13',
            søker: {
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-10-14',
            tom: '2022-12-21',
            søker: {
                kontoType: 'FELLESPERIODE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
                samtidigUttak: 50,
            },
        },
        {
            fom: '2023-03-12',
            tom: '2023-03-26',
            annenPart: {
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 100,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FellesUttaksplanDto_fpoversikt;
