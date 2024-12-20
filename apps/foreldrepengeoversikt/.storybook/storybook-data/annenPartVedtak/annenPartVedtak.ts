import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { PeriodeResultatÅrsak } from '@navikt/fp-types';

import { AnnenPartVedtakDTO } from '../../../src/types/AnnenPartVedtakDTO';
import { DekningsgradDTO } from '../../../src/types/DekningsgradDTO';

export const annenPartVedtak = {
    perioder: [
        {
            fom: '2023-03-12',
            tom: '2023-03-26',
            kontoType: StønadskontoType.Fedrekvote,
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
    dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
} satisfies AnnenPartVedtakDTO;
