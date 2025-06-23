import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType } from '../../../types/Planperiode';

export type LeggTilPeriodeModalFormValues = {
    kontoType?: StønadskontoType;
    forelder: Forelder;
    fom: string;
    tom: string;
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    skalDuJobbe: boolean;
    stillingsprosent?: string;
};
