import { Forelder } from '@navikt/fp-common';

import { StønadskontoType } from 'app/types/StønadskontoType';
import { UttaksplanColor } from 'app/types/UttaksplanColor';

export const getForelderFarge = (forelder: Forelder, erFarEllerMedmor: boolean) => {
    if (forelder === Forelder.mor) {
        return erFarEllerMedmor ? UttaksplanColor.lightBlue : UttaksplanColor.blue;
    }
    return erFarEllerMedmor ? UttaksplanColor.green : UttaksplanColor.lightGreen;
};

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): UttaksplanColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? UttaksplanColor.green : UttaksplanColor.blue;
    }

    if (forelder === undefined) {
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
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};
