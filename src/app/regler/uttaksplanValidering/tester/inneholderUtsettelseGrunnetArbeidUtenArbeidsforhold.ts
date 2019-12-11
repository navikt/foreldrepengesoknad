import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';
import {
    isUtsettelsesperiode,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    isUttaksperiode
} from 'app/types/uttaksplan/periodetyper';
import { dateIsBetween, formatDate } from 'app/util/dates/dates';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const erArbeidsforholdRelevant = (utsettelsePeriode: Utsettelsesperiode | Uttaksperiode) => (
    arbforhold: Arbeidsforhold
): boolean => {
    if (
        dateIsBetween(arbforhold.fom, utsettelsePeriode.tidsperiode.fom, utsettelsePeriode.tidsperiode.tom) &&
        arbforhold.tom === undefined
    ) {
        return true;
    }

    if (arbforhold.tom) {
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
    }

    return false;
};

const finnPeriodeUtenArbeidsforhold = (
    perioder: Array<Utsettelsesperiode | Uttaksperiode>,
    arbeidsforhold: Arbeidsforhold[]
) => {
    return perioder.reduce(
        (result, periode) => {
            const filtrerteArbeidsforhold = arbeidsforhold
                .filter((arb) => periode.orgnumre && periode.orgnumre.some((orgnr) => orgnr === arb.arbeidsgiverId))
                .filter(erArbeidsforholdRelevant(periode));

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
                    if (arb.fom && arb.tom) {
                        result.push({
                            intlKey:
                                'uttaksplan.validering.feil.inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold.medTom',
                            periodeId: periode.id,
                            values: {
                                fom: formatDate(arb.fom),
                                tom: formatDate(arb.tom),
                                navn: arb.arbeidsgiverNavn
                            }
                        });
                    } else {
                        result.push({
                            intlKey:
                                'uttaksplan.validering.feil.inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold.utenTom',
                            periodeId: periode.id,
                            values: {
                                fom: formatDate(arb.fom),
                                navn: arb.arbeidsgiverNavn
                            }
                        });
                    }
                });
            });

            return result;
        },
        [] as RegelTestresultatInfo[]
    );
};

export function inneholderUtsettelseGrunnetArbeidUtenArbeidsforhold(
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat {
    const { arbeidsforhold, perioder } = grunnlag;
    const arbeidsUtsettelser = perioder.filter(
        (p) => isUtsettelsesperiode(p) && p.årsak === UtsettelseÅrsakType.Arbeid
    ) as Utsettelsesperiode[];
    const gradertePerioder = perioder.filter((p) => isUttaksperiode(p) && p.gradert) as Uttaksperiode[];

    const arbeidsUtsettelserUtenArbeidsforhold = finnPeriodeUtenArbeidsforhold(arbeidsUtsettelser, arbeidsforhold);
    const gradertePerioderUtenArbeidsforhold = finnPeriodeUtenArbeidsforhold(gradertePerioder, arbeidsforhold);
    const allePerioder = [...gradertePerioderUtenArbeidsforhold, ...arbeidsUtsettelserUtenArbeidsforhold];

    return {
        passerer: allePerioder.length === 0,
        info: allePerioder.map((info) => info)
    };
}
