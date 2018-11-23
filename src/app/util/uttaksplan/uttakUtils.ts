import { StønadskontoType, Periode } from '../../types/uttaksplan/periodetyper';
import moment from 'moment';

export const erUttakAvAnnenForeldersKvote = (
    konto: StønadskontoType | undefined,
    søkerErFarEllerMedmor: boolean
): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

export const getEgenKvote = (erSøkerFarEllerMedmor: boolean) => {
    return erSøkerFarEllerMedmor ? StønadskontoType.Fedrekvote : StønadskontoType.Mødrekvote;
};

export const erUttakEgenKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor) === false;
};

const correctDateIfMissmatchOnIsoString = (date: Date) => {
    if (moment(date).isValid() === false) {
        return date;
    }
    const isoString = date.toISOString();
    if (isoString.indexOf('T23') > 0) {
        const newDate = moment(isoString.substr(0, 10))
            .utc(true)
            .add(24, 'hours')
            .toDate();
        return newDate;
    }
    return date;
};
export const correctFomAfterTomOnUttaksplan = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.map((periode): Periode => {
        const { tidsperiode } = periode;
        const fom = correctDateIfMissmatchOnIsoString(tidsperiode.fom);
        const tom = correctDateIfMissmatchOnIsoString(tidsperiode.tom);
        return {
            ...periode,
            tidsperiode: {
                fom,
                tom
            }
        };
    });
};
