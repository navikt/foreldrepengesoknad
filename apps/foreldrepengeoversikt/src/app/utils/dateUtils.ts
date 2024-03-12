import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import { IntlShape } from 'react-intl';

import { isISODateString } from '@navikt/ds-datepicker';

dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

interface TidsperiodeDate {
    fom: Date;
    tom: Date;
}

type VarighetFormat = 'full' | 'normal';

export const formaterDato = (dato: string | Date | undefined, datoformat?: string): string => {
    return dayjs(dato).format(datoformat || 'dddd D. MMMM YYYY');
};

export const formaterTid = (dato: Date): string => {
    return formaterDato(dato, 'KL.HH:mm');
};

export const måned3bokstaver = (dato: Dayjs): string => {
    return dato.format('MMM').substr(0, 3);
};

export const år = (dato: Dayjs): string => {
    return dato.format('YYYY');
};

export const getUkerOgDagerFromDager = (dager: number): { dager: number; uker: number } => {
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
        const varighetTekst =
            format === 'full'
                ? intl.formatMessage({
                      id: 'varighet.separator--full',
                  })
                : intl.formatMessage({
                      id: 'varighet.separator--normal',
                  });
        return `${ukerStr}${varighetTekst}${dagerStr}`;
    }

    return ukerStr;
};

const isValidTidsperiode = (tidsperiode: any): tidsperiode is TidsperiodeDate => {
    return (
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
};

const getUkedag = (dato: Date): number => {
    return dayjs(dato).isoWeekday();
};

const erUttaksdag = (dato: Date): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

export const getAntallUttaksdagerITidsperiode = (tidsperiode: TidsperiodeDate): number => {
    if (!isValidTidsperiode(tidsperiode)) {
        return 0;
    }

    let fom = dayjs(tidsperiode.fom);
    const tom = dayjs(tidsperiode.tom);
    let antall = 0;

    while (fom.isSameOrBefore(tom, 'day')) {
        if (erUttaksdag(fom.toDate())) {
            antall++;
        }
        fom = fom.add(24, 'hours');
    }

    return antall;
};

export const ISOStringToDate = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: Date | undefined, dato2: Date | undefined): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};
