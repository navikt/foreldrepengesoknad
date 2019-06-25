import moment from 'moment';
import { GruppertInfoPeriode, InfoPeriode } from 'app/types/uttaksplan/periodetyper';
import { Periodene } from './Periodene';

/**
 *  Filtrer ut perioder som ikke lenger er innenfor [periode] sitt tidsrom
 */
export const trimPerioderIGruppertInfoPeriode = (periode: GruppertInfoPeriode): InfoPeriode[] => {
    return Periodene(periode.perioder)
        .finnOverlappendePerioder(periode)
        .map((p: InfoPeriode) => ({
            ...p,
            tidsperiode: {
                fom: moment.max([moment(periode.tidsperiode.fom), moment(p.tidsperiode.fom)]).toDate(),
                tom: moment.min([moment(periode.tidsperiode.tom), moment(p.tidsperiode.tom)]).toDate()
            }
        }));
};

export const getPerioderFromGruppertInfoPeriode = (perioder: GruppertInfoPeriode[]) => {
    return perioder.map(trimPerioderIGruppertInfoPeriode);
};
