import { Forelder } from 'common/types';
import { Periode, Periodetype, StønadskontoType, Oppholdsperiode } from '../../types/uttaksplan/periodetyper';
import { UttaksplanColor } from '../../types/uttaksplan/colors';

const getForelderFarge = (forelder: Forelder) => {
    return forelder === Forelder.MOR ? 'purple' : 'blue';
};

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    forelder: Forelder | undefined,
    forIkon?: boolean
): UttaksplanColor => {
    if (forIkon && konto === StønadskontoType.Fellesperiode) {
        return 'purpleBlue';
    }

    if (forelder === undefined) {
        switch (konto) {
            case StønadskontoType.Fedrekvote:
            case StønadskontoType.AktivitetsfriKvote:
                return 'blue';
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.Foreldrepenger:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return 'purple';
            case StønadskontoType.Fellesperiode:
                return 'purpleBlue';
            default:
                return '';
        }
    }
    return getForelderFarge(forelder);
};

export const getUtsettelseFarge = (): UttaksplanColor => {
    return 'green';
};

export const getOppholdFarge = (periode: Oppholdsperiode): UttaksplanColor => {
    return getForelderFarge(periode.forelder);
};

export const getPeriodeFarge = (periode: Periode, forelder?: Forelder): UttaksplanColor | undefined => {
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
