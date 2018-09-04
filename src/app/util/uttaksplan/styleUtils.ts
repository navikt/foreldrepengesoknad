import { Forelder } from 'common/types';
import { Periodefarge } from '../../components/periodeikon/Periodeikon';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';

export const getStønadskontoFarge = (konto: StønadskontoType, forelder?: Forelder): Periodefarge => {
    if (!forelder) {
        switch (konto) {
            case StønadskontoType.Fedrekvote:
                return 'blaa';
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.Foreldrepenger:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return 'lilla';
            case StønadskontoType.Fellesperiode:
                return 'lillaBlaa';
        }
    }
    return forelder === 'forelder1' ? 'lilla' : 'blaa';
};

export const getUtsettelseFarge = (): Periodefarge => {
    return 'gronn';
};

export const getPeriodeFarge = (periode: Periode): Periodefarge | undefined => {
    if (periode.type === Periodetype.Uttak) {
        return getStønadskontoFarge(periode.konto, periode.forelder);
    }
    if (periode.type === Periodetype.Utsettelse) {
        return getUtsettelseFarge();
    }
    return undefined;
};
