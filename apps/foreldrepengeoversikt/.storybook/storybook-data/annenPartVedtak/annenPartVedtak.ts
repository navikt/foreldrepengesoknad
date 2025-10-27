import { Forelder } from '@navikt/fp-constants';
import { AnnenPartSak, PeriodeResultatÅrsak } from '@navikt/fp-types';

export const annenPartVedtak = {
    perioder: [
        {
            fom: '2023-03-12',
            tom: '2023-03-26',
            kontoType: 'FEDREKVOTE',
            samtidigUttak: 100,
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: PeriodeResultatÅrsak.ANNET,
            },
            forelder: Forelder.farMedmor,
        },
    ],
    termindato: '2022-08-17',
    dekningsgrad: 'HUNDRE',
    antallBarn: 1,
} satisfies AnnenPartSak;
