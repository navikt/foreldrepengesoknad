import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { treUkerSiden } from '@navikt/fp-utils';

import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from './barnetUtils';
import { HvemHarRett } from './hvemHarRettUtils';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
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
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).add(48, 'hours').format(ISO_DATE_FORMAT);
        case 7:
            return dayjs.utc(dato).add(24, 'hours').format(ISO_DATE_FORMAT);
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

const getFamiliehendelsedato = (barnet: OmBarnet) => {
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
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    antallUkerFellesperiodeForSøker1: number = 0,
): Uttaksdata => {
    const totaltAntallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUkerFellesperiodeForSøker2 = totaltAntallUkerFellesperiode - antallUkerFellesperiodeForSøker1;

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
                      .add(antallUkerFellesperiodeForSøker1, 'weeks')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              )
            : getUttaksdagTilOgMedDato(
                  dayjs(startdatoPeriode1)
                      .add(antallUkerForeldrepengerFørFødsel, 'weeks')
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerFellesperiodeForSøker1, 'weeks')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              );

    const startdatoPeriode2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoPeriode1).add(1, 'day').format(ISO_DATE_FORMAT));

    const sluttdatoPeriode2 = getUttaksdagTilOgMedDato(
        dayjs(startdatoPeriode2)
            .add(antallUkerFellesperiodeForSøker2, 'weeks')
            .add(antallUkerFedrekvote, 'weeks')
            .subtract(1, 'day')
            .format(ISO_DATE_FORMAT),
    );

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
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    hvemHarRett: HvemHarRett,
): Uttaksdata => {
    const familiehendelsedato = getFamiliehendelsedato(barnet);

    if (hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' || hvemHarRett === 'kunMedfarHarRett') {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUker = getAntallUkerForeldrepenger(valgtStønadskonto);
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
                dayjs(sluttAktivitetsfri).add(aktivitetskravUker, 'weeks').format(ISO_DATE_FORMAT),
            ),
        };
    }

    const ukerForeldrepenger = getAntallUkerForeldrepenger(valgtStønadskonto);
    const ukerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
    const antallUkerForeldrepengerFørFødsel = getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto);

    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoSøker = getUttaksdagTilOgMedDato(
        dayjs(startdatoSøker)
            .add(ukerForeldrepenger, 'weeks')
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
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    antallUkerFellesperiodeSøker1?: number,
): Uttaksdata => {
    return hvemHarRett === 'beggeHarRett'
        ? finnDeltUttaksdata(hvemPlanlegger, valgtStønadskonto, barnet, antallUkerFellesperiodeSøker1)
        : finnEnsligUttaksdata(hvemPlanlegger, valgtStønadskonto, barnet, hvemHarRett);
};

export const weeksBetween = (date1: string, date2: string): number => {
    const d1 = dayjs(date1).toDate();
    const d2 = dayjs(date2).toDate();

    const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in one week
    const diffInMilliseconds = Math.abs(d1.getTime() - d2.getTime());
    return Math.round(diffInMilliseconds / oneWeek);
};

export const finnAntallUkerMedForeldrepenger = (uttaksdata: Uttaksdata) => {
    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2 } = uttaksdata;
    let antallUker = weeksBetween(sluttdatoPeriode1, startdatoPeriode1);
    if (startdatoPeriode2 && sluttdatoPeriode2) {
        antallUker += weeksBetween(sluttdatoPeriode2, startdatoPeriode2);
    }
    return antallUker;
};
