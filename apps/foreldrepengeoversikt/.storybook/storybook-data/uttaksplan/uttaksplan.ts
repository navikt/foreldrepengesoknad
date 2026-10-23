import { FellesUttaksplanDto } from '@navikt/fp-types';

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
} satisfies FellesUttaksplanDto;

export const uttaksplanUtenPerioder = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    termindato: '2023-01-10',
    perioder: [],
} satisfies FellesUttaksplanDto;

export const uttaksplanForTidligSøknad = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    termindato: '2026-02-01',
    perioder: [
        {
            fom: '2026-02-02',
            tom: '2026-04-10',
            søker: {
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
        {
            fom: '2026-04-13',
            tom: '2026-11-06',
            søker: {
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FellesUttaksplanDto;

export const uttaksplanAvslått = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    termindato: '2025-10-27',
    perioder: [
        {
            fom: '2025-10-06',
            tom: '2025-10-24',
            søker: {
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2025-10-27',
            tom: '2026-02-06',
            søker: {
                kontoType: 'MØDREKVOTE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2026-02-09',
            tom: '2026-05-29',
            søker: {
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
    ],
} satisfies FellesUttaksplanDto;
