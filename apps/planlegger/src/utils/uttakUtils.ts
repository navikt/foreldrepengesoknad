import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Uttaksdagen, treUkerSiden } from '@navikt/fp-utils';

import { erFarSøker2, erMedmorDelAvSøknaden } from './HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from './barnetUtils';
import { HvemHarRett } from './hvemHarRettUtils';
import {
    getAntallDagerAktivitetsfriKvote,
    getAntallDagerFedrekvote,
    getAntallDagerForeldrepengerFørFødsel,
    getAntallDagerMødrekvote,
    getAntallUkerOgDagerFellesperiode,
    getAntallUkerOgDagerForeldrepenger,
    getUkerOgDager,
} from './stønadskontoerUtils';

dayjs.extend(isoWeek);

const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

const getUkedag = (dato: string): number => {
    return dayjs(dato).isoWeekday();
};

const erUttaksdag = (dato: string): boolean => {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den nærmeste påfølgende mandag
 * @param dato
 */
const getUttaksdagFraOgMedDato = (dato: string): string => {
    const d = dayjs(dato).toDate();
    const newDate = dato ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).add(48, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(newDate).add(24, 'hours').format(ISO_DATE_FORMAT);
        default:
            return dato;
    }
};

/**
 * Sjekker om dato er en ukedag, dersom ikke finner den foregående fredag.
 * Tar hensyn til stilling av klokken ved å gjøre om klokka til kl 12 før antall timer trekkes fra.
 * @param dato
 */
const getUttaksdagTilOgMedDato = (dato: string): string => {
    const d = dayjs(dato).toDate();
    const newDate = dato ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12) : dato;
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(newDate).subtract(24, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(newDate).subtract(48, 'hours').format(ISO_DATE_FORMAT);
        default:
            return dato;
    }
};

/**
 * Trekker uttaksdager fra en dato og returnerer ny dato
 * @param dato
 * @param uttaksdager
 */
const trekkUttaksdagerFraDato = (dato: string, uttaksdager: number): string => {
    if (erUttaksdag(dato) === false) {
        throw new Error('trekkUttaksdagerFraDato: Dato må være uttaksdag');
    }
    let nyDato = dato;
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs
            .utc(dato)
            .add(--dagteller * 24, 'hours')
            .format(ISO_DATE_FORMAT);
        if (erUttaksdag(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return nyDato;
};

export const getFamiliehendelsedato = (barnet: OmBarnet) => {
    if (erBarnetAdoptert(barnet)) {
        return barnet.overtakelsesdato;
    }
    return erBarnetUFødt(barnet) ? barnet.termindato : barnet.fødselsdato;
};

const getFørsteUttaksdagForeldrepengerFørFødsel = (barnet: OmBarnet): string => {
    if (erBarnetAdoptert(barnet)) {
        throw new Error('Kan ikke være adoptert');
    }

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    if (
        erBarnetFødt(barnet) &&
        barnet.termindato &&
        dayjs(familiehendelsedato).isBefore(dayjs(treUkerSiden(barnet.termindato)))
    ) {
        return familiehendelsedato;
    }

    return trekkUttaksdagerFraDato(
        getUttaksdagFraOgMedDato(familiehendelsedato),
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};

export type Uttaksdata = {
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
};

const finnDeltUttaksdata = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
    barnet: OmBarnet,
    tempAantallDagerFellesperiodeSøker1: number = 0,
): Uttaksdata => {
    //TODO Fjern denne når ein får lagra number i context
    const antallDagerFellesperiodeSøker1 = parseInt(tempAantallDagerFellesperiodeSøker1.toString(), 10);

    const totaltAntallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeForSøker1 = getUkerOgDager(antallDagerFellesperiodeSøker1);
    const antallUkerOgDagerFellesperiodeForSøker2 = getUkerOgDager(
        totaltAntallDagerFellesperiode - antallDagerFellesperiodeSøker1,
    );

    const antallDagerForeldrepengerFørFødsel = getAntallDagerForeldrepengerFørFødsel(valgtStønadskonto);
    const antallDagerMødrekvote = getAntallDagerMødrekvote(valgtStønadskonto);
    const antallDagerFedrekvote = getAntallDagerFedrekvote(valgtStønadskonto);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const startdatoPeriode1 =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoPeriode1 =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? Uttaksdagen(dayjs(startdatoPeriode1).toDate()).leggTil(
                  antallDagerMødrekvote + antallUkerOgDagerFellesperiodeForSøker1.totaltAntallDager - 1,
              )
            : Uttaksdagen(dayjs(startdatoPeriode1).toDate()).leggTil(
                  antallDagerForeldrepengerFørFødsel +
                      antallDagerMødrekvote +
                      antallUkerOgDagerFellesperiodeForSøker1.totaltAntallDager -
                      1,
              );

    const startdatoPeriode2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoPeriode1).add(1, 'day').format(ISO_DATE_FORMAT));

    const sluttdatoPeriode2 = Uttaksdagen(dayjs(startdatoPeriode2).toDate()).leggTil(
        antallUkerOgDagerFellesperiodeForSøker2.totaltAntallDager + antallDagerFedrekvote - 1,
    );

    if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erBarnetAdoptert(barnet)) {
        return {
            familiehendelsedato,
            startdatoPeriode1,
            sluttdatoPeriode1: dayjs(sluttdatoPeriode2).format(ISO_DATE_FORMAT),
            startdatoPeriode2: undefined,
            sluttdatoPeriode2: undefined,
        };
    }

    return {
        familiehendelsedato,
        startdatoPeriode1,
        startdatoPeriode2,
        sluttdatoPeriode1: dayjs(sluttdatoPeriode1).format(ISO_DATE_FORMAT),
        sluttdatoPeriode2: dayjs(sluttdatoPeriode2).format(ISO_DATE_FORMAT),
    };
};

