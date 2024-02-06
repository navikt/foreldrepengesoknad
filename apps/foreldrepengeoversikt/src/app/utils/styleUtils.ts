import { StønadskontoType } from 'app/types/StønadskontoType';
import { UttaksplanColor } from 'app/types/UttaksplanColor';

export const getStønadskontoFarge = (konto: StønadskontoType, erFarEllerMedmor: boolean): UttaksplanColor => {
    switch (konto) {
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.AktivitetsfriKvote:
            return erFarEllerMedmor ? UttaksplanColor.green : UttaksplanColor.lightGreen;
        case StønadskontoType.ForeldrepengerFørFødsel:
        case StønadskontoType.Mødrekvote:
            return erFarEllerMedmor ? UttaksplanColor.lightBlue : UttaksplanColor.blue;
        case StønadskontoType.Foreldrepenger:
            return erFarEllerMedmor ? UttaksplanColor.green : UttaksplanColor.blue;
        case StønadskontoType.Fellesperiode:
            return erFarEllerMedmor ? UttaksplanColor.greenLightBlue : UttaksplanColor.blueLightGreen;
        default:
            return UttaksplanColor.transparent;
    }
};
