import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';

import { Tidsperiode } from '@navikt/fp-types';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

type VarighetFormat = 'full' | 'normal';

const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0) {
        const text =
            format === 'full'
                ? intl.formatMessage({
                      id: `varighet.separator--full`,
                  })
                : intl.formatMessage({
                      id: `varighet.separator--normal`,
                  });
        return `${ukerStr}${text}${dagerStr}`;
    }
    return ukerStr;
};

export const tidperiodeOverlapperDato = (tidsperiode: Tidsperiode, dato: string): boolean => {
    return dayjs(tidsperiode.fom).isBefore(dato, 'day') && dayjs(tidsperiode.tom).isSameOrAfter(dato, 'day');
};

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: string): boolean => {
    const førsteOktober2021 = new Date('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs().startOf('day').isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: string): boolean => {
    const andreAugust2022 = new Date('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs().startOf('day').isSameOrAfter(andreAugust2022, 'day')
    );
};
