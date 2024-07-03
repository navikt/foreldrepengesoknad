import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { treUkerSiden } from '@navikt/fp-utils';

import { erFarSøker2, erMedmorDelAvSøknaden } from './HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from './barnetUtils';
import { HvemHarRett } from './hvemHarRettUtils';
import {
    UkerOgDager,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
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
    antallDagerFellesperiodeSøker1: number = 0,
): Uttaksdata => {
    const totaltAntallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeForSøker1 = getUkerOgDager(antallDagerFellesperiodeSøker1);
    const antallUkerOgDagerFellesperiodeForSøker2 = getUkerOgDager(
        totaltAntallDagerFellesperiode - antallDagerFellesperiodeSøker1,
    );

    const antallUkerForeldrepengerFørFødsel = getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto);
    const antallUkerMødrekvote = getAntallUkerMødrekvote(valgtStønadskonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(valgtStønadskonto);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const startdatoPeriode1 =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoPeriode1 =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagTilOgMedDato(
                  dayjs(startdatoPeriode1)
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerOgDagerFellesperiodeForSøker1.uker, 'weeks')
                      .add(antallUkerOgDagerFellesperiodeForSøker1.dager, 'days')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              )
            : getUttaksdagTilOgMedDato(
                  dayjs(startdatoPeriode1)
                      .add(antallUkerForeldrepengerFørFødsel, 'weeks')
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerOgDagerFellesperiodeForSøker1.uker, 'weeks')
                      .add(antallUkerOgDagerFellesperiodeForSøker1.dager, 'days')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              );

    const startdatoPeriode2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoPeriode1).add(1, 'day').format(ISO_DATE_FORMAT));

    const sluttdatoPeriode2 = getUttaksdagTilOgMedDato(
        dayjs(startdatoPeriode2)
            .add(antallUkerOgDagerFellesperiodeForSøker2.uker, 'weeks')
            .add(antallUkerOgDagerFellesperiodeForSøker2.dager, 'days')
            .add(antallUkerFedrekvote, 'weeks')
            .subtract(1, 'day')
            .format(ISO_DATE_FORMAT),
    );

    if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR && !erBarnetAdoptert(barnet)) {
        return {
            familiehendelsedato,
            startdatoPeriode1: startdatoPeriode1,
            sluttdatoPeriode1: sluttdatoPeriode2,
            startdatoPeriode2: undefined,
            sluttdatoPeriode2: undefined,
        };
    }

    return {
        familiehendelsedato,
        startdatoPeriode1,
        startdatoPeriode2,
        sluttdatoPeriode1,
        sluttdatoPeriode2,
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
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = dayjs(familiehendelsedato)
            .add(aktivitetsfriUker, 'weeks')
            .add(erBarnetAdoptert(barnet) ? 0 : 6, 'weeks')
            .subtract(1, 'day');

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato).add(1, 'day')
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: getUttaksdagTilOgMedDato(sluttAktivitetsfri.format(ISO_DATE_FORMAT)),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: getUttaksdagTilOgMedDato(
                dayjs(sluttAktivitetsfri)
                    .add(aktivitetskravUkerOgDager.uker, 'weeks')
                    .add(aktivitetskravUkerOgDager.dager, 'days')
                    .format(ISO_DATE_FORMAT),
            ),
        };
    }

    if (hvemHarRett === 'kunSøker2HarRett' && (erFarSøker2(hvemPlanlegger) || erMedmorDelAvSøknaden(hvemPlanlegger))) {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = dayjs(familiehendelsedato)
            .add(aktivitetsfriUker, 'weeks')
            .add(erBarnetAdoptert(barnet) ? 0 : 6, 'weeks')
            .subtract(1, 'day');

        const startdatoSøker1 = erBarnetAdoptert(barnet)
            ? dayjs(familiehendelsedato).add(1, 'day')
            : dayjs(familiehendelsedato).add(6, 'weeks');

        return {
            familiehendelsedato,
            startdatoPeriode1: getUttaksdagFraOgMedDato(startdatoSøker1.format(ISO_DATE_FORMAT)),
            sluttdatoPeriode1: getUttaksdagTilOgMedDato(sluttAktivitetsfri.format(ISO_DATE_FORMAT)),
            startdatoPeriode2: getUttaksdagFraOgMedDato(
                dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT),
            ),
            sluttdatoPeriode2: getUttaksdagTilOgMedDato(
                dayjs(sluttAktivitetsfri)
                    .add(aktivitetskravUkerOgDager.uker, 'weeks')
                    .add(aktivitetskravUkerOgDager.dager, 'days')
                    .format(ISO_DATE_FORMAT),
            ),
        };
    }

    const aktivitetskravUkerOgDager = getAntallUkerOgDagerForeldrepenger(valgtStønadskonto);
    const ukerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
    const antallUkerForeldrepengerFørFødsel = getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto);

    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoSøker = getUttaksdagTilOgMedDato(
        dayjs(startdatoSøker)
            .add(aktivitetskravUkerOgDager.uker, 'weeks')
            .add(aktivitetskravUkerOgDager.dager, 'days')
            .add(ukerAktivitetsfriKvote, 'weeks')
            .add(antallUkerForeldrepengerFørFødsel, 'weeks')
            .subtract(1, 'day')
            .format(ISO_DATE_FORMAT),
    );

    return {
        familiehendelsedato,
        startdatoPeriode1: startdatoSøker,
        sluttdatoPeriode1: sluttdatoSøker,
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

export const weeksAndDaysBetween = (date1: string, date2: string): UttakUkerOgDager => {
    const d1 = dayjs(date1).toDate();
    const d2 = dayjs(date2).toDate();

    const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in one week
    const diffInMilliseconds = Math.abs(d1.getTime() - d2.getTime());
    const weeks = diffInMilliseconds / oneWeek;
    return { uker: Math.floor(weeks), dager: weeks };
};

const findDaysAndWeeksBetween = (eDate: string, sDate: string): UttakUkerOgDager => {
    const startDate = dayjs(sDate);
    const endDate = dayjs(eDate);

    // const oneDay = 1000 * 60 * 60 * 24;

    // const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    // const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    const daysDifference = startDate.diff(endDate, 'days');

    // const numberOfDays = Math.abs((start - end) / oneDay);
    const weeks = Math.floor(daysDifference / 7);

    return { uker: weeks, dager: daysDifference - weeks * 7 };
};

export const finnAntallUkerMedForeldrepenger = (uttaksdata: Uttaksdata): UttakUkerOgDager => {
    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2 } = uttaksdata;
    const antallUkerOgDager = findDaysAndWeeksBetween(sluttdatoPeriode1, startdatoPeriode1);
    if (startdatoPeriode2 && sluttdatoPeriode2) {
        const ukerOgDagerPeriode2 = findDaysAndWeeksBetween(sluttdatoPeriode2, startdatoPeriode2);
        return {
            uker: antallUkerOgDager.uker + ukerOgDagerPeriode2.uker,
            dager: antallUkerOgDager.dager + ukerOgDagerPeriode2.dager,
        };
    }
    return antallUkerOgDager;
};
