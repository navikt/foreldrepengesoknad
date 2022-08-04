import dayjs, { Dayjs } from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced from 'dayjs/plugin/advancedFormat';
import { IntlShape } from 'react-intl';
import { formatDate, formatDateExtended, hasValue, intlUtils, Tidsperiode, TidsperiodeDate } from '@navikt/fp-common';
import { SkjemaelementFeil } from 'app/types/SkjemaelementFeil';
import { RegistrertBarn } from 'app/types/Person';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Alder } from 'app/types/Alder';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Periode, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import UttaksplanInfo, { isFarMedmorFødselBeggeHarRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import fn from './toggleUtils';
import FeatureToggle from 'app/FeatureToggle';

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(timezone);
dayjs.extend(advanced);

export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();

export const ISOStringToDate = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString) && dayjs(dateString, 'YYYY-MM-DD', true).isValid()) {
        return dayjs.utc(dateString).toDate();
    }
    return undefined;
};

export const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date) => {
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (
    intl: IntlShape,
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    isFomDate: boolean
) => {
    if (date === undefined) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.fraOgMedDato.gyldigDato');
        }
        return intlUtils(intl, 'valideringsfeil.tilOgMedDato.gyldigDato');
    }

    if (!dateIsWithinRange(date, minDate, maxDate)) {
        if (isFomDate) {
            return intlUtils(intl, 'valideringsfeil.dateOutsideRange.fom', {
                fom: formatDateExtended(minDate),
                tom: formatDateExtended(maxDate),
            });
        }

        return intlUtils(intl, 'valideringsfeil.dateOutsideRange.tom', {
            fom: formatDateExtended(minDate),
            tom: formatDateExtended(maxDate),
        });
    }

    return undefined;
};

const getMeldingOmOverlappendeUtsettelser = (
    utsettelserIPlan: Utsettelsesperiode[] | undefined,
    dato: Date | undefined,
    intl: IntlShape,
    periodeId: string | undefined
): string | undefined => {
    if (dato === undefined || utsettelserIPlan === undefined) {
        return undefined;
    }
    const overlappendeUtsettelsesPerioder = utsettelserIPlan.filter(
        (up) =>
            dayjs(dato).isSameOrAfter(up.tidsperiode.fom, 'day') &&
            dayjs(dato).isSameOrBefore(up.tidsperiode.tom, 'day') &&
            up.id !== periodeId
    );
    if (overlappendeUtsettelsesPerioder.length > 0) {
        return intlUtils(intl, 'valideringsfeil.overlapperEnUtsettelse', {
            fom: formatDate(overlappendeUtsettelsesPerioder[0].tidsperiode.fom),
            tom: formatDate(overlappendeUtsettelsesPerioder[0].tidsperiode.tom),
        });
    }

    return undefined;
};

const validateFromDateInRange = ({
    intl,
    date,
    minDate,
    maxDate,
    errorKey,
    disableWeekend,
    periodeId,
    utsettelserIPlan,
    toDate,
}: {
    intl: IntlShape;
    date: Date | undefined;
    minDate: Date;
    maxDate: Date;
    errorKey: string;
    disableWeekend: boolean;
    periodeId?: string;
    utsettelserIPlan?: Utsettelsesperiode[];
    toDate?: Date;
}): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, true);

    if (disableWeekend && (dayjs(date).day() === 0 || dayjs(date).day() === 6)) {
        return intlUtils(intl, 'valideringsfeil.fraDatoErHelgedag');
    }

    if (error !== undefined) {
        return error;
    }

    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return intlUtils(intl, errorKey);
    }
    return getMeldingOmOverlappendeUtsettelser(utsettelserIPlan, date, intl, periodeId);
};

const validateToDateInRange = ({
    intl,
    date,
    minDate,
    maxDate,
    errorKey,
    disableWeekend,
    periodeId,
    utsettelserIPlan,
    fromDate,
}: {
    intl: IntlShape;
    date: Date | undefined;
    minDate: Date;
    maxDate: Date;
    errorKey: string;
    disableWeekend: boolean;
    periodeId?: string;
    utsettelserIPlan?: Utsettelsesperiode[];
    fromDate?: Date;
}): SkjemaelementFeil => {
    const error = validateDateInRange(intl, date, minDate, maxDate, false);

    if (disableWeekend && (dayjs(date).day() === 0 || dayjs(date).day() === 6)) {
        return intlUtils(intl, 'valideringsfeil.tilDatoErHelgedag');
    }

    if (error !== undefined) {
        return error;
    }

    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return intlUtils(intl, errorKey);
    }

    return getMeldingOmOverlappendeUtsettelser(utsettelserIPlan, date, intl, periodeId);
};

export const dateRangeValidation = {
    validateToDateInRange,
    validateFromDateInRange,
};

export const isDateABeforeDateB = (a: string, b: string): boolean => {
    if (!hasValue(a) || !hasValue(b) || !isISODateString(a) || !isISODateString(b)) {
        return false;
    }

    if (dayjs(a).isBefore(b, 'day')) {
        return true;
    }

    return false;
};

export const isDateToday = (date: string): boolean => {
    if (dayjs().isSame(date, 'day')) {
        return true;
    }

    return false;
};

export const isDateTodayOrInTheFuture = (date: string): boolean => {
    return isDateInTheFuture(date) || isDateToday(date);
};

