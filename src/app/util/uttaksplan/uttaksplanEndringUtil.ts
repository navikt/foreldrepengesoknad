import { Periode } from 'app/types/uttaksplan/periodetyper';
import { Perioden } from './Perioden';
import moment from 'moment';
import DateValues from '../validation/values';

export const finnesPeriodeIOpprinneligPlan = (periode: Periode, opprinneligPlan: Periode[]): boolean =>
    opprinneligPlan.some((op) => Perioden(periode).erLik(op, true, true));

export const finnEndringerIUttaksplan = (opprinneligPlan: Periode[], nyPlan: Periode[]): Periode[] => {
    const idxFørsteEndredePeriode = nyPlan.findIndex(
        (periode) => finnesPeriodeIOpprinneligPlan(periode, opprinneligPlan) === false
    );
    if (idxFørsteEndredePeriode >= 0) {
        return nyPlan.slice(idxFørsteEndredePeriode);
    }
    /**
     * Dersom perioder er slettet, returneres siste periode i ny plan,
     * hvor fom er max(fom, dagensDato)
     */
    if (opprinneligPlan.length > nyPlan.length && nyPlan.length > 0) {
        const periode = nyPlan[nyPlan.length - 1];
        const { fom, tom } = periode.tidsperiode;
        return [
            {
                ...periode,
                tidsperiode: {
                    fom: getDagensDatoEllerFom(fom),
                    tom
                }
            }
        ];
    }
    return [];
};

const getDagensDatoEllerFom = (fom: Date): Date => {
    return moment.max(moment(fom), DateValues.today).toDate();
};

const getLikePerioder = (periode: Periode, opprinneligPlan: Periode[]): Periode[] => {
    return opprinneligPlan.filter((p) => Perioden(p).erLik(periode));
};

const justerKunEndretSisteperiode = (periode: Periode, opprinneligPeriode: Periode): Periode => {
    const kunTidsperiodeErEndret = Perioden(periode).erLik(opprinneligPeriode);
    if (kunTidsperiodeErEndret) {
        const endretTom: Date = periode.tidsperiode.tom;
        const opprinneligTom: Date = opprinneligPeriode.tidsperiode.tom;
        if (moment(endretTom).isAfter(opprinneligTom)) {
            return {
                ...periode,
                tidsperiode: {
                    fom: opprinneligPeriode.tidsperiode.tom,
                    tom: periode.tidsperiode.tom
                }
            };
        } else {
            return {
                ...periode,
                tidsperiode: {
                    fom: getDagensDatoEllerFom(opprinneligPeriode.tidsperiode.fom),
                    tom: periode.tidsperiode.tom
                }
            };
        }
    }
    return periode;
};

export const getEndretUttaksplanForInnsending = (
    opprinneligPlan: Periode[],
    nyPlan: Periode[]
): Periode[] | undefined => {
    const endringer = finnEndringerIUttaksplan(opprinneligPlan, nyPlan);
    if (endringer && endringer.length > 0) {
        if (endringer.length === 1) {
            const endretPeriode = endringer[0];
            const perioder = getLikePerioder(endretPeriode, opprinneligPlan);
            const opprinneligPeriode = perioder.length === 1 ? perioder[0] : undefined;
            if (opprinneligPeriode) {
                return [justerKunEndretSisteperiode(endretPeriode, opprinneligPeriode)];
            }
        } else if (endringer.length > 1) {
            const førsteEndredePeriode = endringer[0];
            const perioder = getLikePerioder(førsteEndredePeriode, opprinneligPlan);
            const opprinneligPeriode = perioder.length === 1 ? perioder[0] : undefined;
            if (opprinneligPeriode) {
                const { fom, tom } = førsteEndredePeriode.tidsperiode;
                const endretPeriode: Periode = {
                    ...førsteEndredePeriode,
                    tidsperiode: {
                        fom: getDagensDatoEllerFom(fom),
                        tom
                    }
                };
                return [endretPeriode, ...endringer.slice(1)];
            }
        }
        return endringer;
    }
    return undefined;
};
