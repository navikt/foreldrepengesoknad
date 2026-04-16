import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

const ANTALL_DAGER_TO_UKER = 2 * 7;
const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

export const getFørsteUttaksdag2UkerFørFødsel = (
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato === undefined
            ? dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day')
            : dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato));
    return Uttaksdagen.denneEllerNeste(datoÅRegneFra.format(ISO_DATE_FORMAT)).getDato();
};

const getFørsteUttaksdagPåEllerEtterFødsel = (familiehendelsesdato: string) => {
    return Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato();
};

const getFørsteUttaksdagForeldrepengerFørFødsel = (familiehendelsesdato: string | undefined): string => {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return Uttaksdagen.denne(
        getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato),
    ).getDatoAntallUttaksdagerTidligere(ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5);
};

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
