import dayjs from 'dayjs';

import { ISO_DATE_FORMAT, StønadskontoType } from '@navikt/fp-constants';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

import { PeriodeHullType } from '../types/Planperiode';

interface MinDateProps {
    årsak?: UtsettelseÅrsakType.Ferie | PeriodeHullType.PERIODE_UTEN_UTTAK;
    kontoType?: StønadskontoType;
    familiehendelsedato: string;
    gjelderAdopsjon: boolean;
}

export const getMinDate = ({ årsak, kontoType, familiehendelsedato, gjelderAdopsjon }: MinDateProps) => {
    const ukedagFamiliehendelsedato = UttaksdagenString(familiehendelsedato).denneEllerNeste();

    if (årsak === UtsettelseÅrsakType.Ferie) {
        if (gjelderAdopsjon) {
            return UttaksdagenString(ukedagFamiliehendelsedato).denneEllerNeste();
        }

        return UttaksdagenString(ukedagFamiliehendelsedato).leggTil(30);
    }

    if (kontoType === StønadskontoType.ForeldrepengerFørFødsel) {
        return UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(15);
    }

    if (kontoType === StønadskontoType.Fellesperiode) {
        return UttaksdagenString(ukedagFamiliehendelsedato).trekkFra(60);
    }

    return UttaksdagenString(ukedagFamiliehendelsedato).denneEllerNeste();
};

interface MaxDateProps {
    kontoType?: StønadskontoType;
    familiehendelsedato: string;
}

export const getMaxDate = ({ kontoType, familiehendelsedato }: MaxDateProps) => {
    if (kontoType === StønadskontoType.ForeldrepengerFørFødsel) {
        return UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).forrige();
    }

    return dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);
};
