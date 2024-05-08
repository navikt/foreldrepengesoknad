import { Forelder, Oppholdsperiode, StønadskontoType } from '@navikt/fp-common';
import { PeriodeColor } from '@navikt/fp-constants';

export const getForelderFarge = (forelder: Forelder, erFarEllerMedmor: boolean): PeriodeColor => {
    if (forelder === Forelder.mor) {
        return erFarEllerMedmor ? PeriodeColor.LIGHTBLUE : PeriodeColor.BLUE;
    }
    return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.LIGHTGREEN;
};

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): PeriodeColor => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? PeriodeColor.GREEN : PeriodeColor.BLUE;
    }

    if (forelder === undefined) {
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
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

export const getUtsettelseFarge = (forelder: Forelder): PeriodeColor => {
    return forelder === Forelder.farMedmor ? PeriodeColor.GREENOUTLINE : PeriodeColor.BLUEOUTLINE;
};

export const getOppholdFarge = (periode: Oppholdsperiode, erFarEllerMedmor: boolean): PeriodeColor => {
    return getForelderFarge(periode.forelder, erFarEllerMedmor);
};
