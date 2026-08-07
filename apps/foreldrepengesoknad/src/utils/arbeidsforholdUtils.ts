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
    // Far/medmor skal kunne starte to uker før termin eller to uker før fødsel, avhengig av hva som gir
    // tidligste dato. Uten dette blir tidligste dato feil dersom barnet er født mer enn to uker før termin,
    // fordi fødselsdatoen da er tidligere enn termindato minus to uker, og vi må derfor regne to uker tilbake fra fødsel.
    const familiehendelsesdatoMinusToUker = dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const termindatoMinusToUker = termindato ? dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day') : undefined;
    const datoÅRegneFra =
        termindatoMinusToUker === undefined
            ? familiehendelsesdatoMinusToUker
            : dayjs.min(termindatoMinusToUker, familiehendelsesdatoMinusToUker);
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
