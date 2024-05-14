import dayjs from 'dayjs';

import {
    Forelder,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    dateIsWithinRange,
    guid,
    isOppholdsperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';

export const erPeriodeSomSkalSendesInn = (periode: Periode): boolean => {
    return (
        isUttaksperiode(periode) ||
        isOverføringsperiode(periode) ||
        isUtsettelsesperiode(periode) ||
        isOppholdsperiode(periode)
    );
};

export const getPerioderSomSkalSendesInn = (
    nyPlan: Periode[],
    erEndringssøknad: boolean,
    erFarEllerMedmor: boolean,
    opprinneligPlan?: Periode[],
    endringstidspunkt?: Date,
): Periode[] => {
    if (opprinneligPlan) {
        return erEndringssøknad
            ? getEndretUttaksplanForInnsending(opprinneligPlan, nyPlan, endringstidspunkt, erFarEllerMedmor)
            : nyPlan.filter(erPeriodeSomSkalSendesInn);
    }
    return nyPlan;
};

export const finnEndringerIUttaksplan = (
    opprinneligPlan: Periode[],
    nyPlan: Periode[],
    endringstidspunkt: Date,
    erFarEllerMedmor: boolean,
): Periode[] => {
    const nyPlanForInnsending = nyPlan
        .filter(
            (p) =>
                dateIsWithinRange(endringstidspunkt, p.tidsperiode.fom, p.tidsperiode.tom) ||
                dayjs(p.tidsperiode.fom).isSameOrAfter(dayjs(endringstidspunkt), 'day'),
        )
        .filter(erPeriodeSomSkalSendesInn);

    if (
        nyPlanForInnsending.length === 0 &&
        (opprinneligPlan.length > nyPlan.length ||
            opprinneligPlan.filter(erPeriodeSomSkalSendesInn).length > nyPlan.filter(erPeriodeSomSkalSendesInn).length)
    ) {
        const førsteSlettedePeriode = opprinneligPlan.find((p) =>
            dayjs(p.tidsperiode.fom).isSame(endringstidspunkt, 'day'),
        );
        const utsettelseForSlettedePerioder = {
            id: guid(),
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: førsteSlettedePeriode!.tidsperiode.fom,
                tom: førsteSlettedePeriode!.tidsperiode.tom,
            },
            årsak: UtsettelseÅrsakType.Fri,
            forelder: erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor,
            erArbeidstaker: false,
        } as Utsettelsesperiode;
        return [utsettelseForSlettedePerioder];
    } else {
        return nyPlanForInnsending;
    }
};

const getEndretUttaksplanForInnsending = (
    opprinneligPlan: Periode[],
    nyPlan: Periode[],
    endringstidspunkt: Date | undefined,
    erSøkerFarEllerMedmor: boolean,
): Periode[] => {
    if (endringstidspunkt === undefined) {
        return [];
    }

    return finnEndringerIUttaksplan(opprinneligPlan, nyPlan, endringstidspunkt, erSøkerFarEllerMedmor);
};
