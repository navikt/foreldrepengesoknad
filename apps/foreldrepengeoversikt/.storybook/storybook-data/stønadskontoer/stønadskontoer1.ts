import { KontoBeregningResultatDto } from '@navikt/fp-types';

export const stønadskontoer1 = {
    '80': {
        kontoer: [
            {
                konto: 'FELLESPERIODE',
                dager: 90,
            },
            {
                konto: 'MØDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
        tillegg: {
            flerbarn: 0,
            prematur: 0,
        },
    },
    '100': {
        kontoer: [
            {
                konto: 'FELLESPERIODE',
                dager: 80,
            },
            {
                konto: 'MØDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
        tillegg: {
            flerbarn: 0,
            prematur: 0,
        },
    },
} satisfies KontoBeregningResultatDto;
