import { KontoBeregningDto } from '@navikt/fp-types';

export const stønadskontoer = {
    kontoer: [
        {
            konto: 'MØDREKVOTE',
            dager: 95,
        },
        {
            konto: 'FEDREKVOTE',
            dager: 95,
        },
        {
            konto: 'FELLESPERIODE',
            dager: 90,
        },
        {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15,
        },
        {
            konto: 'FORELDREPENGER',
            dager: 80,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
} satisfies KontoBeregningDto;
