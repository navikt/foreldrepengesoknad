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
import moment from 'moment';

interface SjekketArbeidsforhold {
    dekkerPerioden: boolean;
    erRelevant: boolean;
    fom: Date;
    tom?: Date;
    arbeidsgiverNavn: string;
}

const sjekkArbeidsforhold = (periode: Utsettelsesperiode | Uttaksperiode) => (
    arbforhold: Arbeidsforhold
): SjekketArbeidsforhold => {
    const { fom, tom } = arbforhold;

    const result = {
        dekkerPerioden: false,
        erRelevant: false,
        tom: arbforhold.tom,
        fom: arbforhold.fom,
        arbeidsgiverNavn: arbforhold.arbeidsgiverNavn
    };

    if (tom === undefined) {
        const arbeidsforholdStarterFørPeriode = moment(fom).isSameOrBefore(moment(periode.tidsperiode.fom));
        const arbeidsforholdStarterIPeriode = dateIsBetween(fom, periode.tidsperiode.fom, periode.tidsperiode.tom);

        if (arbeidsforholdStarterFørPeriode) {
            result.dekkerPerioden = true;
            result.erRelevant = true;

            return result;
        }

        if (arbeidsforholdStarterIPeriode) {
            result.dekkerPerioden = false;
            result.erRelevant = true;

            return result;
        }

        return result;
    }

    const periodenStarterInnenforArbeidsforhold = dateIsBetween(periode.tidsperiode.fom, fom, tom);
    const periodenSlutterInnenforArbeidsforhold = dateIsBetween(periode.tidsperiode.tom, fom, tom);

    if (periodenStarterInnenforArbeidsforhold && periodenSlutterInnenforArbeidsforhold) {
        result.dekkerPerioden = true;
        result.erRelevant = true;
    }

    if (periodenStarterInnenforArbeidsforhold && !periodenSlutterInnenforArbeidsforhold) {
        result.erRelevant = true;
    }

    if (!periodenStarterInnenforArbeidsforhold && periodenSlutterInnenforArbeidsforhold) {
        result.erRelevant = true;
    }

    return result;
};

const finnPeriodeUtenArbeidsforhold = (
    perioder: Array<Utsettelsesperiode | Uttaksperiode>,
    arbeidsforhold: Arbeidsforhold[]
) => {
    return perioder.reduce(
        (result, periode) => {
            const filtrerteArbeidsforhold = arbeidsforhold.filter(
                (arb) => periode.orgnumre && periode.orgnumre.some((orgnr) => orgnr === arb.arbeidsgiverId)
            );

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
                const alleArbeidsforholdForArbeidsgiver: SjekketArbeidsforhold[] = arbeidsforholdGruppertByArbeidsgiver[
                    orgnr
                ].map(sjekkArbeidsforhold(periode));
                const harFeil = !alleArbeidsforholdForArbeidsgiver.some((a) => a.dekkerPerioden);

                if (harFeil) {
                    const relevanteArbeidsforhold = alleArbeidsforholdForArbeidsgiver.filter((a) => a.erRelevant);

                    relevanteArbeidsforhold.forEach((arb: SjekketArbeidsforhold) => {
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
                }
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
