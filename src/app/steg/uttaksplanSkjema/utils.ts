import * as moment from 'moment';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';

export const skalFarUtsetteEtterMorSinSisteUttaksdag = (
    farSinFørsteUttaksdag: Date,
    morsSisteUttaksdag: Date
): boolean => {
    return moment(farSinFørsteUttaksdag).isAfter(Uttaksdagen(morsSisteUttaksdag).neste());
};
