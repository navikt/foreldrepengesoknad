import {
    Periode,
    isUttaksperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isOppholdsperiode,
} from 'app/types/uttaksplan/periodetyper';
import { Perioden } from './Perioden';
import moment from 'moment';
import { erDatoITidsperiode } from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/UtenlandsoppholdOppsummering';

export const erPeriodeSomSkalSendesInn = (periode: Periode): boolean => {
    return (
        isUttaksperiode(periode) ||
        isOverføringsperiode(periode) ||
        isUtsettelsesperiode(periode) ||
        isOppholdsperiode(periode)
    );
};

export const finnesPeriodeIOpprinneligPlan = (periode: Periode, opprinneligPlan: Periode[]): boolean => {
    const finnes = opprinneligPlan.some((op) => Perioden(periode).erLik(op, true, true));
    return finnes;
};

export const finnEndringerIUttaksplan = (nyPlan: Periode[], endringstidspunkt: Date): Periode[] => {
    return nyPlan.filter(
        (p) =>
            erDatoITidsperiode(endringstidspunkt, p.tidsperiode) ||
            moment(p.tidsperiode.fom).isSameOrAfter(moment(endringstidspunkt))
    );
};

export const getEndretUttaksplanForInnsending = (nyPlan: Periode[], endringstidspunkt: Date | undefined): Periode[] => {
    if (endringstidspunkt === undefined) {
        return [];
    }

    return finnEndringerIUttaksplan(nyPlan, endringstidspunkt).filter(erPeriodeSomSkalSendesInn);
};
