import { PeriodeColor } from '@navikt/fp-constants';

import { Forelder } from 'app/types/Forelder';
import { StønadskontoType } from 'app/types/StønadskontoType';

export const getForelderFarge = (forelder: Forelder, erFarEllerMedmor: boolean) => {
    if (forelder === Forelder.mor) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUE : PeriodeColor.BLUE;
    }
    return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.LIGHTGREEN;
};

export const getKontoFarge = (konto: StønadskontoType, erFarEllerMedmor: boolean) => {
    switch (konto) {
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.AktivitetsfriKvote:
            return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.LIGHTGREEN;
        case StønadskontoType.ForeldrepengerFørFødsel:
        case StønadskontoType.Mødrekvote:
            return erFarEllerMedmor ? PeriodeColor.LIGHTBLUE : PeriodeColor.BLUE;
        case StønadskontoType.Foreldrepenger:
            return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.BLUE;
        case StønadskontoType.Fellesperiode:
            return erFarEllerMedmor ? PeriodeColor.LIGHTBLUEGREEN : PeriodeColor.LIGHTGREENBLUE;
        default:
            return PeriodeColor.NONE;
    }
};

export const getUttaksperiodeFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): PeriodeColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.BLUE;
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};
