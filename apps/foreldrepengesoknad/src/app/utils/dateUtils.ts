import dayjs from 'dayjs';
import advanced from 'dayjs/plugin/advancedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {
    AnnenForelder,
    Barn,
    Periode,
    Perioden,
    hasValue,
    isInfoPeriode,
    isPeriodeUtenUttak,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';
import { SøkerBarn, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { isISODateString } from '@navikt/fp-utils';

import FeatureToggle from 'app/FeatureToggle';
import { Alder } from 'app/types/Alder';

import { getIsDeltUttak } from './annenForelderUtils';
import { getFamiliehendelsedato } from './barnUtils';
import fn from './toggleUtils';

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(advanced);

export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();

export const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    if (dayjs(a).isBefore(b, 'day')) {
        return true;
    }

    return false;
};

export const getEldsteRegistrerteBarn = (registrerteBarn: SøkerBarn[]): SøkerBarn => {
    return [...registrerteBarn].sort((a, b) => (isDateABeforeDateB(a.fødselsdato, b.fødselsdato) ? 1 : -1))[
        registrerteBarn.length - 1
    ];
};

export const sorterDatoEtterEldst = (dato: Date[]): string[] => {
    const d = [...dato].map((d) => dateToISOString(d)).sort((a, b) => (isDateABeforeDateB(a!, b!) ? -1 : 1));
    return d;
};

export const getEldsteDato = (dato: Date[]): string => {
    return sorterDatoEtterEldst(dato)[0];
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

export const førsteOktober2021ReglerGjelder = (familiehendelsesdato: Date): boolean => {
    const førsteOktober2021 = new Date('2021-10-01');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(førsteOktober2021, 'day') &&
        dayjs(new Date()).isSameOrAfter(førsteOktober2021, 'day')
    );
};

export const andreAugust2022ReglerGjelder = (familiehendelsesdato: Date): boolean => {
    const andreAugust2022 = new Date('2022-08-02');

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs(new Date()).isSameOrAfter(andreAugust2022, 'day')
    );
};

export const førsteJuli2024ReglerGjelder = (barn: Barn): boolean => {
    let førsteJuli2024 = '2024-07-01';
    if (fn.isFeatureEnabled(FeatureToggle.test1Juli2024Regler)) {
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

export const getEndringstidspunkt = (
    opprinneligPlan: Periode[] | undefined,
    updatedPlan: Periode[],
    erEndringssøknad: boolean,
): Date | undefined => {
    if (!erEndringssøknad) {
        return undefined;
    }

    const søkerensOpprinneligePlan =
        opprinneligPlan === undefined ? undefined : opprinneligPlan.filter((p) => !isInfoPeriode(p));
    const søkerensUpdatedPlan = updatedPlan.filter((p) => !isInfoPeriode(p));

    let endringstidspunktNyPlan: Date | undefined;
    let endringstidspunktOpprinneligPlan: Date | undefined;
    if (søkerensOpprinneligePlan) {
        søkerensUpdatedPlan.forEach((periode, index) => {
            if (endringstidspunktNyPlan) {
                return;
            }

            const { fom } = periode.tidsperiode;
            const opprinneligPeriodeMedSammeFom = søkerensOpprinneligePlan.find((opprinneligPeriode) =>
                dayjs(opprinneligPeriode.tidsperiode.fom).isSame(fom, 'day'),
            );

            if (opprinneligPeriodeMedSammeFom !== undefined) {
                const perioderErLikeUtenTidSjekk = Perioden(periode).erLik(opprinneligPeriodeMedSammeFom, false, true);
                if (
                    !perioderErLikeUtenTidSjekk ||
                    (perioderErLikeUtenTidSjekk &&
                        Perioden(periode).slutterEtter(opprinneligPeriodeMedSammeFom.tidsperiode.tom))
                ) {
                    endringstidspunktNyPlan = fom;
                }
            }

            if (opprinneligPeriodeMedSammeFom === undefined) {
                endringstidspunktNyPlan = fom;
            }

            if (opprinneligPeriodeMedSammeFom !== undefined && søkerensUpdatedPlan.length - 1 === index) {
                if (!Perioden(periode).erLik(opprinneligPeriodeMedSammeFom, true, true)) {
                    endringstidspunktNyPlan = fom;
                }
            }

            //Hvis endringstidspunktet er etter siste periode i opprinnelig plan, og 'periode' er periode uten uttak, finn første uttak/utsettelse etter endringstidspunktet
            if (
                endringstidspunktNyPlan &&
                isPeriodeUtenUttak(periode) &&
                dayjs(endringstidspunktNyPlan).isAfter(
                    søkerensOpprinneligePlan[søkerensOpprinneligePlan.length - 1].tidsperiode.tom,
                )
            ) {
                const førsteUttakEllerUtsettelseEtterEndring = søkerensUpdatedPlan.find(
                    (p) =>
                        (isUttaksperiode(p) || isUtsettelsesperiode(p)) &&
                        dayjs(p.tidsperiode.fom).isAfter(endringstidspunktNyPlan),
                );
                endringstidspunktNyPlan =
                    førsteUttakEllerUtsettelseEtterEndring !== undefined
                        ? førsteUttakEllerUtsettelseEtterEndring.tidsperiode.fom
                        : endringstidspunktNyPlan;
            }
        });

        søkerensOpprinneligePlan.forEach((periode) => {
            if (endringstidspunktOpprinneligPlan) {
                return;
            }

            const { fom } = periode.tidsperiode;
            const nyPeriodeMedSammeFom = søkerensUpdatedPlan.find((nyPeriode) =>
                dayjs(nyPeriode.tidsperiode.fom).isSame(fom, 'day'),
            );

            if (nyPeriodeMedSammeFom !== undefined && !Perioden(periode).erLik(nyPeriodeMedSammeFom, false, true)) {
                endringstidspunktOpprinneligPlan = nyPeriodeMedSammeFom.tidsperiode.fom;
            }

            if (nyPeriodeMedSammeFom === undefined) {
                endringstidspunktOpprinneligPlan = fom;
            }
        });
    } else {
        // Bruker har slettet opprinnelig plan, send med alt
        if (søkerensUpdatedPlan.length > 0) {
            return søkerensUpdatedPlan[0].tidsperiode.fom;
        }
    }

    return getOldestDate(endringstidspunktNyPlan, endringstidspunktOpprinneligPlan);
};

const getOldestDate = (
    endringstidspunktNyPlan: Date | undefined,
    endringstidspunktOpprinneligPlan: Date | undefined,
): Date | undefined => {
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
