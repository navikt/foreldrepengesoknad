import { Forelder } from 'app/types/Forelder';
import { Oppholdsperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { UttaksplanColor } from 'uttaksplan/types/UttaksplanColor';

export const getForelderFarge = (forelder: Forelder) => {
    return forelder === Forelder.mor ? UttaksplanColor.purple : UttaksplanColor.blue;
};

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    forIkon?: boolean,
    harMidlertidigOmsorg?: boolean
): UttaksplanColor => {
    if (forIkon && (konto === StønadskontoType.Fellesperiode || konto === StønadskontoType.Flerbarnsdager)) {
        return UttaksplanColor.purpleBlue;
    }

    if (harMidlertidigOmsorg) {
        return UttaksplanColor.purple;
    }

    if (forelder === undefined) {
        switch (konto) {
            case StønadskontoType.Fedrekvote:
            case StønadskontoType.AktivitetsfriKvote:
                return UttaksplanColor.blue;
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.Foreldrepenger:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return UttaksplanColor.purple;
            case StønadskontoType.Fellesperiode:
            case StønadskontoType.Flerbarnsdager:
                return UttaksplanColor.purpleBlue;
            default:
                return UttaksplanColor.transparent;
        }
    }
    return getForelderFarge(forelder);
};

export const getUtsettelseFarge = (): UttaksplanColor => {
    return UttaksplanColor.green;
};

export const getOppholdFarge = (periode: Oppholdsperiode): UttaksplanColor => {
    return getForelderFarge(periode.forelder);
};

export const getPeriodeFarge = (
    periode: Periode,
    forelder?: Forelder,
    harMidlertidligOmsorg?: boolean
): UttaksplanColor | undefined => {
    if (harMidlertidligOmsorg) {
        return UttaksplanColor.purple;
    }

    if (periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring) {
        return getStønadskontoFarge(periode.konto, periode.forelder || forelder);
    }
    if (periode.type === Periodetype.Utsettelse) {
        return getUtsettelseFarge();
    }
    if (periode.type === Periodetype.Opphold) {
        return getOppholdFarge(periode);
    }
    return undefined;
};
