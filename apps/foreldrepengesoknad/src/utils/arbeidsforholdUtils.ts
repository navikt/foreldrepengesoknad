import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Arbeidsforhold } from '@navikt/fp-types';
import { dateToISOString, formatDate } from '@navikt/fp-utils';

/*
    TODO Dette er duplikatlogikk frå uttaksplan-ny. Fjern når ein kan bruka den pakka. Får per no masse intl-feil
    Duplikatkode-start
*/
const ANTALL_DAGER_TO_UKER = 2 * 7;
const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

const isoStringFormat = 'YYYY-MM-DD';

function getUkedag(dato: Date | string): number {
    return dayjs(dato).isoWeekday();
}

function getUttaksdagFraOgMedDato(dato: string): string {
    switch (getUkedag(dato)) {
        case 6:
            return dayjs.utc(dato).add(48, 'hours').startOf('day').format(isoStringFormat);
        case 7:
            return dayjs.utc(dato).add(24, 'hours').startOf('day').format(isoStringFormat);
        default:
            return dato;
    }
}

function erUttaksdagString(dato: Date | string): boolean {
    return getUkedag(dato) !== 6 && getUkedag(dato) !== 7;
}

function trekkUttaksdagerFraDato(dato: string, uttaksdager: number): string {
    if (erUttaksdagString(dato) === false) {
        throw new Error(`trekkUttaksdagerFraDato: Dato ${formatDate(dato)} må være uttaksdag`);
    }
    let nyDato = new Date(dato);
    let dagteller = 0;
    let uttaksdageteller = 0;
    while (uttaksdageteller < Math.abs(uttaksdager)) {
        const tellerdato = dayjs(dato)
            .add(--dagteller * 24, 'hours')
            .toDate();
        if (erUttaksdagString(tellerdato)) {
            nyDato = tellerdato;
            uttaksdageteller++;
        }
    }
    return dateToISOString(nyDato);
}

const UttaksdagenString = (dato: string) => ({
    denneEllerNeste: (): string => getUttaksdagFraOgMedDato(dato),
    trekkFra: (uttaksdager: number): string => trekkUttaksdagerFraDato(dato, uttaksdager),
});

const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: string, termindato: string | undefined): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day')
            : dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato))!;
    return UttaksdagenString(datoÅRegneFra.format(ISO_DATE_FORMAT)).denneEllerNeste();
};

const getFørsteUttaksdagPåEllerEtterFødsel = (familiehendelsesdato: string) => {
    return UttaksdagenString(familiehendelsesdato).denneEllerNeste();
};

const getFørsteUttaksdagForeldrepengerFørFødsel = (familiehendelsesdato: string | undefined): string => {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return UttaksdagenString(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};
/*
  Duplikatkode-slutt
*/

const getFraDatoForAktiveArbeidsforhold = (
    erAdopsjon: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: string | undefined,
): string | undefined => {
    if (familiehendelsesdato === undefined) {
        return undefined;
    }
    if (erAdopsjon) {
        return familiehendelsesdato;
    }
    if (erFarEllerMedmor) {
        return getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, undefined);
    }
    return getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
};

export const getAktiveArbeidsforhold = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    erAdopsjon: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato?: string,
): EksternArbeidsforholdDto_fpoversikt[] => {
    const fraDato = getFraDatoForAktiveArbeidsforhold(erAdopsjon, erFarEllerMedmor, familiehendelsesdato);
    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (fraDato !== undefined && dayjs(fraDato).isSameOrBefore(dayjs.utc(a.tom), 'days')),
    );
};
