import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { treUkerSiden } from '@navikt/fp-utils';

import { HvemHarRett } from './hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
} from './stønadskontoer';

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
    return erBarnetIkkeFødt(barnet) ? barnet.termindato : barnet.fødselsdato;
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

const finnUttaksdataDeltUttak = (
    hvemHarRett: HvemHarRett,
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    antallUkerFellesperiodeForSøker1: number = 0,
) => {
    const totaltAntallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUkerFellesperiodeForSøker2 = totaltAntallUkerFellesperiode - antallUkerFellesperiodeForSøker1;

    const antallUkerMødrekvote = getAntallUkerMødrekvote(valgtStønadskonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(valgtStønadskonto);

    const familiehendelsedato = getFamiliehendelsedato(barnet);

    const startdatoSøker1 =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR_OG_FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const antallUker =
        hvemHarRett === 'kunMorHarRett' ? totaltAntallUkerFellesperiode : antallUkerFellesperiodeForSøker1;
    const sluttdatoSøker1 = antallUker
        ? getUttaksdagFraOgMedDato(
              dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUker, 'weeks')
                  .format(ISO_DATE_FORMAT),
          )
        : getUttaksdagFraOgMedDato(dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').format(ISO_DATE_FORMAT));

    const startdatoSøker2 = getUttaksdagFraOgMedDato(dayjs(sluttdatoSøker1).add(1, 'day').format(ISO_DATE_FORMAT));
    const sluttdatoSøker2 = antallUkerFellesperiodeForSøker2
        ? getUttaksdagFraOgMedDato(
              dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeForSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
                  .format(ISO_DATE_FORMAT),
          )
        : getUttaksdagFraOgMedDato(dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks').format(ISO_DATE_FORMAT));

    return {
        familiehendelsedato,
        startdatoSøker1,
        startdatoSøker2,
        sluttdatoSøker1,
        sluttdatoSøker2,
    };
};

const finnUttaksdataIkkeDeltUttak = (
    hvemPlanlegger: HvemPlanlegger,
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
) => {
    const familiehendelsedato = getFamiliehendelsedato(barnet);
    const startdatoSøker =
        erBarnetAdoptert(barnet) || hvemPlanlegger.type === Situasjon.FAR
            ? getUttaksdagFraOgMedDato(familiehendelsedato)
            : getFørsteUttaksdagForeldrepengerFørFødsel(barnet);

    const ukerForeldrepenger = getAntallUkerForeldrepenger(valgtStønadskonto);
    const ukerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);

    const sluttdatoSøker = getUttaksdagFraOgMedDato(
        hvemPlanlegger.type === Situasjon.FAR
            ? dayjs(startdatoSøker)
                  .add(ukerForeldrepenger, 'weeks')
                  .add(ukerAktivitetsfriKvote, 'weeks')
                  .format(ISO_DATE_FORMAT)
            : dayjs(startdatoSøker).add(ukerForeldrepenger, 'weeks').format(ISO_DATE_FORMAT),
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
) => {
    return hvemHarRett === 'beggeHarRett'
        ? finnUttaksdataDeltUttak(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallUkerFellesperiodeSøker1)
        : finnUttaksdataIkkeDeltUttak(hvemPlanlegger, valgtStønadskonto, barnet);
};
