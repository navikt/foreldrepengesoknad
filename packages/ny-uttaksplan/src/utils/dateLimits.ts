import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { KontoTypeUttak } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { PeriodeHullType } from '../types/Planperiode';

interface MinDateProps {
    årsak?: 'LOVBESTEMT_FERIE' | PeriodeHullType.PERIODE_UTEN_UTTAK;
    kontoType?: KontoTypeUttak;
    familiehendelsedato: string;
    gjelderAdopsjon: boolean;
}

export const getMinDate = ({ årsak, kontoType, familiehendelsedato, gjelderAdopsjon }: MinDateProps) => {
    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();

    if (årsak === 'LOVBESTEMT_FERIE') {
        if (gjelderAdopsjon) {
            return UttaksdagenString(ukedagFamiliehendelsedato).denneEllerNeste();
        }

        return UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    }

    if (kontoType === 'FORELDREPENGER_FØR_FØDSEL') {
        return UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    }

    if (kontoType === 'FELLESPERIODE') {
        return UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(60);
    }

    if (kontoType === 'FEDREKVOTE' && !gjelderAdopsjon) {
        return UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(10);
    }

    return UttaksdagenString(ukedagFamiliehendelsedato).denneEllerNeste();
};

interface MaxDateProps {
    årsak?: 'LOVBESTEMT_FERIE' | PeriodeHullType.PERIODE_UTEN_UTTAK;
    kontoType?: KontoTypeUttak;
    familiehendelsedato: string;
}

export const getMaxDate = ({ kontoType, familiehendelsedato, årsak }: MaxDateProps) => {
    if (kontoType === 'FORELDREPENGER_FØR_FØDSEL' && !årsak) {
        return UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).forrige();
    }

    return dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);
};
