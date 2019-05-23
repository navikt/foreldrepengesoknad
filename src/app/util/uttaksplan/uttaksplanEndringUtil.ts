import { Periode, isInfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { Perioden } from './Perioden';
import moment from 'moment';
import DateValues from '../validation/values';
import { Periodene } from './Periodene';
import { Uttaksdagen } from './Uttaksdagen';

export const finnesPeriodeIOpprinneligPlan = (periode: Periode, opprinneligPlan: Periode[]): boolean => {
    const finnes = opprinneligPlan.some((op) => Perioden(periode).erLik(op, true, true));
    return finnes;
};

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
                    fom: getSisteAvDagensDatoOgDato(fom),
                    tom
                }
            }
        ];
    }
    return [];
};

const getSisteAvDagensDatoOgDato = (dato: Date): Date => {
    const uttaksdagDagensDato = Uttaksdagen(DateValues.today.toDate()).denneEllerNeste();
    return moment.max(moment(dato), moment(uttaksdagDagensDato)).toDate();
};

const getLikePerioder = (periode: Periode, opprinneligPlan: Periode[]): Periode[] => {
    return opprinneligPlan.filter((p) => Perioden(p).erLik(periode, false, true));
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
                    fom: getSisteAvDagensDatoOgDato(opprinneligPeriode.tidsperiode.fom),
                    tom: periode.tidsperiode.tom
                }
            };
        }
    }
    return periode;
};

const erKunSluttdatoFlyttetTilbakeITid = (periode: Periode, opprinneligPeriode: Periode): boolean => {
    return moment(periode.tidsperiode.tom).isBefore(opprinneligPeriode.tidsperiode.tom, 'day');
};

const justerStartdatoFørsteEndring = (endringer: Periode[], opprinneligPlan: Periode[]): Periode[] => {
    const førsteEndredePeriode = endringer[0];
    const opprinneligPeriodeSammeFomDato = Periodene(opprinneligPlan).finnPeriodeMedDato(
        førsteEndredePeriode.tidsperiode.fom
    );
    if (opprinneligPeriodeSammeFomDato) {
        if (Perioden(førsteEndredePeriode).erLik(opprinneligPeriodeSammeFomDato) === false) {
            return endringer;
        } else if (
            moment(førsteEndredePeriode.tidsperiode.tom).isAfter(opprinneligPeriodeSammeFomDato.tidsperiode.tom, 'day')
        ) {
            return [
                {
                    ...førsteEndredePeriode,
                    tidsperiode: {
                        fom: opprinneligPeriodeSammeFomDato.tidsperiode.tom,
                        tom: førsteEndredePeriode.tidsperiode.tom
                    }
                },
                ...endringer.slice(1)
            ];
        } else if (
            moment(førsteEndredePeriode.tidsperiode.tom).isBefore(opprinneligPeriodeSammeFomDato.tidsperiode.tom, 'day')
        ) {
            if (endringer.length > 0) {
                return endringer.slice(1);
            }
            return [
                {
                    ...førsteEndredePeriode,
                    tidsperiode: {
                        fom: getSisteAvDagensDatoOgDato(opprinneligPeriodeSammeFomDato.tidsperiode.fom),
                        tom: førsteEndredePeriode.tidsperiode.tom
                    }
                },
                ...endringer.slice(1)
            ];
        }
    }
    const opprinneligPeriode = Periodene(opprinneligPlan).finnFørstePeriodeEtterDato(
        førsteEndredePeriode.tidsperiode.fom
    );
    if (opprinneligPeriode && opprinneligPeriode.tidsperiode.fom) {
        if (erKunSluttdatoFlyttetTilbakeITid(førsteEndredePeriode, opprinneligPeriode)) {
            return endringer.slice(1);
        }
        return [
            {
                ...førsteEndredePeriode,
                tidsperiode: {
                    fom: opprinneligPeriode.tidsperiode.fom,
                    tom: førsteEndredePeriode.tidsperiode.tom
                }
            },
            ...endringer.slice(1)
        ];
    }
    return endringer;
};

export const getEndretUttaksplanForInnsending = (opprinneligPlan: Periode[], nyPlan: Periode[]): Periode[] => {
    const endringer = finnEndringerIUttaksplan(opprinneligPlan, nyPlan);
    if (endringer && endringer.length > 0) {
        if (endringer.length === 1) {
            const endretPeriode = endringer[0];
            const perioder = getLikePerioder(endretPeriode, opprinneligPlan);
            const opprinneligPeriode = perioder.length === 1 ? perioder[0] : undefined;
            if (opprinneligPeriode) {
                return [justerKunEndretSisteperiode(endretPeriode, opprinneligPeriode)];
            }
        }
        return justerStartdatoFørsteEndring(endringer, opprinneligPlan).filter((p) => isInfoPeriode(p) === false);
    }
    return [];
};