export const isDateInTheFuture = (date: string): boolean => {
    if (dayjs().isBefore(date, 'day')) {
        return true;
    }

    return false;
};

export const velgEldsteBarn = (registrerteBarn: RegistrertBarn[], valgteBarn: string[]) => {
    const filteredBarn = registrerteBarn.filter((regBarn) => valgteBarn.includes(regBarn.fnr));

    return filteredBarn.sort((a, b) =>
        isDateABeforeDateB(dateToISOString(a.fødselsdato)!, dateToISOString(b.fødselsdato)!) ? 1 : -1
    )[filteredBarn.length - 1];
};

type VarighetFormat = 'full' | 'normal';

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
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
        }
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--${format}`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

export const formaterDato = (dato: string | Date | undefined, datoformat?: string): string => {
    return dayjs(dato).format(datoformat || 'dddd D. MMMM YYYY');
};

export const formaterDatoUtenDag = (dato: string | Date): string => {
    return dayjs(dato).format('D. MMMM YYYY');
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

export const formaterDatoKompakt = (dato: Date): string => {
    return formaterDato(dato, 'DD.MM.YYYY');
};

export const findEldsteDato = (dateArray: Date[]): DateValue => {
    if (dateArray.length > 0) {
        return dayjs.min(dateArray.map((date: Date) => dayjs(date))).toDate();
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

export const måned = (dato: Dayjs): string => {
    return dato.format('MMMM');
};

export const måned3bokstaver = (dato: Dayjs): string => {
    return dato.format('MMM').substr(0, 3);
};

export const år = (dato: Dayjs): string => {
    return dato.format('YYYY');
};

export const convertTidsperiodeToTidsperiodeDate = (tidsperiode: Tidsperiode): TidsperiodeDate => {
    return {
        fom: ISOStringToDate(tidsperiode.fom)!,
        tom: ISOStringToDate(tidsperiode.tom)!,
    };
};

export const getRelevantFamiliehendelseDato = (
    termindato: string | undefined,
    fødselsdato: string | undefined,
    omsorgsovertakelsesdato: string | undefined
): string => {
    if (fødselsdato !== undefined) {
        return fødselsdato;
    } else {
        return termindato !== undefined ? termindato : omsorgsovertakelsesdato!;
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

    //For testing av WLB regler i dev: WLB start-dato settes til 01.01.2022.
    if (fn.isFeatureEnabled(FeatureToggle.testWLBRegler)) {
        return dayjs(familiehendelsesdato).isSameOrAfter('2022-01-01', 'day');
    }

    return (
        dayjs(familiehendelsesdato).isSameOrAfter(andreAugust2022, 'day') &&
        dayjs(new Date()).isSameOrAfter(andreAugust2022, 'day')
    );
};

export const skalFarUtsetteEtterMorSinSisteUttaksdag = (
    farSinFørsteUttaksdag: Date,
    morsSisteUttaksdag: Date
): boolean => {
    return dayjs(farSinFørsteUttaksdag).isAfter(Uttaksdagen(morsSisteUttaksdag).neste(), 'day');
};

export const getEndringstidspunkt = (
    opprinneligPlan: Periode[] | undefined,
    updatedPlan: Periode[],
    erEndringssøknad: boolean
): Date | undefined => {
    if (!erEndringssøknad) {
        return undefined;
    }

    let endringstidspunktNyPlan: Date | undefined;
    let endringstidspunktOpprinneligPlan: Date | undefined;
    if (opprinneligPlan) {
        updatedPlan.forEach((periode, index) => {
            if (endringstidspunktNyPlan) {
                return endringstidspunktNyPlan;
            }

            const { fom } = periode.tidsperiode;
            const opprinneligPeriodeMedSammeFom = opprinneligPlan.find((opprinneligPeriode) =>
                dayjs(opprinneligPeriode.tidsperiode.fom).isSame(fom, 'day')
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

            if (opprinneligPeriodeMedSammeFom !== undefined && updatedPlan.length - 1 === index) {
                if (!Perioden(periode).erLik(opprinneligPeriodeMedSammeFom, true, true)) {
                    endringstidspunktNyPlan = fom;
                }
            }
        });

        opprinneligPlan.forEach((periode) => {
            if (endringstidspunktOpprinneligPlan) {
                return endringstidspunktOpprinneligPlan;
            }

            const { fom } = periode.tidsperiode;
            const nyPeriodeMedSammeFom = updatedPlan.find((nyPeriode) =>
                dayjs(nyPeriode.tidsperiode.fom).isSame(fom, 'day')
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
        if (updatedPlan.length > 0) {
            return updatedPlan[0].tidsperiode.fom;
        }
    }

    return getOldestDate(endringstidspunktNyPlan, endringstidspunktOpprinneligPlan);
};

const getOldestDate = (
    endringstidspunktNyPlan: Date | undefined,
    endringstidspunktOpprinneligPlan: Date | undefined
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

export const getMorsSisteDag = (uttaksplanInfo: UttaksplanInfo | undefined): Date | undefined => {
    if (!uttaksplanInfo) {
        return undefined;
    }

    if (isFarMedmorFødselBeggeHarRettUttaksplanInfo(uttaksplanInfo)) {
        return ISOStringToDate(uttaksplanInfo.morsSisteDag);
    }
};

export const dateIsBetween = (date: DateValue, fom: DateValue, tom: DateValue): boolean =>
    dayjs(date).isBetween(fom, tom, 'day', '[]');
