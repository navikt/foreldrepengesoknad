import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { OmBarnet, erBarnetIkkeFødt } from 'types/Barnet';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { HvemHarRett } from './hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
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

export const getFørsteUttaksdagForeldrepengerFørFødsel = (familiehendelsesdato: string): string => {
    return trekkUttaksdagerFraDato(
        getUttaksdagFraOgMedDato(familiehendelsesdato),
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};

export const finnUttaksdata = (
    hvemHarRett: HvemHarRett,
    valgtStønadskonto: TilgjengeligStønadskonto[],
    barnet: OmBarnet,
    antallUkerFellesperiodeSøker1?: number,
) => {
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUkerFellesperiodeSøker2 = antallUkerFellesperiodeSøker1
        ? antallUkerFellesperiode - antallUkerFellesperiodeSøker1
        : undefined;

    const antallUkerMødrekvote = getAntallUkerMødrekvote(valgtStønadskonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(valgtStønadskonto);

    // TODO FIX fødselsdato og adopsjon
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : barnet.fødselsdato;

    // TODO FIX far skal ikkje ha før-fødsel
    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
    const antallUker = hvemHarRett === 'kunMorHarRett' ? antallUkerFellesperiode : antallUkerFellesperiodeSøker1;
    const sluttdatoSøker1 = antallUker
        ? dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').add(antallUker, 'weeks').format(ISO_DATE_FORMAT)
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').format(ISO_DATE_FORMAT);

    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1).add(1, 'day').format(ISO_DATE_FORMAT) : undefined;
    const sluttdatoSøker2 = antallUkerFellesperiodeSøker2
        ? dayjs(startdatoSøker2)
              .add(antallUkerFellesperiodeSøker2, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .format(ISO_DATE_FORMAT)
        : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks').format(ISO_DATE_FORMAT);

    const sluttdatoForeldrepenger = startdatoSøker1
        ? dayjs(startdatoSøker1)
              .add(antallUkerMødrekvote, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .add(antallUkerFellesperiode, 'weeks')
              .format(ISO_DATE_FORMAT)
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').format(ISO_DATE_FORMAT);

    return {
        startdatoSøker1,
        startdatoSøker2,
        sluttdatoSøker1,
        sluttdatoSøker2,
        sluttdatoForeldrepenger,
    };
};
