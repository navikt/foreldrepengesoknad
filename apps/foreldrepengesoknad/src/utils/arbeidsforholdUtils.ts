import dayjs from 'dayjs';

import { Arbeidsforhold } from '@navikt/fp-types';
import { getFørsteUttaksdag2UkerFørFødsel, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-uttaksplan';

const getFraDatoForAktiveArbeidsforhold = (
    erAdopsjon: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date | undefined,
): Date | undefined => {
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
    arbeidsforhold: Arbeidsforhold[],
    erAdopsjon: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato?: Date,
): Arbeidsforhold[] => {
    const fraDato = getFraDatoForAktiveArbeidsforhold(erAdopsjon, erFarEllerMedmor, familiehendelsesdato);
    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (fraDato !== undefined && dayjs(fraDato).isSameOrBefore(dayjs.utc(a.tom), 'days')),
    );
};