const finnEnsligUttaksdata = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
    barnet: OmBarnet,
    hvemHarRett: HvemHarRett,
): Uttaksdata => {
    const familiehendelsedato = getFamiliehendelsedato(barnet);

    if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR) {
        const aktivitetsfriDager = getAntallDagerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = Uttaksdagen(dayjs(familiehendelsedato).toDate()).leggTil(
            aktivitetsfriDager + (erBarnetAdoptert(barnet) ? 0 : 6 * 5 - 1),
        );

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato).add(1, 'day')
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: getUttaksdagTilOgMedDato(dayjs(sluttAktivitetsfri).format(ISO_DATE_FORMAT)),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: dayjs(
                Uttaksdagen(sluttAktivitetsfri).leggTil(aktivitetskravUkerOgDager.totaltAntallDager),
            ).format(ISO_DATE_FORMAT),
        };
    }

    if (hvemHarRett === 'kunSøker2HarRett' && (erFarSøker2(hvemPlanlegger) || erMedmorDelAvSøknaden(hvemPlanlegger))) {
        const aktivitetsfriDager = getAntallDagerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = Uttaksdagen(dayjs(familiehendelsedato).toDate()).leggTil(
            aktivitetsfriDager + (erBarnetAdoptert(barnet) ? 0 : 6 * 5 - 1),
        );

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato).add(1, 'day')
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: getUttaksdagTilOgMedDato(dayjs(sluttAktivitetsfri).format(ISO_DATE_FORMAT)),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: dayjs(
                Uttaksdagen(sluttAktivitetsfri).leggTil(aktivitetskravUkerOgDager.totaltAntallDager),
            ).format(ISO_DATE_FORMAT),
        };
    }

    const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
    const dagerAktivitetsfriKvote = getAntallDagerAktivitetsfriKvote(valgtStønadskonto);
    const antallDagerForeldrepengerFørFødsel = getAntallDagerForeldrepengerFørFødsel(valgtStønadskonto);

    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoSøker = Uttaksdagen(dayjs(startdatoSøker).toDate()).leggTil(
        aktivitetskravUkerOgDager.totaltAntallDager + dagerAktivitetsfriKvote + antallDagerForeldrepengerFørFødsel - 1,
    );

    return {
        familiehendelsedato,
        startdatoPeriode1: startdatoSøker,
        sluttdatoPeriode1: dayjs(sluttdatoSøker).format(ISO_DATE_FORMAT),
        startdatoPeriode2: undefined,
        sluttdatoPeriode2: undefined,
    };
};

export const finnUttaksdata = (
    hvemHarRett: HvemHarRett,
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
    barnet: OmBarnet,
    antallDagerFellesperiodeSøker1?: number,
): Uttaksdata => {
    return hvemHarRett === 'beggeHarRett' || (hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erBarnetAdoptert(barnet))
        ? finnDeltUttaksdata(hvemPlanlegger, valgtStønadskonto, barnet, antallDagerFellesperiodeSøker1)
        : finnEnsligUttaksdata(hvemPlanlegger, valgtStønadskonto, barnet, hvemHarRett);
};

export type UttakUkerOgDager = {
    uker: number;
    dager: number;
};

//Funksjon henta fra https://stackoverflow.com/questions/3464268/find-day-difference-between-two-dates-excluding-weekend-days
const calcBusinessDays = (dateFrom: Date, dateTo: Date) => {
    let dateDiff;
    if (dateTo < dateFrom) {
        return -1; // error code if dates transposed
    }
    const dateFromDayOrig = dateFrom.getDay(); // day of week
    const dateToDayOrig = dateTo.getDay();
    let dateFromDay = dateFromDayOrig == 0 ? 7 : dateFromDayOrig; // change Sunday from 0 to 7
    let dateToDay = dateToDayOrig == 0 ? 7 : dateToDayOrig;
    dateFromDay = dateFromDay > 5 ? 5 : dateFromDay; // only count weekdays
    dateToDay = dateToDay > 5 ? 5 : dateToDay;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    const weekDifference = Math.floor((dateTo.getTime() - dateFrom.getTime()) / 604800000);

    if (dateFromDay <= dateToDay) {
        dateDiff = weekDifference * 5 + (dateToDay - dateFromDay);
    } else {
        dateDiff = (weekDifference + 1) * 5 - (dateFromDay - dateToDay);
    }

    // fix: remove one day if it's saturday or sunday
    if (dateFromDayOrig >= 6 || dateFromDayOrig == 0) {
        dateDiff--;
    }

    return dateDiff + 1;
};

export const findDaysAndWeeksBetween = (startDate: string, endDate: string): UttakUkerOgDager => {
    const totalDays = calcBusinessDays(dayjs(startDate).toDate(), dayjs(endDate).toDate());
    const weeks = Math.floor(totalDays / 5);
    return { uker: weeks, dager: totalDays - weeks * 5 };
};

export const finnAntallUkerOgDagerMedForeldrepenger = (uttaksdata: Uttaksdata): UttakUkerOgDager => {
    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2 } = uttaksdata;
    const antallUkerOgDager = findDaysAndWeeksBetween(startdatoPeriode1, sluttdatoPeriode1);
    if (startdatoPeriode2 && sluttdatoPeriode2) {
        const ukerOgDagerPeriode2 = findDaysAndWeeksBetween(startdatoPeriode2, sluttdatoPeriode2);
        return {
            uker: antallUkerOgDager.uker + ukerOgDagerPeriode2.uker,
            dager: antallUkerOgDager.dager + ukerOgDagerPeriode2.dager,
        };
    }
    return antallUkerOgDager;
};
