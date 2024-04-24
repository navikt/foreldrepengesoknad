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
    startdatoSøker1: string;
    sluttdatoSøker1: string;
    startdatoSøker2?: string;
    sluttdatoSøker2?: string;
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

    const startdatoSøker1 =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const sluttdatoSøker1 =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagTilOgMedDato(
                  dayjs(startdatoSøker1)
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerFellesperiodeForSøker1, 'weeks')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              )
            : getUttaksdagTilOgMedDato(
                  dayjs(startdatoSøker1)
                      .add(antallUkerForeldrepengerFørFødsel, 'weeks')
                      .add(antallUkerMødrekvote, 'weeks')
                      .add(antallUkerFellesperiodeForSøker1, 'weeks')
                      .subtract(1, 'day')
                      .format(ISO_DATE_FORMAT),
              );

    const startdatoSøker2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoSøker1).add(1, 'day').format(ISO_DATE_FORMAT));

    const sluttdatoSøker2 = getUttaksdagTilOgMedDato(
        dayjs(startdatoSøker2)
            .add(antallUkerFellesperiodeForSøker2, 'weeks')
            .add(antallUkerFedrekvote, 'weeks')
            .subtract(1, 'day')
            .format(ISO_DATE_FORMAT),
    );

    return {
        familiehendelsedato,
        startdatoSøker1,
        startdatoSøker2,
        sluttdatoSøker1,
        sluttdatoSøker2,
    };
};

const finnEnsligUttaksdata = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    hvemHarRett: HvemHarRett,
): Uttaksdata => {
    const familiehendelsedato = getFamiliehendelsedato(barnet);
    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    if (!erBarnetAdoptert(barnet) && hvemHarRett === 'kunFarEllerFar2EllerMedmorHarRett') {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = getUttaksdagTilOgMedDato(
            dayjs(familiehendelsedato)
                .add(aktivitetsfriUker, 'weeks')
                .add(6, 'weeks')
                .subtract(1, 'day')
                .format(ISO_DATE_FORMAT),
        );
        return {
            familiehendelsedato,
            startdatoSøker1: getUttaksdagFraOgMedDato(
                dayjs(familiehendelsedato).add(6, 'weeks').format(ISO_DATE_FORMAT),
            ),
            sluttdatoSøker1: sluttAktivitetsfri,
            startdatoSøker2: getUttaksdagFraOgMedDato(dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT)),
            sluttdatoSøker2: getUttaksdagTilOgMedDato(
                dayjs(sluttAktivitetsfri).add(aktivitetskravUker, 'weeks').format(ISO_DATE_FORMAT),
            ),
        };
    }
    if (erBarnetAdoptert(barnet) && hvemHarRett === 'kunFarEllerFar2EllerMedmorHarRett') {
        const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
        const aktivitetskravUker = getAntallUkerForeldrepenger(valgtStønadskonto);
        const sluttAktivitetsfri = getUttaksdagTilOgMedDato(
            dayjs(familiehendelsedato).add(aktivitetsfriUker, 'weeks').subtract(1, 'day').format(ISO_DATE_FORMAT),
        );
        return {
            familiehendelsedato,
            startdatoSøker1: getUttaksdagFraOgMedDato(dayjs(familiehendelsedato).add(1, 'day').format(ISO_DATE_FORMAT)),
            sluttdatoSøker1: sluttAktivitetsfri,
            startdatoSøker2: getUttaksdagFraOgMedDato(dayjs(sluttAktivitetsfri).add(1, 'day').format(ISO_DATE_FORMAT)),
            sluttdatoSøker2: getUttaksdagTilOgMedDato(
                dayjs(sluttAktivitetsfri).add(aktivitetskravUker, 'weeks').format(ISO_DATE_FORMAT),
            ),
        };
    }

    const ukerForeldrepenger = getAntallUkerForeldrepenger(valgtStønadskonto);
    const ukerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
    const antallUkerForeldrepengerFørFødsel = getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto);

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
        startdatoSøker1: startdatoSøker,
        sluttdatoSøker1: sluttdatoSøker,
        startdatoSøker2: undefined,
        sluttdatoSøker2: undefined,
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
    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2 } = uttaksdata;
    let antallUker = weeksBetween(sluttdatoSøker1, startdatoSøker1);
    if (startdatoSøker2 && sluttdatoSøker2) {
        antallUker += weeksBetween(sluttdatoSøker2, startdatoSøker2);
    }
    return antallUker;
};
