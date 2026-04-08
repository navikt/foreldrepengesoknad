import dayjs from 'dayjs';
import advanced from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';
import { Alder } from 'types/Alder';

import { AnnenForelder, Barn } from '@navikt/fp-common';
import {
    FpBarnDto_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isFødtBarn,
} from '@navikt/fp-types';
import { TidsperiodenString, isISODateString } from '@navikt/fp-utils';

import { FeatureToggle } from '../FeatureToggle';
import { getIsDeltUttak } from './annenForelderUtils';
import { getFamiliehendelsedato } from './barnUtils';
import { erPeriodeIOpprinneligPlan } from './eksisterendeSakUtils';
import { toggleUtils } from './toggleUtils';
import { hasValue } from './validationUtil';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(advanced);

const isoStringFormat = 'YYYY-MM-DD';
export const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');
export const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return new Date(dateString);
    }
    return undefined;
};
// FIXME (TOR) Kva er dette?
dayjs().subtract(4, 'year').startOf('day').toDate();
export const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    if (dayjs(a).isBefore(b, 'day')) {
        return true;
    }

    return false;
};

export const getEldsteRegistrerteBarn = (registrerteBarn: FpBarnDto_fpoversikt[]): FpBarnDto_fpoversikt => {
    return [...registrerteBarn].sort((a, b) => (isDateABeforeDateB(a.fødselsdato, b.fødselsdato) ? 1 : -1)).at(-1)!;
};

export const sorterDatoEtterEldst = (dato: string[]): string[] => {
    return [...dato].sort((a, b) => (isDateABeforeDateB(a, b) ? -1 : 1));
};

export const getEldsteDato = (dato: string[]): string => {
    return sorterDatoEtterEldst(dato)[0]!;
};

type DateValue = Date | undefined;

export const dateIsSameOrBefore = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrBefore(otherDate, 'day');
    }
    return true;
};
export const dateIsSameOrAfter = (date: DateValue, otherDate: DateValue): boolean => {
    if (date && otherDate) {
        return dayjs(date).isSameOrAfter(otherDate, 'day');
    }
    return true;
};

export const findEldsteDato = (dateArray: Array<Date | string>): DateValue => {
    if (dateArray.length > 0) {
        return dayjs.min(dateArray.map((date) => dayjs(date)))!.toDate();
    }
    return undefined;
};

export const getAlderFraDato = (fødselsdato: Date): Alder => {
    const idag = dayjs();
    const dato = dayjs(fødselsdato);

    const år = idag.diff(dato, 'year');
    dato.add(år, 'years');
    const måneder = idag.diff(dato, 'months');
    dato.add(måneder, 'months');
    const dager = idag.diff(dato, 'days');

    return {
        år,
        måneder,
        dager,
    };
};

