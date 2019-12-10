import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';
import { isUtsettelsesperiode, Utsettelsesperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import { dateIsBetween } from 'app/util/dates/dates';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const erArbeidsforholdDekket = (utsettelsePeriode: Utsettelsesperiode) => (
    utsettelseIkkeDekket: boolean,
    arbforhold: Arbeidsforhold
): boolean => {
    if (utsettelseIkkeDekket) {
        return true;
    }

    if (
        dateIsBetween(utsettelsePeriode.tidsperiode.fom, arbforhold.fom, arbforhold.tom) &&
        dateIsBetween(utsettelsePeriode.tidsperiode.tom, arbforhold.fom, arbforhold.tom)
    ) {
        return true;
    }

    return false;
};

export function inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold(
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat {
    const { arbeidsforhold, perioder } = grunnlag;
    const arbeidsUtsettelser = perioder.filter(
        (p) => isUtsettelsesperiode(p) && p.årsak === UtsettelseÅrsakType.Arbeid
    ) as Utsettelsesperiode[];
    const arbeidsUtsettelserUtenArbeidsforhold = arbeidsUtsettelser.filter((utsettelse) => {
        return arbeidsforhold.reduce(erArbeidsforholdDekket(utsettelse), false) === false;
    });

    return {
        passerer: arbeidsUtsettelserUtenArbeidsforhold.length === 0
    };
}
