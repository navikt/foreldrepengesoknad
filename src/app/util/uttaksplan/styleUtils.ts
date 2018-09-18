import { Forelder } from 'common/types';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { UttaksplanColor } from '../../types/uttaksplan/colors';

export const getStønadskontoFarge = (konto: StønadskontoType, forelder?: Forelder): UttaksplanColor => {
    if (!forelder) {
        switch (konto) {
            case StønadskontoType.Fedrekvote:
                return 'blue';
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.Foreldrepenger:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return 'purple';
            case StønadskontoType.Fellesperiode:
                return 'purpleBlue';
        }
    }
    return forelder === Forelder.MOR ? 'purple' : 'blue';
};

export const getUtsettelseFarge = (): UttaksplanColor => {
    return 'green';
};

export const getPeriodeFarge = (periode: Periode): UttaksplanColor | undefined => {
    if (periode.type === Periodetype.Uttak) {
        return getStønadskontoFarge(periode.konto, periode.forelder);
    }
    if (periode.type === Periodetype.Utsettelse) {
        return getUtsettelseFarge();
    }
    return undefined;
};