export const getRelevantFamiliehendelseDato = (
    termindato: string | undefined,
    fødselsdato: string | undefined,
    omsorgsovertakelsesdato: string | undefined,
): string => {
    if (omsorgsovertakelsesdato !== undefined) {
        return omsorgsovertakelsesdato;
    } else if (fødselsdato !== undefined) {
        return fødselsdato;
    } else if (termindato !== undefined) {
        return termindato;
    } else {
        throw new Error('Mangler fødselsdato/termindato/adopsjonsdato for barnet.');
    }
};

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: string | Date): boolean => {
    const førsteOktober2021 = new Date('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs(new Date()).isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: string | Date): boolean => {
    const andreAugust2022 = new Date('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs(new Date()).isSameOrAfter(andreAugust2022, 'day')
    );
};

export const førsteJuli2024ReglerGjelder = (barn: Barn): boolean => {
    let førsteJuli2024 = '2024-07-01';
    if (toggleUtils.isFeatureEnabled(FeatureToggle.test1Juli2024Regler)) {
        førsteJuli2024 = '2024-06-18';
    }

    if (dayjs().isBefore(dayjs(førsteJuli2024), 'day')) {
        return false;
    }
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    if ((isFødtBarn(barn) || isAdoptertBarn(barn)) && dayjs(familiehendelsesdato).isBefore(førsteJuli2024, 'day')) {
        return false;
    }
    return true;
};

export const getEndringstidspunktNy = (
    søkerensOpprinneligePlan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    søkerensUpdatedPlan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
): string | undefined => {
    let endringstidspunktNyPlan: string | undefined;
    let endringstidspunktOpprinneligPlan: string | undefined;
    if (søkerensOpprinneligePlan) {
        for (const [index, periode] of søkerensUpdatedPlan.entries()) {
            if (endringstidspunktNyPlan) {
                break;
            }

            const { fom } = periode;
            const opprinneligPeriodeMedSammeFom = søkerensOpprinneligePlan.find((opprinneligPeriode) =>
                dayjs(opprinneligPeriode.fom).isSame(fom, 'day'),
            );

            if (opprinneligPeriodeMedSammeFom !== undefined) {
                const perioderErLikeUtenTidSjekk = erPeriodeIOpprinneligPlan([periode], opprinneligPeriodeMedSammeFom);
                if (
                    !perioderErLikeUtenTidSjekk ||
                    (perioderErLikeUtenTidSjekk &&
                        TidsperiodenString.forPeriode(periode).slutterEtter(opprinneligPeriodeMedSammeFom.tom))
                ) {
                    endringstidspunktNyPlan = fom;
                }
            }

            if (opprinneligPeriodeMedSammeFom === undefined) {
                endringstidspunktNyPlan = fom;
            }

            if (opprinneligPeriodeMedSammeFom !== undefined && søkerensUpdatedPlan.length - 1 === index) {
                if (!erPeriodeIOpprinneligPlan([periode], opprinneligPeriodeMedSammeFom)) {
                    endringstidspunktNyPlan = fom;
                }
            }
        }

        for (const periode of søkerensOpprinneligePlan) {
            if (endringstidspunktOpprinneligPlan) {
                continue;
            }

            const { fom } = periode;
            const nyPeriodeMedSammeFom = søkerensUpdatedPlan.find((nyPeriode) =>
                dayjs(nyPeriode.fom).isSame(fom, 'day'),
            );

            if (nyPeriodeMedSammeFom !== undefined && !erPeriodeIOpprinneligPlan([periode], nyPeriodeMedSammeFom)) {
                endringstidspunktOpprinneligPlan = nyPeriodeMedSammeFom.fom;
            }

            if (nyPeriodeMedSammeFom === undefined) {
                endringstidspunktOpprinneligPlan = fom;
            }
        }
    } else if (søkerensUpdatedPlan.length > 0) {
        // Bruker har slettet opprinnelig plan, send med alt
        return søkerensUpdatedPlan[0]!.fom;
    }

    return getOldestDateNy(endringstidspunktNyPlan, endringstidspunktOpprinneligPlan);
};

const getOldestDateNy = (
    endringstidspunktNyPlan: string | undefined,
    endringstidspunktOpprinneligPlan: string | undefined,
): string | undefined => {
    if (endringstidspunktNyPlan === undefined && endringstidspunktOpprinneligPlan === undefined) {
        return undefined;
    }

    if (endringstidspunktNyPlan !== undefined && endringstidspunktOpprinneligPlan === undefined) {
        return endringstidspunktNyPlan;
    }

    if (endringstidspunktNyPlan === undefined && endringstidspunktOpprinneligPlan !== undefined) {
        return endringstidspunktOpprinneligPlan;
    }

    return dayjs(endringstidspunktNyPlan).isSameOrBefore(dayjs(endringstidspunktOpprinneligPlan))
        ? endringstidspunktNyPlan
        : endringstidspunktOpprinneligPlan;
};

export const getVis1Juli2024Info = (barn: Barn, annenForelder: AnnenForelder) => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erDeltUttak = getIsDeltUttak(annenForelder);
    return (
        dayjs(familiehendelsesdato).isSameOrAfter(dayjs('2024-07-01'), 'd') &&
        dayjs().isBefore(dayjs('2024-07-01'), 'd') &&
        erDeltUttak &&
        barn.antallBarn === 1
    );
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: DateType, dato2: DateType): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs.utc(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs.utc(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

type VarighetFormat = 'full' | 'normal';
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
    if (dager > 0 && format === 'full') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--full`,
        })}${dagerStr}`;
    }
    if (dager > 0 && format === 'normal') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--normal`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

type DateType = string | Date | undefined;

export const getToTetteReglerGjelder = (
    familiehendelsesdato: DateType,
    familiehendelsesdatoNesteBarn: DateType,
): boolean => {
    if (familiehendelsesdato === undefined || familiehendelsesdatoNesteBarn === undefined) {
        return false;
    }
    const familiehendelsePlus48Uker = dayjs(familiehendelsesdato).add(48, 'week');
    return (
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        andreAugust2022ReglerGjelder(familiehendelsesdatoNesteBarn) &&
        dayjs(familiehendelsePlus48Uker).isAfter(familiehendelsesdatoNesteBarn, 'day')
    );
};
export const formaterDato = (dato: DateType, datoformat?: string): string => {
    return dayjs(dato).format(datoformat ?? 'dddd D. MMMM YYYY');
};
