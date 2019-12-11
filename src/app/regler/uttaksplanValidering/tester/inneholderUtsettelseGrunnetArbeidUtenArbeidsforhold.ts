import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';
import { isUtsettelsesperiode, Utsettelsesperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import { dateIsBetween, formatDate } from 'app/util/dates/dates';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const erArbeidsforholdRelevant = (utsettelsePeriode: Utsettelsesperiode) => (arbforhold: Arbeidsforhold): boolean => {
    if (
        (dateIsBetween(utsettelsePeriode.tidsperiode.fom, arbforhold.fom, arbforhold.tom) ||
            dateIsBetween(utsettelsePeriode.tidsperiode.tom, arbforhold.fom, arbforhold.tom)) &&
        !(
            dateIsBetween(utsettelsePeriode.tidsperiode.fom, arbforhold.fom, arbforhold.tom) &&
            dateIsBetween(utsettelsePeriode.tidsperiode.tom, arbforhold.fom, arbforhold.tom)
        )
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

    const arbeidsUtsettelserUtenArbeidsforhold = arbeidsUtsettelser.reduce(
        (result, utsettelse) => {
            const filtrerteArbeidsforhold = arbeidsforhold
                .filter(
                    (arb) => utsettelse.orgnumre && utsettelse.orgnumre.some((orgnr) => orgnr === arb.arbeidsgiverId)
                )
                .filter(erArbeidsforholdRelevant(utsettelse));

            if (filtrerteArbeidsforhold.length === 0) {
                return result;
            }

            const arbeidsforholdGruppertByArbeidsgiver = {};
            filtrerteArbeidsforhold.forEach((arb: Arbeidsforhold) => {
                if (arbeidsforholdGruppertByArbeidsgiver[arb.arbeidsgiverId]) {
                    arbeidsforholdGruppertByArbeidsgiver[arb.arbeidsgiverId].push(arb);
                } else {
                    arbeidsforholdGruppertByArbeidsgiver[arb.arbeidsgiverId] = [arb];
                }
            });

            Object.keys(arbeidsforholdGruppertByArbeidsgiver).forEach((orgnr: string) => {
                arbeidsforholdGruppertByArbeidsgiver[orgnr].forEach((arb: Arbeidsforhold) => {
                    result.push({
                        intlKey: 'uttaksplan.validering.feil.inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold',
                        periodeId: utsettelse.id,
                        values: {
                            fom: formatDate(arb.fom),
                            tom: formatDate(arb.tom),
                            navn: arb.arbeidsgiverNavn
                        }
                    });
                });
            });

            return result;
        },
        [] as RegelTestresultatInfo[]
    );

    return {
        passerer: arbeidsUtsettelserUtenArbeidsforhold.length === 0,
        info: arbeidsUtsettelserUtenArbeidsforhold.map((info) => info)
    };
}
